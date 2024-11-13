

import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();
app.post("/newAdmin")

app.post("/Adminlogin")


app.use(isAuthenticated)







export default app;