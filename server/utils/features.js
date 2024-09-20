import mongoose from "mongoose"


const connectDB = (uri)=>{
    mongoose.connect(uri,{dbName:"ChitChat"})
    .then((data)=>console.log(`connect to DB: ${data.connection.host}`))
    .catch((err)=>{
        console.log(err);
        throw err;
    })

}

export {connectDB}