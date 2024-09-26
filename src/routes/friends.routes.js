const friendsController = require("../controller/friends.controller");

const express = require("express");

const routr = express.Router();

routr.post("/friend-request/send", friendsController.sendFriendReuqest);

module.exports = routr;
