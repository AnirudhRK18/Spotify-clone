import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import songrouter from './src/routes/Song.route.js'
import albumrouter from './src/routes/Album.route.js'
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/Clodinary.js';

const app=express();
dotenv.config();

const port=8080;

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    
    credentials:true
    
}))
connectCloudinary();


app.use("/api/song",songrouter)
app.use("/api/album",albumrouter)




app.get("/",(req,res)=>{
    console.log("api working");
})

app.listen(port,()=>{
    console.log(`server listning on port ${port}`);
    connectDB();
})