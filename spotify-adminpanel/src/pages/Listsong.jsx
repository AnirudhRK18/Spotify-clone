import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { assets } from '../assets/admin-assets/assets';
import { toast } from 'react-toastify';

const Listsong = () => {

    const [songs,setsongs]=useState([]);


    const fetchsongs=async()=>{
        try {
            const res= await axios.get(`${url}/api/song/listsong`)
            console.log(res.data);

        if(res.data){
            setsongs(res.data);
        }
        else{
            toast.error("something is wrong")
        }
        } catch (error) {
            console.log("error in ");
        }
        
    }

    const removesong=async(id)=>{
        try {
            const res=await axios.post(`${url}/api/song/removesong`,{id})

            if(res.data){
                
                await fetchsongs();
            }
        } catch (error) {
            console.log("error in remove song");
        }
    }




    useEffect(()=>{ 
        fetchsongs();
    },[])
  return (
    <div>
        <p>All sings list</p>
        <br />
        <div>
            <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border-2 border-gray-600 text-sm mr-3 bg-gray-500  '>
                    <p>Image</p>
                    <p>Name</p>
                    <p>album</p>
                    <p>Duration</p>
                    <p>Action</p>
            </div>
            {
                songs.map((item,index)=>{
                    return (
                        <div className='grid sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3  border-2 border-gray-600 text-sm mr-3  ' key={index}>
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.album}</p>
                            <p>{item.duration}</p>
                            <img onClick={()=>removesong(item._id)} className='w-4 h-4 cursor-pointer ' src={assets.trash} alt="" />
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Listsong