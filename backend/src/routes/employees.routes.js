import Router from 'express'
import { getEmployees } from '../controller/employee.controller.js'

const router = Router()

router.post('/', getEmployees)

export default router

