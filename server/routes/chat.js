import { getMyProfile, login, newUser, logout, searchUser } from "../controllers/user.js"
import express from "express";
import { singleAvatar } from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat, getMyChats, getMyGroup, addMembers } from "../controllers/chat.js";

const app = express.Router();



// afer here user must be logged in to access following groutes

app.use(isAuthenticated)
app.post("/new", newGroupChat)
app.get("/my", getMyChats)
app.get("/my/groups", getMyGroup)
app.put("/addmembers", addMembers)


export default app;