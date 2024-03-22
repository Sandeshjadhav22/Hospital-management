import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLenght: [3, "First name contain atleast 3 characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLenght: [3, "last name contain atleast 3 characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLenght: [11, "Phone no contain atleast 11 digits!"],
    maxLenght: [11, "Phone no contain atleast 11 digits!"],
  },
  message: {
    type: String,
    required: true,
    minLenght: [10, "message at leasr contain atleast 10 characters!"],
  },
});

export const Message = mongoose.model("Message", messageSchema);
