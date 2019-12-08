"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socketio = __importStar(require("socket.io"));
var presentation_1 = __importDefault(require("./routes/presentation"));
var control_1 = __importDefault(require("./routes/control"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var http = require("http").Server(app);
var io = socketio.listen(http);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.static("../../thesis-presentation/build"));
app.set("port", process.env.PORT || 3001);
app.use("/control", control_1.default);
app.use("/thesis-presentation", presentation_1.default);
var clientsCount = 0;
io.on("connection", function (socket) {
    clientsCount++;
    socket.broadcast.emit("devices", clientsCount - 1);
    socket.broadcast.emit("new user");
    socket.on("update", function (update) {
        socket.broadcast.emit("update", update);
    });
    socket.on("command", function (command) {
        socket.broadcast.emit("command", command);
    });
    socket.on("shortcut", function (shortcut) {
        socket.broadcast.emit("shortcut", shortcut);
    });
    socket.on("iterate", function () {
        socket.broadcast.emit("iterate");
    });
    socket.on("count", function (count) {
        socket.broadcast.emit("count", count);
    });
    socket.on("disconnect", function (socket) {
        clientsCount--;
        // controls + 1 presentantion
        io.emit("devices", clientsCount - 1);
    });
});
http.listen(3002, function () {
    console.log("listening on *:3002");
});
