import { Router } from 'express';
import {
  createSong,
  getSongs,
  getSongById,
} from '../controllers/song.controller';
const router: Router = Router();

router.post('/', createSong);
router.get('/', getSongs);
router.get('/:id', getSongById);

export default router;
