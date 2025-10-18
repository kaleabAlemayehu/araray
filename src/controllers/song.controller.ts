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

