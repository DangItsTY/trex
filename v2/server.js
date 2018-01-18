require('./public/js/gamevars.js')();

//	global physics object
require('./public/js/physics.js')();

//	all making object functions
require('./public/makes/player.js')();
require('./public/makes/basic.js')();
require('./public/makes/basicitem.js')();
require('./public/makes/wood.js')();
require('./public/makes/log.js')();
require('./public/makes/arrow.js')();
require('./public/makes/tree.js')();
require('./public/makes/workbench.js')();
require('./public/makes/arrowshop.js')();
require('./public/makes/tower.js')();

require('./public/js/scene.js')();

var frameCount = 0;
var gameloop = function() {
    //  get delta frame time
    timeCurrent = new Date().getTime();
    delta = (timeCurrent - timePrevious) / 1000;
    modifier = delta * BLOCKSIZE;
    timePrevious = timeCurrent;

    //  prioritize objects
    //objects.;

    //	act all objects
    for (var i = 0; i < objects.length; i++) {
      if (objects[i] != null) {
        processingObject = objects[i];
        processingObjectIndex = i;
        objects[i].act();
      }
    }

    //	clean up
    for (var i = 0; i < objects.length; i++) {
      if (objects[i] != null) {
        //	remove any objects that are way out of bounds
        //	remove any objects that are not alive
        processingObject = objects[i];
        processingObjectIndex = i;
        if (
            (
              objects[i].position.x < -2000 ||
              objects[i].position.x > 2000 ||
              objects[i].position.z < -2000 ||
              objects[i].position.z > 2000
            ) ||
            (
              !objects[i].alive
            )
        ) {
          removeObject(objects[i], i);
          i--;
        }
      }
    }

    frameCount += 1;
    if (frameCount % 2 == 0) {
      io.emit('update objects', objects);
      frameCount = 0;
    }

    //  send updates to players
    for (var i = 0; i < objects_players.length; i++) {
      var playerUniqueId = objects_players[i].playerId;
      var playerObject = objects_players.filter(findPlayerById, playerUniqueId)[0];
      var newInfo = {
        'zombieKillCount': zombieKillCount,
        'inventoryList': getInventoryInfo(playerUniqueId),
        'healthPoints': playerObject.health
      };
      io.sockets.connected[playerUniqueId].emit('update info', newInfo);
    }

    // if (delta < 0.2) {
    //   setTimeout(gameloop);
    // } else {
    //   setImmediate(gameloop);
    // }

    //setImmediate(gameloop);
};

// var gameloop_client = function() {
//   io.emit('update objects', objects);
//   var newInfo = {
//     'zombieKillCount': zombieKillCount,
//     'inventoryList': getInventoryInfo(PLAYER1)
//   };
//   io.emit('update info', newInfo);
// };
// setInterval(gameloop_client, 20);

var initialize = function() {
  scene();
  setInterval(gameloop, 1);
};
initialize();

app.use(express.static(__dirname + '/public'));

//  server functions
io.on('connection', function(socket) {
  console.log("a player has connected");
  io.sockets.connected[socket.id].emit('update self', socket.id);
  // io.sockets.connected[socket.id].emit('update self', "ty");
  io.sockets.connected[socket.id].emit('update objects', objects);
  var playerExist = objects_players.filter(findPlayerById, socket.id)[0];
  if (playerExist == undefined) {
    makePlayer(0, 0, 0, socket.id);
  }

  socket.on('input control', function(dataKeys, dataId) {
    var inputPlayer = objects_players.filter(findPlayerById, dataId)[0];
    inputPlayer.keys = dataKeys;
  });
});

var removeObject = function(objectData, objectIndex) {
  io.emit('remove object', objectData);
  objects[objectIndex] = null;
};

http.listen(port, function(){
  console.log('listening on *:'+port);
});