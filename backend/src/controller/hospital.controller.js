import { Hospital } from "../models/hospital.model.js";
import { Booking } from '../models/booking.model.js'
import { User } from '../models/user.model.js'

export const getHospitals = async (req, res, next) => {
    try {
        const hospitals = await Hospital.find().sort()
        res.json(hospitals)
    } catch (error) {
        next(error)
    }
}

export const getHospitalById = async (req, res, next) => {
    try {
        const { hospitalId } = req.params
        const hospital = await Hospital.findById(hospitalId).populate(["doctors", "nurses", "employees"])
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" })
        }
        res.status(200).json(hospital)
    } catch (error) {
        next(error)
    }
}

export const createBooking = async (req, res, next) => {
    try {
        const { hospitalId } = req.params
        const { userId, isPm, selectedDay, selectedTime, currentfloor, equipment } = req.body
        const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

        let hour = selectedTime
        if (isPm && hour !== 12) {
            hour += 12;
        } else if (!isPm && hour === 12) {
            hour = 0;
        }
        // We find the user with the clerkId 
        const user = await User.findOne({ clerkId: userId })

        const now = new Date(); // Get present Date

        let daysToAdd = (daysOfWeek.indexOf(selectedDay) - now.getDay() + 7) % 7
        daysToAdd += 1// This is the logic to add days
        //if day = selected day = tue and current day = thu then days to add will be (2-4)+7 = 5 % 7 = 5, hence 5 days later will be the day for tue
        //if day = thu and current day = thu then 4-4 = 0 + 7 = 7 % 7 = 0, so 0 days to add 
        if (daysToAdd === 0 && hour * 60 + 0 < now.getHours() * 60 + now.getMinutes()) { //lets say user selects time as 10 and current hour is 11 so that means
            daysToAdd = 7                                                    // we passed the time to skip, therefore we will add 7 days so that we book 1 week later
        }

        // potential date to start the session is now that is 27 + 6 
        let potentialStartDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + daysToAdd
        );

        //2nd start 28th current 
        if (potentialStartDate.getDate() < now.getDate()) { // Check if the day rolled back
            potentialStartDate.setDate(now.getDate() + daysToAdd)
        }

        const startDate = new Date(
            potentialStartDate.getFullYear(),
            potentialStartDate.getMonth(),
            potentialStartDate.getDate(),
            hour,
            0
        );

        const endTime = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)

        const endDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
            endTime.getHours(),
            endTime.getMinutes(),
        )

        const newBooking = new Booking({
            user: user._id,
            hospital: hospitalId,
            equipment: equipment,
            floor: currentfloor,
            time: `${selectedTime}:00 ${isPm ? 'PM' : 'AM'}`,
            day: selectedDay,
            startDate,
            endDate,
            status: 'booked',
        })
        await newBooking.save()
        await Hospital.findByIdAndUpdate(
            hospitalId,
            { $push: { bookings: newBooking._id } }
        )
        res.status(201).json({ success: true })
    } catch (error) {
        console.log("Error in creating a booking", error)
    }
}

export const updateBookings = async (req, res, next) => {
    try {
        const { hospitalId } = req.params
        const { equipment } = req.body
        const now = new Date()
        const nextMinute = new Date(now.getTime() + 60 * 1000)
        const filter1 = {
            startDate: { $gte: now, $lt: nextMinute },
            status: 'booked',
            equipment: equipment
        }
        const bookings = await Booking.find(filter1)
        await Booking.updateMany(filter1, { $set: { status: 'in-progress' } })

        const floorUpdates = {}
        bookings.forEach(booking => {
            const floor = booking.floor
            if (!floorUpdates[floor]) {
                floorUpdates[floor] = { [equipment]: 0 }
            }
            floorUpdates[floor][equipment] -= 1
        })
        const updateObject = { $inc: {} }
        for (const floor in floorUpdates) {
            updateObject.$inc[`floorEquipment.${floor}.${equipment}`] = floorUpdates[floor][equipment]
        }
        await Hospital.findByIdAndUpdate(hospitalId, updateObject)

        const filter2 = {
            endDate: { $gt: now },
            status: 'in-progress',
            equipment: equipment
        }
        const floorUpdates2 = {}
        const bookings2 = await Booking.find(filter2)
        bookings2.forEach(booking => {
            const floor = booking.floor
            if (!floorUpdates2[floor]) {
                floorUpdates2[floor] = { [equipment]: 0 }
            }
            floorUpdates2[floor][equipment] += 1
        })
        const updater = { $inc: {} }
        for (const floor in floorUpdates2) {
            updater.$inc[`floorEquipment.${floor}.${equipment}`] = floorUpdates[floor][equipment]
        }
        await Hospital.findById(hospitalId, updater)
    } catch (error) {
        console.log("Error occured")
    }
}

