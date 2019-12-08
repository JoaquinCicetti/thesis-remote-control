import express from "express";
import * as socketio from "socket.io";
import presentation from "./routes/presentation";
import control from "./routes/control";
import path from "path";
const app = express();

let http = require("http").Server(app);
let io = socketio.listen(http);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("../../thesis-presentation/build"));
app.set("port", process.env.PORT || 3001);
app.use("/control", control);
app.use("/thesis-presentation", presentation);

interface Update {
  title: string;
  index: number;
}
interface Shortcut {
  index: string;
}
let clientsCount = 0;
io.on("connection", (socket: SocketIO.Socket) => {
  clientsCount++;
  socket.broadcast.emit("devices", clientsCount - 1);
  socket.broadcast.emit("new user");
  socket.on("update", (update: Update) => {
    socket.broadcast.emit("update", update);
  });

  socket.on("command", (command: string) => {
    socket.broadcast.emit("command", command);
  });

  socket.on("shortcut", (shortcut: Shortcut) => {
    socket.broadcast.emit("shortcut", shortcut);
  });
  socket.on("iterate", () => {
    socket.broadcast.emit("iterate");
  });
  socket.on("count", (count: Shortcut) => {
    socket.broadcast.emit("count", count);
  });

  socket.on("disconnect", (socket: SocketIO.Socket) => {
    clientsCount--;
    // controls + 1 presentantion
    io.emit("devices", clientsCount - 1);
  });
});
http.listen(3002, function() {
  console.log("listening on *:3002");
});
