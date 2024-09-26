const friendRequestHandler = (socket, io, users) => {
  socket.on(
    "send-friend-request",
    ({ senderUsername, receiverUsername, senderId }) => {
      console.log(
        `Friend request sent from ${senderUsername} to ${receiverUsername}`
      );
      io.emit(
        "receive-friend-request",
        senderUsername,
        receiverUsername,
        senderId
      );
    }
  );
};

module.exports = friendRequestHandler;
