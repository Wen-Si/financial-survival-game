import express from 'express';
import jwt from 'jsonwebtoken';
import Character from '../models/Character.js';
import Scene from '../models/Scene.js';
import GLMService from '../services/glmService.js';

const router = express.Router();

// Middleware to verify token
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Start game for a character
router.post('/start/:characterId', authMiddleware, async (req, res) => {
  try {
    const character = await Character.findOne({
      _id: req.params.characterId,
      userId: req.userId
    });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (!character.isActive) {
      return res.status(400).json({ error: 'Character is not active' });
    }

    // Assign initial scene based on career direction
    let initialScene = 'orientation';
    if (character.careerDirection !== 'undecided') {
      initialScene = `${character.careerDirection}-day-1`;
    }

    character.status.currentScene = initialScene;
    await character.save();

    res.json({
      message: 'Game started',
      character
    });
  } catch (error) {
    console.error('Start game error:', error);
    res.status(500).json({ error: 'Failed to start game' });
  }
});

// Execute one game turn (AI makes decision)
router.post('/turn/:characterId', authMiddleware, async (req, res) => {
  try {
    const character = await Character.findOne({
      _id: req.params.characterId,
      userId: req.userId
    });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (!character.isActive) {
      return res.status(400).json({ error: 'Character is not active' });
    }

    // Get current scene
    const scene = await Scene.findOne({ sceneId: character.status.currentScene });
    if (!scene) {
      return res.status(404).json({ error: 'Scene not found' });
    }

    // Get available events
    const availableEvents = scene.events || [];

    if (availableEvents.length === 0) {
      return res.status(400).json({ error: 'No events available in this scene' });
    }

    // AI makes decision
    const decision = await GLMService.makeDecision(character, scene, availableEvents);

    // Find chosen event and option
    const chosenEvent = availableEvents.find(e => e.id === decision.chosenEvent);
    if (!chosenEvent) {
      return res.status(400).json({ error: 'Invalid event chosen' });
    }

    const chosenOption = chosenEvent.options.find(o => o.id === decision.chosenOption);
    if (!chosenOption) {
      return res.status(400).json({ error: 'Invalid option chosen' });
    }

    // Randomly determine outcome based on probabilities
    const rand = Math.random();
    let cumulativeProb = 0;
    let selectedOutcome = chosenOption.outcomes[0];
    
    for (const outcome of chosenOption.outcomes) {
      cumulativeProb += outcome.probability;
      if (rand <= cumulativeProb) {
        selectedOutcome = outcome;
        break;
      }
    }

    // Generate outcome description
    const outcomeDescription = await GLMService.generateOutcomeDescription(
      chosenEvent,
      selectedOutcome,
      character
    );

    // Update character status
    const impact = selectedOutcome.impact;
    character.status.experience += (impact.experience || 0);
    character.status.stress = Math.max(0, Math.min(100, character.status.stress + (impact.stress || 0)));
    character.status.reputation = Math.max(0, Math.min(100, character.status.reputation + (impact.reputation || 0)));
    character.status.energy = Math.max(0, Math.min(100, character.status.energy + (impact.energy || 0)));
    
    if (impact.salary) {
      character.status.salary += impact.salary;
    }

    // Check for level up
    const expNeeded = character.status.level * 100;
    if (character.status.experience >= expNeeded) {
      character.status.level += 1;
      character.status.experience = 0;
    }

    // Log the event
    character.gameLog.unshift({
      timestamp: new Date(),
      scene: scene.name,
      event: chosenEvent.name,
      decision: decision.actionDescription,
      outcome: outcomeDescription,
      impact: {
        experience: impact.experience || 0,
        stress: impact.stress || 0,
        reputation: impact.reputation || 0,
        salary: impact.salary || 0
      }
    });

    // Keep only last 100 logs
    if (character.gameLog.length > 100) {
      character.gameLog = character.gameLog.slice(0, 100);
    }

    // Log AI decision
    character.aiDecisions.unshift({
      timestamp: new Date(),
      context: `Scene: ${scene.name}, Event: ${chosenEvent.name}`,
      options: chosenOption.outcomes.map(o => o.result),
      chosenOption: selectedOutcome.result,
      reasoning: decision.reasoning
    });

    // Keep only last 50 AI decisions
    if (character.aiDecisions.length > 50) {
      character.aiDecisions = character.aiDecisions.slice(0, 50);
    }

    character.lastActiveAt = new Date();
    await character.save();

    res.json({
      message: 'Turn completed',
      turn: {
        scene: scene.name,
        event: chosenEvent.name,
        decision: decision,
        outcome: {
          description: outcomeDescription,
          impact: selectedOutcome.impact
        }
      },
      character: {
        id: character._id,
        name: character.name,
        status: character.status
      }
    });
  } catch (error) {
    console.error('Game turn error:', error);
    res.status(500).json({ error: 'Failed to execute turn' });
  }
});

// Get character game log
router.get('/log/:characterId', authMiddleware, async (req, res) => {
  try {
    const character = await Character.findOne({
      _id: req.params.characterId,
      userId: req.userId
    }).select('gameLog');

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.json({ gameLog: character.gameLog });
  } catch (error) {
    console.error('Get game log error:', error);
    res.status(500).json({ error: 'Failed to get game log' });
  }
});

// Auto-play mode (execute multiple turns)
router.post('/auto/:characterId', authMiddleware, async (req, res) => {
  try {
    const { turns = 5 } = req.body;
    
    const character = await Character.findOne({
      _id: req.params.characterId,
      userId: req.userId
    });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (!character.isActive) {
      return res.status(400).json({ error: 'Character is not active' });
    }

    const results = [];
    
    for (let i = 0; i < turns; i++) {
      // Check if character has enough energy
      if (character.status.energy < 10) {
        results.push({ turn: i + 1, skipped: true, reason: 'Not enough energy' });
        break;
      }

      // Execute turn
      const scene = await Scene.findOne({ sceneId: character.status.currentScene });
      if (!scene || !scene.events || scene.events.length === 0) {
        results.push({ turn: i + 1, skipped: true, reason: 'No events available' });
        break;
      }

      const decision = await GLMService.makeDecision(character, scene, scene.events);
      const chosenEvent = scene.events.find(e => e.id === decision.chosenEvent);
      const chosenOption = chosenEvent?.options.find(o => o.id === decision.chosenOption);

      if (!chosenEvent || !chosenOption) {
        results.push({ turn: i + 1, skipped: true, reason: 'Invalid decision' });
        break;
      }

      // Simplified outcome calculation
      const outcome = chosenOption.outcomes[0];
      character.status.experience += (outcome.impact?.experience || 0);
      character.status.stress = Math.max(0, Math.min(100, character.status.stress + (outcome.impact?.stress || 0)));
      character.status.energy = Math.max(0, Math.min(100, character.status.energy - 10));
      
      character.lastActiveAt = new Date();
      await character.save();

      results.push({
        turn: i + 1,
        scene: scene.name,
        event: chosenEvent.name,
        outcome: outcome.result
      });
    }

    res.json({
      message: `Completed ${results.length} turns`,
      results,
      character: {
        id: character._id,
        name: character.name,
        status: character.status
      }
    });
  } catch (error) {
    console.error('Auto play error:', error);
    res.status(500).json({ error: 'Failed to auto play' });
  }
});

export default router;
