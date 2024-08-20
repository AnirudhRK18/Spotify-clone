import mongoose, { mongo } from "mongoose";

const Songschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: { type: String, required: true },
  album: { type: String, required: true },
  image: { type: String, required: true },
  audio:{type:String,required:true},
  duration:{type:String,required:true}
},);


const Songmodel=mongoose.model("song",Songschema)

export default Songmodel;
