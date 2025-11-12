import { Schema, model, Document } from 'mongoose';

export interface IPlaylist extends Document {
  name: string;
  description?: string;
  songs: Schema.Types.ObjectId[];
}

const playlistSchema = new Schema<IPlaylist>(
  {
    name: { type: String, required: true },
    description: { type: String },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  },
  { timestamps: true }
);

export default model<IPlaylist>('Playlist', playlistSchema);
