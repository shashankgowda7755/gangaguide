import express from 'express';
import { registerRoutes } from '../server/routes';
import { seedDatabase } from '../server/seed';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize database and routes
let initialized = false;
async function initializeApp() {
  if (!initialized) {
    try {
      await seedDatabase();
      await registerRoutes(app);
      initialized = true;
    } catch (error) {
      console.error('Error initializing app:', error);
      throw error;
    }
  }
}

// Vercel serverless function handler
export default async (req: any, res: any) => {
  try {
    await initializeApp();
    app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};