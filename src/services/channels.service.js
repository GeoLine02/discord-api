const { Channels } = require("../sequelize/models");

const createTextChannel = async (req, res) => {
  try {
    const { serverId, serverTemplate } = req.body;
    console.log("body: ", req.body);

    let channelName = null;

    if (serverTemplate === "Create My Own") {
      channelName = "general";
    }

    const channel = await Channels.create({
      serverId,
      channelName,
      channelType: "text",
    });
    return res.status(201).json(channel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  createTextChannel,
};
