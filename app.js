require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { connectDB } = require("./src/db");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});
const { socketHandler } = require("./src/socketIo");

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
const friendsRoutes = require("./src/routes/friends.routes");
const serversRoutes = require("./src/routes/server.routes");
const messagesRoutes = require("./src/routes/messages.routes");
const channelsRoutes = require("./src/routes/channels.routes");
connectDB();
app.use("/user", userRoutes);
app.use("/friend", friendsRoutes);
app.use("/server", serversRoutes);
app.use("/messages", messagesRoutes);
app.use("/channels", channelsRoutes);
socketHandler(io);

const PORT = process.env.PORT || 5432;

server.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT}`)
);
