import { index, show, destroy,storeReview } from "../controllers/movieController.js";
import express from "express";

const router = express.Router();

router.get("/", index);

router.get("/:id", show);

router.delete("/:id", destroy);

router.post('/reviews', storeReview);

export default router;
