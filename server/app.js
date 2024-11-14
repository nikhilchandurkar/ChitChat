import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import adminRoute from "./routes/admin.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { Server } from "socket.io";
import { createServer } from "http"; 
import { Socket } from "dgram";

dotenv.config({
    path: "./.env"
});

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(MONGO_URI);

const app = express();
const server = createServer(app); 
const io = new Server(server, {});


app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

io.on("connection",(Socket)=>{
    console.log("a user connected",Socket.id);

    Socket.on("disconnected" ,()=>{
        console.log("disconnected");
    })
})


app.use(errorMiddleware);

// Start the server
server.listen(port, () => {
    console.log(`Server is running at port ${port} in ${process.env.NODE_ENV}`);
});
