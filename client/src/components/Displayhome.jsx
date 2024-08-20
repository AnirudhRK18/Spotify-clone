import React from 'react'
import Navbar from './Navbar'

import Album from './Album'
import Songitem from './Songitem'
import { useContext } from 'react'
import { Playercontext } from '../context/Playercontext'

const Displayhome = () => {

  const {songsData,albumdata}=useContext(Playercontext)
  return (
    <>
    <Navbar/>
    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured charts</h1>
        <div className='flex overflow-auto '>
        {
            albumdata.map((item,index)=>(<Album key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))
        }

        </div>
      
    </div>

    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Todays Biggest hit</h1>
        <div className='flex overflow-auto '>
        {
           songsData.map((item,index)=>(<Songitem key={index} name={item.name} desc={item.desc} id={item._id} img={item.image}/>))
        }

        </div>
      
    </div>
    </>
  )
}

export default Displayhome