import { Router } from 'express';
import {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  updatePlaylist,
  deletePlaylist,
} from '../controllers/playlist.controller';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: The playlists managing API
 */

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Playlist'
 *     responses:
 *       201:
 *         description: The playlist was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Some error occurred
 */
router.post('/', createPlaylist);

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Returns the list of all the playlists
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: The list of the playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 */
router.get('/', getPlaylists);

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     summary: Get the playlist by id
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The playlist id
 *     responses:
 *       200:
 *         description: The playlist description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: The playlist was not found
 */
router.get('/:id', getPlaylistById);

/**
 * @swagger
 * /playlists/{playlistId}/songs/{songId}:
 *   post:
 *     summary: Add a song to a playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: string
 *         required: true
 *         description: The playlist id
 *       - in: path
 *         name: songId
 *         schema:
 *           type: string
 *         required: true
 *         description: The song id
 *     responses:
 *       200:
 *         description: The song was added to the playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: The playlist or song was not found
 *       409:
 *         description: The song is already in the playlist
 */
router.post('/:playlistId/songs/:songId', addSongToPlaylist);

/**
 * @swagger
 * /playlists/{playlistId}/songs/{songId}:
 *   delete:
 *     summary: Remove a song from a playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: string
 *         required: true
 *         description: The playlist id
 *       - in: path
 *         name: songId
 *         schema:
 *           type: string
 *         required: true
 *         description: The song id
 *     responses:
 *       200:
 *         description: The song was removed from the playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: The playlist was not found
 */
router.delete('/:playlistId/songs/:songId', removeSongFromPlaylist);

/**
 * @swagger
 * /playlists/{id}:
 *   put:
 *     summary: Update the playlist by the id
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The playlist id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Playlist'
 *     responses:
 *       200:
 *         description: The playlist was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: The playlist was not found
 *       400:
 *         description: Some error occurred
 */
router.put('/:id', updatePlaylist);

/**
 * @swagger
 * /playlists/{id}:
 *   delete:
 *     summary: Remove the playlist by id
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The playlist id
 *     responses:
 *       200:
 *         description: The playlist was deleted
 *       404:
 *         description: The playlist was not found
 */
router.delete('/:id', deletePlaylist);

export default router;
