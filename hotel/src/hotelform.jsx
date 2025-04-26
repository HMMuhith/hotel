import React, {  useRef, useState } from 'react'
import { facilities } from './hoteltypes'
import { hotelTypes } from './hoteltypes'
import axios from 'axios'

function Hotelform() {
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

    const [error, setError] = useState('')
    const formdata = new FormData()
    const checkref = useRef()


    


    formdata.append('name', name)
    formdata.append('city', city)
    formdata.append('country', country)
    formdata.append('description', description)
    formdata.append('childCount', childCount)
    formdata.append('adultCount', adultCount)
    formdata.append('pricePerNight', pricePerNight)
    // formdata.append('type', type)
    
    formdata.append('starRating', starRating)
    for (let i = 0; i < photos.length; i++) {
        formdata.append('photos', photos[i])
    }


    formdata.append('type',type[0])

    formdata.get('type')
    facility.forEach(item => {
       
        formdata.append('facilities', item)
    })

    async function submit(e) {
        e.preventDefault()

        const request = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/hotel`, formdata, { withCredentials: true })
        const data = await request.data
        console.log(data)


    }

    function deleteHandler(e,imagurl){
        e.preventDefault()
        photos?.filter(url=> url!==imagurl)
    }
    return (
        <>
            <form onSubmit={submit} className='flex flex-col gap-10 p-6'>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-3xl font-bold mb-3'>Add Hotel</h2>
                    <label className='text-gray-700 text-sm font-bold flex-1' htmlFor="name" >
                        Name
                        <input type="text" className='border rounded w-[60rem] ml-17 py-1 px-2 font-normal' name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label htmlFor="country"  className='text-gray-700 text-sm font-bold flex-1'>
                        Country
                        <input type="text" name="country" id="country" className='border rounded w-[60rem] ml-13 py-1 px-2 font-normal' value={country} onChange={e => setCountry(e.target.value)} />
                    </label>
                    <label htmlFor="city"  className='text-gray-700 text-sm font-bold flex-1'>
                        City
                        <input className='border rounded  py-1 px-2 font-normal w-[60rem] ml-20' type="text" onChange={e => setCity(e.target.value)} value={city} name="city" id="city" />
                    </label>
                    <label htmlFor="description" className='text-gray-700 text-sm font-bold flex-1'>
                        Description

                        <textarea className=' resize-none border rounded  py-1 px-2 font-normal w-[60rem] ml-7' value={description} onChange={e => setDecription(e.target.value)} name="description" id="description" rows={3}></textarea>
                    </label>
                    <label htmlFor="price" className=' text-sm font-semibold'>
                        Price per night <input className='w-[60rem]  border rounded  py-1 px-2 ml-2 font-normal' type="number" min={1} name="pricePerNight" value={pricePerNight} onChange={e => setPricepernight(e.target.value)} id="price" />
                    </label>
                    <label htmlFor="starRating" className='text-sm font-semibold'>
                        Rating <select className='border rounded ml-15 p-1 bg-zinc-200 font-normal w-[27rem]' name="starRating" id="starRating" value={starRating} onChange={e => setstarRating(e.target.value)} >
                            <option value="" className='text-sm font-bold'>Select rating</option>
                            {[...Array(1, 2, 3, 4, 5)].map((num, index) => {
                                return (

                                    <option key={index + 1}  value={num}>{num}</option>
                                )
                            })
                            }
                        </select>
                    </label>
                </div>
                <div>
                    <h2 className='text-2xl font-bold mb-3'>Type</h2>
                    <div className='grid grid-cols-5 gap-2' key='2'>

                        {hotelTypes?.map((item, index) => (
                            <>
                                <div className='border border-black flex px-2 justify-center items-center hover:bg-blue-300 active:bg-blue-600 rounded-full font-semibold h-14'>
                                    <label htmlFor={index} className='w-24 flex justify-center items-center cursor-pointer rounded-2xl'>
                                        <input type="radio" key={index} id={index} name="type" onChange={e => {console.log(type);return setType(prev=>{ return e.target.checked? [e.target.value] : prev.filter(item=>item!==e.target.value) })} } value={item} className='hidden px-2' />
                                        <span id={index} className='py-2  px-2 flex justify-center items-center' >{item}</span>
                                    </label>

                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div >
                    <h1 className='text-2xl font-bold mb-3'>Facilities</h1>
                    <div className='grid grid-cols-5 gap-3 ml-4'>
                        {facilities?.map((item, index) => {
                            return <>

                                <label htmlFor='item' className='text-sm flex gap-1 text-gray-700'>
                                    <input type="checkbox" key={index} id='item' ref={checkref} name='facilities' className='cursor-pointer text-black font-bold text-xl' onChange={e => setfacility(prev=> {
                                        return e.target.checked? [...prev,e.target.value] : prev.filter(faci=> faci !== e.target.value)
                                    })} value={item} />
                                    <span className='font-semibold'>{item}</span>


                                </label>
                            </>
                        })}
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl font-bold mb-3 ml-2'>Guest</h2>
                    <div className='grid grid-cols-2 p-6 gap-5 '>
                        <label htmlFor='adult' className='text-gray-700  font-semibold'>
                            Adults
                            <input name='adultCount' type='number' id='adult' className='border rounded w-full py-2 px-3 font-normal' value={adultCount} onChange={e => setAdultcount(e.target.value)} min={1} />
                        </label>

                        
                            <label htmlFor="child" className='text-gray-700  font-semibold'>
                                Children
                                <input type='number' id='child' name='childCount' className='border rounded w-full py-2 px-3 font-normal' value={childCount} onChange={e => setChildcount(e.target.value)} min={1} />
                            </label>
                  
                    </div>
               </div>

                    <div className='text-2xl font-bold mb-3'>
                                        <h2 className='text-2xl font-bold mb-3'>Image </h2>
                                        <div className=' rounded p-4 flex flex-col gap-4'>
                                            <input type="file" className='cursor-pointer file:ml-1 file:cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-blue-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white' name="photos" onChange={e => {
                                                console.log(e.target.files); console.log(e.target.value);
                                                return setPhotos(e.target.files)
                                            }} id="" accept='image/*' multiple />
                                            {/* <div className='grid grid-cols-6 gap-4'>
                                                { photos?.map(url=>(

                                                      <div className="relative group">
                                                      <img src={url} className="min-h-full object-cover" />
                                                      <button
                                                        onClick={deleteHandler}
                                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                                                      >
                                                        Delete
                                                      </button>
                                                    </div>
                                                )

                                                )}
                                            </div> */}
                                        </div>
                                            
                    </div>
               
                {/* <DetailsHotel/>
   <TypeSection/>
   <Facilities/>
   <ImageUpload/> */}
                <div className='ml-4'>
                    <button type="submit" className='rounded px-3 py-2 bg-blue-700 text-white cursor-pointer'>Save</button>
                </div>

            </form>
        </>
    )
}

export default Hotelform
