import {login,newUser} from "../controllers/user.js"
import express from "express";

const app = express.Router();
app.post("/newuser" ,newUser)
app.post("/login" ,login)


export default app;