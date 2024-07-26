import express from "express";
import { WebSocketServer, WebSocket } from "ws";
const app = express();
app.get("/", (req, res) => {
    res.send("hello");
});
const server = app.listen(8000);
const wss = new WebSocketServer({ server });
wss.on('connection', (socket) => {
    socket.on('message', (data, isBinary) => {
        console.log('received data: %s', data);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
});
