const express = module.require('express')
const socket = module.require('socket.io')
const path = module.require('path')

// create app from express
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, ()=>{
     console.log("server listening on PORT " + PORT)
})

// invoke socket
const io = socket(server)

io.on('connection', (user)=>{
     console.log(`user with the id ${user.id} just connected to the server.`)


     user.on('chat', (data)=>{
         user.broadcast.emit('chat-message', data)
     })

     user.on('isTyping', (data)=>{
           user.broadcast.emit('isTyping', data)
     })

       user.on('notTyping', (data)=>{
           user.broadcast.emit('notTyping', data)
     })
})






