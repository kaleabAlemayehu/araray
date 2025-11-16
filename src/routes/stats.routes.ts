import { Router } from 'express';
import { getStats } from '../controllers/song.controller';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: The stats API
 */

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get statistics about the song library
 *     tags: [Stats]
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
 *                 totalPlaylists:
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
router.get('/', getStats);

export default router;

