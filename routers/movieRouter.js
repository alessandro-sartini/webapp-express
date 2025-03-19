import { index, show, destroy,storeReview,storeMovie } from "../controllers/movieController.js";
import express from "express";
import upload from'../middlewares/multer.js'
const router = express.Router();

router.get("/", index);

router.get("/:id", show);

router.delete("/:id", destroy);

router.post('/reviews', storeReview);

router.post('/', upload.single('image'), storeMovie);

export default router;
