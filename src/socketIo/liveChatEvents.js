const { DirectMessages } = require("../sequelize/models");

const liveChatEventsHandler = (socket, io, connectedUsers) => {
  // send message to friend
  socket.on("send-message-to-friend", async (messageObj) => {
    try {
      const { text, sender, receiver, sentDate } = messageObj;

      await DirectMessages.create({
        senderId: sender?.id,
        receiverId: receiver.id,
        content: text,
      });

      io.to(connectedUsers[receiver?.username]).emit(
        "message-received-from-friend",
        { content: text, sender, sentDate, receiver }
      );
    } catch (erorr) {
      console.log(erorr);
    }
  });
};

module.exports = liveChatEventsHandler;
