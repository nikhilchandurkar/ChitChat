import {getMyProfile, login,newUser,logout, searchUser} from "../controllers/user.js"
import express from "express";
import {singleAvatar} from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();
app.post("/newuser" ,singleAvatar,newUser)
app.post("/login" ,login)



// afer here user must be logged in to access followin groutes

app.use(isAuthenticated)

app.get("/me",getMyProfile)
app.get("/search ",searchUser)
app.get("/logout ",logout)

export default app;