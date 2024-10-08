const serverController = require("../controller/server.controller");
const express = require("express");
const router = express.Router();

router.get("/by-owner", serverController.getServersByOwner);
router.get("/by-name", serverController.getServerByName);
router.post("/create", serverController.createServer);

module.exports = router;
