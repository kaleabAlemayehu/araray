import { Router } from 'express';
import {
  createSong,
} from '../controllers/song.controller';
const router: Router = Router();

router.post('/', createSong);

export default router;
