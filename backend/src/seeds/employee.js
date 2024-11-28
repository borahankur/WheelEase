import mongoose from "mongoose";
import { Employee } from "../models/employee.model.js";
import { config } from "dotenv";

config()


const createdEmployee = [
    {
        fullname: 'e1'
    },
    {
        fullname: 'e2'
    },
    {
        fullname: 'e3'
    },
    {
        fullname: 'e4'
    },
    {
        fullname: 'e5'
    },
    {
        fullname: 'e6'
    },
    {
        fullname: 'e7'
    },
    {
        fullname: 'e8'
    },
    {
        fullname: 'e9'
    },
    {
        fullname: 'e10'
    },
    {
        fullname: 'e11'
    },
    {
        fullname: 'e12'
    },
    {
        fullname: 'e13'
    },
    {
        fullname: 'e14'
    },
    {
        fullname: 'e15'
    },
    {
        fullname: 'e16'
    }
]

const seedEmployees = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        await Employee.deleteMany({})
        await Employee.insertMany(createdEmployee)
        console.log("Employee seeded successfully")
    } catch (error) {
        console.log("Error in seeding employee",error)
    }finally{
        mongoose.connection.close()
    }
}

seedEmployees()
