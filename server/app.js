import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { errorMiddleware } from "./middlewares/error.js";
import adminRoute from "./routes/admin.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import {createServer} from 'http'
import { NEW_MESSAGE } from "./constants/events.js";
import { v4 as uuid } from "uuid";

dotenv.config({
    path: "./.env"
});

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(MONGO_URI);

const app = express();
const server = createServer(app); 

const io = new Server(server);

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

io.on("connection",(Socket)=>{
    const user = {
        _id:"nik",
        name:"nikhil"
    }
    console.log("a user connected",Socket.id);
    
    Socket.on(NEW_MESSAGE, async({chatId,members,message,})=>{
        const messageForRealTime =  {
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name,
            },
            chat:chatId,
            createdAt: new Date().toString(),
        }
        console.log("new message",messageForRealTime);
    })
    
    Socket.on("disconnected" ,()=>{
        console.log("disconnected");
    })
})


app.use(errorMiddleware);

// Start the server
server.listen(port, () => {
    console.log(`Server is running at port ${port} in ${process.env.NODE_ENV}`);
});
