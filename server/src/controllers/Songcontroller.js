import {v2 as clodinary} from 'cloudinary'

import Songmodel from '../models/Songmodel.js';

export const addsongs= async (req,res)=>{
try {
   const {name,desc,album}=req.body;
    const audiofile=req.files.audio[0];
    const imagefile=req.files.image[0];
    // console.log(req.file);


    const audioUpload=await clodinary.uploader.upload(audiofile.path,{resource_type:"video"})

    const imageupload=await clodinary.uploader.upload(imagefile.path,{resource_type:"image"})

    const duration=`${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`

    // console.log(name,desc,audioUpload,imageupload,album);

    const songdata={
        name,
        desc,
        album,
        image:imageupload.secure_url,
        audio:audioUpload.secure_url,
        duration:duration
    }

    const song= Songmodel(songdata);
    await song.save();

    res.json({success:true,
        message:"song added"
    }).status(201);
   
} catch (error) {
    console.log("error in addsong",error);
}
}

 export const listsong= async (req,res)=>{
try {
    const allsongs=await Songmodel.find({})
    res.json(allsongs)
    // l
} catch (error) {
    console.log("error in list song ",error);
}
}


export const removesong=async(req,res)=>{
    try {
        await Songmodel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"song removed"})
    } catch (error) {
        console.log("error in remove", error);
    }
}

