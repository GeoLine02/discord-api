const serverService = require("../services/server.service");

const getServersByOwner = async (req, res) => {
  try {
    const servers = await serverService.getServersByOwner(req, res);
    return servers;
  } catch (error) {
    console.log(error);
  }
};

const getServerByName = async (req, res) => {
  try {
    const server = await serverService.getServerByName(req, res);
    return server;
  } catch (error) {
    console.log(error);
  }
};

const createServer = async (req, res) => {
  try {
    const createdServer = await serverService.createServer(req, res);
    return createdServer;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createServer,
  getServersByOwner,
  getServerByName,
};
