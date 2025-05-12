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
                    <h2 className='p-3 font-IBM text-sky-700  decoration-zinc-800 underline underline-offset-8 text-3xl font-bold mb-3'>Add Hotel</h2>
                <div className='flex flex-col border border-zinc-300 w-5xl rounded m-auto gap-4'>
                    <label className='text-gray-700 p-3 text-sm font-bold flex-1' htmlFor="name" >
                        Name
                        <input type="text" className='border border-zinc-300 rounded  ml-17 w-[42.4rem] py-1 pl-4 font-normal' name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label htmlFor="country"  className='text-gray-700 p-3 text-sm font-bold flex-1'>
                        Country
                        <input type="text" name="country" id="country" className='border border-zinc-300 rounded w-[42.4rem] ml-13 py-1  font-normal' value={country} onChange={e => setCountry(e.target.value)} />
                    </label>
                    <label htmlFor="city"  className='text-gray-700 p-3 text-sm font-bold flex-1'>
                        City
                        <input className='border border-zinc-300 rounded  py-1 px-2 font-normal w-[42.4rem] ml-20' type="text" onChange={e => setCity(e.target.value)} value={city} name="city" id="city" />
                    </label>
                    <div className='flex w-[60rem] justify-start'>
                    <label htmlFor="description" className='text-gray-700 p-3 block mt-2.5 text-sm font-bold '>
                        Description
                         </label>
                        <textarea  className=' resize-none border border-zinc-300 rounded ml-[1.1rem] font-normal ' value={description} cols={90} onChange={e => setDecription(e.target.value)} name="description" id="description" rows={3}></textarea>
                        </div>
                 
                    <label htmlFor="price" className='p-3 text-sm font-semibold'>
                        Price per night <input className='  border border-zinc-300 rounded w-[42.4rem] py-1 px-2 ml-2 font-normal' type="number" min={1} name="pricePerNight" value={pricePerNight} onChange={e => setPricepernight(e.target.value)} id="price" />
                    </label>
                    <label htmlFor="starRating" className='p-3 text-sm font-semibold'>
                        Rating <select className='border-none rounded ml-15 p-1 bg-zinc-200 font-normal w-[27rem]' name="starRating" id="starRating" value={starRating} onChange={e => setstarRating(e.target.value)} >
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
                    <h2 className='text-3xl font-IBM font-bold mb-3 ml-2.5 text-sky-700 underline p-3 underline-offset-8 decoration-zinc-800'>Type</h2>
                    <div className='grid grid-cols-3 place-items-center gap-2 p-3 border border-zinc-300 rounded-lg m-auto w-4xl ' key='2'>

                        {hotelTypes?.map((item, index) => (
                            <>
                                <div className='border border-zinc-400 cursor-pointer h-14  flex w-[10rem] justify-center items-center hover:bg-blue-300 active:bg-blue-600 rounded-full font-semibold '>
                                    <label htmlFor={index} className=' flex justify-center cursor-pointer items-center  rounded-2xl'>
                                        <input type="radio" key={index} id={index} name="type" onChange={e => {console.log(type);return setType(prev=>{ return e.target.checked? [e.target.value] : prev.filter(item=>item!==e.target.value) })} } value={item} className='hidden ' />
                                        <span id={index} className=' flex justify-center items-center' >{item}</span>
                                    </label>

                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div >
                    <h1 className='text-3xl p-3 font-bold mb-3 text-sky-700 underline ml-2.5 decoration-zinc-800 decoration-3 underline-offset-8'>Facilities</h1>
                    <div className='grid grid-cols-5 gap-3 ml-5 border border-zinc-300 rounded-lg'>
                        {facilities?.map((item, index) => {
                            return <>

                                <label htmlFor='item' className='text-sm flex gap-1 text-gray-700 p-3'>
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
                    <h2 className='text-3xl font-IBM ml-6 text-sky-700 underline underline-offset-8 decoration-3 decoration-zinc-800 font-bold mb-6'>Guest</h2>
                    <div className='grid grid-cols-2 p-6 gap-5 border ml-5 rounded-lg border-zinc-300'>
                        <label htmlFor='adult' className='text-gray-700 p-3  font-semibold'>
                            Adults
                            <input name='adultCount' type='number' id='adult' className='border border-zinc-400 rounded w-full py-2 px-3 font-normal' value={adultCount} onChange={e => setAdultcount(e.target.value)} min={1} />
                        </label>

                        
                            <label htmlFor="child" className='text-gray-700 p-3  font-semibold'>
                                Children
                                <input type='number' id='child' name='childCount' className='border border-zinc-400 rounded w-full py-2 px-3 font-normal' value={childCount} onChange={e => setChildcount(e.target.value)} min={1} />
                            </label>
                  
                    </div>
               </div>

                    <div className='text-2xl font-bold mb-3'>
                                        <h2 className='text-3xl font-bold mb-6 ml-6 text-sky-700 underline underline-offset-8 decoration-zinc-800 decoration-3'>Image </h2>
                                        <div className='border border-zinc-300 rounded-lg ml-5 p-4 flex flex-col gap-4'>
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
                <div className='ml-5'>
                    <button type="submit" className='rounded px-3 py-2 bg-blue-700 text-white cursor-pointer'>Save</button>
                </div>

            </form>
        </>
    )
}

export default Hotelform
