require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const {
  app: { port },
} = require("./src/config/index");
const connetion = require("./src/postgresql");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your frontend URL
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE"); // Allowed methods
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  next();
});
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
const userRoutes = require("./src/routes/user.routes");

connetion();

app.use("/user", userRoutes);

app.listen(port, () => console.log(`App is up and running on port ${port}`));
