const { DirectMessages } = require("../sequelize/models");

const liveChatEventsHandler = (socket, io, connectedUsers) => {
  // send message to friend
  socket.on("send-message-to-friend", async (messageObj) => {
    try {
      console.log(messageObj);
      const { content, sender, receiver, sentDate } = messageObj;
      if (content) {
        await DirectMessages.create({
          senderId: sender?.id,
          receiverId: receiver.id,
          content,
        });

        io.to(connectedUsers[receiver?.username]).emit(
          "message-received-from-friend",
          { content, sender, sentDate, receiver }
        );
      }
    } catch (erorr) {
      console.log(erorr);
    }
  });
};

module.exports = liveChatEventsHandler;
