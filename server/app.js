import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express"; // Import express properly
import { errorMiddleware } from "./middlewares/error.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { createFakeMessages } from "./seeders/user.js";

// Load environment variables
dotenv.config({
    path: "./.env"
});

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// Connect to the database
connectDB(MONGO_URI);
// createUser(5);
// createSingleChats(5);

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
// Enable urlencoded with proper configuration
// app.use(express.urlencoded({ extended: true })); // Needed for parsing URL-encoded data

// Routes
// Use userRoute for /user only
app.use("/user", userRoute); 
// Use userRoute for /chat only

app.use("/chat", chatRoute);

// Put this middleware at the end
app.use(errorMiddleware);

// createFakeMessages(10);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
