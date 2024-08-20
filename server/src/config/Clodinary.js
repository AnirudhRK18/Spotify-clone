import {v2 as clodinary} from 'cloudinary';



const connectCloudinary=async(req,res)=>{
   try {
    await clodinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_secret:process.env.CLOUD_SECRET_KEY,
        api_key:process.env.CLOUD_API_KEY
    })
    // console.log("connect successful clodinary");
   } catch (error) {
    console.log("error in clodinary");
   }
}

export default connectCloudinary