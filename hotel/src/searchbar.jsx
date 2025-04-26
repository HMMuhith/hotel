import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { DESTINATION,CHECKIN,CHECKOUT,CHILDCOUNT,ADULTCOUNT,CLEAR} from './searchSlice'
import { MdTravelExplore } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams} from 'react-router-dom'

function SearchBar() {

  const {destination,checkIn,checkOut,adultCount,childCount}=useSelector(state=>state.search)
    const [Destination,setdestination]=useState(destination)
    const [Checkin,setcheckin]=useState(checkIn)
    const [Checkout,setcheckout]=useState(checkOut)
    const [Childcount,setchildcount]=useState(adultCount  || 1)
    const [Adultcount,setadultcount]=useState(childCount)
    
const searchQ=new URLSearchParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
function submit(e){
    e.preventDefault()
dispatch(DESTINATION(Destination))
dispatch(CHECKIN(Checkin))
dispatch(CHECKOUT(Checkout))
dispatch(CHILDCOUNT(Childcount))
dispatch(ADULTCOUNT(Adultcount))
navigate(`/search`)
}

function clear(e){
  e.preventDefault()
  setdestination('')
  setcheckin('')
  setcheckout('')
  setchildcount('')
  setadultcount('')
  dispatch(CLEAR())
}


const minDate = new Date();
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
  <>
  <form 
        className=" p-3 bg-blue-500  shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
      >
        <div className="flex flex-row items-center flex-1 bg-white py-1 rounded px-2">
          <MdTravelExplore size={25} className="mr-2" />
          <input
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-none"
            value={Destination}
            name='destination'
            onChange={(event) => setdestination(event.target.value)}
          />
        </div>
  
        <div className="flex justify-center px-1 gap-2 ">
          <label className="px-2 bg-white rounded items-center flex">
            Adults:
            <input
              className="w-full  p-1 px-2 focus:outline-none font-bold"
              type="number"
              min={1}
              max={20}
              value={Adultcount}
              onChange={(event) => setadultcount(parseInt(event.target.value))}
            />
          </label>
          <label className="bg-white px-2 rounded items-center flex">
            Children:
            <input
              className="w-full py-1 px-2 focus:outline-none font-bold"
              type="number"
              min={0}
              max={20}
              value={Childcount}
              onChange={(event) => setchildcount(parseInt(event.target.value))}
            />
          </label>
        </div>
        <div>
          <DatePicker
            selected={Checkin}
            onChange={(date) => setcheckin(date)}
            selectsStart
            startDate={Checkin}
            endDate={Checkout}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="min-w-full bg-white py-1 rounded px-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <div>
          <DatePicker
            selected={Checkout}
            onChange={(date) => setcheckout(date)}
            selectsStart
            startDate={Checkin}
            endDate={Checkout}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-out Date"
            className="min-w-full bg-white px-2 py-1 rounded focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <div className="   flex justify-center h-8 ">
          <button onClick={submit} type='submit'  className="w-2/5 bg-zinc-800 flex justify-center items-center cursor-pointer rounded text-white h-full p-2 font-bold text-md hover:bg-zinc-900">
            Submit
          </button>
          <button onClick={clear} className="w-2/5 ml-5 rounded cursor-pointer bg-red-600 flex justify-center items-center text-white h-full p-2 font-bold text-md hover:bg-red-700">
            Clear
          </button>
        </div>
      </form>
  </>
  )
}

export default SearchBar