import { Router } from "express";
import { shortenUrl, redirectUrl } from "../controllers/url.controller.js"
import { validateUrl } from "../middleware/validateUrl.middleware.js";

const router = Router();

router.post("/shorten", validateUrl, shortenUrl);
router.get("/:code", redirectUrl);

export default router;