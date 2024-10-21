const { DirectMessages, User, Servers } = require("../sequelize/models");
const { Op } = require("sequelize");
const getDirectMesages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) {
      return res.status(404).json({ message: "messages not found" });
    }

    const directMessages = await DirectMessages.findAll({
      where: {
        [Op.or]: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
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
        { model: Servers, as: "server", required: false },
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
