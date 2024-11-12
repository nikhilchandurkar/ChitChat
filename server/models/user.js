import mongoose, { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const schema = new Schema({
   name: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      unique: true,
      required: true,
   },
   password: {
      type: String,
      select: false, 
      required: true,
   },
   avatar: {
      public_id: {
         type: String,
         required: true,
      },
      url: {
         type: String,
         required: true,
      },
   },
},
{
   timestamps: true
});

// // password hashing
//  schema.pre("save", async function (next) {
//    if (!this.isModified("password")) return next(); // Call next only when password is not modified
//    this.password = await hash(this.password, 10);
//    next(); // Call next after password is hashed
// });

schema.pre("save", async function (next) {
   try {
      if (this.isModified("password")) {
         this.password = await hash(this.password, 10);
      }
      next();
   } catch (err) {
      next(err); // Pass error to next middleware
   }
});


export const User = mongoose.models.User || model("User", schema);
