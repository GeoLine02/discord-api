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

const joinServerByUrl = async (req, res) => {
  try {
    const joinedUser = await serverService.joinServerByUrl(req, res);
    return joinedUser;
  } catch (error) {
    console.log(error);
  }
};

const joinServerByRequest = async (req, res) => {
  try {
    const joinedUser = await serverService.joinServerByRequest(req, res);
    return joinedUser;
  } catch (error) {
    console.log(error);
  }
};

const getServerInvites = async (req, res) => {
  try {
    const serverInvites = await serverService.getServerInvites(req, res);
    return serverInvites;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createServer,
  getServersByOwner,
  getServerByName,
  joinServerByUrl,
  joinServerByRequest,
  getServerInvites,
};
