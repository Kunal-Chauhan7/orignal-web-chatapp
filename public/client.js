const socket = io();

let username;
let textarea = document.querySelector('#text_area');
let messagearea = document.querySelector('.message__area');

do {
    username = prompt("Please Enter Your name !");
} while (!username);

textarea.addEventListener('keyup',(e)=>{
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user: username,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    socket.emit('message',msg);
    scrolltobottom();
}
function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let classname = type;
    mainDiv.classList.add(classname , 'message');
    let markup = `
    
    <h4> ${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);
}

socket.on('send_message_to_other',(msg)=>{
    appendMessage(msg,'incoming')
    scrolltobottom();
})

function scrolltobottom(){
    messagearea.scrollTop = messagearea.scrollHeight;
}