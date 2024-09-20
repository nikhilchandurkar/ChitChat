import {User} from "../models/user.js"
// create new user  save in db and save in cookie
const newUser = async(req,res)=>{

    const {name,username,password,bio} = req.body;
    console.log(req.body)
    
    const avatar = {
        public_id:"afugg",
        url:"afugg",
    }
    
    // await User.create({
    //     name:"nikki", 
    //     username:"nikki",
    //      password :"123456",
    //      avatar
    //     });
        // console.log(User,avatar)

    res.status(201).json({message:"user created succesfully"})
}

const login = (req,res)=>{
    res.send("hello js")
}
export {login, newUser}