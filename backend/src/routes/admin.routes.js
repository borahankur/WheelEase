import Router from 'express'
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js'
import { checkAdmin, createDoctor, createEmployee, createHospital, deleteDoctor, createNurse, deleteEmployee, deleteNurse, deleteHospital } from '../controller/admin.controller.js'

const router = Router()

router.use(protectRoute, requireAdmin)

router.get('/check-admin', checkAdmin)
router.post('/doctors', createDoctor)
router.delete('/doctors/:id', deleteDoctor)
router.post('/nurses', createNurse)
router.delete('/nurses/:id', deleteNurse)
router.post('/employees', createEmployee)
router.delete('/employees/:id', deleteEmployee)
router.post('/hospital', createHospital)
router.delete('/hospital/:id', deleteHospital)

export default router
