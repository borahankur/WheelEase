import { Router } from "express";
import { getNurses } from "../controller/nurse.controller.js";

const router = Router()

router.get('/', getNurses)

export default router
