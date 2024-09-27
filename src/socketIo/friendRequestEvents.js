const { User, FriendRequests } = require("../sequelize/models");

const friendRequestHandler = (socket, io, connectedUsers) => {
  // friend request sender event
  socket.on(
    "send-friend-request",
    async ({ senderUsername, receiverUsername, senderId, status }) => {
      const receiver = connectedUsers[receiverUsername];

      try {
        const user = await User.findOne({
          where: {
            username: receiverUsername,
          },
        });
        const receiverId = user.id;
        const existedRequest = FriendRequests.findOne({
          where: {
            senderId,
            receiverId,
          },
        });

        if (senderId === receiverId) {
          socket.emit("decline-friend-request", {
            message: "Friend not found",
          });
        }

        if (existedRequest) {
          socket.emit("decline-friend-request", {
            message: "Friend request already sent",
          });
          console.log("friend request declined");
        }
        console.log("enterssssss");
        socket
          .to(receiver)
          .emit(
            "receive-friend-request",
            senderUsername,
            receiverUsername,
            senderId,
            status
          );
      } catch (error) {
        console.log("djokajsdl", error);
      }
    }
  );

  socket.on("accept-friend-request", async () => {});
};

module.exports = friendRequestHandler;
