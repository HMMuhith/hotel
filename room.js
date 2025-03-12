import express from 'express'
import Room from './RoomModel.js'
import Hotel from './HotelModel.js'

const router = express.Router()

router.post('/:hotelid', async (req, res) => {
    try {
                        const saveroom = new Room({
                            title: req.body.title,
                            price: req.body.price,
                            maxPeople: req.body.maxPeople,
                            desc: req.body.desc,
                            roomnumbers: req.body.roomnumbers
                        })
        const result = await saveroom.save()
        try {
             await Hotel.findByIdAndUpdate(req.params.hotelid, { $push: { rooms: saveroom._id } })

        } catch (error) {
            res.status(400).json(error)
        }

      return  res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({ error: `${error}` })
    }
})

router.get('/reservedroom', async (req, res) => {
    try {
        const rooms = await Room.find({})
        res.status(200).json(rooms)
    }
    catch {
        res.status(400).json({ error: `something went wrong` })
    }
})

router.put('/updateroom/:hotelID', async (req, res) => {
    try {
        const user = await Room.findByIdAndUpdate(req.params.hotelID, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                maxPeople: req.body.maxPeople,
                desc: req.body.desc,
                roomnumbers: req.body.roomnumbers
            }
        }, { new: true })
        res.status(200).json({ success: `updated successfully`, user })
    }
    catch {
        res.status(400).json({ error: `something went wrong` })
    }

})

router.delete('/:hotelID/:roomid', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.roomid)
        try {
            await Hotel.findByIdAndUpdate(req.params.roomid,{ $pull:{rooms:req.params.hotelID} })
        } catch (error) {
            
        }
        res.status(200).json({ success: `deleted successfully` })
    } catch (error) {
        res.status(400).json(error)
    }
})

export default router