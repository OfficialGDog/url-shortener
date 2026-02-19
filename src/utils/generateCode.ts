import { randomBytes } from "crypto";

export function generateShortCode(length = 7): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(length);

  let result = "";

/* One possible improvement would be avoiding modulo bias.
   Modulo maps 256 bytes to 62 chars, causing slight bias; fine for most uses. */
  for (const byte of bytes) {
    result += chars[byte % chars.length];
  }
  return result;
}
