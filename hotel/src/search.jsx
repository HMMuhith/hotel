import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { AiFillStar } from 'react-icons/ai'
import { facilities ,hotelTypes} from './hoteltypes'

function Search() {
  const searchQ = new URLSearchParams()
  const [HotelData, setHoteldata] = useState()
  const { destination, checkIn, checkOut, childCount, adultCount, } = useSelector(state => state.search)
  const [page, setpage] = useState(1)
  const [starRating, setstarRating] = useState([])
  const [pricePerNight, setpricePerNight] = useState()
  const [Facilities, setFacilities] = useState([])
  const [sort, setsort] = useState()
  const [type, setType] = useState([])
  

  
  searchQ.append('destination', destination || '')
  
  searchQ.append('checkIn', checkIn || '')
  
  searchQ.append('checkOut', checkOut || '')
  searchQ.append('childCount', childCount || '')
  searchQ.append('adultCount', adultCount || '')
  searchQ.append('page', page || '')
  Facilities?.forEach(facility =>
        searchQ.append('facilities', facility )
      )
    type?.forEach(type => {
          searchQ.append('type', type)
      
        }
      )
        starRating?.forEach(star => {
            searchQ.append('starRating', star)
          })
        
        searchQ.append('sort', sort ||'')

        searchQ.append('pricePerNight',pricePerNight || '')
 
useEffect(()=>{
  const request = async()=>{ 
    // 
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotel/search?${searchQ}`)
      
      const data = await response.data
      setHoteldata(data)
  }
    
request()

},[searchQ])

const pagenumber=[]
for (let i=1;i<=HotelData?.highestpage;i++){
  pagenumber.push(i)
}

  // const Submit=async(e)=>{
  //   e.preventDefault()
  //   const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotel/search?${searchQ}`)
      
  //   const data = await response.data
  //   setHoteldata(()=>data)
  // }
  
  

  return (
    <>
    <form >
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
          <div className="space-y-5">
          
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
            </h3>



            {/* starating */}

            <div className="border-b border-slate-300 pb-5">
              <h4 className="text-md font-semibold mb-2">Property Rating</h4>
              {["5", "4", "3", "2", "1"].map((star,index) => (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded"
                    key={index}
                    value={star}
                    checked={starRating?.includes(star)}
                  onChange={(e)=>
                    setstarRating(prev=>{
                      return  e.target.checked? [...prev,e.target.value] : prev.filter(star=>star !== e.target.value)
                  })}
                  />
                  <span>{star} Stars</span>
                </label>
              ))}
            </div>


            {/* hoteltypes */}

            <div className="border-b border-slate-300 pb-5">
              <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
              {hotelTypes.map((hotelType,index) => (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded"
                    value={hotelType}
                    key={index}
                    checked={type?.includes(hotelType)}
                    onChange={e=>{
                      setType(prev=>{
                      return e.target.checked? [...prev, e.target.value] : prev.filter(Type=> Type!== e.target.value)
                    })
                }
                  }
                  />
                  <span>{hotelType}</span>
                </label>
              ))}
            </div>


            {/* facilitiestype */}

            <div className="border-b border-slate-300 pb-5">
              <h4 className="text-md font-semibold mb-2">Facilities</h4>
              {facilities.map((facility,index) => (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded"
                    value={facility}
                    key={index}
                    checked={Facilities.includes(facility)}
                    onChange={e=>{
                      setFacilities(prev=>{
                      return e.target.checked ? [...prev,e.target.value] : prev.filter(facility=>facility !== e.target.value)
                    })
                  }}
                  />
                  <span>{facility}</span>
                </label>
              ))}
            </div>
            {/* pricefilter */}

            <div>
              <h4 className="text-md font-semibold mb-2"> Max Price</h4>
              <select
                className="p-2 border rounded-md w-full"
                value={pricePerNight}
                onChange={(event) =>
                {
                  setpricePerNight(event.target.value)
                  
                }
                }
              >
                <option value="">Select Max Price</option>
                {[50, 100, 200, 300, 500].map((price,index) => (
                  <option key={index} value={price}>{price}</option>
                ))}
              </select>
            </div>

          </div>
        </div>
        <div className="flex flex-col gap-5 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              {HotelData?.totalHotels}{`${HotelData?.totalHotels >1? ' Hotels':' Hotel'}  found`}
              {destination ? ` in ${destination}` : ""}
            </span>
            <select
              value={sort}
              onChange={(event) => setsort(event.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Sort By</option>
              <option value="starRating top">Star Rating</option>
              <option value="price low to high">
                Price Per Night (low to high)
              </option>
              <option value="price high to low">
                Price Per Night (high to low)
              </option>
            </select>
          </div>

          {HotelData?.hotels?.map((hotel,index) => (
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
              <div className="w-full h-[300px]">
                <img
                  src={hotel.photos[0]}
                  key={index}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                  <div className="flex items-center">
                    <span className="flex">
                      {[...Array(hotel.starRating)].map((star, i) => (
                        <AiFillStar key={i} className="fill-yellow-400" />
                      ))}
                    </span>
                    <span className="ml-1 text-sm">{hotel.type}</span>
                  </div>
                  <Link
                    to={`/details/${hotel._id}`}
                    className="text-2xl font-bold cursor-pointer"
                  > 
                    {hotel.name}
                  </Link>
                </div>

                <div>
                  <div className="line-clamp-4">{hotel.description}</div>
                </div>

                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                  <div className="flex gap-1 items-center">
                    {hotel.facilities.slice(0, 3).map((facility,index) => (
                      <span key={index} className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                        {facility}
                      </span>
                    ))}
                    <span key={index} className="text-sm">
                      {hotel.facilities.length > 3 &&
                        `+${hotel.facilities.length - 3} more`}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span key={index}
                   className="font-bold">£{hotel.pricePerNight} per night</span>
                    <Link
                      to={`/details/${hotel._id}`}
                      className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}


          <div className="flex justify-center">
            <ul className="flex gap-2">
              {pagenumber.map((number) => (
                <li className={`px-2 py-1 rounded cursor-pointer ${HotelData?.pageNumber === number ? "bg-zinc-800 text-white" : "bg-slate-300 text-black"}`}>
                 
                  <button className='cursor-pointer' onClick={(e) =>{
                    e.preventDefault()
                     setpage(number)
                  }
                     }>{number}</button>
                  
                </li>
              ))}
            </ul>
          </div>

          <div>


          </div>
        </div>
      </div>
      <div className=' ml-16 mt-2'>
      <button className='bg-blue-600 cursor-pointer text-white py-2 px-8 rounded' >Search</button>
      </div>
          </form>
    </>
  )
}

export default Search