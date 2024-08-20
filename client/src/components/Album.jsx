import React from 'react'
import { useNavigate } from 'react-router-dom'

const Album = ({image,name,desc,id}) => {

    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/album/${id}`)} className='min-w-[180px] items-center justify-center p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded w-[320px] h-[320px]' src={image} alt="" />
        <p className='font-bold mt-2 mb-2'>{name}</p>
        <p className='font-bold text-sm text-slate-200 mt-2 mb-2'>{desc}</p>

    </div>
  )
}

export default Album