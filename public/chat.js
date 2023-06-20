// target all the required dom elements
const chatForm = document.querySelector('.chat-input-group');
const handle = document.querySelector('.handle');
const message = document.querySelector('.message')
const chatContainer = document.querySelector('.chat-container')
const showIsTyping = document.querySelector('.isTyping')
const username = document.querySelector('.username');
const bar = document.querySelector('.bar')
// msg tone logix
let msgtone = new Audio('/msgtone2.mp3')

chatForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      onChatSent()
})

const socket = io.connect()

function onChatSent(){
    

         let data = {
            username:username.value,
            handle:handle.value,
            message:message.value,
            dateSent:new Date().toLocaleString()

        }

        socket.emit('chat', data)

           populateChat(true, data)
          scrollToBottom()
          message.value = ''
}

function populateChat(isMyChat, data){
      let element = `
        
            <div class= ${isMyChat ? 'right' : 'left'}>
                    <h5>${data.handle , data.username}</h5>
                    <p>
                       ${data.message}
                    </p>
                    
                <small>${data.dateSent}</small>
        </div>
      `

      chatContainer.innerHTML  += element
}

// add event listener to the input message
message.addEventListener('input', (e)=>{
         e.preventDefault()
        socket.emit('isTyping', {
            handle: handle.value
        })

})

// add event listener to the input message
message.addEventListener('focus', (e)=>{
         e.preventDefault()
        socket.emit('isTyping', {
            handle: handle.value
        })

})

// add event listener to the input message
message.addEventListener('blur', (e)=>{
         e.preventDefault()
          socket.emit('notTyping', {
            handle: handle.value
        })
})

socket.on('isTyping', (data)=>{
      //  istTyping logic
      showIsTyping.style.display = 'flex'
      showIsTyping.innerHTML = `${data.handle} is typing...`
         
})

socket.on('notTyping', (data)=>{
      //  istTyping logic
      showIsTyping.innerHTML = ''
      showIsTyping.style.display = 'none'
         
})

socket.on('chat-message', (data)=>{
       
        populateChat(false, data)
        msgtone.play()
        scrollToBottom()
})

function scrollToBottom(){
      chatContainer.scrollTo(0, chatContainer.scrollHeight)
}
