const friendsService = require("../services/friends.service");

const sendFriendReuqest = async (req, res) => {
  try {
    const sendedFriendRequest = await friendsService.sendFriendRequest(
      req,
      res
    );
    return sendedFriendRequest;
  } catch (error) {
    console.log(error);
  }
};

const getAllFriendRequests = async (req, res) => {
  try {
    const allFriendRequests = await friendsService.getAllFriendRequests(
      req,
      res
    );
    return allFriendRequests;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendFriendReuqest,
  getAllFriendRequests,
};
