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

function playSound(){
    var audio = new Audio("/ring.mp3");
    audio.play();
}

function TTS(user,message){
    let ttm = `${user} said ${message}`;
    responsiveVoice.speak(ttm);
}

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
    if (msg.message === 'Kunal Chauhan'){
        msg.message = 'https://tenor.com/view/itachi-uchiha-naruto-fire-red-eyes-anime-gif-17830637';
    }
    let markup = `
    
    <h4> ${msg.user}</h4>
    <span>${msg.message}</span>
    `
    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);
}

socket.on('send_message_to_other',(msg)=>{
    appendMessage(msg,'incoming')
    playSound();
    TTS(msg.user,msg.message);
    scrolltobottom();
})

function scrolltobottom(){
    messagearea.scrollTop = messagearea.scrollHeight;
}
