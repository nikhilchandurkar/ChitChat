
import express from "express";
import { addMembersValidator, validateHandler } from "../lib/validators.js";
import {
    adminLogin,
    allChats,
    allMessages,
    allUsers,
    getDashboardStats
} from "../controllers/admin.js";


const app = express.Router();
app.post("/")

app.get("/")

app.get("/verify",addMembersValidator(),validateHandler ,adminLogin);

app.post("/logout")

app.get("/users", allUsers);

app.get("/chats", allChats)

app.get("/messages",allMessages)

app.get("/stats", getDashboardStats)


export default app;