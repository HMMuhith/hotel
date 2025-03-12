import express from 'express'
import Hotel from './HotelModel.js'
import { Auth } from './auth.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

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

router.post('/', upload.array('photos'), async (req, res) => {

    try {
        const hotel = new Hotel(
            {   
                user:req.user.id,
                photos: req?.files?.map(file => file.path),
                name: req.body.name,
                type: req.body.type,
                city: req.body.city,
                country: req.body.country,
                description: req.body.description,
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

router.get('/', Auth, async (req, res) => {
    try {
        const getHotel = await Hotel.find({})
        res.status(200).json(getHotel)
    }
    catch (err) {
        res.status(400).json({ Error: `${err}` })
    }
})

router.get('/find/:id', async (req, res) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    }
    catch (err) {
        res.status(400).json({ Error: `${err}` })
    }
})
router.get('/query', async (req, res) => {
    const cityquery = req.query.city.split(",")
    try {
        const list = await Promise.all(cityquery.map(city => {
            return Hotel.countDocuments({ city })
        }))
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedItems = await Hotel.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                type: req.body.type,
                city: req.body.city,
                address: req.body.address,
                desc: req.body.desc,
                photos: req?.file?.photos,
                rating: req.body.rating,
                rooms: req.body.rooms,
                cheapestPrice: req.body.cheapestPrice
            }
        }, { new: true })

        res.status(200).json(updatedItems)
    }
    catch {
        res.status(400).json({ error: `something went wrong` })
    }
})


router.get('/type', async(req,res)=>{
 try{
 const hotellist= await Hotel.countDocuments({type:'hotel'})
 const apartmentlist= await Hotel.countDocuments({type:'apartment'})
 const villalist= await Hotel.countDocuments({type:'villa'})
 const resortlist= await Hotel.countDocuments({type:'resort'})
 const cabinlist= await Hotel.countDocuments({type:'cabin'})

 res.status(200).json([
    {type:'hotel', count:hotellist},
{type:'apartment', count:apartmentlist},
{type:'villa', count:villalist},
{type:'resort', count:resortlist},
{type:'cabin', count:cabinlist}
 ])
}
catch (error){
res.status(400).json(error)
}
})

router.get('/check', async(req,res)=>{
    try {
        // const checkfeature= await Hotel.find(req.query).limit(2)
        const {min,max,...others}=req.query
        const checkfeature= await Hotel.find({...others,cheapestPrice:{$gt:min ||20, $lt:max ||500}})
        res.status(200).json(checkfeature)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
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