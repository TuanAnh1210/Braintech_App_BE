import express from 'express';
import http from 'http';
import 'dotenv/config';

import { Server } from 'socket.io';

const app = express();
// const port = 8080;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('sendMessage', (message) => {
//         io.emit('receiveMessage', message);
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });
const users = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    // Khi người dùng đăng ký với ID
    socket.on('register', (userId) => {
        users[userId] = socket.id;
        console.log(`User registered with ID: ${userId}`);
    });

    // Khi người dùng ngắt kết nối
    socket.on('disconnect', () => {
        for (const userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                break;
            }
        }
        console.log('User disconnected');
    });

    // Gửi thông báo tới một học viên cụ thể
    socket.on('sendNotification', ({ userId, message }) => {
        const socketId = users[userId];
        if (socketId) {
            console.log(userId, 'userId');
            io.to(socketId).emit('receiveNotification', message);
        } else {
            console.log(`User with ID ${userId} not found`);
        }
    });
});

server.listen(2096, () => {
    console.log('Server Socket is running on ' + 2096);
});
