const connectedUsers = {};
const friendRequestHandler = require("./friendRequestEvents");
console.log("connected users: ", connectedUsers);
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user coonnected: ", socket.id);

    socket.on("register", (username) => {
      console.log(`${username} registered with socket ID ${socket.id}`);
      connectedUsers[username] = socket.id;
      console.log("users: ", connectedUsers);
    });

    friendRequestHandler(socket, io, connectedUsers);
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
