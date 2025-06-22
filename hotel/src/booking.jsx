import React, { useEffect, useState, useMemo } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useElements, useStripe,CardElement, PaymentElement } from '@stripe/react-stripe-js'





function Booking() {
  const stripe = useStripe()
  const element = useElements()

  const { hotelid } = useParams()
 
  const {userinfo} =useSelector(store=>store.auth)
  const [Paymentdata, setPaymentData] = useState()

  const [Name, setName] = useState('')
  const [city, setcity] = useState('')
  const [email, setemail] = useState('')
  const [NumberofNights, setNumberofNights] = useState('')
  const { checkIn, checkOut, adultCount, childCount } = useSelector(store => store.search)
  const [HotelData, setHotelData] = useState()
  const [BookingData, setBookingData] = useState()

  const check_in=new Date(checkIn)
  const check_out=new Date(checkOut)
  const newcheckin=check_in.toDateString()
  const newcheckout=check_out.toDateString()

  useEffect(() => {
    if (checkIn && checkOut) {
      const Night = Math.abs(check_out?.getTime() - check_in?.getTime()) / (1000 * 60 * 60 * 24)
      setNumberofNights(Math.ceil(Night).toString())
    }
    console.log(NumberofNights)

  }, [checkIn, checkOut])

console.log(checkIn,checkOut)


  useEffect(() => {
    const func = async () => {
      try {
        const request = await axios(`${import.meta.env.VITE_BACKEND_URL}/hotel/${hotelid}/payment`, {
          method: 'post',
          data: {
            NumberofNights: NumberofNights.toString()
          },
          headers:{
            Authorization:userinfo.authorized_token
          }
          // withCredentials:true
        })
        const data = await request.data
        console.log(NumberofNights)
        console.log(data)
        setPaymentData(data)
      }
      catch (err) {
        console.log(err)
      }
    }

    func()
  }, [hotelid, NumberofNights])

    // const currentProfile= axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`,{
    //   withCredentials:true
    // })
//     const currentProfile= axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`)
// console.log(currentProfile)
  useEffect(() => {
    setName(userinfo.name)
    setcity(userinfo?.city)
    setemail(userinfo.email)
  }, [])
  useEffect(() => {

    const request = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotel/find/${hotelid}`)
      const data = await response.data

      setHotelData(data)


    }
    request()
  }, [hotelid])

  const navigate=useNavigate()
  const [processing, setprocessing] = useState(false)

  function Navigate(){
    if(processing===true){
      navigate('/mybooking')
    }
  }
  async function submit(e) {
    e.preventDefault()
    
    const formdata = new FormData()
    formdata.append('name', Name)
    formdata.append('email', email)
    formdata.append('adultCount', adultCount)
    formdata.append('childcount', childCount)
    formdata.append('checkIn', checkIn)
    formdata.append('checkOut', checkOut)
    formdata.append('totalCost', Paymentdata?.totalCost)
    formdata.append('paymentID', Paymentdata?.paymentID)
    formdata.append('hotelid', hotelid)
    try {
        
      const Request = await axios(`${import.meta.env.VITE_BACKEND_URL}/hotel/${hotelid}/booking`, {
        method:'post',
        data:formdata,
        headers:{
          'Content-Type':'application/json',
          Authorization:userinfo.authorized_token
        },
        // withCredentials:true
      })
      const response = await Request.data
      console.log(response)
    }
    
    catch (err) {
      console.log(err)
    }
    if (!stripe && !element) {
      return;
    }
    setprocessing(true)
    const { error, paymentIntent } = await stripe.confirmCardPayment(Paymentdata?.clientSecret,  {
      payment_method:{
        card:element.getElement(CardElement)
      }
    }
  )
  console.log(error)
  console.log(paymentIntent.status)
  if(paymentIntent.status==='succeeded'){
      
    setBookingData({...formdata,paymentID:paymentIntent.id})
      }
setprocessing(false)
  }
  console.log(Paymentdata)
  console.log(BookingData)


  return (
    <>
      <div className="grid md:grid-cols-[1fr_2fr]">

        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
                  <h2 className="text-xl font-bold">Your Booking Details</h2>
                  <div className="border-b py-2">
                    Location:
                    <div className="font-bold">{`${HotelData?.name}, ${HotelData?.city}, ${HotelData?.country}`}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      Check-in
                      <div className="font-bold"> {newcheckin}</div>
                    </div>
                    <div>
                      Check-out
                      <div className="font-bold"> {newcheckout}</div>
                    </div>
                  </div>
                  <div className="border-t border-b py-2">
                    Total length of stay:
                    <div className="font-bold">{NumberofNights} nights</div>
                  </div>

                  <div>
                    Guests{" "}
                    <div className="font-bold">
                      {adultCount} adults & {childCount} children
                    </div>
                  </div>
        </div>
        {/* <Elements stripe={stripePromise} options={{ clientSecret: Paymentdata?.clientSecret }} > */}
        {
          userinfo&&Paymentdata&&
         ( <form
            onSubmit={submit}
            className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
          >
            <span className="text-3xl text-sky-700 font-bold">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
              <label className=" text-sm font-bold flex-1" >
                Name :
                <input
                  className="mt-1 border border-zinc-300 rounded-lg w-full py-2 px-3 text-black  font-normal"
                  name='name'
                  type="text"
                  readOnly
                  value={Name}
                  onChange={e => setName(e.target.value)}
                />
              </label>
              <label className=" text-sm font-bold flex-1">
                Email
                <input
                  className="mt-1 border border-zinc-300 rounded-lg w-full py-2 px-3 text-black  font-normal"
                  name='email'
                  type="text"
                  readOnly
                  value={email}
                  onChange={e => setemail(e.target.value)}
                />
              </label>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Your Price Summary</h2>

              <div className="bg-slate-900 text-white p-4 rounded-md">
                <div className="font-semibold text-lg">
                  Total Cost: £{Paymentdata?.totalCost?.toFixed(2)}
                </div>
                <div className="text-xs">Includes taxes and charges</div>
              </div>
            </div>


            <h3 className="text-xl font-semibold"> Payment Details</h3>
         
            {/* <PaymentElement className='rounded border border-zinc-200 h-auto' /> */}
 <CardElement
          id="payment-element"
          className="border border-zinc-300 rounded-md p-2 text-sm"
        />


            <button
              disabled={processing || !stripe || !element}
              type="submit"
              className="bg-header text-white py-1.5 px-14 rounded cursor-pointer font-bold hover:bg-blue-500 text-md :bg-gray-500"
            >
              {processing ? <span >Processing...</span>  : <span>Confirm Booking</span>}
            </button>

          </form>
         )
}
       
      </div>

    </>
  )
}

export default Booking

