const { DirectMessages, User } = require("../sequelize/models");

const getDirectMesages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) {
      return res.status(404).json({ message: "messages not found" });
    }

    const directMessages = await DirectMessages.findAll({
      where: {
        senderId,
        receiverId,
      },
      include: [
        {
          model: User,
          as: "sender",
        },
        {
          model: User,
          as: "receiver",
        },
      ],
    });
    return res.status(200).json(directMessages);
  } catch (erorr) {
    console.log(erorr);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  getDirectMesages,
};
