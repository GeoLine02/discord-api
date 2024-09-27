const friendsController = require("../controller/friends.controller");

const express = require("express");

const router = express.Router();

router.get("/friend-request/get", friendsController.getAllFriendRequests);
router.post("/friend-request/send", friendsController.sendFriendReuqest);

module.exports = router;
