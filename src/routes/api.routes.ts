import { Router } from "express";
import { getAllUrls, shortenUrl } from "../controllers/url.controller.js"
import { validateUrl } from "../middleware/validateUrl.middleware.js";

const router = Router();

router.post("/shorten", validateUrl, shortenUrl);
router.get("/urls", getAllUrls);

export default router;