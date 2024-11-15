import { userSocketIDs } from "../app.js";

export const getOtherMembers = (members, userId) =>
    members.find((member) => member._id?.toString() !== userId.toString());

export const getSockets = (users = []) => {
    // Ensure `users` is always an array
    const userArray = Array.isArray(users) ? users : [users];
    
    const sockets = userArray
        .map((user) => {
            // Ensure user and user._id are defined
            if (user && user._id) {
                return userSocketIDs.get(user._id.toString());
            }
            return undefined;
        })
        .filter((socketId) => socketId !== undefined); // Filter out any undefined socket IDs
    
    return sockets;
};
