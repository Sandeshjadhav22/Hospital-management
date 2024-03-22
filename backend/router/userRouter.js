import express from "express"
import { PatientRegister } from "../controller/userController.js"

const router = express.Router()

router.post("/patient/register",PatientRegister)

export default router