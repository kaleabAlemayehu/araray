import express from 'express';
import { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Song API!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
