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