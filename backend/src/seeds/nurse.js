import mongoose from "mongoose";
import { Nurse } from "../models/nurse.model.js";
import { config } from "dotenv";

config()


const createdNurses = [
    {
        fullname: 'N1'
    },
    {
        fullname: 'N2'
    },
    {
        fullname: 'N3'
    },
    {
        fullname: 'N4'
    },
    {
        fullname: 'N5'
    },
    {
        fullname: 'N6'
    },
    {
        fullname: 'N7'
    },
    {
        fullname: 'N8'
    },
    {
        fullname: 'N9'
    },
    {
        fullname: 'N10'
    },
    {
        fullname: 'N11'
    },
    {
        fullname: 'N12'
    },
    {
        fullname: 'N13'
    },
    {
        fullname: 'N14'
    },
    {
        fullname: 'N15'
    },
    {
        fullname: 'N16'
    }
]

const seedNurses = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        await Nurse.deleteMany({})
        await Nurse.insertMany(createdNurses)
        console.log("Seeded Nurses successfully")
    } catch (error) {
        console.log("Error in seeding nurses", error)
    }finally{
        mongoose.connection.close()
    }
}

seedNurses()
