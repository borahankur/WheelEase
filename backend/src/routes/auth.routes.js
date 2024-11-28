import { Router } from "express";
import { authCallback, signUpCallback } from '../controller/auth.controller.js'

const router = Router()


router.post('/callback', authCallback)
router.post('/createUser', signUpCallback)
export default router
