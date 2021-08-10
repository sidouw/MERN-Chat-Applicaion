const express = require("express");
const cookieParser = require('cookie-parser')


const path = require('path')
require('dotenv').config();
require('./db/mongoose');
const http = require('http')


const PublicPath = path.join(__dirname,'./Public')
const usersroute = require('./Routes/users')
const roomsroute = require('./Routes/rooms')
const messagesroute = require('./Routes/messages')
const handleChat = require('./Utils/chat')


const app = express()
const server = http.createServer(app)




app.use(cookieParser())
app.use(express.json({ limit: '20MB' }));
app.use(express.urlencoded({ extended: false }));
app.use(usersroute)
app.use(roomsroute)
app.use(messagesroute)

app.use(express.static(PublicPath))

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(PublicPath,'/index.html'))

// })

handleChat(server)


module.exports = {server}


