import React, { useContext } from 'react'
import { Playercontext } from '../context/Playercontext'

const Songitem = ({img,id,desc,name}) => {
    const {playwithid}=useContext(Playercontext)
  return (
    <div onClick={()=>playwithid(id)} className='min-w-[180px] rounded p-2 px-3 cursor-pointer hover:bg-[#ffffff26]'>
        <img src={img} alt="" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='font-bold text-sm mt-2 mb-1'>{desc}</p>

    </div>
  )
}

export default Songitem