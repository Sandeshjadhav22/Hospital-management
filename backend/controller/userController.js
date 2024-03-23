import { catchAsynchErrors } from "../middlewares/catchAsynchError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { genrateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const PatientRegister = catchAsynchErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already registered", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  });
  genrateToken(user, "user Registerd", 200, res);
});

export const login = catchAsynchErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("password and confirm password do not match", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  genrateToken(user, "user Login succesfully", 200, res);
});

// export const addNewAdmin = catchAsynchErrors(async (req, res, next) => {
//   const { firstName, lastName, email, phone, password, gender, dob, nic } =
//     req.body;

//   if (
//     !firstName ||
//     !lastName ||
//     !email ||
//     !phone ||
//     !password ||
//     !gender ||
//     !dob ||
//     !nic
//   ) {
//     return next(new ErrorHandler("Please fill full form", 400));
//   }

//   const isRegistered = await User.findOne({ email });
//   if (isRegistered) {
//     return next(
//       new ErrorHandler(
//         `${isRegistered.role} with this email alreday exits`,
//         400
//       )
//     );
//   }
//   const admin = await User.create({
//     firstName,
//     lastName,
//     email,
//     phone,
//     password,
//     gender,
//     dob,
//     nic,
//     role:"Admin"
//   });
//   res.status(200).json({
//     success: true,
//     message: "New admin Registerd",
//   });
// });

export const addNewAdmin = catchAsynchErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

export const getAllDoctors = catchAsynchErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsynchErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsynchErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpsOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logged out succesfully",
    });
});

export const logoutPatient = catchAsynchErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpsOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient  logged out succesfully",
    });
});

export const addNewDoctor = catchAsynchErrors(async (req, res, next) => {
  if (!req.files | (Object.keys(req.files).length === 0)) {
    return next(new ErrorHandler("Doctor Avatar require", 400));
  }
 const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already exits with this email`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if(!cloudinaryResponse || cloudinaryResponse.error){
     console.error("CLoudinary Error",cloudinaryResponse.error || "Unkoen cloudinary error");
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
    role:"Doctor",
    docAvatar:{
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    }
  })
  res.status(200).json({
    success:true,
    message:"New doctor registerd",
    doctor
  })
});
  