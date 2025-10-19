import { Router } from 'express';
import {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
  getStats,
  uploadFile,
} from '../controllers/song.controller';
import upload from '../middlewares/upload';

const router: Router = Router();

router.post('/', createSong);
router.post('/upload', upload.single('song'), uploadFile);
router.get('/', getSongs);
router.get('/stats', getStats);
router.get('/:id', getSongById);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;
