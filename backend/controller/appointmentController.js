import { catchAsynchErrors } from "../middlewares/catchAsynchError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appoinmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsynchErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appoinment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appoinment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 400));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler("Doctor Conflict please  contact thorugh Email", 400)
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appoinment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    success: true,
    message: "Appoinment sent successfully",
    appointment,
  });
});

export const getAllAppointments = catchAsynchErrors(async (req, res, next) => {
  const appoinments = await Appointment.find();
  res.status(200).json({
    success: true,
    appoinments,
  });
});

export const updateAppoinmentStatus = catchAsynchErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let appoinment = await Appointment.findById(id);
    if (!appoinment) {
      return next(new ErrorHandler("Appoinmnet not found", 400));
    }
    appoinment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appoinment status updated",
      appoinment,
    });
  }
);

export const deleteAppoinment = catchAsynchErrors(async (req, res, next) => {
  const { id } = req.params;
  let appoinment = await Appointment.findById(id);
  if (!appoinment) {
    return next(new ErrorHandler("Appoinmnet not found", 400));
  }
  await appoinment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appoinment delelted",
  });
});
