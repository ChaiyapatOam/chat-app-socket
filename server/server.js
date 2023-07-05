const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());

const PORT = 4000;
const server = http.createServer(app);

const socket = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5173/",
  },
});

//Add this before the app.get() block
socket.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

socket.on("message", (data) => {
  console.log(data);
  socket.emit("messageResponse", data);
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
