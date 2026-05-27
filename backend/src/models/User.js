import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
