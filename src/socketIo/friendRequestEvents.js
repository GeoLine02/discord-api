const { User, FriendRequests, FriendList } = require("../sequelize/models");

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
        const sender = await User.findOne({ where: { id: senderId } });
        console.log("sender", sender);
        const isFriend = await FriendList.findOne({
          where: { userId: user.id, friendId: senderId },
        });

        if (senderId === receiverId) {
          socket.emit("decline-friend-request", {
            message: "Friend not found",
          });
        }

        if (existedRequest || isFriend) {
          socket.emit("decline-friend-request", {
            message: "Friend request already sent",
          });
          console.log("friend request declined");
        }

        if (!existedRequest || !isFriend) {
          socket
            .to(receiver)
            .emit(
              "receive-friend-request",
              sender,
              senderUsername,
              receiverUsername,
              senderId,
              status
            );
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  socket.on("accept-friend-request", async (user, senderId) => {
    const sender = await User.findOne({ where: { id: senderId } });
    const receiver = connectedUsers[sender.username];
    io.to(receiver).emit("friend-request-accepted", user, () => {
      console.log("friend request accepted");
    });
  });
};

module.exports = friendRequestHandler;
