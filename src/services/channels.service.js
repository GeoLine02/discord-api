const { Channels, ChannelMessages } = require("../sequelize/models");

const getChannelMessages = async (req, res) => {
  try {
    const { serverId, channelName } = req.query;
    const channelMessages = await ChannelMessages.findAll({
      where: {
        serverId,
        channelName,
      },
    });
    return res.status(200).json(channelMessages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const createTextChannel = async (req, res) => {
  try {
    const { serverId, serverTemplate } = req.body;

    let channelName = null;

    if (serverTemplate === "Create My Own") {
      channelName = "general";
    }
    const channel = await Channels.create({
      serverId,
      channelName,
      channelType: "text",
    });
    return channel;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createTextChannel,
  getChannelMessages,
};
