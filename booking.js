import express from 'express'
import Hotel from './HotelModel.js'
import { Auth } from './auth.js'

const router=express.Router()

router.get('/',Auth, async(req,res)=>{
    try {
        const hotels=await Hotel.find({
            bookings:{$elemMatch:{userId:req.user.id}}
      
        }) 

       const response= hotels?.map((hotel)=>{
        const bookings=hotel.bookings?.filter((booking)=>{
            return booking?.userId===req.user?.id
        }) 

        const userBookings={
            ...hotel.toObject(),
            bookings
        } 
        return userBookings
       })

       res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:`${error} unable to fetching booking`})
    }
})

export default router