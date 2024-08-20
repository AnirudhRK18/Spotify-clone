import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import Displayhome from './Displayhome'
import DisplayAlbum from './DisplayAlbum'

import { useContext } from 'react'
import { Playercontext } from '../context/Playercontext'

const Display = () => {

  const{albumdata}=useContext(Playercontext)

    const ref=useRef();
   
    const location=useLocation();
    // console.log(location);
    const isalbum=location.pathname.includes("album")
    const albumid=isalbum?location.pathname.split('/').pop():"";
    // console.log(albumdata);
    console.log(albumid);
    const bgcolor=isalbum && albumdata.length>0?albumdata.find((x)=>(x._id==albumid)).bgcolor:"#121212";
    console.log(bgcolor);


    useEffect(()=>{
            if(isalbum){
                ref.current.style.background=`linear-gradient(${bgcolor},#121212)`
            }
            else{
                 ref.current.style.background=`#121212`;
            }
    })
    
    
  return (
    <div ref={ref} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      {
        albumdata.length>0?(<Routes>
        <Route path='/' element={<Displayhome/>}/>
        <Route path='/album/:id' element={<DisplayAlbum album={albumdata.find((x)=>(x._id==albumid))}/>}/>
    </Routes>):null
      }
        
    </div>
  )
}

export default Display