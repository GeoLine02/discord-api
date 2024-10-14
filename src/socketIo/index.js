const connectedUsers = {};

const friendRequestHandler = require("./friendRequestEvents");
const liveChatEventHandler = require("./liveChatEvents");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("register", async (username) => {
      try {
        console.log(`${username} registered with socket ID ${socket.id}`);
        connectedUsers[username] = socket.id;
        console.log("users: ", connectedUsers);
      } catch (error) {}
    });

    friendRequestHandler(socket, io, connectedUsers);
    liveChatEventHandler(socket, io, connectedUsers);

    socket.on("disconncet", () => {
      console.log("A user disconnect: ", socket.id);
      for (const userId in connectedUsers) {
        if (connectedUsers[userId] === socket.id) {
          delete connectedUsers[userId];
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });
};

module.exports = { socketHandler, connectedUsers };
