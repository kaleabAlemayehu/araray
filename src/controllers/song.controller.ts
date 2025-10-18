import { Request, Response } from 'express';
import Song, { ISong } from '../models/song.model';

export const createSong = async (req: Request, res: Response) => {
  try {
    // TODO: validate the request body and upload the music file    
    const song: ISong = new Song(req.body);
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find();
    res.status(200).send(songs);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getSongById = async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).send();
    }
    res.status(200).send(song);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!song) {
      return res.status(404).send();
    }
    res.status(200).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).send();
    }
    res.status(200).send(song);
  } catch (error) {
    res.status(500).send(error);
  }
};

