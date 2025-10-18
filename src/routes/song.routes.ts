import { Router } from 'express';
import {
  createSong,
  getSongs,
  getSongById,
  updateSong,
} from '../controllers/song.controller';
const router: Router = Router();

router.post('/', createSong);
router.get('/', getSongs);
router.get('/:id', getSongById);
router.put('/:id', updateSong);

export default router;
