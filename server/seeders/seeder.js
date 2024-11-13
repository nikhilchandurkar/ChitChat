import { faker } from "@faker-js/faker";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";


const createUser = async (numUsers) => {
    try {
        const userPromise = []
        for (let i = 0; i < numUsers; i++) {
            const tempUser = User.create({
                name: faker.person.fullName(),
                username: faker.internet.userName(),
                bio: faker.lorem.sentence(10),
                password: "password",
                avatar: {
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName(),
                },
            });
            userPromise.push(tempUser);
            await Promise.all(userPromise)
            console.log("users created", numUsers)
            process.exit()

        }
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

const createSingleChats = async (chatsCount) => {
    try {

        const users = await User.find().select("_id");

        const chatsPromise = [];
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < users.length; j++) {
                chatsPromise.push(
                    Chat.create({
                        name: faker.lorem.words(32),
                        groupChat:false
                    })
                );

            }
        }

        // Execute all chat creations in parallel
        await Promise.all(chatsPromise);

        console.log("Sample chats created successfully");
        process.exit();

    } catch (err) {
        console.error("Error creating sample chats:", err);
        process.exit(1);
    }
};


const fakeGroupChats = async (chatsCount) => {
    try {

        const users = await User.find().select("_id");

        const chatsPromise = [];
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < users.length; j++) {
                chatsPromise.push(
                    Chat.create({
                        name: faker.lorem.words(32),
                        groupChat:true,
                    members:["673468f524673a43795c0cdc","673468fa83d6663dd4e500d8"]
                    })
                );

            }
        }

        // Execute all chat creations in parallel
        await Promise.all(chatsPromise);

        console.log("Sample chats created successfully");
        process.exit();

    } catch (err) {
        console.error("Error creating sample chats:", err);
        process.exit(1);
    }
};



const createFakeMessages = async (count) => {
    const fakeMessages = Array.from({ length: count }, () => ({
      content: faker.lorem.sentence(),
      attachments: [
      ], 
      sender: "673464d7bc6117b191eedacb",
    chat: "67346975b1a3b4eaaa1c3cbe",
    }));
  
    await Message.insertMany(fakeMessages);
    console.log(`${count} fake messages inserted successfully!`);
  };


export {  createFakeMessages, createSingleChats, createUser,fakeGroupChats };




// const tempUser = User.create({
//     name: faker.person.fullName(),
//     username: faker.internet.userName(),
//     bio: faker.lorem.sentence(10),
//     password: "password",
//     avatar: {
//       url: faker.image.avatar(),
//       public_id: faker.system.fileName(),
//     },
//   });