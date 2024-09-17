import express from "express";

// import { login, newUser } from "../controllers/user.js";
import {login} from "../controllers/user.js"

const app = express.Router();
app.get("/a",login)
// app.post("/newUser",newUser);
// app.post("/login",login);



export default app;