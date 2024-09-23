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
      Select: false,
      required: true,
   },
   avtar: {
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


   // password hashing
schema.pre("save", async function (next) {
   if (!this.isModified("password")) next();
   this.password = await hash(this.password, 10);
})


export const User = mongoose.models.user || model("User", schema);