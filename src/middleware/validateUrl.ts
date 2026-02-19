import type { Request, Response, NextFunction } from "express";
import { isValidHttpUrl } from "../utils/url.js";

/* validateUrl middleware: only allows URLs starting with http:// or https://
next() is called only if the URL is valid. */
export function validateUrl(req: Request, res: Response, next: NextFunction) {
  const { url } = req.body;

  if (!url || !isValidHttpUrl(url)) {
    return res.status(400).json({  error: "Invalid URL" });
  }

  next();
}