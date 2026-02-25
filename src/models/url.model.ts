import mongoose, {Document, Schema} from "mongoose";

export interface IShortURL extends Document {
  originalUrl: string;
  code: string;
  clicks: number;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const expirySeconds = Number(process.env.URL_EXPIRY_SECONDS) || 0;

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
/*  Optional expiresAt mongoDB TTL (Time-To-Live) index
    specifies how long after the date the document should expire */
    expiresAt: {
      type: Date,
      default: () => expirySeconds > 0 ? new Date(Date.now() + expirySeconds * 1000) : undefined,
      index: expirySeconds > 0 ? { expires: expirySeconds } : false,
    }
  },
  {
    timestamps: true
  }
);

const urlModel = mongoose.model<IShortURL>("ShortURL", urlSchema);

export default urlModel;