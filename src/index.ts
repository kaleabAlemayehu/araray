import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './config/db';
import songRoutes from './routes/song.routes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Song API!');
});

app.use('/api/v1/songs', songRoutes);

app.use('/api/v1/music', express.static('music'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
