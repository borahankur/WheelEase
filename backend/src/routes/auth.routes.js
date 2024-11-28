import { Router } from "express";
import { authCallback, signUpCallback, signInCallback } from '../controller/auth.controller.js'

const router = Router()


router.post('/callback', authCallback)
router.post('/createUser', signUpCallback)
router.post('/signIn', signInCallback)
export default router
