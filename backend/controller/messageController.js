import { Message } from "../models/messageSchema.js";
import {catchAsynchErrors} from"../middlewares/catchAsynchError.js";

export const sendMessage = catchAsynchErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill full form",
    });
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message sent sucess",
  });
})
