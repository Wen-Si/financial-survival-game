# 🚀 快速部署指南

## 项目已完成！

金融职场生存者游戏的全部代码已生成在：
`/home/admin/openclaw/workspace/financial-survival-game/`

## 项目结构

```
financial-survival-game/
├── backend/                 # Node.js 后端
│   ├── src/
│   │   ├── index.js        # 入口文件
│   │   ├── models/         # MongoDB 模型
│   │   ├── routes/         # API 路由
│   │   ├── services/       # AI 服务 (GLM)
│   │   ├── scenarios/      # 游戏场景
│   │   └── scripts/        # 初始化脚本
│   ├── package.json
│   └── .env.example
├── frontend/               # React 前端
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   ├── services/      # API 服务
│   │   └── App.js         # 主应用
│   └── package.json
├── .github/workflows/      # CI/CD 配置
├── README.md
└── DEPLOYMENT.md
```

## 手动部署步骤

### 1. 创建 GitHub 仓库

```bash
# 在 GitHub 上创建新仓库
# 访问 https://github.com/new
# 仓库名：financial-survival-game
# 设为公开 (Public)
```

### 2. 推送代码到 GitHub

```bash
cd /home/admin/openclaw/workspace/financial-survival-game

# 更新远程仓库 URL (替换为你的 GitHub 用户名)
git remote set-url origin https://github.com/YOUR_USERNAME/financial-survival-game.git

# 推送到 GitHub
git push -u origin main
```

### 3. 配置 MongoDB

**选项 A: 使用 MongoDB Atlas (推荐)**

1. 访问 https://cloud.mongodb.com
2. 创建免费集群
3. 创建数据库用户
4. 获取连接字符串
5. 在连接字符串中替换 `<password>` 为你的密码

**选项 B: 本地 MongoDB**

```bash
# 安装并启动 MongoDB
sudo systemctl start mongod
```

### 4. 部署后端

**使用 Railway (推荐)**

1. 访问 https://railway.app
2. 登录并连接 GitHub
3. 选择 `financial-survival-game` 仓库
4. 设置 Root Directory: `backend`
5. 添加环境变量:
   ```
   GLM_API_KEY=your-glm-api-key-here
   MONGODB_URI=你的 MongoDB 连接字符串
   JWT_SECRET=financial-survival-game-secret-key-2026
   PORT=5000
   FRONTEND_URL=你的前端 URL
   NODE_ENV=production
   ```
6. 部署完成后复制后端 URL

**使用 Render**

1. 访问 https://render.com
2. 创建 New Web Service
3. 连接仓库
4. Build Command: `cd backend && npm install`
5. Start Command: `cd backend && npm start`
6. 添加相同的环境变量

### 5. 部署前端

**使用 Vercel (推荐)**

1. 访问 https://vercel.com
2. 登录并导入 GitHub 仓库
3. 设置 Root Directory: `frontend`
4. 添加环境变量:
   ```
   REACT_APP_API_URL=你的后端 URL/api
   ```
5. 部署完成后获得前端 URL

**使用 GitHub Pages**

1. 安装 gh-pages:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. 更新 `frontend/package.json`:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/financial-survival-game",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. 部署:
   ```bash
   npm run deploy
   ```

### 6. 初始化游戏场景

部署完成后，通过 SSH 或 Railway/Render 控制台运行:

```bash
cd backend
node src/scripts/initScenes.js
```

或者在本地运行 (如果本地连接生产数据库):

```bash
cd /home/admin/openclaw/workspace/financial-survival-game/backend
MONGODB_URI=你的生产数据库连接字符串 node src/scripts/initScenes.js
```

### 7. 测试游戏

1. 访问前端 URL
2. 注册新账号
3. 创建角色 (用自然语言描述)
4. 开始游戏！

## API 端点

| 方法 | 端点 | 说明 |
|------|------|------|
| POST | /api/auth/register | 用户注册 |
| POST | /api/auth/login | 用户登录 |
| GET | /api/auth/me | 获取当前用户 |
| POST | /api/character/create | 创建角色 |
| GET | /api/character/list | 获取角色列表 |
| GET | /api/character/:id | 获取角色详情 |
| POST | /api/game/start/:id | 开始游戏 |
| POST | /api/game/turn/:id | 执行一个回合 |
| POST | /api/game/auto/:id | 自动播放 |
| GET | /api/game/log/:id | 获取游戏日志 |

## 游戏场景

已创建的场景包括:

- **通用场景**: 职业起点、行业社交活动
- **投行场景**: 入职培训、第一个 IPO 项目
- **商行场景**: 分行报到
- **证券场景**: 研究所入职
- **基金场景**: 基金公司入职
- **保险场景**: 保险公司入职

每个场景包含多个事件和选项，AI 会根据角色特质做出决策。

## 技术栈

- **前端**: React 18, TailwindCSS, React Router
- **后端**: Node.js 18, Express, MongoDB, Mongoose
- **AI**: GLM-4.5-Flash (智谱 AI)
- **认证**: JWT
- **部署**: Railway/Render + Vercel/GitHub Pages

## 注意事项

1. **API Key 安全**: 生产环境中不要将 API Key 提交到 GitHub
2. **数据库备份**: 定期备份 MongoDB 数据
3. **监控**: 设置错误监控和日志记录
4. **扩展**: 可以添加更多场景、事件和游戏机制

## 后续扩展建议

1. 添加更多场景 (目标 100+)
2. 实现多人互动功能
3. 添加成就系统
4. 实现排行榜
5. 添加更多 AI 决策选项
6. 实现角色转职系统
7. 添加随机事件和危机处理

## 支持

如有问题，请查看:
- README.md - 项目说明
- DEPLOYMENT.md - 详细部署指南
- backend/.env.example - 环境变量说明

---

**项目创建时间**: 2026-05-27
**AI 模型**: GLM-4.5-Flash
**开发者**: 我的 Clawbot · 严谨专业版
