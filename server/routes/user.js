import {login,newUser} from "../controllers/user.js"
import express from "express";
import {singleAvatar} from "../middlewares/multer.js"

const app = express.Router();
app.post("/newuser" ,singleAvatar,newUser)
app.post("/login" ,login)


export default app;