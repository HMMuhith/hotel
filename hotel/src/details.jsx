import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,useLocation,useNavigate } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import {CHECKIN,CHECKOUT,CHILDCOUNT,ADULTCOUNT} from './searchSlice'
import DatePicker from 'react-datepicker'
import Title from './title'

function Details() {
  const {hotelid}=useParams()
  const [Details,setdetails]=useState()
const {user}=useSelector((store)=>store.auth)
  const {checkIn,checkOut,adultCount,childCount}=useSelector(state=>state.search)
  const [CheckIn,setCheckIn]=useState()
  const [CheckOut,setCheckOut]=useState()
  const [AdultCount,setadultcount]=useState(adultCount)
  const [Childcount,setchildcount]=useState(childCount)
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
const location=useLocation()
console.log(location)
const navigate=useNavigate()
  useEffect(()=>{
    const request=async()=>{
const Data= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotel/find/${hotelid}`)
const response=await Data.data
console.log(Data)
setdetails(response)
    }
    request()
  },[])

const dispatch=useDispatch()
  function submit(){
dispatch(CHECKIN(checkIn))
dispatch(CHECKOUT(CheckOut))
dispatch(CHILDCOUNT(Childcount))
dispatch(ADULTCOUNT(AdultCount))
navigate(`/booking/${hotelid}`)
  }
  return (
    <>
    <Title title={Details?.name} description={Details?.description}/>
    <div className=" ml-4 space-y-6">
          <div>
            <span className="flex">
              {[...Array(Details?.starRating).keys()].map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <h1 className="text-3xl font-bold">{Details?.name}</h1>
          </div>
    
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {Details?.photos?.map((image) => (
              <div className="h-[300px]">
                <img
                  src={image}
                  alt={Details?.name}
                  className="rounded-md w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
    
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            {Details?.facilities?.map((facility) => (
              <div className="border border-slate-300 rounded-sm p-3">
                {facility}
              </div>
            ))}
          </div>
    
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="whitespace-pre-line">{Details?.description}</div>
            <div className="h-fit">
              {/*                                            Guest Info             */}
              <div className="flex flex-col p-4 bg-blue-200 gap-4">
                    <h3 className="text-md font-bold">£{Details?.pricePerNight}</h3>
                    <form
                      onSubmit={ user? submit : navigate('/login')}
                    >
                      <div className="grid grid-cols-1 gap-4 items-center">
                        <div>
                          <DatePicker
                            required
                            selected={CheckIn}
                            onChange={(date) => setCheckIn(date)}
                            selectsStart
                            startDate={CheckIn}
                            endDate={CheckOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                          />
                        </div>
                        <div>
                          <DatePicker
                            required
                            selected={CheckOut}
                            onChange={(date) => setCheckOut(date)}
                            selectsStart
                            startDate={CheckIn}
                            endDate={CheckOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                          />
                        </div>
                        <div className="flex bg-white px-2 py-1 gap-2">
                          <label className="items-center flex">
                            Adults:
                            <input
                              className="w-full p-1 focus:outline-none font-bold"
                              type="number"
                              onChange={e=>setadultcount(e.target.value)}
                              min={1}
                              max={20}
                              
                            />
                          </label>
                          <label className="items-center flex">
                            Children:
                            <input
                              className="w-full p-1 focus:outline-none font-bold"
                              type="number"
                              onChange={e=>setchildcount(e.target.value)}
                              min={0}
                              max={20}
                             
                            />
                          </label>
                          
                        </div>
                        
                          <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                           {user? <div>Book Now</div> : <div>Please Login to book</div>}
                          </button>
                       
                      </div>
                    </form>
                  </div>

            </div>
          </div>
        </div>
    </>
  )
}

export default Details