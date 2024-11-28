import mongoose from "mongoose"
import { Doctor } from "../models/doctor.model.js"
import { config } from "dotenv"

config()

const createdDoctors = [
    {
        fullname: 'Dr. 1',
        specialty: 'General Physician',
        imageUrl: '/doctors/1.jpg',
    },
    {
        fullname: 'Dr. 2',
        specialty: 'General Physician',
        imageUrl: '/doctors/2.jpg',
    },
    {
        fullname: 'Dr. 3',
        specialty: 'General Physician',
        imageUrl: '/doctors/3.jpg',
    },
    {
        fullname: 'Dr. 4',
        specialty: 'General Physician',
        imageUrl: '/doctors/4.jpg',
    },
    {
        fullname: 'Dr. 5',
        specialty: 'General Physician',
        imageUrl: '/doctors/5.jpg',
    },
    {
        fullname: 'Dr. 6',
        specialty: 'General Physician',
        imageUrl: '/doctors/6.jpg',
    },
    {
        fullname: 'Dr. 7',
        specialty: 'General Physician',
        imageUrl: '/doctors/7.jpg',
    },
    {
        fullname: 'Dr. 8',
        specialty: 'General Physician',
        imageUrl: '/doctors/8.jpg',
    },
    {
        fullname: 'Dr. 9',
        specialty: 'General Physician',
        imageUrl: '/doctors/9.jpg',
    },
    {
        fullname: 'Dr. 10',
        specialty: 'General Physician',
        imageUrl: '/doctors/10.jpg',
    },
    {
        fullname: 'Dr. 11',
        specialty: 'General Physician',
        imageUrl: '/doctors/11.jpg',
    },
    {
        fullname: 'Dr. 12',
        specialty: 'General Physician',
        imageUrl: '/doctors/12.jpg',
    },
    {
        fullname: 'Dr. 13',
        specialty: 'General Physician',
        imageUrl: '/doctors/13.jpg',
    },
    {
        fullname: 'Dr. 14',
        specialty: 'General Physician',
        imageUrl: '/doctors/14.jpg',
    },
    {
        fullname: 'Dr. 15',
        specialty: 'General Physician',
        imageUrl: '/doctors/15.jpg',
    },
    {
        fullname: 'Dr. 16',
        specialty: 'General Physician',
        imageUrl: '/doctors/16.jpg',
    }
]

const seedDoctors = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        await Doctor.deleteMany({})
        await Doctor.insertMany(createdDoctors)
        console.log("Doctors seeded successfully")
    } catch (error) {
        console.log("Error in seeding doctors", error)
    }finally{
        mongoose.connection.close()
    }
}

seedDoctors()
