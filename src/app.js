import express from 'express';
import router from './routes/index.js';
import connectToDb from './db/connectToDb.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http'; // Import the 'http' module

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:5173' , credentials: true }));
app.use(express.json());
app.use(router);
const PORT =  3000;

connectToDb()
  .then(() => {
    // Create the HTTP server with the Express app
    const server = http.createServer(app);

    // Listen to the HTTP server instead of the app for Socket.IO connections
    server.listen(PORT, () => console.log(`App listening at port ${PORT}`));
    
    const io = new Server(server, {
      cors: {
        origin: process.env.FE,
        methods: ['GET', 'POST', 'PUT']
      }
    });

    // Your socket.io logic here
    const comments = []; // Placeholder array for comments

    io.on('connection', (socket) => {
      console.log('A client connected.');

      // Send the initial comments to the connected client
      socket.emit('receive_comment', { data: comments });

      socket.on('disconnect', () => {
        console.log('A client disconnected.');
      });

      socket.on('add_comment', (commentObj) => {
        console.log('yes!!!!')
        // Process the new comment, save it to your data storage, and emit it back to all connected clients
        const newComment = {
          user: commentObj.user,
          comment: commentObj.comment,
        };
        comments.push(newComment);

        console.log(newComment)

        io.emit('receive_comment', {  newComment });
      });
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
