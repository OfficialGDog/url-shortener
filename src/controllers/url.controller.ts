import type { Request, Response } from "express";
import type { UrlMap } from "../types/url.js";
import { generateShortCode } from "../utils/generateCode.js";

interface RedirectParams {
  code: string;
}

const urlDatabase: UrlMap = {test: 'https://www.google.com/'};

export function shortenUrl(req: Request, res: Response) {
 const { url } = req.body;

 const code = generateShortCode();

 urlDatabase[code] = url;

 res.status(201).json({ shortUrl: `${process.env.BASE_URL}:${process.env.PORT}/api/${code}` });
}

export function redirectUrl(req: Request<RedirectParams>, res: Response) {
 const { code } = req.params;

 const url = urlDatabase[code];

 if (!url) return res.status(404).json({ error: 'URL not found'});
 
 res.redirect(url);
}