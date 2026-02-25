import urlModel from "../models/url.model.js";
import { generateShortCode } from "../utils/generateCode.js";

export async function createShortUrl(originalUrl: string) {
  const MAX_ATTEMPTS = 5;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const code = generateShortCode();
      return await urlModel.create({ originalUrl, code });
    } catch (err: any) {
      if (err.code === 11000) {
        continue; // only retry for duplicate code
      }
      throw err;
    }
  }

  throw new Error("Failed to generate unique short code");
}