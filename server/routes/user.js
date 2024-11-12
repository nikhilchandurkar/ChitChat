import {
    getMyProfile,
    login,
    newUser,
    logout,
    searchUser
} from "../controllers/user.js"
import express from "express";
import { singleAvatar } from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js";
import {
    loginValidator,
    registerValidator,
    validateHandler
} from "../lib/validators.js";

const app = express.Router();
app.post("/newuser", singleAvatar, registerValidator(), validateHandler, newUser)
app.post("/login", loginValidator(), validateHandler, login)

// afer here user must be logged in to access following routes

app.use(isAuthenticated)

app.get("/me", getMyProfile)
app.get("/search ", searchUser)
app.post("/logout ", logout)

export default app;