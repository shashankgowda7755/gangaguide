import express from 'express';
import { registerRoutes } from '../server/routes';
import { seedDatabase } from '../server/seed';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'dist/public' directory
const publicPath = path.join(__dirname, '..', 'dist', 'public');
app.use(express.static(publicPath));

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

// All other routes are handled by the client-side router
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

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