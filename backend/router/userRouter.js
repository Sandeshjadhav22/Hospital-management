import express from "express";
import {
  PatientRegister,
  addNewAdmin,
  login,
} from "../controller/userController.js";
import {isAdminAuthenticated,isPatientAuthenticated} from "../middlewares/auth.js"



const router = express.Router();

router.post("/patient/register", PatientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated,addNewAdmin);

export default router;
