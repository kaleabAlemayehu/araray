import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import type { DotenvConfigOptions } from 'dotenv';
import connectDB from './config/db';
import songRoutes from './routes/song.routes';
import playlistRoutes from './routes/playlist.routes';
import cors from 'cors';
import path from 'path';

const configPath = path.resolve(process.cwd(), '.env.dev');

dotenv.config({ path: configPath } as DotenvConfigOptions);

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3000;

connectDB();

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});


app.use('/api/v1/songs', songRoutes);

app.use('/api/v1/music', express.static('music'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
