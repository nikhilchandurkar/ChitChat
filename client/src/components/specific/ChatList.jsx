import React from 'react'
import { Stack } from '@mui/material';
import ChatItem from '../shared/ChatItem';

const ChatList = ({

    w = "100%",
    onlineUsers = [],
    chats = [],
    chatId,
    newMessagesAlert = [
        {
            chatId: "",
            count: 0,
        }],
    handleDeleteChat,
}
) => {
    return (
        <Stack width={w} direction={"column"}>
            {chats?.map((data, index) => {

                const { avatar, members, _id, name, groupChat } = data;
                        // sample
                const newMessageAlert = newMessagesAlert.find(
                    ({chatId}) => chatId ===_id
                );

            const isOnline = members?.some((_member) => onlineUsers.includes(_id))

                return (
                    <ChatItem
                        index={index}
                        name={name}
                        newMessagesAlert={newMessageAlert}
                        isOnline={isOnline}
                        avatar={avatar}
                        _id={_id}
                        key={_id}
                        groupcChat={groupChat}
                        sameSender={chatId===_id}
                        handelDeletChat={handleDeleteChat}
                    />
                );
            })}

        </Stack>

    )
}

export default ChatList




