import Router from 'express'
import { getHospitalById, getHospitals, createBooking, updateBookings } from '../controller/hospital.controller.js';


const router = Router()

router.get('/', getHospitals)
router.get('/:hospitalId', getHospitalById)
router.post('/:hospitalId/wheelchair/booking/', createBooking)
router.post('/:hospitalId/wheelchair/updateStatus', updateBookings)
router.post('/:hospitalId/stretcher/booking/', createBooking)
router.post('/:hospitalId/stretcher/updateStatus', updateBookings)





export default router;


