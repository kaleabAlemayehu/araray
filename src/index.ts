import express from 'express';
import { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './config/db';
import songRoutes from './routes/song.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Song API!');
});

app.use('/songs', songRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
