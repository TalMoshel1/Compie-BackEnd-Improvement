import express from 'express';
import router from './routes/index.js';
import connectToDb from './db/connectToDb.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http'; 

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:5173' , credentials: true }));
app.use(express.json());
app.use(router);
const PORT =  3000;

connectToDb()
  .then(() => {
    const server = http.createServer(app);

    server.listen(PORT, ()=>{
      console.log('Server running on port 3000')
    });
    
    const io = new Server(server, {
      cors: {
        origin: process.env.FE,
        methods: ['GET', 'POST', 'PUT']
      }
    });

    const comments = []; 

    io.on('connection', (socket) => {

      socket.emit('receive_comment', { data: comments });

      socket.on('disconnect', () => {
      });

      socket.on('add_comment', (commentObj) => {
        const newComment = {
          user: commentObj.user,
          comment: commentObj.comment,
        };
        comments.push(newComment);

        io.emit('receive_comment', {  newComment });
      });
    });
  })
  .catch((err) => {
    return err
  });
