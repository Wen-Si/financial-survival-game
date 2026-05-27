import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  // 自然语言设定的原始描述
  originalDescription: {
    type: String,
    required: true
  },
  // AI 解析后的结构化属性
  traits: {
    personality: { type: String, default: 'neutral' }, // 性格
    character: { type: String, default: 'neutral' },   // 品格
    workStyle: { type: String, default: 'balanced' }   // 工作风格
  },
  skills: [{
    name: String,
    level: { type: Number, min: 1, max: 10, default: 1 },
    category: String // technical, soft, management
  }],
  careerDirection: {
    type: String,
    enum: ['investment-banking', 'commercial-banking', 'securities', 'fund', 'insurance', 'undecided'],
    default: 'undecided'
  },
  // 游戏状态
  status: {
    currentJob: { type: String, default: 'Analyst' },
    currentCompany: { type: String, default: 'Unknown' },
    currentScene: { type: String, default: 'orientation' },
    level: { type: Number, default: 1 },
    experience: { type: Number, default: 0 },
    energy: { type: Number, default: 100 },
    stress: { type: Number, default: 0 },
    reputation: { type: Number, default: 50 },
    salary: { type: Number, default: 10000 },
    relationships: [{
      name: String,
      role: String,
      affinity: { type: Number, min: 0, max: 100, default: 50 }
    }]
  },
  // 游戏日志
  gameLog: [{
    timestamp: { type: Date, default: Date.now },
    scene: String,
    event: String,
    decision: String,
    outcome: String,
    impact: {
      experience: Number,
      stress: Number,
      reputation: Number,
      salary: Number
    }
  }],
  // AI 决策历史
  aiDecisions: [{
    timestamp: { type: Date, default: Date.now },
    context: String,
    options: [String],
    chosenOption: String,
    reasoning: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActiveAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
