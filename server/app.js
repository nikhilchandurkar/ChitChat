import express, { urlencoded } from "express";
// import { newUser,login } from "./controllers/user.js";
import userRoute from "./routes/user.js"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"


dotenv.config({
    path:"./.env"
})
const MONGO_URI = process.env.MONGO_URI
const port = process.env.PORT || 3000 
// console.log(MONGO_URI)
connectDB(MONGO_URI)  // connection to database

const app =express()

//  midddlewares

app.use(express.json());
// app.use(urlencoded()) // not using due to avatar file 



// routes
app.use("/",userRoute)

app.use("/user", userRoute);

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});
