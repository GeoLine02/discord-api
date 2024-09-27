const { User, FriendRequests } = require("../sequelize/models");
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
    // looks for receiver who's username is equal to req.body.username
    const receiver = await User.findOne({ where: { username } });

    // if receiver not found or senders send request to themselves, server sends error 404
    if (!receiver || senderId === receiver.id) {
      return res.status(200).json({ message: "User not found" });
    }

    const existingRequest = await FriendRequests.findOne({
      where: {
        senderId: senderId,
        receiverId: receiver.id,
      },
    });

    // if request already exists return eror 400
    if (existingRequest) {
      return res.status(200).json({ message: "Friend request already sent" });
    }

    // creates friend request
    const friendRequest = await FriendRequests.create({
      senderId: senderId,
      receiverId: receiver.id,
    });

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

const getAllFriendRequests = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendRequests = await FriendRequests.findAll({
      where: { receiverId: userId },
      include: [
        {
          model: User,
          as: "Sender",
          attributes: ["username"],
        },
      ],
    });

    if (friendRequests) {
      return res.status(200).json({ friendRequests });
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
  getAllFriendRequests,
  acceptFriendRequest,
};
