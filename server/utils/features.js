import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true  
     //change in production
    // secure: process.env.secureCookieOption

}

const connectDB = (uri) => {
    mongoose.connect(uri, { dbName: "ChitChat" })
        .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
        .catch((err) => {
            console.error("Error connecting to DB:", err);
            process.exit(1);
        });
};

// jwt for auth

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id },
        process.env.JWT_SECRET,
    );

    return res.status(code)
        .cookie("chitChat-Token", token, cookieOption)
        .json({
            success: true,
            message,
            // user,
        });

}


const emitEvent = (req,event,user,data)=>{
        console.log("emmitng event",event)
}

export { connectDB, sendToken, cookieOption,emitEvent }
