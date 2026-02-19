import mongoose, {Document, Schema} from "mongoose";

export interface IShortURL extends Document {
  originalUrl: string;
  code: string;
  clicks: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const urlSchema = new Schema<IShortURL>(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true
  }
);

const urlModel = mongoose.model<IShortURL>("ShortURL", urlSchema);

export default urlModel;