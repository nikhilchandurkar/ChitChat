import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    groupChat: {  // Corrected to groupChat to match the controller logic
        type: Boolean,
        default: true,
    },
    creator: {
        type: Types.ObjectId,
        ref: "User",
        
    },
    members: [{
        type: Types.ObjectId,
        ref: "User",
        
    }]
}, {
    timestamps: true
});

export const Chat = mongoose.models.Chat || model("Chat", schema);  