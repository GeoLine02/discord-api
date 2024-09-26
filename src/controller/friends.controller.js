const friendsService = require("../services/friends.service");

const sendFriendReuqest = async (req, res) => {
  try {
    const test = await friendsService.sendFriendRequest(req, res);
    return test;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendFriendReuqest,
};
