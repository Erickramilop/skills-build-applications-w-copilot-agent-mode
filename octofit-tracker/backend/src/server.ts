import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectToDatabase from './config/database';
import createApiRouter from './routes/api';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-api', apiUrl: `${baseUrl}/api` });
});

app.use('/api', createApiRouter(baseUrl));

connectToDatabase().catch((error) => {
  console.error('MongoDB connection failed', error);
  process.exit(1);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`Base API URL: ${baseUrl}`);
});
