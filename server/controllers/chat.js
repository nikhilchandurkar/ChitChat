import { tryCatch } from "../middlewares/error.js";
import { emmitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js"
import { Chat } from "../models/chat.js"

const newGroupChat = tryCatch(async (req, res, next) => {

    const { name, members } = req.body;
    if (members.length < 2)
        return next(
            new ErrorHandler("group must have at least have 3 members", 400)
        );

    const allMembers = [...members, req.user]

    await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers,
    })
    emmitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emmitEvent(req, REFETCH_CHATS, members);

    res.status(200).json({
        success: true,
        message: "Group chat created"
    });


});



export { newGroupChat }