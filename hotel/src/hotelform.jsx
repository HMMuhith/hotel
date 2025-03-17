import React, { useEffect, useRef, useState } from 'react'
import { facilities } from './hoteltypes'
import { hotelTypes } from './hoteltypes'
import axios from 'axios'

function Hotelform() {
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDecription] = useState('')
    const [type, setType] = useState('')
    const [childCount, setChildcount] = useState('')
    const [adultCount, setAdultcount] = useState('')
    const [pricePerNight, setPricepernight] = useState('')
    const [starRating, setstarRating] = useState('')
    const [photos, setPhotos] = useState([])
    const [facility, setfacility] = useState([])

    const [error, setError] = useState('')
    const formdata = new FormData()
    const checkref = useRef()


    console.log(type)



    async function submit(e) {
        e.preventDefault()
        formdata.append('name', name)
        formdata.append('city', city)
        formdata.append('country', country)
        formdata.append('desc', description)
        formdata.append('childCount', childCount)
        formdata.append('adultCount', adultCount)
        formdata.append('pricePerNight', pricePerNight)
        formdata.append('type', type)
        for (let i = 0; i < photos.length; i++) {
            formdata.append('photos', photos[i])
        }



        facility.forEach(item => {
            formdata.append('facilities', item)
        })

    const request = await axios.post(`http://127.0.0.1:7000/booking`, formdata,{ withCredentials:true })
    const data = await request.data
    console.log(data)

        
    }
    return (
        <>
            <form onSubmit={submit}>
                <h2>Add Hotel</h2>
                <label htmlFor="name" name='name'>
                    Name
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label htmlFor="country" name='country'>
                    Country
                    <input type="text" name="country" id="country" value={country} onChange={e => setCountry(e.target.value)} />
                </label>
                <label htmlFor="city" name='city'>
                    City
                    <input type="text" onChange={e => setCity(e.target.value)} value={city} name="city" id="city" />
                </label>
                <label htmlFor="description" name='description'>
                    Description

                    <textarea className='resize-none' value={description} onChange={e => setDecription(e.target.value)} name="desc" id="description" rows={10}></textarea>
                </label>
                <label htmlFor="price">
                    Price per night <input type="number" min={1} name="pricePerNight" value={pricePerNight} onChange={e => setPricepernight(e.target.value)} id="price" />
                </label>
                <label htmlFor="starRating">
                    Rating <select name="starRating" id="starRating" value={starRating} onChange={e => setstarRating(e.target.value)} >
                        <option value="">Select rating</option>
                        {[...Array(1, 2, 3, 4, 5)].map(num => {
                            return (

                                <option value="num">{num}</option>
                            )
                        })
                        }
                    </select>
                </label>
                <h2 className='mb-2.5 font-extrabold text-xl'>Type</h2>
                <div className='grid grid-cols-5 gap-2'>

                    {hotelTypes.map((item,index) => (
                        <>
                            <div className='hover:bg-blue-300 flex px-2 justify-center items-center rounded-full font-semibold active:bg-blue-600'>
                                <label htmlFor={`${index}`} className='w-24 flex justify-center items-center'>
                                    <input type="radio" id={`${index}`} name="type" onChange={e => { console.log(e); return setType(e.target.value) }} value={item} className='hidden px-2' />
                                    <span id={`${index}`}  name='type'>{item}</span>
                                </label>

                            </div>
                        </>
                    ))}
                </div>
                <div >
                    <h1>Facilities</h1>
                    <div className='w-svw border border-zinc-300 flex justify-around items-center h-24'>
                        {facilities.map((item,index) => {
                            return <>

                               
                                    <input type="checkbox" id={`${index}`} ref={checkref} name='facilities' className='text-black font-bold text-xl' onChange={e => {
                                        return e.target.checked === true ? setfacility([...facility, e.target.value]) : ''
                                    }} value={item} />
                                    <span>{item}</span>
                              
                                <span>{error ? error : ''}</span>

                            </>
                        })}
                    </div>
                </div>
                <div>
                    <h2>Guest</h2>
                    <div className='grid grid-cols-2 p-6 gap-5 bg-green-200'>
                        <label htmlFor="">
                            Adults
                            <input type='number' value={adultCount} onChange={e => setAdultcount(e.target.value)} min={1} />
                        </label>
                    </div>
                    <div className='grid grid-cols-2 p-6 gap-5 bg-green-200'>
                        <label htmlFor="">
                            Children
                            <input type='number' value={childCount} onChange={e => setChildcount(e.target.value)} min={1} />
                        </label>
                    </div>
                </div>
                <div className='text-2xl font-bold mb-3'>
                    <h2>Image </h2>
                    <div className='rounded bg-neutral-400 flex flex-col gap-4p-4'>
                        <input type="file" className='w-full font-normal ' name="photos" onChange={e => {
                            console.log(e.target.files); console.log(e.target.value);
                            return setPhotos(e.target.files)
                        }} id="" accept='image/*' multiple />
                        <span className='text-red-500'>{error ? error : ''}</span>
                    </div>
                </div>
                {/* <DetailsHotel/>
   <TypeSection/>
   <Facilities/>
   <ImageUpload/> */}
                <div>
                    <button type="submit" className='px-3 py-2 bg-blue-700 text-white'>Save</button>
                </div>

            </form>
        </>
    )
}

export default Hotelform
