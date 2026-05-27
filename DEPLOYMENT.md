# Financial Career Survival Game - Deployment Guide

## Prerequisites

- Node.js 18+
- MongoDB (local or cloud like MongoDB Atlas)
- GitHub account
- GLM API Key (already configured)

## Local Development

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

### Initialize Scenes

```bash
cd backend
node src/scripts/initScenes.js
```

## Production Deployment

### Option 1: Railway (Recommended for Backend)

1. Create account at https://railway.app
2. Connect GitHub repository
3. Set root directory to `backend`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GLM_API_KEY`
   - `PORT`
   - `FRONTEND_URL`

### Option 2: Render

1. Create account at https://render.com
2. Create new Web Service
3. Connect repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables

### Frontend Deployment (GitHub Pages)

1. Go to repository Settings > Pages
2. Select source: `gh-pages` branch
3. Your site will be available at `https://<username>.github.io/<repo>`

Or use Vercel/Netlify:

1. Connect repository
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `build`
5. Add environment variable: `REACT_APP_API_URL`

## Environment Variables

### Backend (.env)

```
GLM_API_KEY=your-glm-api-key
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/financial-game
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
NODE_ENV=production
```

### Frontend (.env.production)

```
REACT_APP_API_URL=https://your-backend-url.com/api
```

## MongoDB Setup

### Local MongoDB

```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# Run scene initialization
cd backend
node src/scripts/initScenes.js
```

### MongoDB Atlas (Cloud)

1. Create account at https://cloud.mongodb.com
2. Create new cluster (free tier available)
3. Create database user
4. Get connection string
5. Whitelist IP addresses (0.0.0.0/0 for development)
6. Use connection string in `MONGODB_URI`

## Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Frontend is accessible
- [ ] API endpoints respond correctly
- [ ] MongoDB connection works
- [ ] GLM API integration works
- [ ] User registration/login works
- [ ] Character creation works
- [ ] Game turns execute correctly

## Troubleshooting

### Backend Issues

```bash
# Check logs
railway logs  # or check Render logs

# Test health endpoint
curl https://your-backend-url.com/api/health
```

### Frontend Issues

- Check browser console for errors
- Verify API URL is correct
- Check CORS settings

### Database Issues

```bash
# Connect to MongoDB
mongo <your-connection-string>

# Check scenes collection
db.scenes.count()

# Re-initialize if needed
node src/scripts/initScenes.js
```

## Support

For issues, please open a GitHub issue or contact the development team.
