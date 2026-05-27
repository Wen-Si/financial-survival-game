// 场景数据初始化脚本
// 运行：node src/scripts/initScenes.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scene from '../models/Scene.js';
import { allScenes } from '../scenarios/scenes.js';

dotenv.config();

async function initScenes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/financial-survival-game');
    console.log('✅ Connected to MongoDB');

    // Clear existing scenes
    await Scene.deleteMany({});
    console.log('🗑️  Cleared existing scenes');

    // Insert all scenes
    const inserted = await Scene.insertMany(allScenes);
    console.log(`✅ Inserted ${inserted.length} scenes`);

    // Log scene categories
    const categories = {};
    inserted.forEach(scene => {
      categories[scene.category] = (categories[scene.category] || 0) + 1;
    });
    console.log('📊 Scene categories:', categories);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

initScenes();
