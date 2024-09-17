



const login = (req,res)=>{
    res.send("hello js")
}
export {login}
// import {User} from "../models/user.js"
// // create new user and save it to db and send response
// const newUser=async(req,res)=>{
//     const avatar = {
//         public_id:"bbbgbbbkbk",
//         url:"bjhjhjhjk"
//     }
//     await User.create({name:"Nikki", username:"nikki", password:"nikki", avatar });

//     res.status(201).json({message:"user created succesfully"})
// }

// const login=(req,res)=>{
//     req.send("hello");
//     res.status.json({message:"hello"})
// }

// export {login , newUser};