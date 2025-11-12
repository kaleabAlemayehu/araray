import { Request, Response } from 'express';
import Playlist, { IPlaylist } from '../models/playlist.model';
import Song from '../models/song.model';

export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const playlist: IPlaylist = new Playlist(req.body);
    await playlist.save();
    res.status(201).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getPlaylists = async (req: Request, res: Response) => {
  try {
    const playlists = await Playlist.find().populate('songs');
    res.status(200).send(playlists);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getPlaylistById = async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    if (!playlist) {
      return res.status(404).send();
    }
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addSongToPlaylist = async (req: Request, res: Response) => {
  try {
    const { playlistId, songId } = req.params;
    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);

    if (!playlist || !song) {
      return res.status(404).send({ message: 'Playlist or Song not found' });
    }

    if (playlist.songs.includes(songId as any)) {
      return res.status(409).send({ message: 'Song already in playlist' });
    }

    playlist.songs.push(song._id);
    await playlist.save();
    res.status(200).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const removeSongFromPlaylist = async (req: Request, res: Response) => {
  try {
    const { playlistId, songId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).send({ message: 'Playlist not found' });
    }

    playlist.songs = playlist.songs.filter(
      (song) => song.toString() !== songId
    );
    await playlist.save();
    res.status(200).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!playlist) {
      return res.status(404).send();
    }
    res.status(200).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) {
      return res.status(404).send();
    }
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send(error);
  }
};
