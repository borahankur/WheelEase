import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { connectDb } from './lib/connectDb.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import doctorRoutes from './routes/doctors.routes.js'
import hospitalRoutes from './routes/hospital.routes.js'
import nurseRoutes from './routes/nurses.routes.js'
import employeeRoutes from './routes/employees.routes.js'
import path from 'path'

config()

const PORT = process.env.PORT
const app = express()

const __dirname = path.resolve()
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(clerkMiddleware())

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/hospital', hospitalRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/nurses', nurseRoutes)
app.use('/api/employees', employeeRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
    })
}

app.use((err, req,res,next) => {
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message})
})

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
    connectDb()
})
