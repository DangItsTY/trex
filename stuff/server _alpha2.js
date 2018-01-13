var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 168;  //  8080, 168

app.use(express.static(__dirname + '/public'));








// var storage = {'x': 0, 'y': 10, 'z': 10};
//
// io.on('connection', function(socket){
//   console.log("a user has connected");
//   socket.on('datacontrol', function(data){
//     io.emit('datacontrol', data);
//   });
//   socket.on('dataplayer', function(data){
//     io.emit('dataplayer', data);
//   });
//   socket.on('datamove', function(data){
//     if (data.left) {
//       storage.x = -5;
//       io.emit('datamove', {'x': storage.x, 'y': storage.y, 'z': storage.z});
//     } else if (data.right) {
//       storage.x = 5;
//       io.emit('datamove', {'x': storage.x, 'y': storage.y, 'z': storage.z});
//     }
//   });
// });

var objectList = [];

var createPlayer = function(dataId) {
  var newObject = {
    'id': dataId,
    'name': 'player',
    'x': 0,
    'y': 10,
    'z': 0,
    'speed': 100,
    'velocity': {'x': 0, 'y': 0, 'z': 0}
  };

  //  store object
  objectList.push(newObject);

  //  update everyone
  io.emit('new player', newObject);
};

var movePlayer = function(data) {
  var theObject = objectList[findObjectIndexById(objectList, data.id)];
  theObject.x = data.x;
  theObject.y = data.y;
  theObject.z = data.z;
  io.emit('set object position', theObject);
};

io.on('connection', function(socket){
  console.log("a user has connected");

  socket.on('new player', function(dataId) {
    //  create a player upon connection
    console.log("creating new player...");
    createPlayer(dataId);

    //  give player information about all objects
    io.emit('update objects', objectList);
  });

  socket.on('set object position', function(data) {
    //console.log("setting new object position...");
    movePlayer(data);
  });




  // socket.on('datacontrol', function(data){
  //   io.emit('datacontrol', data);
  // });
});


//  helper functions
var findObjectIndexById = function(theList, id) {
  return theList.findIndex(function(element, index, array) {
      return element.id == id;
  }, id);
};








http.listen(port, function(){
  console.log('listening on *:'+port);
});
