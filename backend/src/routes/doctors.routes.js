import { Router } from 'express'
import { getDoctors } from '../controller/doctor.controller.js';

const router = Router()

router.post('/', getDoctors)

export default router;
