const { ChannelMessages } = require("../sequelize/models");

const channelEventsHandler = (socket, io) => {
  socket.on("send-message-to-channel", async (messageObj) => {
    const { serverId, channelName, sender, content, serverName, contentType } =
      messageObj;

    await ChannelMessages.create({
      serverId,
      channelName,
      senderId: sender.id,
      content,
      contentType,
    });

    console.log(`Sending message to ${serverName}`);
    io.to(serverName).emit("message-received-on-server", messageObj);
  });
};

module.exports = channelEventsHandler;
