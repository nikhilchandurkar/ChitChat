
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
    newGroupChat,
    getMyChats,
    getMyGroup,
    addMembers,
    removeMembers,
    leaveGroup,
    sendAttachment,
    getChatDetails,
    renameGroup,
    deleteChats,
    getMessages
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMembersValidator, newGroupValidator, removeMembersValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

// afer here user must be logged in to access following groutes

app.use(isAuthenticated)

app.post("/new",newGroupValidator(),validateHandler, newGroupChat)

app.get("/my", getMyChats)

app.get("/my/groups", getMyGroup)

app.put("/addmembers",addMembersValidator(),validateHandler, addMembers)

app.put("/removemember",removeMembersValidator(),validateHandler, removeMembers)

app.delete("/leave/:id", leaveGroup)
// why post because i am going to handle text messages via soket 

app.post("/message", attachmentsMulter, sendAttachment);

// get messages 
app.get("/message/:id", getMessages);

app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChats);


export default app;