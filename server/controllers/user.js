import { User } from "../models/user.js";
import { cookieOption, sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { tryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// Create new user, save in DB, and set a cookie
const newUser = tryCatch(async (req, res, next) => {
    const { name, username, password, bio } = req.body;

    const avatar = {
        public_id,
        url,
    };

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return next(new ErrorHandler("Username already exists", 400));
    }

    // Create user
    const user = await User.create({
        name,
        bio,
        username,
        password,
        avatar, // corrected to match the schema (avtar instead of avatar)
    });

    sendToken(res, user, 201, "User Created");
});

// Login user
const login = tryCatch(async (req, res, next) => {
    const { username, password } = req.body;

    // Fetch user and select password field explicitly
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid username or password", 404));
    }

    // Compare the provided password with the stored password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid username or password", 404));
    }

    // Send token if authentication is successful
    sendToken(res, user, 201, `Welcome back ${user.name}`);
});

// Get user profile
const getMyProfile = tryCatch(async (req, res, next) => {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

const logout = tryCatch(async (req, res, next) => {

    res.status(200).cookie("chitChat-Token", "", {
        ...cookieOption, maxAge: 0
    }).json({
        success: true,
        message: "logout"
    });
});

const searchUser = async (req, res, next) => {
    try {
        const { query } = req.query;

        res.status(200).json({
            success: true,
            message: query,
            
        });
    } catch (error) {
        console.log(error)
        next(error); 
    }
};


export { login, newUser, getMyProfile, logout, searchUser };
