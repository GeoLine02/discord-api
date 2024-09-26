const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
const { User, FriendRequests } = require("../sequelize/models");
const { connectedUsers } = require("../socketIo/index");
const getFriends = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    const { senderId, username } = req.body;

    const receiver = await User.findOne({ where: { username } });
    if (!receiver) {
      return res.status(401).json({ message: "User not found" });
    }

    const friendRequest = await FriendRequests.create({
      senderId: senderId,
      receiverId: receiver.id,
    });

    const receiverSocketId = connectedUsers[receiver.username];
    console.log("receiverSocketId", receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive-friend-request", {
        username,
        message: `You just received friend request from ${username}`,
      });
    }

    if (friendRequest) {
      return res
        .status(200)
        .json({ message: "Friend request sent successfuly" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const requst = await FriendRequests.findeOne({ where: { requestId } });

    if (requst) {
      return res
        .status(200)
        .json({ message: "Friend Request accepted successfuly" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
};
