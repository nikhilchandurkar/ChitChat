import {getMyProfile, login,newUser,logout, searchUser} from "../controllers/user.js"
import express from "express";
import {singleAvatar} from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat } from "../controllers/chat.js";

const app = express.Router();



// afer here user must be logged in to access followin groutes

app.use(isAuthenticated)
app.post("/new", newGroupChat)

export default app;