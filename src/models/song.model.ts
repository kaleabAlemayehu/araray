import { Schema, model, Document } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const songSchema = new Schema<ISong>(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ISong>('Song', songSchema);
