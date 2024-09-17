import express from "express";
// import { newUser,login } from "./controllers/user.js";
import userRoute from "./routes/user.js"

const app =express()

app.use("/",userRoute)

// app.use("/user", userRoute);

app.listen(3000,()=>{
    console.log("server is running at port no 3000.....");
});
