import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

import { errorMiddleware } from "./middlewares/error.js";
import adminRoute from "./routes/admin.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";

// Load environment variables
dotenv.config({
    path: "./.env"
});

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// Connect to the database
connectDB(MONGO_URI);

// seeders call
// createUser(3);
// createSingleChats(3);
// createFakeMessages(10);
// fakeGroupChats(2);

const app = express();

// Middlewares
app.use(express.json());

app.use(cookieParser());
// Enable urlencoded with proper configuration
// app.use(express.urlencoded({ extended: true })); // Needed for parsing URL-encoded data

// Routes
app.use("/user", userRoute);

app.use("/chat", chatRoute);

app.use("/admin",adminRoute)

// Put this middleware at the end
app.use(errorMiddleware);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
