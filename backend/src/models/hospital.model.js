import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    floors: {
        type: Number,
        required: true,
    },
    guidingMaps: [{
        type: String,
        required: true,
    }],
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }],
    nurses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nurse'
    }],
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    imageUrl: {
        type: String,
        required: true,
    },
    floorEquipment: [{
        floorNumber: {
            type: String,
            required: true,
        },
        wheelchairs: {
            type: Number,
            default: 9
        },
        stretchers: {
            type: Number,
            default: 9,
        }
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}, {timestamps: true})

export const Hospital = mongoose.model("Hospital", hospitalSchema)


