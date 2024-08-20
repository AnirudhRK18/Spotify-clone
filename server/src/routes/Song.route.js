import {addsongs,listsong, removesong} from '../controllers/Songcontroller.js'

import express from 'express';
import upload from '../middlewares/multer.js';


const router=express.Router();


router.post("/add",upload.fields([{name:"image",maxCount:1},{name:"audio",maxCount:1}]),addsongs);
router.get("/listsong",listsong);
router.post("/removesong",removesong)


export default router;