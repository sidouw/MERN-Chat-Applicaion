
const socket = require('socket.io')
const Message = require('../models/message')
const User = require('../models/user')
const fs = require('fs')

const addMessageToRoom = async (msg)=>{
 
  try {
    const message = new Message(msg)
    await message.save()
  } catch (error) {
    console.log(error)
  }

}

const UpdateState = (id,socketId)=>{

  try {
    fs.access('usersStatus', fs.F_OK, (err) => {
      if (err) {     
        fs.writeFile('usersStatus',JSON.stringify({id:[socketId]}), function (err) {
          if (err) throw err;
        });
        console.error(err)
        return
      }
      fs.readFile('usersStatus', function(err, data) {
        if(data){  
        const UserStats =JSON.parse(data.toString())
        if(UserStats[id]){
          UserStats[id] = [...UserStats[id],socketId]      
        }else{
          UserStats[id] = [socketId]
        }
        fs.writeFile('usersStatus',JSON.stringify(UserStats),(err)=>{
        })
      }
  
      })
      
    })
  } catch (error) {
    console.log(error)
  }


}


const handledisconnect = async (socketId,io) => {
  try {
    fs.readFile('usersStatus',async function(err, data) {
    
      if(data){
        const UserStats =JSON.parse(data.toString())
        
      const UsersId = Object.keys(UserStats)
      for (const UserId of UsersId) {
        UserStats[UserId]=UserStats[UserId].filter(socket=>{
          return socket!=socketId
        })
        
        if (UserStats[UserId].length === 0 && UserId!=='id') {
          try {    
            const user = await User.findById(UserId)
            if (user) {
                user.contacts.forEach(contact => {  
                  io.of('/chat').to(contact).emit('userdisconnected',user._id)  
                })
            }
          } catch (error) {
            console.log(error)
          }
         }
      }
  
  
      fs.writeFile('usersStatus',JSON.stringify(UserStats),(err)=>{
      })
    }
    })
  } catch (error) {
    console.log(error)
  }


}


const handleChat = (server)=>{

  const io = socket(server)
  const SocketTimers ={}
  const IntervalTimers ={}

  io.of('/chat').on('connection',(socket)=>{

    socket.on('join',(room,friends)=>{

      socket.join(room)
      UpdateState(room,socket.id,friends)
      friends.forEach(contact => {   
        io.of('/chat').to(contact).emit('userconnected',room)
      })
      // Online status
      IntervalTimers[socket.id] =  setInterval(() => {

        SocketTimers[socket.id] = setTimeout(() => {
          handledisconnect(socket.id,io)
          clearInterval(IntervalTimers[socket.id])
        }, 5000)

        socket.emit('ping',()=>{
          clearTimeout(SocketTimers[socket.id])
        })
      }, 5000)
      
    })

    socket.on('online',(friends,callback)=>{

      try {
        fs.access('usersStatus', fs.F_OK, (err) => {
          if (err) {    
            callback([])
            console.error(err)
            return
          }else{
            fs.readFile('usersStatus', function(err, data) {
              if(data){
              const UserStats =JSON.parse(data.toString())
              const online = []
              friends.forEach(friend=>{
                if(UserStats[friend] && UserStats[friend].length>0){
                  online.push(friend)
                }             
              })
              callback(online)
            }else{
              callback([])
            }
    
            })
          }
        })
      } catch (error) {
        console.log(error)
      }


    })
    socket.on('leave',(room)=>{
      socket.leave(room)
    })

     socket.on('sendMessage',(msg)=>{
      addMessageToRoom(msg).then(()=>{
 
      })
       const message = {...msg}
       const rcv = message.receiver
       delete message.receiver
       io.of('/chat').to(rcv).emit('message',message)
     })



     socket.on('disconnect',()=>{
      clearInterval(IntervalTimers[socket.id])
      clearTimeout(SocketTimers[socket.id])
       setTimeout(() => {
        handledisconnect(socket.id,io)
       }, 1000);
      
  })

  })

}


  module.exports = handleChat