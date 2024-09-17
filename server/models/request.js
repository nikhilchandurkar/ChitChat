import { Schema, model, models } from "mongoose";

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


export const Request = models.Request || model("Request", schema);