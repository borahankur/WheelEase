import { Employee } from "../models/employee.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Nurse } from "../models/nurse.model.js";
import { Hospital } from "../models/hospital.model.js";
import { User } from '../models/user.model.js'

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: "auto" })
        return result.secure_url
    } catch (error) {
        console.log("Error in uploadToCloudinary", error)
        throw new Error("Error uploading to cloudinary");
    }
}

export const createEmployee = async (req, res, next) => {
    try {
        const { fullname, hospitalId } = req.body
        const employee = new Employee({
            fullname,
            hospitalId
        })
        await employee.save()
        await Hospital.findByIdAndUpdate(hospitalId, {
            $push: { employees: employee._id },
        })
        res.status(201).json(employee)
    } catch (error) {
        next(error)
    }
}

export const createDoctor = async (req, res, next) => {
    try {
        const { fullname, hospitalId } = req.body
        const { imageFile } = req.files
        const doctor = new Doctor({
            fullname,
            imageUrl: uploadToCloudinary(imageFile),
            hospitalId
        })
        await doctor.save()
        await Hospital.findByIdAndUpdate(hospitalId, {
            $push: { doctors: doctor._id },
        })
        res.status(201).json(doctor)
    } catch (error) {
        next(error)
    }
}

export const createNurse = async (req, res, next) => {
    try {
        const { fullname, hospitalId } = req.body
        const nurse = new Nurse({
            fullname,
            hospitalId
        })
        await nurse.save()
        await Hospital.findByIdAndUpdate(hospitalId, {
            $push: { nurses: nurse._id },
        })
        res.status(201).json(nurse)
    } catch (error) {
        next(error)
    }
}

export const deleteDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id)
        if (doctor.hospitalId) {
            await Hospital.findByIdAndUpdate(doctor.hospitalId, {
                $pull: { doctors: doctor._id },
            })
        }
        await Doctor.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted doctor successfully" })
    } catch (error) {
        next(error)
    }
}

export const deleteNurse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const nurse = await Nurse.findById(id)
        if (nurse.hospitalId) {
            await Hospital.findByIdAndUpdate(nurse.hospitalId, {
                $pull: { nurses: nurse._id },
            })
        }
        await Nurse.findByIdAndDelete(id)
        res.status(200).json({ message: "Nurse removed successfully" })
    } catch (error) {
        next(error)
    }
}

export const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id)
        if (employee.hospitalId) {
            await Hospital.findByIdAndUpdate(employee.hospitalId, {
                $pull: { employees: employee._id },
            })
        }
        await Employee.findByIdAndDelete(id)
        res.status(200).json({ message: "Employee removed successfully" })
    } catch (error) {
        next(error)
    }
}

export const createHospital = async (req, res, next) => {
    try {
        const { name, floors } = req.params
        const hospital = new Hospital({
            fullname: name,
            floors,
            guidingMaps: [
                '/maps/basement.png',
                '/maps/groundfloor.png',
                '/maps/firstfloor.png',
                '/maps/secondfloor.png',
                '/maps/thirdfloor.png'
            ]
        })
        await hospital.save()
        res.status(201).json(hospital)
    } catch (error) {
        next(error)
    }
}

export const deleteHospital = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Doctor.deleteMany({ hospitalId: id })
        await Employee.deleteMany({ hospitalId: id })
        await Nurse.deleteMany({ hospitalId: id })
        await Hospital.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted Hospital Successfully" })
    } catch (error) {
        next(error)
    }
}

export const checkAdmin = async (req, res, next) => {
    try {
        // const user = await User.findById(req.id).select('-password')
        res.status(200).json({ admin: true})
    } catch (error) {
        console.log
    }
}
