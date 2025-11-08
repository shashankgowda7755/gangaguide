import express from 'express';
import { registerRoutes } from '../server/routes';
import { serveStatic } from '../server/vite';
import { seedDatabase } from '../server/seed';
import path from 'path';

const app = express();

// Middleware setup (same as server/index.ts)
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Initialize database and routes
let initialized = false;

async function initializeApp() {
  if (!initialized) {
    await seedDatabase();
    await registerRoutes(app);
    
    // Serve static files in production
    serveStatic(app);
    
    initialized = true;
  }
}

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  await initializeApp();
  
  // Handle the request
  return new Promise((resolve, reject) => {
    app(req, res, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}