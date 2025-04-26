import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { hotelTypes } from './hoteltypes'
import { facilities } from './hoteltypes'
import axios from 'axios'


function EditHotel() {

  const { hotelid } = useParams()


  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [description, setDecription] = useState('')
  const [type, setType] = useState([])
  const [childCount, setChildcount] = useState('')
  const [adultCount, setAdultcount] = useState('')
  const [pricePerNight, setPricepernight] = useState('')
  const [starRating, setstarRating] = useState('')
  const [photos, setPhotos] = useState([])
  const [facility, setfacility] = useState([])


  // console.log(facility)


  useEffect(() => {
    const request = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotel/find/${hotelid}`)
      const data = await response.data




      setName(data?.name)
      setCity(data?.city)
      setCountry(data?.country)
      setDecription(data?.description)
      setType(data?.type[0])
      setChildcount(data?.childCount)
      setAdultcount(data?.adultCount)
      setPricepernight(data?.pricePerNight)


      console.log(data)
    }
    request()

  }, [])



  const formdata = new FormData()


  const submit = async (e) => {
    e.preventDefault()
    try {
      formdata.append('name', name)
      formdata.append('city', city)
      formdata.append('country', country)
      formdata.append('description', description)
      formdata.append('childCount', childCount)
      formdata.append('adultCount', adultCount)
      formdata.append('pricePerNight', pricePerNight)
      formdata.append('type', type)
      formdata.append('starRating', starRating)


      for (let i = 0; i < photos?.length; i++) {
        formdata.append('photos', photos[i])
      }



      facility?.forEach(item => {
        formdata.append('facilities', item)
      })

      const req = await axios.put(`http://127.0.0.1:7000/booking/${hotelid}`, formdata, {
        withCredentials: true
      })
      console.log(req)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <form className='flex flex-col gap-10' onSubmit={submit} >
        <div className='flex flex-col gap-4 p-3'>
          <h2 className='text-3xl font-bold ml-2 mb-3'>Add Hotel</h2>
          <label className='p-3  font-semibold' htmlFor="name" >
            Name
            <input type="text" className='border rounded w-[60rem] ml-14 py-1 px-2 font-normal' name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className='p-3 font-semibold' htmlFor="country" >
            Country
            <input type="text" className='border rounded w-[60rem] ml-10 py-1 px-2 font-normal' name="country" id="country" value={country} onChange={e => setCountry(e.target.value)} />
          </label>
          <label className='p-3 font-semibold' htmlFor="city" >
            City
            <input type="text" className='border rounded  py-1 px-2 font-normal w-[60rem] ml-18' onChange={e => setCity(e.target.value)} value={city} name="city" id="city" />
          </label>
          <label className='p-3 font-semibold' htmlFor="description" >
            Description

            <textarea className='resize-none border rounded  py-1 px-2 font-normal w-[60rem] ml-4' value={description} onChange={e => setDecription(e.target.value)} name="description" id="description" rows={3}></textarea>
          </label>
          <label htmlFor="price" className=' p-3  text-sm font-semibold '>
            Price per night <input type="number" className='w-[60rem] ml-1 border rounded  py-1 px-2 font-normal' min={1} name="pricePerNight" value={pricePerNight} onChange={e => setPricepernight(e.target.value)} id="price" />
          </label>
          <label htmlFor="starRating" className=' p-3 text-sm font-semibold ' >
            Rating
            <select name="starRating" className='border rounded ml-16 p-2 bg-zinc-200 font-normal w-[27rem]' id="starRating" onChange={e => setstarRating(e.target.value)} value={starRating} >
              <option key={0} value="">Select rating</option>
              {[...Array(1, 2, 3, 4, 5)].map((num, index) => {
                return (

                  <option key={index + 1} value={num}>{num}</option>

                )
              })
              }
            </select>
          </label>


          <h2 className='mb-2.5 ml-2 font-extrabold text-xl'>Type</h2>
          <div className='grid grid-cols-5 ml-2 gap-2'>

            {hotelTypes.map((item, index) => (
              <>
                <div className='border border-black flex px-2 justify-center items-center hover:bg-blue-300 active:bg-blue-600 rounded-full font-semibold h-14'>
                  <label htmlFor={index} className='w-24 flex justify-center items-center cursor-pointer rounded-2xl'>
                    <input type="radio" id={index} key={index} name="type" onChange={e => { console.log(e); return setType(prev=>{return e.target.checked?[e.target.value]:prev.filter(type=>type!==e.target.value)}) }} value={item} className='hidden ' />
                    <span id={index} className='py-2  px-2 flex justify-center items-center ' >{item}</span>
                  </label>

                </div>
              </>
            ))}
          </div>
          <div className='ml-2' >
            <h1 className='text-2xl font-bold mb-3'>Facilities</h1>
            <div className='grid grid-cols-5 gap-3 ml-4'>
              {facilities.map((item, index) => {
                return <>

                  <label className="text-sm flex gap-1 text-gray-700">
                    <input type="checkbox" key={index} name="facilities" className=' text-black font-bold text-xl' onChange={e => setfacility(prev => {
                      return e.target.checked === true ? [...prev, e.target.value] : prev.filter(item => item !== e.target.value)
                    })} value={item} />
                    <span className='font-semibold'>{item}</span>
                  </label>
                </>
              })}
            </div>
          </div>
          <div>
            <h2 className='text-2xl font-bold mb-3 ml-2'>Guest</h2>
            <div className='grid grid-cols-2 p-6 gap-5  '>
              <label htmlFor="adult" className='text-gray-700  font-semibold'>
                Adults
                <input type='number' className='border rounded w-full py-2 px-3 font-normal' name="adultCount" value={adultCount} onChange={e => setAdultcount(e.target.value)} min={1} />
              </label>
            
            
              <label htmlFor="child" className='text-gray-700  font-semibold'>
                Children
                <input type='number' className='border rounded w-full py-2 px-3 font-normal' name="childCount" value={childCount} onChange={e => setChildcount(e.target.value)} min={1} />
              </label>
            </div>
          </div>
          <div className='text-2xl font-bold mb-3'>
            <h2 className='text-2xl font-bold mb-3 ml-2'>Image </h2>
            <div className='rounded flex flex-col gap-4 p-4'>
              <input type="file" className='cursor-pointer file:cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-blue-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white' name="photos" onChange={e => {
                console.log(e.target.files); console.log(e.target.value);
                return setPhotos(e.target.files)
              }} accept='image/*' multiple />

            </div>
          </div>
          {/* <DetailsHotel/>
           <TypeSection/>
           <Facilities/>
           <ImageUpload/> */}
          <div className='ml-4'>
            <button type="submit" className='rounded px-3 py-2 bg-blue-700 text-white cursor-pointer'>Update</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default EditHotel