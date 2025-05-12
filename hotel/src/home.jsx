import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Title from './title'

function Home() {
const [Hotel,setHotel]=useState([])

useEffect(()=>{
  const Request=async()=>{
    const httpRequest=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotel`,{
      withCredentials:true
    })
    const response=await httpRequest.data
    console.log(response)
    setHotel(response)
  }
  Request()
},[])
const topframeHotel=Hotel?.slice(0,2) || []
const bottomframeHotel=Hotel?.slice(2) || []

console.log(topframeHotel)
console.log(bottomframeHotel)
  return (
    <>
    <Title title='Hotel' />
    {/* <div className='relative w-svw h-svh text-black '> */}
    <div className="space-y-3">
      <h2 className="text-3xl font-bold ml-2">Latest Destinations</h2>
      <p className='ml-2 '>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
   {topframeHotel?.map((hotel)=>(
<Link
      to={`/details/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.photos[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-slate-800 opacity-70 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {hotel.name}
        </span>
      </div>
    </Link>
   ))
  
   }
   </div>
   <div className="grid md:grid-cols-3 gap-4">

   {bottomframeHotel?.map((hotel)=>(
<Link
      to={`/details/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.photos[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4  bg-slate-800 opacity-70 w-full rounded-b-md">
        <span className="text-white  font-bold tracking-tight text-3xl">
          {hotel.name}
        </span>
      </div>
    </Link>
   ))
  
   }
   </div>
    </div>
    </div>
    </>
  )
}

export default Home