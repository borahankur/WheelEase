import mongoose from 'mongoose'
import { Nurse } from '../models/nurse.model.js'
import { Doctor } from '../models/doctor.model.js'
import { Employee } from '../models/employee.model.js'
import { Hospital } from '../models/hospital.model.js'
import { config } from 'dotenv'

config()

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        await Hospital.deleteMany({})
        await Doctor.deleteMany({})
        await Nurse.deleteMany({})
        await Employee.deleteMany({})

        const createdDoctors = await Doctor.insertMany([
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
        ])

        const createdNurses = await Nurse.insertMany([
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
        ])

        const createdEmployee = await Employee.insertMany([
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
        ])

        const hospitals = [
            {
                fullname: "Utkal Hospital",
                floors: 5,
                guidingMaps: [
                    '/maps/basement.png',
                    '/maps/groundfloor.png',
                    '/maps/firstfloor.png',
                    '/maps/secondfloor.png',
                    '/maps/thirdfloor.png'
                ],
                doctors: createdDoctors.slice(0, 3).map(doctor => doctor._id),
                nurses: createdNurses.slice(0, 3).map(nurse => nurse._id),
                employees: createdEmployee.slice(0, 3).map(employee => employee._id),
                imageUrl: '/hosp1.png',
                floorEquipment: [
                    { floorNumber: 'B', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: 'G', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '1', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '2', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '3', wheelchairs: 9, stretchers: 9 }
                ]
            },

            {
                fullname: "KIMS Hospital",
                floors: 5,
                guidingMaps: [
                    '/maps/basement.png',
                    '/maps/groundfloor.png',
                    '/maps/firstfloor.png',
                    '/maps/secondfloor.png',
                    '/maps/thirdfloor.png'
                ],
                doctors: createdDoctors.slice(3, 6).map(doctor => doctor._id),
                nurses: createdNurses.slice(3, 6).map(nurse => nurse._id),
                employees: createdEmployee.slice(3, 6).map(employee => employee._id),
                imageUrl: '/hosp2.png',
                floorEquipment: [
                    { floorNumber: 'B', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: 'G', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '1', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '2', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '3', wheelchairs: 9, stretchers: 9 }
                ]
            },

            {
                fullname: "CARE Hospital",
                floors: 5,
                guidingMaps: [
                    '/maps/basement.png',
                    '/maps/groundfloor.png',
                    '/maps/firstfloor.png',
                    '/maps/secondfloor.png',
                    '/maps/thirdfloor.png'
                ],
                doctors: createdDoctors.slice(6, 11).map(doctor => doctor._id),
                nurses: createdNurses.slice(6, 11).map(nurse => nurse._id),
                employees: createdEmployee.slice(6, 11).map(employee => employee._id),
                imageUrl: '/hosp3.png',
                floorEquipment: [
                    { floorNumber: 'B', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: 'G', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '1', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '2', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '3', wheelchairs: 9, stretchers: 9 }
                ]
            },

            {
                fullname: "Apollo Hospital",
                floors: 5,
                guidingMaps: [
                    '/maps/basement.png',
                    '/maps/groundfloor.png',
                    '/maps/firstfloor.png',
                    '/maps/secondfloor.png',
                    '/maps/thirdfloor.png'
                ],
                doctors: createdDoctors.slice(11, 16).map(doctor => doctor._id),
                nurses: createdNurses.slice(11, 16).map(nurse => nurse._id),
                employees: createdEmployee.slice(11, 16).map(employee => employee._id),
                imageUrl: '/hosp4.png', 
                floorEquipment: [
                    { floorNumber: 'B', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: 'G', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '1', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '2', wheelchairs: 9, stretchers: 9 },
                    { floorNumber: '3', wheelchairs: 9, stretchers: 9 }
                ]
            }
        ]
        const createdHospitals = await Hospital.insertMany(hospitals)

        for (let i = 0; i < createdHospitals.length; i++) {
            const hospital = createdHospitals[i]
            const createdDoctors = hospitals[i].doctors
            const createdNurses = hospitals[i].nurses
            const createdEmployee = hospitals[i].employees
            await Doctor.updateMany({ _id: { $in: createdDoctors } }, { hospitalId: hospital._id })
            await Employee.updateMany({ _id: { $in: createdEmployee } }, { hospitalId: hospital._id })
            await Nurse.updateMany({ _id: { $in: createdNurses } }, { hospitalId: hospital._id })
        }

        console.log("Hospital database seeded successfully")

    } catch (error) {
        console.log("Error in seeding database:", error)
    } finally {
        mongoose.connection.close()
    }
}

seedDatabase()
