import type { Request, Response } from "express";
import urlModel from "../models/url.model.js";
import { generateShortCode } from "../utils/generateCode.js";

interface RedirectParams {
  code: string;
}

export async function shortenUrl(req: Request, res: Response) {
 const { url } = req.body;
 const code = generateShortCode();
 const urlDoc = new urlModel({originalUrl: url, code})

 await urlDoc.save();

 res.status(201).json({ shortUrl: `${process.env.API_BASE_URL}:${process.env.PORT}/${code}` });
}

export async function redirectUrl(req: Request<RedirectParams>, res: Response) {
 const { code } = req.params;

 const urlDoc = await urlModel.findOneAndUpdate(
    { code },
    { $inc: { clicks: 1 } }
  );

 if (!urlDoc) return res.status(404).json({ error: 'URL not found'});
 
 res.redirect(urlDoc.originalUrl);
}

export async function getAllUrls(req: Request, res: Response) {
  const urls = await urlModel.find().select("originalUrl code clicks createdAt").sort({ createdAt: -1 });
  res.json(urls);
}