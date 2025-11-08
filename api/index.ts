import express from 'express';
import { registerRoutes } from '../server/routes';
import { seedDatabase } from '../server/seed';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'dist/public' directory
const publicPath = path.join(process.cwd(), 'dist', 'public');
app.use(express.static(publicPath));

// Initialize database and routes
let initialized = false;
async function initializeApp() {
  if (!initialized) {
    await seedDatabase();
    await registerRoutes(app);
    initialized = true;
  }
}

// All other routes are handled by the client-side router
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Vercel serverless function handler
export default async (req: any, res: any) => {
  await initializeApp();
  app(req, res);
};