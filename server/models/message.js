// import mongoose, { Schema, Types, model, models } from "mongoose";
import mongoose,{ Schema, model,Types } from "mongoose";

const schema = new Schema(
   {
      content: String,
      attachment: [{
         public_id: {
            type: String,
            required: true,
         },
         url: {
            type: String,
            required: true,
         },
      },
      ],

      sender: {
         type: Types.ObjectID,
         ref: "User",
         required: true
      },
      chat: {
         type: Types.ObjectId,
         ref: "User",
         required: true
      },

   }, {
   timestamps: true
});


export const Message = mongoose.models.Message || model("Message", schema);