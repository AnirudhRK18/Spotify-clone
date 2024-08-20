import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin-assets/assets'
import axios, { Axios } from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';


const Addsong = () => {
    const[image,setimage]=useState(false);
    const[song,setsong]=useState(false);
    const[name,setname]=useState("");
    const[desc,setdesc]=useState("");
    const[album,setalbum]=useState("none");
    const[loading,setloading]=useState(false);
    const[albumdata,setalbumdata]=useState([]);


    const onsubmithandler=async(e)=>{
        e.preventDefault();
        setloading(true);
        try {

            const formdata=new FormData();

            formdata.append("name",name);
            formdata.append("desc",desc);
            formdata.append("image",image);
            formdata.append("audio",song);
            formdata.append("album",album);

            // console.log(formdata);

            const res=await axios.post(`${url}/api/song/add`,formdata)

            if(res.data.success){
                
                setname("");
                setdesc("");
                setalbum("");
                setimage(false);
                setsong(false);
                setloading(false);
            
            
            }
            else{
                toast.error("song not added")
                setloading(false);
            }

            
        } catch (error) {
            console.log("error in onsubmit add song",error);
            setloading(false);
        }



    }


    const listalbum=async()=>{
        try {
            const res=await axios.get(`${url}/api/album/listalbum`)
            if(res.data.allalbums){
                setalbumdata(res.data.allalbums);
            }
        } catch (error) {
            console.log("in list album");
        }
    }


    useEffect(()=>{
        listalbum();
    },[])


  return loading ?(
    <div className='grid place-items-center min-h-[80vh]'>
            <div className='h-16 w-16  place-self-center border-4 border-gray-400 border-t-green-500 rounded-full animate-spin'>

            </div>
    </div>
  ) : (
    
<form onSubmit={onsubmithandler} className='flex flex-col items-start gap-8 text-gray-700' action="">
    <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
            <p>upload song</p>
            <input onChange={(e)=>setsong(e.target.files[0])} type="file" name="" accept='audio/*' hidden id="song" />
            <label htmlFor="song">
                <img className='w-24 cursor-pointer' src={ song? assets.upload_added:assets.upload_song} alt="" />
            </label>
        </div>
        <div className='flex flex-col gap-4'>
            <p>upload image</p>
            <label htmlFor="image">
                <img className='w-24 cursor-pointer' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                <input onChange={(e)=>setimage(e.target.files[0])} type="file" hidden id='image'  accept='image/*' />
            </label>
        </div>
    </div>

    <div className='flex flex-col gap-2.5'>
        <p>song name</p>
        <input onChange={(e)=>setname(e.target.value)} value={name} className='bg-transparent outline-green-600 border-2 border-gray-600 p-2 w-[max(40vw,250px)]' placeholder='Type Here' type="text" required />

    </div>
    <div className='flex flex-col gap-2.5'>
        <p>song Description</p>
        <input onChange={(e)=>setdesc(e.target.value)} value={desc} className='bg-transparent outline-green-600 border-2 border-gray-600 p-2 w-[max(40vw,250px)]' placeholder='Type Here' type="text" required />

    </div>
    <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select onChange={(e)=>setalbum(e.target.value)} defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-800 p-2.5 w-[150px]' name="" id="">
            <option value="none">None</option>
            {
               albumdata.map((item,index)=>{
                     return (
                        <option key={index} value={item.name}>{item.name}</option>
                     )
                })
            }
        </select>

    </div>

    <button type='submit' className='text-base bg-black text-white px-14 py-2.5 cursor-pointer'>Add</button>
</form>
  )
}

export default Addsong