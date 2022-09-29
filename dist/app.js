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
const messages = [];
const usersState = new Map();
socket.on("connection", (socketChannel) => {
    usersState.set(socketChannel, { id: new Date().getTime().toString(), name: "anon" });
    socket.on('disconnect', () => {
        usersState.delete(socketChannel);
    });
    socketChannel.on("client-name-sent", (name) => {
        if (typeof name !== "string") {
            return;
        }
        const user = usersState.get(socketChannel);
        user.name = name;
    });
    socketChannel.on("client-message-sent", (message) => {
        if (typeof message !== "string") {
            return;
        }
        const user = usersState.get(socketChannel);
        let messageItem = {
            message: message,
            id: new Date().getTime().toString(),
            user: { id: user.id, name: user.name }
        };
        messages.push(messageItem);
        socket.emit("new-message-sent", messageItem);
    });
    socketChannel.emit("init-messages-published", messages);
    console.log("a user connected");
});
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log("listening on *:3009");
});
//# sourceMappingURL=app.js.map