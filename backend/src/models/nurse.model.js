import mongoose from "mongoose";

const nurseSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: false,
    }
}, { timestamps: true })

export const Nurse = mongoose.model("Nurse", nurseSchema)
