const serverController = require("../controller/server.controller");
const express = require("express");
const router = express.Router();

router.get("/", serverController.getServers);
router.get("/requests", serverController.getServerInvites);
router.get("/by-owner", serverController.getServersByOwner);
router.get("/by-name", serverController.getServerByName);
router.post("/create", serverController.createServer);
router.post("/join-by-url", serverController.joinServerByUrl);
router.post("/join-by-request", serverController.joinServerByRequest);
module.exports = router;
