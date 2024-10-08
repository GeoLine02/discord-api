const { Servers } = require("../sequelize/models");

const getServersByOwner = async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    console.log("ownerId", ownerId);
    const servers = await Servers.findAll({ where: { ownerId } });

    if (!servers) {
      return res.status(404).json({ message: "servers not found" });
    }

    if (servers) {
      return res.status(200).json(servers);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getServerByName = async (req, res) => {
  try {
    const serverName = req.query.serverName;
    const server = await Servers.findOne({ where: { serverName } });

    if (server) {
      return res.status(200).json(server);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const createServer = async (req, res) => {
  try {
    const {
      serverName,
      serverTemplate,
      serverCommunity,
      ownerId,
      serverImage,
    } = req.body;

    const existingServer = await Servers.findOne({ where: { serverName } });

    if (existingServer) {
      return res
        .status(400)
        .json({ message: "server with this name already exists" });
    }

    const createdServer = await Servers.create({
      serverName,
      serverTemplate,
      serverCommunity,
      ownerId,
      serverImage,
    });
    if (createdServer) {
      return res.status(201).json({ message: "Server created successfuly" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  createServer,
  getServersByOwner,
  getServerByName,
};
