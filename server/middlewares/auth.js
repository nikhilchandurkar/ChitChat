import jwt  from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { errorMiddleware, tryCatch } from "./error.js"


// const isAuthenticated = tryCatch(async (req,res,next)=>{
//     const token = req.cookies['chitChat-Token'];
//     if (!token) {
//         return next(new ErrorHandler("please login to acces this route", 401))
//     } 
//     const decodedData = jwt.verify(token,process.env.JWT_SECRET)  
//     req.user = decodedData._id;
    
//     next();
// })

const isAuthenticated =  (req,res,next)=>{
    const token = req.cookies['chitChat-Token'];
    if (!token) {
        return next(new ErrorHandler("please login to acces this route", 401))
    } 
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)  
    req.user = decodedData._id;
    
    next();
}

export {isAuthenticated}
  