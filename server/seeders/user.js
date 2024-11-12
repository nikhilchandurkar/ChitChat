import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { faker, simpleFaker } from "@faker-js/faker"


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
                        members: [users[i]._id, users[j]._id]
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

const createGroupChat = async(numChats) =>{
    try {
        const user =await User.find().select("_id");
        const chatsPromise = [];
        for (let i = 0; i < numChats; i++) {
            const numMembers = simpleFaker.number.int({
                min:3, max:user.length
            })
            const members = [];
            for (let i = 0; j < numChats; i++) {
                
                
            }
            
        }


    } catch (error) {
        console.log(error);
    }
}




export { createUser, createSingleChats,  }




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