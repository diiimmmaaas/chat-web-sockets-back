const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send("Hello, it's WS server");
});

server.listen(3009, () => {
    console.log('listening on *:3000');
});