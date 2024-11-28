import mongoose from 'mongoose'


const bookingSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    floor: {
        type: String,
        required: true,
    },
    equipment: {
        type: String,
        enum: ['wheelchair','stretcher'],
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        enum: ['MON','TUE','WED','THU','FRI','SAT','SUN'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['booked','in-progress','completed'],
        default: 'booked',
    }
})

export const Booking = mongoose.model("Booking", bookingSchema)
