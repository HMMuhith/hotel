import express from 'express'
import Hotel from './HotelModel.js'
import { Auth } from './auth.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'
import Stripe from 'stripe'


dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Hotel',
        allowedFormats: ['jpg', 'png', 'jpeg']
    },


})
  
const upload = multer({ storage })
const router = express.Router()

router.post('/', Auth, upload.array('photos'), async (req, res) => {

    try {
        const hotel = new Hotel(
            {   
                userId:req.user.id,
                photos: req?.files?.map(file => file.path),
                name: req.body.name,
                type: req.body.type,
                city: req.body.city,
                country: req.body.country,
                description: req.body.description,
                facilities: req.body.facilities,
                starRating: req.body.starRating,
                childCount: req.body.childCount,
                adultCount:req.body.adultCount,
                pricePerNight: req.body.pricePerNight
            })

        const saveHotel = await hotel.save()
        res.status(200).json(saveHotel)
    }
    catch (error) {
        return res.status(400).json({ error: `failed to book` + error })
    }
})


const stripe=new Stripe(process.env.STRIPE_API_KEY)

router.post('/:hotelid/payment',Auth, async(req,res)=>{

    try{ 
    const NumberofNights=req.body.NumberofNights
    const userId=req.user.id
    const hotelid=req.params.hotelid
    const hotel =await Hotel.findById(hotelid)
    const totalCost=hotel.pricePerNight*NumberofNights

    const payment= await stripe.paymentIntents.create({
        currency:'USD',
amount:totalCost*100, 
metadata:{
    hotelid, 
    userId 
}
    }) 
if(!payment.client_secret){
   return res.status(500).json({error:`Creating payment failed`})
}


const response={
    paymentID:payment.id,
    clientSecret:payment.client_secret.toString(),
    totalCost
}

res.status(200).json(response)
}
catch(error){
    console.log(error)
    res.status(400).json({error:`${error} seen here`})
} 
}
)

router.post('/:hotelid/booking',Auth, async(req,res)=>{
    try {
       const paymentID=req.body.paymentID
const payment=await stripe.paymentIntents.retrieve(paymentID)
if(!payment){
   return res.status(400).json({message:'payment intent not found'})
}

if(payment.metadata.hotelid !== req.params.hotelid){
return res.status(400).json({message:`payment intent mismatch`})
}

// if(payment.status!=='succeeded'){
//     return res.status(400).json({message:`Payment not succeeded`, status:`${payment.status}`})   
// }

console.log(payment.status)


const booking={
    userId:req.user.id,
    name:req.body.name,
email: req.body.email,
adultCount:req.body.adultCount,
childcount :req.body.childCount,
checkIn:req.body.checkIn,
checkOut:req.body.checkOut,
totalCost: req.body.totalCost,
paymentID:payment.id

}



const updateBooking= await Hotel.findByIdAndUpdate(req.params.hotelid,{
    $push:{bookings:booking}
},{new:true})
if(!updateBooking){
    return res.status(400).json({message:`Hotel not found`})
}
await updateBooking.save()
res.status(200).json({Bookingupdated:updateBooking})
 

    } catch (error) {
        res.status(500).json({message:`${error} found`})
    } 
}) 

router.get('/',  async (req, res) => {
    try {
        const getHotel = await Hotel.find({}).sort('-lastUpdated')
        res.status(200).json(getHotel)
    } 
    catch (err) { 
        res.status(400).json({ Error: `${err}` })
    }
})
  
router.get('/find/:hotelid',async (req, res) => {
    try {
        const getHotel = await Hotel.findById(req.params.hotelid)
        res.status(200).json(getHotel)
    }
    catch (err) {
        res.status(400).json({ Error: `${err}` })
    }
})

router.get('/publish', async(req,res)=>{
    try {
        res.send({
            publish_key:process.env.STRIPE_PUBLISH_KEY
        })
    } catch (error) { 
        res.status(400).json({error})
    }
})
 


router.get('/search',async(req,res)=>{
const pageNumber=parseInt(req.query.page? req.query.page.toString() : 1)
const hotels_perpage=5
const skippages=(pageNumber-1) * hotels_perpage
const destination=req.query.destination?{$or:[{city: new RegExp(req.query.destination, 'i')},{country: new RegExp(req.query.destination,'i')}]}:''
  
  const  adultCount=req.query.adultCount?{adultCount:{$gte:parseInt(req.query.adultCount)}}:''
  const  childCount=req.query.childCount?{childCount:{$gte:parseInt(req.query.childCount)}}:''
   const facilities=req.query.facilities? {facilities:{$all:Array.isArray(req.query.facilities)?req.query.facilities :[req.query.facilities]}} :''
   const type=req.query.type? {type:{$in:Array.isArray(req.query.type)?req.query.type:[req.query.type]}} : ''
// const type=req.query.type?{type:{$exists:true}}:''
const pricePerNight=req.query.pricePerNight?{pricePerNight:{$lte:parseInt(req.query.pricePerNight).toString()}}:''
const starRating=req.query.starRating?{starRating:Array.isArray(req.query.starRating)?req.query.starRating.map(star=>parseInt(star)):parseInt(req.query.starRating).toString()} : ''


let sorting={}
try{
switch(req.query.sort){
    case 'starRating top':
        sorting={starRating:-1}
        break;
    case 'price low to high':
        sorting={pricePerNight:1} 
        break;
    case 'price high to low':
        sorting={pricePerNight:-1}
        break;
}
// const query={$or:[{city:'Rangpur', country:'Bangladesh'}]}
const query={...destination,...childCount,...pricePerNight,...adultCount,...facilities,...type,...starRating}
  

const hotels= await Hotel.find(query).sort(sorting).skip(skippages).limit(hotels_perpage)
const totalHotels=await Hotel.countDocuments(query)
const highestpage=Math.ceil(totalHotels/hotels_perpage)
res.status(200).json({hotels,pageNumber,highestpage,totalHotels,})
}
catch(error){
    res.status(400).json(error)
}
})


router.put('/:hotelid', Auth, upload.array('photos'), async (req, res) => {
    try {
        const updatedItems = await Hotel.findByIdAndUpdate(req.params.hotelid, {
            $set: {
                userId:req.user.id,
                name: req.body.name, 
                type: req.body.type,
                country:req.body.country,
                city: req.body.city,
                address: req.body.address,
                description: req.body.description,
                photos:req?.files?.map(file => [...file.path || null]),
                starRating: req.body.starRating,
                childCount: req.body.childCount,
                adultCount:req.body.adultCount,
                pricePerNight: req.body.pricePerNight,
                facilities:req.body.facilities
            }
        }, { new: true })

        res.status(200).json(updatedItems)
    }
    catch (err){
        res.status(400).json({ error: `${err}` })
    }
})






router.delete('/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: `deleted id successfully` })
    }
    catch {
        res.status(400).json({ error: `something went wrong` })

    }
})


export default router 