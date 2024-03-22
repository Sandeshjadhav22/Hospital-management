import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL-BACKEND",
    })
    .then(() => {
      console.log("Connection to databse");
    })
    .catch((err) => {
      console.log(`Some error to connecte database: ${err}`);
    });
};
