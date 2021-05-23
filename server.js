//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);

let messageArray = [
  {name: 'Justin', message: 'Hello, Boo!'},
  {name: 'LittleBoo', message:'Lets watch Merlin!'}
];


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/messages", (req, res)=>{
  res.send(messageArray);
});

app.post("/messages", (req, res)=>{
  let messageName = req.body.nameField;
  let messageText = req.body.messageField;
  let toPush = {
    name: messageName,
    message: messageText
  }
  console.log(toPush);
  messageArray.push(toPush);
  res.redirect("/");
});

io.on('connection', (socket)=>{
  console.log('a user has connected');
});

let server = http.listen(3000, ()=>{
  console.log("Server running on port ", server.address().port);
});
