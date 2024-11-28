import { User } from "../models/user.model.js";
import { clerkClient } from "@clerk/express";
import axios from 'axios'

import bcrypt from 'bcryptjs'

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
    const { email, password, firstName, lastName } = req.body;
    const salt = 10
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const user = await clerkClient.users.createUser({
            firstName,
            lastName,
            emailAddress: [`${email}`],
            password: hashedPassword,
        })
        await User.create({
            clerkId: user.id,
            fullName: `${firstName} ${lastName}`,
            imageUrl: '/default.png',
        })

        const signInToken = await clerkClient.signInTokens.createSignInToken({ userId: user.id })
        if (signInToken.token) {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${signInToken.token}`
        }
        else {
            delete axiosInstance.defaults.headers.common["Authorization"]
        }
        res.json({ url: signInToken.url })
    } catch (error) {
        console.log(error)
        console.log("Error in creating a user")
    }
}

export const signInCallback = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await clerkClient.users.getUserList({ emailAddress: email })
        if (!user && user.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }
        const clerkUser = user[0]
        const dbUser = User.findOne({ clerkId: clerkUser.id })
        const passwordMatch = await bcrypt.compare(password, dbUser.password)
        if (passwordMatch) {
            const { signInToken } = await clerkClient.signInTokens.createSignInToken({ userId: clerkUser.id })
            res.cookie('set-cookie', `__session=${signInToken}; Path=/;HttpOnly`)
            res.status(200).json({ message: "Sign in successful", user: clerkUser })
        } else {
            res.status(401).json({ message: "Invalid Password" })
        }
    } catch (error) {
        console.log("error during sign-in :", error)
        next(error)
    }
}


