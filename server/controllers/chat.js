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

    // Null checks for members and chatId
    if (!members || !chatId)
        return next(new ErrorHandler("Please provide members and chatId", 400));

    const chat = await Chat.findById(chatId);
    if (!chat)
        return next(new ErrorHandler("Chat not found", 404));
    if (!chat.groupChat)
        return next(new ErrorHandler("This is not a GroupChat", 400));

    if (chat.creator.toString() !== req.user.toString())
        return next(new ErrorHandler("You are not allowed to add members", 403));

    // Fetching new members from the database
    const allNewMembersPromise = members.map((memberId) => User.findById(memberId, "name"));

    const allNewMembers = await Promise.all(allNewMembersPromise);

    // uniuque members onl remove duplicate members

    const uniuqueMembers = allNewMembers.filter(
        (i) => !chat.members.includes(i._id.toString())
    )


    // Add only the new members' IDs to the chat
    chat.members.push(...uniuqueMembers.map((i) => i._id));

    // Check if group member limit is exceeded
    if (chat.members.length > 100)
        return next(new ErrorHandler("Group member limit reached", 400));

    await chat.save();

    // Concatenating names of the new members
    const allUserNames = allNewMembers.map((i) => i.name).join(",");

    // Emitting events to alert members
    emitEvent(
        req,
        ALERT, // Assuming ALERT is a constant or event type
        chat.members,
        `You have been added to the group ${chat.name} by ${req.user.name}. ${allUserNames} has been added to the group.`
    );

    // Emit event to refresh chats for the members
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: "Members added successfully"
    });
});

const removeMembers = tryCatch(async (req, res, next) => {
    const { userId, chatId } = req.body;
    const [chat, userThatWillBeRemoved] = await Promise.all(
        [
            Chat.findById(chatId),
            Chat.findById(userId, "name")
        ]
    )

    if (!chat)
        return next(new ErrorHandler("Chat not found", 404));
    if (!chat.groupChat)
        return next(new ErrorHandler("This is not a GroupChat", 400));

    if (chat.creator.toString() !== req.user.toString())
        return next(new ErrorHandler("You are not allowed to add members", 403));

    if (chat.members.length <= 3)
        return next(new ErrorHandler("Group must have al least 3 members", 400));

    chat.members = chat.members.filter(member => member.toString() !== userId.toString())

    await chat.save()

    emitEvent(
        req,
        ALERT,
        chat.members,
        `${userThatWillBeRemoved.name} has been removed from the group`
    )

    emitEvent(req, REFETCH_CHATS, chat.members);
})




const leaveGroup = tryCatch(async (req, res, next) => {

    const chatId = req.params.id;

    const chat = await Chat.findById(chatId)


    if (!chat)
        return next(new ErrorHandler("Chat not found", 404));

    if (!chat.groupChat) return next(new ErrorHandler("this is not the group", 400))

    emitEvent(
        req,
        ALERT,
        chat.members,
        `${userThatWillBeRemoved.name} has been removed from the group`
    )

    emitEvent(req, REFETCH_CHATS, chat.members);
})



export {
    newGroupChat,
    getMyChats,
    getMyGroup,
    addMembers,
    removeMembers,
    leaveGroup

};
