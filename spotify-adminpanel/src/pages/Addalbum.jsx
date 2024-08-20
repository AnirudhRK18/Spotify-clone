import React, { useState } from 'react'
import { assets } from '../assets/admin-assets/assets'
import { url } from '../App'
import axios from 'axios'

const Addalbum = () => {


    const[image,setimage]=useState(false)
    const[color,setcolor]=useState("#ffffff")
    const[name,setname]=useState("");
    const[desc,setdesc]=useState("")
    const[loading,setloading]=useState(false)



    const submithandler=async(e)=>{
            e.preventDefault();
            setloading(true);

            try {
                const formdata=new FormData();
                formdata.append("name",name);
                formdata.append("desc",desc);
                formdata.append("bgcolor",color);
                formdata.append("image",image);

                const res=await axios.post(`${url}/api/album/addalbum`,formdata)

                if(res.data){
                   setname("");
                   setdesc("");
                   setimage("");
                   
                }
               
            } catch (error) {
                console.log("error in add album",error);
            }
            setloading(false);
    }
  return loading ?(
    <div className='grid place-items-center min-h-[80vh]'>
            <div className='h-16 w-16  place-self-center border-4 border-gray-400 border-t-green-500 rounded-full animate-spin'>

            </div>
    </div>
  ) : (
   <form onSubmit={submithandler} className='flex flex-col items-start gap-8' action="">
    <div className='flex flex-col gap-4'>
            <p>Upload image</p>
            <input onChange={(e)=>setimage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
            <label htmlFor="image">
                <img className='w-24 cursor-pointer' src={image? URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
    </div>

    <div className='flex flex-col gap-2.5'>
        <p>Album Name</p>
        <input onChange={(e)=>setname(e.target.value)} value={name} className='bg-transparent outline-green-600 p-2.5 w-[300px] border-2 border-gray-900 ' type="text" placeholder='Type Here' />
    </div>

    <div className='flex flex-col gap-2.5'>
        <p>Album Desc</p>
        <input onChange={(e)=>setdesc(e.target.value)} value={desc} className='bg-transparent outline-green-600 p-2.5 w-[300px] border-2 border-gray-900 ' type="text" placeholder='Type Here' />
    </div>

    <div className='flex flex-col gap-2.5'>
        <p>Background Color</p>
        <input onChange={(e)=>setcolor(e.target.value)} value={color} type="color" />

    </div>

    <button className='text-white bg-black px-14 py-3 ' type='submit'>Add</button>
   </form>
  )
}

export default Addalbum