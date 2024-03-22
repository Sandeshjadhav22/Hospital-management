import express from "express"
import { PatientRegister, login } from "../controller/userController.js"

const router = express.Router()

router.post("/patient/register",PatientRegister)
router.post("/login",login)

export default router