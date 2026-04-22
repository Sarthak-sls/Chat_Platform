const express = require('express');
const cors = require('cors');
const http = require('http'); // Built-in Node module
const { Server } = require('socket.io'); 
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Create an HTTP server using Express
const server = http.createServer(app);

// 2. Attach Socket.io to that server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow React to connect
    methods: ["GET", "POST"],
  },
});

// 3. Handle Socket Connections
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // When a user clicks a channel, they join a specific "room"
  socket.on('join_channel', (channelName) => {
    socket.join(channelName);
    console.log(`User joined channel: ${channelName}`);
  });

  // When a user sends a message, broadcast it to everyone in that room
  socket.on('send_message', (data) => {
    // data contains: { senderName, content, channelName }
    socket.to(data.channelName).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// ... Keep your Postgres Pool and app.get / app.post routes here ...

// IMPORTANT: Listen on the 'server', not the 'app'
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});