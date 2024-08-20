import {v2 as clodinary} from 'cloudinary'
import albummodel from '../models/Albummodel.js';


export const addalbum=async(req,res)=>{
    try {
       
        const {name,desc,bgcolor}=req.body;
        const imagefile=req.file;
        // console.log(imagefile);

        const imageupload=await clodinary.uploader.upload(imagefile.path,{resource_type:"image"});

        const albumdata={
            name,
            desc,
            bgcolor,
            image:imageupload.secure_url
        }

        const album=albummodel(albumdata);

        await album.save();

        res.json({success:true,message:"addalbum sucess"}).status(201);


    } catch (error) {
        console.log("error in add",error);
    }
}

export const listalbum=async(req,res)=>{
    try {
        const allalbums=await albummodel.find({});

        res.status(201).json({message:true,allalbums});
    } catch (error) {
        console.log("error in list",error);
    }
}

export const removealbum=async(req,res)=>{
    try {
        await albummodel.findByIdAndDelete(req.body.id)
        res.json({message:"success true"})
    } catch (error) {
        console.log("error in remove",error);
    }
}