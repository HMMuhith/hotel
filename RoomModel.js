import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel'
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomnumbers: [{
        number: Number,
        unavaibleDates: {
            type: [Date]
        }
    }]
})

const Room = mongoose.model('room', RoomSchema)

export default Room