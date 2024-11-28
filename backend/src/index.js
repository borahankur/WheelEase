import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import { connectDb } from './lib/connectDb.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import hospitalRoutes from './routes/hospital.routes.js'
import nurseRoutes from './routes/nurses.routes.js'
import employeeRoutes from './routes/employees.routes.js'
import doctorRoutes from './routes/doctors.routes.js'

config()

const PORT = process.env.PORT
const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(clerkMiddleware())

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/hospital', hospitalRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/nurses', nurseRoutes)
app.use('/api/employees', employeeRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
    connectDb()
})
