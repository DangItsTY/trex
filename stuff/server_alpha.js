// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
//
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/alpha.html');
// });
//
// io.on('connection', function(socket){
//   console.log("a user has connected");
//   socket.on('datacontrol', function(data){
//     io.emit('datacontrol', data);
//   });
// });
//
// http.listen(8000, function(){
//   console.log('listening on *:8000');
// });

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 168;  //  8080, 168

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log("a user has connected");
  socket.on('datacontrol', function(data){
    io.emit('datacontrol', data);
  });
  socket.on('dataplayer', function(data){
    io.emit('dataplayer', data);
  });
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});
