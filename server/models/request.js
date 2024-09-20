// import { Schema, model, models } from "mongoose";
import mongoose,{ Schema, model } from "mongoose";

const schema = new Schema(
   {
      status: {
         type: String,
         default: "prending",
         enum: ["pending", "accepted", "rejected"]
      },
     

      sender: {
         type: Types.ObjectID,
         ref: "User",
         required: true
      },
      reciever: {
         type: Types.ObjectId,
         ref: "User",
         required: true
      },

   }, {
   timestamps: true
});


export const Request = mongoose.models.Request || model("Request", schema);