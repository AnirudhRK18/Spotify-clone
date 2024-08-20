import express from 'express';
import { addalbum, listalbum, removealbum } from '../controllers/Albumcontroller.js';
import upload from '../middlewares/multer.js';

const router=express.Router();


router.post("/addalbum",upload.single("image"),addalbum);
router.get("/listalbum",listalbum);
router.post("/removealbum",removealbum)


export default router;