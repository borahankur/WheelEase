import { Doctor } from '../models/doctor.model.js'

export const getDoctors = async (req, res, next) => {
    try {
        const doctor = await Doctor.find().sort()
        res.json(doctor)
    } catch (error) {
        next(error)
    }
}
