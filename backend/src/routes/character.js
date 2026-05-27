import express from 'express';
import jwt from 'jsonwebtoken';
import Character from '../models/Character.js';
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

// Create character with natural language description
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Character description is required' });
    }

    // Use AI to parse the description
    const parsedData = await GLMService.parseCharacterDescription(description);

    // Create character
    const character = new Character({
      userId: req.userId,
      name: parsedData.name || 'Unknown',
      originalDescription: description,
      traits: parsedData.traits || {},
      skills: parsedData.skills || [],
      careerDirection: parsedData.careerDirection || 'undecided',
      status: {
        currentJob: 'Analyst',
        currentCompany: 'Pending Assignment',
        currentScene: 'orientation',
        level: 1,
        experience: 0,
        energy: 100,
        stress: 0,
        reputation: 50,
        salary: 10000,
        relationships: []
      }
    });

    await character.save();

    // Update user's character list
    const User = (await import('../models/User.js')).default;
    await User.findByIdAndUpdate(req.userId, {
      $push: { characters: character._id }
    });

    res.status(201).json({
      message: 'Character created successfully',
      character
    });
  } catch (error) {
    console.error('Create character error:', error);
    res.status(500).json({ error: 'Failed to create character' });
  }
});

// Get all characters for user
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const characters = await Character.find({ userId: req.userId });
    res.json({ characters });
  } catch (error) {
    console.error('Get characters error:', error);
    res.status(500).json({ error: 'Failed to get characters' });
  }
});

// Get single character
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const character = await Character.findOne({ 
      _id: req.params.id,
      userId: req.userId 
    });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.json({ character });
  } catch (error) {
    console.error('Get character error:', error);
    res.status(500).json({ error: 'Failed to get character' });
  }
});

// Update character (manual intervention)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const character = await Character.findOne({ 
      _id: req.params.id,
      userId: req.userId 
    });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // Only allow certain fields to be updated
    const allowedFields = ['name', 'isActive'];
    const updates = {};
    
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    Object.assign(character, updates);
    await character.save();

    res.json({ 
      message: 'Character updated successfully',
      character 
    });
  } catch (error) {
    console.error('Update character error:', error);
    res.status(500).json({ error: 'Failed to update character' });
  }
});

// Delete character
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const character = await Character.findOneAndDelete({ 
      _id: req.params.id,
      userId: req.userId 
    });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // Remove from user's character list
    const User = (await import('../models/User.js')).default;
    await User.findByIdAndUpdate(req.userId, {
      $pull: { characters: character._id }
    });

    res.json({ message: 'Character deleted successfully' });
  } catch (error) {
    console.error('Delete character error:', error);
    res.status(500).json({ error: 'Failed to delete character' });
  }
});

export default router;
