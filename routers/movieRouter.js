import {index, show} from '../controllers/movieController.js'
import express from "express";

const router = express.Router();


router.get('/', index);

router.get('/:id', show);

router.delete('/:id');


export default router;