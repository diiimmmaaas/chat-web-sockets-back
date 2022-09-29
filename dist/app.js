const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
app.get('/', (req, res) => {
    res.send("Hello, it's WS server");
});
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log('listening on *:3000');
});
//# sourceMappingURL=app.js.map