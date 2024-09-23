import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: "true",
    secure: "true",

}

const connectDB = (uri) => {
    mongoose.connect(uri, { dbName: "ChitChat" })
        .then((data) => console.log(`connect to DB: ${data.connection.host}`))
        .catch((err) => {
            console.log(err);
            throw err;
        })

}

// jwt for auth

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id },
        "process.env.JWT_SECRET"
    );


    return res.status(code)
        .cookie("chitChat-Token", token, cookieOption)
        .json({
            success: true,
            message,
            // user,
        });

}


export { connectDB, sendToken }