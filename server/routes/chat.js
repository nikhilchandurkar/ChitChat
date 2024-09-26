 
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat, getMyChats, getMyGroup, addMembers, removeMembers, leaveGroup } from "../controllers/chat.js";

const app = express.Router();



// afer here user must be logged in to access following groutes

app.use(isAuthenticated)

app.post("/new", newGroupChat)

app.get("/my", getMyChats)

app.get("/my/groups", getMyGroup)

app.put("/addmembers", addMembers)

app.put("/removemember", removeMembers)

app.delete("/leave/:id",leaveGroup )


export default app;