module.exports = function() {
  //  node server variables
  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var port = 8080;  //  8080, 168

  app.use(express.static(__dirname + '/public'));

  this.express = express;
  this.app = app;
  this.http = http;
  this.io = io;
  this.port = port;

  //	global variables
  this.BLOCKSIZE = 64;	//	size of one square
  this.scene;
  this.camera;
  this.renderer;
  this.objects = [];
  this.objects_players = [];	//	references to player objects
  // this.origin = new THREE.Vector3(0, 0, 0);
  this.colCount = 16;
  this.rowCount = 12;
  this.totalWidth = BLOCKSIZE * colCount;	//	1024
  this.totalHeight = BLOCKSIZE * rowCount;	//	768
  this.keyMap = {
    "up": 87,
    "down": 83,
    "left": 65,
    "right": 68,
    "jump": 32,
    "use": 74,
    "pickup": 75,
    "drop": 78,
    "grab": 77,
    "dash": 16
  };
  this.timeCurrent = new Date().getTime();
  this.timePrevious = new Date().getTime();
  this.delta;
  this.modifier;	//	modified amount which should equate to moving one block in one second at speed 1
  this.UP_DIRECTION = -1;	//	z-axis
  this.RIGHT_DIRECTION = 1;	//	x-axis
  this.processingObject;	//	helper variable to reference object in process
  this.processingObjectIndex;	//	helper variable to reference object in process
  this.zombieKillCount = 0;
  this.uniqueIndex = 0;
  this.itemStillColliding = false;  //  helper variable to resolve item collisions
  this.objectStillColliding = false;  //  helper variable to resolve item collisions

  //  testing variables
  this.done = false; //  testing flag
  this.PLAYER1 = "ty";

  //  miscellaneous
  this.spawnAtRandomHalfCell = function(makeObject) {
    var num1 = ((Math.floor(Math.random() * colCount * 2) - colCount) * (BLOCKSIZE / 2)) + (BLOCKSIZE / 4);
    var num2 = ((Math.floor(Math.random() * rowCount * 2) - rowCount) * (BLOCKSIZE / 2)) + (BLOCKSIZE / 4);
    makeObject(num1, 0, num2);
  }

  this.findPlayerById = function(element, index, array) {
    if (element == undefined || element == null){
      return;
    }
    return element.playerId == this;
  };

  this.findObjectByUniqueIndex = function(element, index, array) {
    if (element == undefined || element == null){
      return;
    }
    return element.uniqueIndex == this;
  };

  this.getInventoryInfo = function(pId) {
    var thePlayer = objects_players.filter(findPlayerById, pId)[0];
    var theInventory = JSON.parse(JSON.stringify(thePlayer.inventory));
    for (var i = 0; i < theInventory.length; i++) {
      var itemObject = objects.filter(findObjectByUniqueIndex, theInventory[i])[0];
      theInventory[i] = {'name': itemObject.name, 'count': itemObject.ammo};
    }
    return theInventory;
  };

  //  maps name to make functions, may want to make this easier some day, because I have to keep adding it per new object
  this.defaultSpawnLocation = 1;
  this.spawnLocation_upright = {"x": 448, "y": 0, "z": -334};
  this.spawnLocation_downleft = {"x": -448, "y": 0, "z": 206};
  this.spawnLocation;
  this.spawn_map = function(name) {
    //  setup rotating default spawn locations, just two sides for now
    defaultSpawnLocation += 1;
    if (defaultSpawnLocation >= 2) {
      defaultSpawnLocation = 0;
    }
    switch (defaultSpawnLocation) {
      case 0:
        spawnLocation = spawnLocation_upright;
        break;
      case 1:
        spawnLocation = spawnLocation_downleft;
        break;
    }

    switch(name) {
      case "zombie":
        makeZombie(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "fatzombie":
        makeFatzombie(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "worm":
        makeWorm(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "spittingzombie":
        makeSpittingzombie(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "artilleryzombie":
        makeArtilleryzombie(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "bouncingmucus":
        makeBouncingmucus(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "zombieharden":
        makeZombieharden(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "froggy":
        makeFroggy(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "leaper":
        makeLeaper(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "tunneler":
        makeTunneler(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "smellyzombie":
        makeSmellyzombie(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "wavezombie":
        makeWavezombie(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "bubblezombie":
        makeBubblezombie(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
      case "wallzombie":
        makeWallzombie(spawnLocation.x, spawnLocation.y, spawnLocation.z);
        break;
    }
  };

  //  a spawner that spawns the next in line, options delay, placement, must be given name field
  this.spawnerQueue = [];
  this.spawnNext = null;
  this.spawnerTick = 0;
  this.spawner = setInterval(function() {
    spawnerTick += 1;

    if (spawnNext == null) {
      spawnNext = spawnerQueue.shift();
    }

    if (spawnNext) {
      if (spawnNext.delay != undefined && spawnNext.delay == spawnerTick) {
        spawn_map(spawnNext.name);
        spawnerTick = 0;
        spawnNext = null;
      }
    } else {
      spawnerTick = 0;
    }
  }, 1000);

  //  rewards based off kill count for now
  this.rewardItem = function() {
    if (zombieKillCount % 10 == 0) {
      var num1 = Math.random() * totalWidth - (totalWidth / 2);
      var num2 = Math.random() * totalHeight - (totalHeight / 2);
      makeFoamdart_item(num1, 0, num2);
    }
    if (zombieKillCount % 15 == 0) {
      var num1 = Math.random() * totalWidth - (totalWidth / 2);
      var num2 = Math.random() * totalHeight - (totalHeight / 2);
      makeCardboardbox_item(num1, 0, num2);
    }
  };
};
