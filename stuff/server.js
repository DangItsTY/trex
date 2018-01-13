require('./public/gamevars.js')();

//	global physics object
require('./public/physics.js')();

//	all making object functions
require('./public/makes/player.js')();
require('./public/makes/cardboardbox.js')();
require('./public/makes/cardboardbox_item.js')();
require('./public/makes/table.js')();
require('./public/makes/coffeetable.js')();
require('./public/makes/couchseat.js')();
require('./public/makes/couchback.js')();
require('./public/makes/foamdart_item.js')();
require('./public/makes/foamdart.js')();
require('./public/makes/tv.js')();
require('./public/makes/zombie.js')();
require('./public/makes/fatzombie.js')();
require('./public/makes/worm.js')();
require('./public/makes/spittingzombie.js')();
require('./public/makes/spit.js')();
require('./public/makes/exploison.js')();
require('./public/makes/artilleryzombie.js')();
require('./public/makes/exploisonspit.js')();
require('./public/makes/bouncingmucus.js')();
require('./public/makes/bouncingspit.js')();
require('./public/makes/zombieharden.js')();
require('./public/makes/froggy.js')();
require('./public/makes/leaper.js')();
require('./public/makes/tunneler.js')();
require('./public/makes/tunnel.js')();
require('./public/makes/smellyzombie.js')();
require('./public/makes/cloud.js')();
require('./public/makes/wavezombie.js')();
require('./public/makes/bubblezombie.js')();
require('./public/makes/bubble.js')();
require('./public/makes/wallzombie.js')();

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
  makeTable(6*BLOCKSIZE, 0, 4*BLOCKSIZE);

  makeCouchseat(2*BLOCKSIZE, 0, 3.5*BLOCKSIZE);
  makeCouchback(2*BLOCKSIZE, 0, 4.5*BLOCKSIZE);
  makeCouchseat(3*BLOCKSIZE, 0, 3.5*BLOCKSIZE);
  makeCouchback(3*BLOCKSIZE, 0, 4.5*BLOCKSIZE);
  makeCouchseat(4*BLOCKSIZE, 0, 3.5*BLOCKSIZE);
  makeCouchback(4*BLOCKSIZE, 0, 4.5*BLOCKSIZE);

  makeCouchseat(5.5*BLOCKSIZE, 0, 2*BLOCKSIZE);
  makeCouchback(6.5*BLOCKSIZE, 0, 2*BLOCKSIZE);
  makeCouchseat(5.5*BLOCKSIZE, 0, 1*BLOCKSIZE);
  makeCouchback(6.5*BLOCKSIZE, 0, 1*BLOCKSIZE);

  makeCoffeetable(3.5*BLOCKSIZE, 0, 1.5*BLOCKSIZE);
  makeCoffeetable(2.5*BLOCKSIZE, 0, 1.5*BLOCKSIZE);

  makeTv(-4*BLOCKSIZE, 0, -4*BLOCKSIZE);

  makeCouchseat(-3*BLOCKSIZE, 0, -1*BLOCKSIZE);
  makeCouchback(-3*BLOCKSIZE, 0, 0*BLOCKSIZE);
  makeCouchseat(-4*BLOCKSIZE, 0, -1*BLOCKSIZE);
  makeCouchback(-4*BLOCKSIZE, 0, 0*BLOCKSIZE);
  makeCouchseat(-5*BLOCKSIZE, 0, -1*BLOCKSIZE);
  makeCouchback(-5*BLOCKSIZE, 0, 0*BLOCKSIZE);

  makeCardboardbox_item(0*BLOCKSIZE, 0, 0*BLOCKSIZE);
  makeCardboardbox_item(0.5*BLOCKSIZE, 0, 0*BLOCKSIZE);
  makeCardboardbox_item(0.5*BLOCKSIZE, 0, 0.5*BLOCKSIZE);
  makeCardboardbox_item(0*BLOCKSIZE, 0, 0.5*BLOCKSIZE);
  makeFoamdart_item(1.0*BLOCKSIZE, 0, 0*BLOCKSIZE);
  makeFoamdart_item(1.0*BLOCKSIZE, 0, 0.5*BLOCKSIZE);

  //  tutorial level
  // for (var i = 0; i < 15; i++) {
  //    spawnerQueue.push({"name": "froggy", "delay": 5});
  // }

  //  single test zombie
  spawnerQueue.push({"name": "zombie", "delay": 5});

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
