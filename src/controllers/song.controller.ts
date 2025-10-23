import { Request, Response } from 'express';
import Song, { ISong } from '../models/song.model';
import s3 from '../config/s3';
import { S3 } from 'aws-sdk';
import path from 'path';

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
    const { genre } = req.query;
    let query = {};
    if (genre) {
      query = { genre: genre as string };
    }
    const songs = await Song.find(query);
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

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist').countDocuments();
    const totalAlbums = await Song.distinct('album').countDocuments();
    const totalGenres = await Song.distinct('genre').countDocuments();

    const songsInGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);

    const songsByArtist = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
    ]);

    const albumsByArtist = await Song.aggregate([
      { $group: { _id: '$artist', albums: { $addToSet: '$album' } } },
      { $project: { _id: 1, count: { $size: '$albums' } } },
    ]);

    const songsInAlbum = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
    ]);

    res.status(200).send({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsInGenre,
      songsByArtist,
      albumsByArtist,
      songsInAlbum,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};



export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const params: S3.PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: `${req.file?.fieldname}-${Date.now()}${path.extname(req.file?.originalname || '.mp3')}` || '',
        Body: req.file?.buffer as S3.Body,
      };

      s3.upload(params, (err: any, data: any) => {
        if (err) {
          res.status(400).send(err);
        }
        res.status(200).send({ audioUrl: data.Location });
      });
    } else {
      res.status(200).send({ audioUrl: `${process.env.HOST}/music/${req.file?.filename}` });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
