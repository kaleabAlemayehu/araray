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


/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: The songs managing API
 */

/**
 * @swagger
 * /songs:
 *   post:
 *     summary: Create a new song
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Song'
 *     responses:
 *       201: 
 *         description: The song was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       400:
 *         description: Some error occurred
 */
router.post('/', createSong);

/**
 * @swagger
 * /songs/upload:
 *   post:
 *     summary: Upload a song file
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               song: 
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The song was successfully uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 audioUrl:
 *                   type: string
 *       400:
 *         description: Some error occurred
 */
router.post('/upload', upload.single('song'), uploadFile);

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Returns the list of all the songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: The list of the songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
router.get('/', getSongs);

/**
 * @swagger
 * /songs/stats:
 *   get:
 *     summary: Get statistics about the song library
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: The statistics of the songs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSongs:
 *                   type: integer
 *                 totalArtists:
 *                   type: integer
 *                 totalAlbums:
 *                   type: integer
 *                 totalGenres:
 *                   type: integer
 *                 songsInGenre:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 songsByArtist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 albumsByArtist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 songsInAlbum:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: integer
 *       500:
 *         description: Some error occurred
 */
router.get('/stats', getStats);

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     summary: Get the song by id
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The song id
 *     responses:
 *       200:
 *         description: The song description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: The song was not found
 */
router.get('/:id', getSongById);

/**
 * @swagger
 * /songs/{id}:
 *   put:
 *     summary: Update the song by the id
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The song id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Song'
 *     responses:
 *       200:
 *         description: The song was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: The song was not found
 *       400:
 *         description: Some error occurred
 */
router.put('/:id', updateSong);

/**
 * @swagger
 * /songs/{id}:
 *   delete:
 *     summary: Remove the song by id
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The song id
 *     responses:
 *       200:
 *         description: The song was deleted
 *       404:
 *         description: The song was not found
 */
router.delete('/:id', deleteSong);


export default router;
