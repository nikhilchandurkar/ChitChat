import { request } from "express";
import { User } from "../models/user.js"
import { sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { tryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// create new user  save in db and save in cookie
const newUser = async (req, res) => {

    const { name, username, password, bio } = req.body;


    const avatar = {
        public_id: "hhhh",
        url: "fjbbb",
    }

    const user = await User.create({
        name,
        bio,
        username,
        password,
        // avatar
    });

    sendToken(res, user, 201, "user Created")


}

// const login = async (req, res, next) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username }).select("+password");
//         // console.log(err.message)
//         if (!user)
//             return next(new Error("Invalid username or password"));
//         // return res.status(400).json({ message: "invalid username or password " })

//         const isMatch = await compare(password, user.password);
//         if (!isMatch)
//             return next(new Error("Invalid password or password"));
//         // return res.status(400).json({ message: "Invalid username or password" })
//         sendToken(res, user, 201, `welcome back ${user.name}`)
//     } catch (error) {
//         next(error);
//     }

// }

const login = tryCatch(async (req, res, next) => {
    const { username, password } = req.body;

    // Fetch user and select password field explicitly
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid username or password"));
    }

    // Compare the provided password with the stored password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid username or password")); // Fixed the duplicated message
    }

    // Send token if authentication is successful
    sendToken(res, user, 201, `Welcome back ${user.name}`);
});




const getMyProfile = async (req, res) => {
    // return await User.findById()
}




export { login, newUser, getMyProfile }