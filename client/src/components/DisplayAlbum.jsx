import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'

import { Playercontext } from '../context/Playercontext';
import { useState } from 'react';
import { useEffect } from 'react';
import { assets } from '../assets/frontend-assets/assets';

const DisplayAlbum = ({album}) => {
    const {id}=useParams();
    // console.log(id);
   const [albumsdata,setalbumsdata]=useState("")
    const {playwithid,albumdata,songsData}=useContext(Playercontext)

    useEffect(()=>{
        albumdata.map((item,index)=>{
            if(item._id===id){
                setalbumsdata(item)
            }
        })
    },[])
  return albumsdata ? (
    <>
    <Navbar/>
    <div className='mt-10 gap-8 flex flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded' src={albumsdata.image} alt="" />
        <div className='flex flex-col'>
                <p>Playlist</p>
                <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumsdata.name}</h2>
                <h4>{albumsdata.desc}</h4>
                <p className='mt-1 '>
                    <img className='inline-block w-5 mx-1' src={assets.spotify_logo} alt="" />
                    <b className='mx-3'>Spotify</b>
                    *1,32,458 likes
                    <b className='mx-3'>50 songs</b>
                    About 2 hr 30 min
                </p>
        </div>

    </div>
    <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
    <p><b className='mr-4'>Title</b></p>
    <p>Album</p>
    <p className='hidden sm:block'>Date Added</p>
    <img className='m-auto w-4' src={assets.clock_icon} alt="" />
    </div>
    <hr />
    {
        songsData.filter((item)=>item.album===album.name).map((item,index)=>(
            <div onClick={()=>playwithid(item._id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] cursor-pointer hover:bg-[#ffffff2b] '>
                <p className='text-white flex' >
                    <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                    <img className='inline   w-10 mr-5' src={item.image} alt="" />
                    {item.name }
                </p>
                <p className='text-[15px]'>
                    {albumdata.name}
                </p>
                <p className='text-[15px] hidden sm:block'>5 days ago</p>
                <p className='text-[15px] text-center'>{item.duration}</p>
            </div>
        ))
    }
    </>
  ):null
}

export default DisplayAlbum