const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const socket = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
app.get("/", (req, res) => {
    res.send("WS is started");
});
socket.on("connection", (socket) => {
    console.log("a user connected");
});
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log("listening on *:3009");
});
//# sourceMappingURL=app.js.map