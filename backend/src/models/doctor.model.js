import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: false
    }
}, {timestamps: true})

export const Doctor = mongoose.model("Doctor", doctorSchema)
