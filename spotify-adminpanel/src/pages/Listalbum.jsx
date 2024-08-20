import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { assets } from '../assets/admin-assets/assets';

const Listalbum = () => {

    const[data,setdata]=useState([]);

        const fetchsongs=async()=>{
            try {
                const res=await axios.get(`${url}/api/album/listalbum`)
                if(res.data){
                    setdata(res.data.allalbums)
                }
                // console.log(res.data.allalbums);
                
            } catch (error) {
                console.log("error in listalbum",error);
            }
        }

        useEffect(()=>{
                fetchsongs();
        },[])


        const removealbum=async(id)=>{
            try {
                const res=await axios.post(`${url}/api/album/removealbum`,{id})
                if(res.data){
                  await  fetchsongs();
                }
            } catch (error) {
                
            }
        }
    
  return (
    <div>
        <p>All album list</p>
        <br />
        <div className='sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 text-sm bg-gray-600 p-3 border-2 border-gray-200 text-white  '>
            <p>Image</p>
            <p>Name</p>
            <p>desc</p>
            <p>album color</p>
            <p>Action</p>
        </div>
        {
            data.map((item,index)=>{
                return (
                  <div key={index} className='grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 text-sm bg-gray-400 p-3 border-2 border-gray-200 text-white '>
                    <img className='w-12' src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.desc}</p>
                    <input type="color" value={item.bgcolor} />
                    <img onClick={()=>removealbum(item._id)} className='w-8 cursor-pointer' src={assets.trash} alt="" />
                  </div>  
                )
            })
        }
    </div>
  )
}

export default Listalbum