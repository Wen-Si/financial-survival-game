import mongoose from 'mongoose';

const sceneSchema = new mongoose.Schema({
  sceneId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['investment-banking', 'commercial-banking', 'securities', 'fund', 'insurance', 'general']
  },
  description: {
    type: String,
    required: true
  },
  // 场景中的可能事件
  events: [{
    id: String,
    name: String,
    description: String,
    triggerCondition: String,
    options: [{
      id: String,
      text: String,
      requirements: {
        minSkillLevel: Number,
        minReputation: Number,
        minEnergy: Number
      },
      outcomes: [{
        probability: Number,
        result: String,
        impact: {
          experience: Number,
          stress: Number,
          reputation: Number,
          salary: Number,
          energy: Number
        }
      }]
    }]
  }],
  // 场景中的 NPC
  npcs: [{
    name: String,
    role: String,
    personality: String,
    interactionOptions: [String]
  }],
  // 解锁条件
  unlockRequirements: {
    minLevel: { type: Number, default: 1 },
    minReputation: { type: Number, default: 0 },
    requiredCareer: String
  }
});

const Scene = mongoose.model('Scene', sceneSchema);

export default Scene;
