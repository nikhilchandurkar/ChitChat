import { tryCatch } from "../middlewares/error.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/chat.js";
import { getOtherMembers } from "../lib/helper.js";
import { User } from "../models/user.js";

const newGroupChat = tryCatch(async (req, res, next) => {
    const { name, members } = req.body;
    if (members.length < 2)
        return next(new ErrorHandler("group must have at least 2 members", 400));

    const allMembers = [...members, req.user];

    await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers,
    }).catch((err) => next(new ErrorHandler(err.message, 500)));

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);

    res.status(200).json({
        success: true,
        message: "Group chat created",
    });
});

const getMyChats = tryCatch(async (req, res, next) => {
    const chats = await Chat.find({ members: req.user }).populate(
        "members",
        "name username avatar"
    );

    const transformedChat = chats.map(({ _id, name, members, groupChat }) => {
        const otherMember = getOtherMembers(members, req.user);
        return {
            _id,
            groupChat,
            avatar: groupChat
                ? members.map(({ avatar }) => avatar.url)
                : [otherMember.avatar.url],
            name: groupChat ? name : otherMember.name,
            members: members.reduce((prev, curr) => {
                if (curr._id.toString() !== req.user.toString()) {
                    prev.push(curr._id);
                }
                return prev;
            }, []),
        };
    });

    res.status(200).json({
        success: true,
        chats: transformedChat,
    });
});

const getMyGroup = tryCatch(async (req, res, next) => {
    const chats = await Chat.find({
        members: req.user,
        groupChat: true,
        creator: req.user,
    }).populate("members", "name avatar");

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    }));
    return res.status(200).json({
        success: true,
        groups,
    });
});


const addMembers = tryCatch(async (req, res, next) => {
    const { chatId, members } = req.body;
    const chat = await Chat.findById(chatId)
    if (!chat)
        return next(new ErrorHandler("Chat not found", 404))
    if (!chat.groupChat)
        return next(new ErrorHandler("this is not GroupChat", 400))


    if (chat.creator.toString() !== req.user.toString())
        return next(new ErrorHandler("you are not allowed to add members", 403))



    const allNewMembersPromise = members.map((i) => User.findById(i, "name"))

    const allNewMembers = await Promise.all(allNewMembersPromise)

    chat.members.push(...allNewMembers.map((i) => i._id))

    if (chat.members.length > 100)
        return next(new ErrorHandler("Group member limit reached", 400))
    await chat.save();

    const allUseraName = allNewMembers.map((i)=>i.name).join(",")

    emitEvent(
        req,
        ALERT.
        chat.members,
        `You have been added to group${chat.name} by ${ req.user.name}`
        `${allUseraName} has been added to the group`
    )
    emitEvent(req,REFETCH_CHATS,chat.members)

    return res.status(200).json({
        success: true,
        message:"members added succesully"
    });
});

export { newGroupChat, getMyChats, getMyGroup, addMembers };
