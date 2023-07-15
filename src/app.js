import express from 'express';
import router from './routes/index.js'
import connectToDb from './db/connectToDb.js'
import cors from 'cors'
import dotenv from 'dotenv';
import { Server } from 'socket.io'



dotenv.config();
const app = express();
app.use(cors({ origin: process.env.FE , credentials: true }))
app.use(express.json())
app.use(router)
const PORT =  3000;


let server

connectToDb()
.then(()=>{
    app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
    console.log('cors wating for requests from: ',process.env.FE)
})

const io = new Server(server, {
    cors: {
      origin: process.env.FE_URL,
      methods: ['GET', 'POST']
    }
  })
  
  io.on('connection', (socket) => {
    setTimeout(() => {
      socket.on('send_post', (message) => {
        socket.broadcast.emit('receive_message', message)
      })
    }, 2000)
})

