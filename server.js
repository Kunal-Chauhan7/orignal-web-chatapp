const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 7000;

http.listen(PORT, () => {
    console.log(`Listning On Port : ${PORT}`);
})

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

const io = require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log("someone just connected!");
    socket.on('message',(msg)=>{
        socket.broadcast.emit('send_message_to_other',msg);
    })
});
