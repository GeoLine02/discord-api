require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const {
  app: { port },
} = require("./src/config/index");
const connetion = require("./src/postgresql");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

connetion();

app.listen(port, () => console.log(`App is up and running on port ${port}`));
