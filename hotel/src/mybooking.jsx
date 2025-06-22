import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

export const MyBooking = () => {
    const [Hotel,setHotel]=useState()
    const {userinfo}=useSelector(store=>store.auth)
    if(userinfo){
    useEffect(()=>{
        const Request =async()=>{
            // const req=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/booking`,{
            //    withCredentials:true
            // })
            const req=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/booking`,{
              headers:{
                Authorization:userinfo?.authorized_token 
              }
            })
            const data=await req.data
            console.log(data)
            setHotel(data)
        }
        Request()
        console.log(userinfo)
    },[userinfo.authorized_token])
  }
if(!userinfo){
  return <div className='w-[36rem] font-IBM font-bold text-pink-900 py-12 m-auto border border-slate-300 rounded-md bg-zinc-100 flex justify-center items-center mt-10 mb-9'>Please <Link to={'/login'} className='px-2 text-blue-400'>Log in</Link> to book your hotel</div>
}
    if(!Hotel || Hotel?.length===0){
        return <div className='w-[36rem] font-IBM font-bold text-pink-900 py-12 m-auto border border-slate-300 rounded-md bg-zinc-100 flex justify-center items-center mt-10 mb-9'>No Hotel found. </div>
    }
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {Hotel?.map((hotel) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotel?.photos[0]}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {hotel?.name}
              <div className="text-xs font-normal">
                {hotel?.city}, {hotel?.country}
              </div>
            </div>
            {hotel?.bookings?.map((booking) => (
              <div>
                <div>
                  <span className="font-bold mr-2">Dates: </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Guests:</span>
                  <span>
                    {booking?.adultCount} adults, {booking?.childCount} children
                  </span>
                </div>
              </div>
            )) }
          </div>
        </div>
      ))}
    </div>
  )
}
