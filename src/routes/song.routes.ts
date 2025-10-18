import { Router } from 'express';
import {
  createSong,
  getSongs,
} from '../controllers/song.controller';
const router: Router = Router();

router.post('/', createSong);
router.get('/', getSongs);

export default router;
