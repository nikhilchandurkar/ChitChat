import { Schema, model, models } from "mongoose";

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

      required: true,
      Select: false,
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


export const User = models.user || model("User", schema);