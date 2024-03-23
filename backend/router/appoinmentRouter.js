import express from "express"
import { deleteAppoinment, getAllAppointments, postAppointment, updateAppoinmentStatus } from "../controller/appointmentController.js";
import {isPatientAuthenticated,isAdminAuthenticated} from "../middlewares/auth.js"

const router = express.Router();


router.post("/post",isPatientAuthenticated,postAppointment)
router.get("/getall",isAdminAuthenticated,getAllAppointments)
router.put("/update/:id",isAdminAuthenticated,updateAppoinmentStatus)
router.delete("/delete/:id",isAdminAuthenticated,deleteAppoinment)



export default router