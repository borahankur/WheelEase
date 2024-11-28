import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: false
    }
}, {timestamps: true})

export const Employee = mongoose.model("Employee", employeeSchema)
