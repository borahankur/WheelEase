import { User } from "../models/user.model.js";
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
})

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;
        const user = await User.findOne({ clerkId: id })
        if (!user) {
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl: imageUrl | '/default.png',
            })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        console.log("Error in Auth callback: ", error);
        next(error)
    }
}

export const signUpCallback = async (req, res, next) => {
    const {userId, firstName, lastName } = req.body;
    try {
        await User.create({
            clerkId: userId,
            fullName: `${firstName} ${lastName}`,
            imageUrl: '/default.png',
        })
        res.json({success: true})
    } catch (error) {
        console.log(error)
        console.log("Error in creating a user")
    }
}



