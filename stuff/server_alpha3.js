var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8080;  //  8080, 168

app.use(express.static(__dirname + '/public'));

//	global variables
var BLOCKSIZE = 64;	//	size of one square
var scene;
var camera;
var renderer;
var objects = [];
var objects_players = [];	//	references to player objects
// var origin = new THREE.Vector3(0, 0, 0);
var colCount = 16;
var rowCount = 12;
var totalWidth = BLOCKSIZE * colCount;	//	1024
var totalHeight = BLOCKSIZE * rowCount;	//	768
var keyMap = {
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
var timeCurrent = new Date().getTime();
var timePrevious = new Date().getTime();
var delta;
var modifier;	//	modified amount which should equate to moving one block in one second at speed 1
var UP_DIRECTION = -1;	//	z-axis
var RIGHT_DIRECTION = 1;	//	x-axis
var processingObject;	//	helper variable to reference object in process
var processingObjectIndex;	//	helper variable to reference object in process
var zombieKillCount = 0;
var uniqueIndex = 0;

//  testing variables
var done = false; //  testing flag
var PLAYER1 = "ty";

//	global physics object
var physics = {
  "gravity": 0.2,
  "friction": 0.2,
  "UPBOUND": -(totalHeight / 2) + (BLOCKSIZE / 4),
  "DOWNBOUND": (totalHeight / 2) - (BLOCKSIZE / 4),
  "LEFTBOUND": -(totalWidth / 2) + (BLOCKSIZE / 4),
  "RIGHTBOUND": (totalWidth / 2) - (BLOCKSIZE / 4),
  "BUFFERSIZE": 2,
  "apply": function(data) {
    //  Set variables
    var jumpOffset = 0;
    var sourceData = data;
    var sourcePosition = data.position;
    var targetData;
    var targetPosition;

    //  apply friction
    if (!data.jumpLock) {
      if (data.velocity.x < this.friction && data.velocity.x > -this.friction) {
        data.velocity.x = 0;
      } else if (data.velocity.x > 0) {
        data.velocity.x -= RIGHT_DIRECTION * this.friction * modifier;
      } else if (data.velocity.x < 0) {
        data.velocity.x -= (RIGHT_DIRECTION * -1) * this.friction * modifier;
      }
      if (data.velocity.z < this.friction && data.velocity.z > -this.friction) {
        data.velocity.z = 0;
      } else if (data.velocity.z > 0) {
        data.velocity.z -= RIGHT_DIRECTION * this.friction * modifier;
      } else if (data.velocity.z < 0) {
        data.velocity.z -= (RIGHT_DIRECTION * -1) * this.friction * modifier;
      }
    }

    //	set movement
    data.position.x += data.velocity.x * modifier;
    data.position.y += data.velocity.y * modifier;
    data.position.z += data.velocity.z * modifier;

    //	jump
    if (!data.carried) {
      if (data.position.y > 0) {
        data.velocity.y -= this.gravity * modifier;
      }
    }

    //	collision
    var itemStillColliding = false;
    var objectStillColliding = false;
    for (var i = 0; i < objects.length; i++) {
      if (objects[i] != null) {
        if (
          objects[i] != data && (objects[i].collision != "none" && sourceData.collision != "none") && !objects[i].itemized && !sourceData.itemized &&  //  not self, none are none collision, not itemized
          objects[i].name != sourceData.name
        ) {
          targetData = objects[i];
          targetPosition = objects[i].position;
          var sourceVertices = [
            {"x": sourcePosition.x - (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": sourcePosition.z - (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": sourcePosition.x + (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": sourcePosition.z - (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": sourcePosition.x + (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": sourcePosition.z + (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": sourcePosition.x - (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": sourcePosition.z + (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
          ];
          var targetVertices = [
            {"x": targetPosition.x - (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": targetPosition.z - (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": targetPosition.x + (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": targetPosition.z - (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": targetPosition.x + (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": targetPosition.z + (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": targetPosition.x - (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": targetPosition.z + (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)}
          ];
          if (
            (this.pointInSquareCollision(sourceVertices, targetVertices) || this.pointInSquareCollision(targetVertices, sourceVertices)) &&
            (targetPosition.y + (targetData.height * BLOCKSIZE) >= sourcePosition.y && targetPosition.y <= sourcePosition.y)
          ) {
            if (sourceData.collision == "solid" && targetData.collision == "solid") {
              //	jump on top
              if (sourceData.velocity.y <= 0 && (sourcePosition.y + (-1 * sourceData.velocity.y) >= targetPosition.y + (targetData.height * BLOCKSIZE))) {
                data.position.y = targetPosition.y + (targetData.height * BLOCKSIZE);
                data.velocity.y = 0;
                data.jumpLock = false;
              } else {
                //	undo the movements
                data.position.x -= data.velocity.x * modifier;
                data.position.z -= data.velocity.z * modifier;
              }

              //  select adjacent objects to pick up
              if (sourceData.name == "player" && targetData.name == "cardboardbox") {
                sourceData.adjacentObject = targetData.uniqueIndex;
                objectStillColliding = true;
              }

              //	check for zombie kill
              if (sourceData.alive && targetData.alive && (sourceData.name == "zombie" && targetData.name == "foamdart" || targetData.name == "zombie" && sourceData.name == "foamdart")) {
                zombieKillCount += 1;
                rewardItem();
                sourceData.alive = false;
                targetData.alive = false;
              }
              // if (!done) {
              //   console.log(i);
              //   console.log(sourceData);
              //   console.log(targetData);
              //   done = true;
              // }
            } else if ((sourceData.name == "player" && (targetData.collision == "item" && !targetData.itemized))) {
              //  selected item
              sourceData.selectedItem = targetData.uniqueIndex;
              itemStillColliding = true;
            } else if ((targetData.name == "player" && (sourceData.collision == "item" && !sourceData.itemized))) {
              //  selected item
              targetData.selectedItem = sourceData.uniqueIndex;
              itemStillColliding = true;
            }
          }
        }
      }
    }
    if (!itemStillColliding && sourceData.selectedItem) {
      sourceData.selectedItem = null;
    }
    if (!objectStillColliding && sourceData.adjacentObject) {
      sourceData.adjacentObject = null;
    }

    //  wall collision
    if (
      sourceData.position.z < physics.UPBOUND - this.BUFFERSIZE ||
      sourceData.position.z > physics.DOWNBOUND + this.BUFFERSIZE ||
      sourceData.position.x < physics.LEFTBOUND - this.BUFFERSIZE ||
      sourceData.position.x > physics.RIGHTBOUND + this.BUFFERSIZE
    ) {
      data.position.x -= data.velocity.x * modifier;
      data.position.z -= data.velocity.z * modifier;
    }

    //  floor collision
    if (sourceData.position.y < 0) {
      data.position.y = 0;
      data.velocity.y = 0;
      data.jumpLock = false;
    }

    //	set render positions
    data.renderPos.x = data.position.x;
    data.renderPos.y = data.position.y;
    data.renderPos.z = data.position.z;
  },
  "boxCollisionOld": function(targetPosition, targetData, sourcePosition, sourceData) {
    if (
      ((targetPosition.x + (BLOCKSIZE * targetData.size / 2) >= sourcePosition.x - (BLOCKSIZE * sourceData.size / 2) && targetPosition.x + (BLOCKSIZE * targetData.size / 2) <= sourcePosition.x + (BLOCKSIZE * sourceData.size / 2)) ||
      (targetPosition.x - (BLOCKSIZE * targetData.size / 2) >= sourcePosition.x - (BLOCKSIZE * sourceData.size / 2) && targetPosition.x - (BLOCKSIZE * targetData.size / 2) <= sourcePosition.x + (BLOCKSIZE * sourceData.size / 2))) &&
      ((targetPosition.z + (BLOCKSIZE * targetData.size / 2) >= sourcePosition.z - (BLOCKSIZE * sourceData.size / 2) && targetPosition.z + (BLOCKSIZE * targetData.size / 2) <= sourcePosition.z + (BLOCKSIZE * sourceData.size / 2)) ||
      (targetPosition.z - (BLOCKSIZE * targetData.size / 2) >= sourcePosition.z - (BLOCKSIZE * sourceData.size / 2) && targetPosition.z - (BLOCKSIZE * targetData.size / 2) <= sourcePosition.z + (BLOCKSIZE * sourceData.size / 2))) &&
      (targetPosition.y + targetData.height >= sourcePosition.y && targetPosition.y <= sourcePosition.y)
    ) {
      return true;
    } else {
      return false;
    }
  },
  "pointInPolygonCollisionOld": function(point, rectVertices) {
    //  Implementing a "Point in Polygon" using a ray casting algorithm
    var collided = false;
    for (var i = 0; i < 4; i++) {
      var v1 = rectVertices[i];
      var v2 = rectVertices[i+1] || rectVertices[0];
      if (((point.z > v1.z) != (point.z > v2.z)) &&
      (point.x < ((v1.x - v2.x) * v1.z / (v1.z - v2.z)))) {
        collided = !collided;
      }
    }
    return collided;
  },
  "pointInSquareCollision": function(sourceVertices, targetVertices) {
    //  Implementing a "Point in Polygon" using a ray casting to the right algorithm.
    //  If any source points pass the test, then collision is true
    //  Winding order is top left, clockwise
    var collided = false;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        var p = sourceVertices[i];
        var v1 = targetVertices[j];
        var v2 = targetVertices[j + 1] || targetVertices[0];
        if (
          ((p.z > v1.z) != (p.z > v2.z)) &&
          (p.x < v1.x)
        ) {
          collided = !collided;
        }
      }
      if (collided) {
        return collided;
      }
    }
    return false;
  }
};


//	all making object functions
var makePlayer = function(varX, varY, varZ, varId) {
  var data = {
    "name": "player",
    "size": 0.5,
    "height": 1,
    "speed": 2,
    "jumpSpeed": 4.0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "useLock": false,
    "pickupLock": false,
    "dropLock": false,
    "grabLock": false,
    "dashLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 1.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ff00,
    "sizes": {"x": 0.5, "y": 1, "z": 0.5},
    "collision": "solid",
    "playerId": varId,
    "keys": [],
    "inventory": [],
    "inventoryMax": 2,
    "selectedItem": null,
    "adjacentObject": null,
    "carriedObject": null,
    "dae": "person.dae"
  };
  data.act = function() {
    //	get input
    if (data.keys[keyMap.up]) {
      if (Math.abs(data.velocity.z) < data.speed) {
        if (data.keys[keyMap.left] || data.keys[keyMap.right]) {
          data.velocity.z = (data.speed * UP_DIRECTION) / Math.sqrt(2);
        } else {
          data.velocity.z = data.speed * UP_DIRECTION;
        }
      } else if (Math.abs(data.velocity.z)/data.velocity.z != UP_DIRECTION) {
        data.velocity.z += physics.friction * UP_DIRECTION * modifier;
      }
      data.direction.z = UP_DIRECTION;
      data.direction.x = 0;
    }
    if (data.keys[keyMap.down]) {
      if (Math.abs(data.velocity.z) < data.speed) {
        if (data.keys[keyMap.left] || data.keys[keyMap.right]) {
          data.velocity.z = (data.speed * (UP_DIRECTION * -1)) / Math.sqrt(2);
        } else {
          data.velocity.z = data.speed * (UP_DIRECTION * -1);
        }
      } else if (Math.abs(data.velocity.z)/data.velocity.z != (UP_DIRECTION * -1)) {
        data.velocity.z += physics.friction * (UP_DIRECTION * -1) * modifier;
      }
      data.direction.z = UP_DIRECTION * -1;
      data.direction.x = 0;
    }
    if (data.keys[keyMap.left]) {
      if (Math.abs(data.velocity.x) < data.speed) {
        if (data.keys[keyMap.up] || data.keys[keyMap.down]) {
          data.velocity.x = (data.speed * (RIGHT_DIRECTION * -1)) / Math.sqrt(2);
        }
        else {
          data.velocity.x = data.speed * (RIGHT_DIRECTION * -1);
        }
      } else if (Math.abs(data.velocity.x)/data.velocity.x != (RIGHT_DIRECTION * -1)) {
        data.velocity.x += physics.friction * (RIGHT_DIRECTION * -1) * modifier;
      }
      data.direction.x = RIGHT_DIRECTION * -1;
      data.direction.z = 0;
    }
    if (data.keys[keyMap.right]) {
      if (Math.abs(data.velocity.x) < data.speed) {
        if (data.keys[keyMap.up] || data.keys[keyMap.down]) {
          data.velocity.x = (data.speed * RIGHT_DIRECTION) / Math.sqrt(2);
        } else {
          data.velocity.x = data.speed * RIGHT_DIRECTION;
        }
      } else if (Math.abs(data.velocity.x)/data.velocity.x != RIGHT_DIRECTION) {
        data.velocity.x += physics.friction * RIGHT_DIRECTION * modifier;
      }
      data.direction.x = RIGHT_DIRECTION;
      data.direction.z = 0;
    }
    //	jump
    if (data.keys[keyMap.jump] && !data.jumpLock) {
      data.velocity.y = data.jumpSpeed;
      data.jumpLock = true;
    }

    //	use
    if (data.keys[keyMap.use] && !data.useLock) {
      if (data.inventory.length > 0) {
        var last = data.inventory.length - 1;
        var objectItem;
        if (data.inventory[last].length > 0) {
          var lastInList = data.inventory[last].length - 1;
          objectItem = objects.filter(findObjectByUniqueIndex, data.inventory[last][lastInList])[0];
        } else {
          objectItem = objects.filter(findObjectByUniqueIndex, data.inventory[last])[0];
        }
        objectItem.use();
      }
      data.useLock = true;
    }
    if (!data.keys[keyMap.use]) {
      data.useLock = false;
    }

    //  pickup
    if (data.keys[keyMap.pickup] && !data.pickupLock && data.selectedItem != null) {
      var objectItem = objects.filter(findObjectByUniqueIndex, data.selectedItem)[0];
      objectItem.owner = data.playerId;
      objectItem.pickup();
      data.pickupLock = true;
    }
    if (!data.keys[keyMap.pickup]) {
      data.pickupLock = false;
    }

    //  drop
    if (data.keys[keyMap.drop] && !data.dropLock && data.inventory.length > 0) {
      var last = data.inventory.length - 1;

      var objectItem = objects.filter(findObjectByUniqueIndex, data.inventory[last])[0];
      objectItem.owner = null;
      objectItem.itemized = false;
      objectItem.position.x = data.position.x;
      objectItem.position.y = data.position.y;
      objectItem.position.z = data.position.z;
      objectItem.velocity.x = data.velocity.x;
      objectItem.velocity.y = data.velocity.y + 4;
      objectItem.velocity.z = data.velocity.z;

      data.inventory.pop();
      data.dropLock = true;
    }
    if (!data.keys[keyMap.drop]) {
      data.dropLock = false;
    }

    //  grab
    if (data.keys[keyMap.grab] && !data.grabLock && data.adjacentObject != null && data.carriedObject == null) {
      var objectGrabbed = objects.filter(findObjectByUniqueIndex, data.adjacentObject)[0];
      objectGrabbed.carried = true;
      objectGrabbed.carriedBy = data;
      objectGrabbed.collision = "none";
      objectGrabbed.position.x = data.position.x;
      objectGrabbed.position.y = data.position.y + ((data.size + data.height) * BLOCKSIZE);
      objectGrabbed.position.z = data.position.z;
      data.carriedObject = data.adjacentObject;
      data.adjacentObject = null;
      data.grabLock = true;
    }
    //  throw
    if (data.keys[keyMap.grab] && !data.grabLock && data.carriedObject != null) {
      var objectGrabbed = objects.filter(findObjectByUniqueIndex, data.carriedObject)[0];
      objectGrabbed.carried = false;
      objectGrabbed.collision = "solid";
      objectGrabbed.velocity.x = data.velocity.x;
      objectGrabbed.velocity.y = data.velocity.y + 2;
      objectGrabbed.velocity.z = data.velocity.z;
      data.carriedObject = null;
      data.grabLock = true;
    }
    if (!data.keys[keyMap.grab]) {
      data.grabLock = false;
    }

    //  dash
    if (data.keys[keyMap.dash] && !data.dashLock) {
      if ((data.keys[keyMap.up] || data.keys[keyMap.down]) && (data.keys[keyMap.left] || data.keys[keyMap.right])) {
        data.velocity.x = ((Math.abs(data.velocity.x) / data.velocity.x) * data.speed * 3) / Math.sqrt(2);
        data.velocity.z = ((Math.abs(data.velocity.z) / data.velocity.z) * data.speed * 3) / Math.sqrt(2);
      } else {
        data.velocity.x = data.direction.x * data.speed * 3;
        data.velocity.z = data.direction.z * data.speed * 3;
      }
      data.dashLock = true;
    }
    if (!data.keys[keyMap.dash]) {
      data.dashLock = false;
    }

    //  apply physics
    physics.apply(data);
  };
  objects.push(data);
  objects_players.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeCardboardbox = function(varX, varY, varZ) {
  var data = {
    "name": "cardboardbox",
    "size": 0.5,
    "height": 0.5,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 0.5,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ffff,
    "sizes": {"x": 0.5, "y": 1, "z": 0.5},
    "collision": "solid",
    "carried": false,
    "carriedBy": null,
    "dae": "cardboardbox.dae"
  };
  data.act = function() {
    if (data.position.y == 0) {
      data.carriedBy = null;
      data.jumpLock = false;
    }

    if (data.carried) {
      data.position.x = data.carriedBy.position.x;
      data.position.y = data.carriedBy.position.y + ((data.carriedBy.size + data.carriedBy.height) * BLOCKSIZE);
      data.position.z = data.carriedBy.position.z;
      data.jumpLock = true;
    }

    //	apply physics
    physics.apply(data);
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeCardboardbox_item = function(varX, varY, varZ) {
  var data = {
    "name": "cardboardbox_item",
    "size": 0.25,
    "height": 1,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 0.25,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ffff,
    "sizes": {"x": 0.25, "y": 1, "z": 0.25},
    "collision": "item",
    "carried": false,
    "carriedBy": null,
    "owner": null,
    "itemized": false,
    "ammo": 1,
    "ammoMax": 4,
    "dae": "default.dae"
  };
  data.act = function() {
    if (data.itemized) {
      data.position.y = 1000;
    }

    if (data.ammo <= 0) {
      var ownerObject = objects_players.filter(findPlayerById, data.owner)[0];
      ownerObject.inventory.pop();
      data.alive = false;
    }

    //	apply physics
    physics.apply(data);
  };
  data.use = function() {
    if (data.ammo > 0) {
      var ownerObject = objects_players.filter(findPlayerById, data.owner)[0];
      var offset = ((ownerObject.size / 2) * BLOCKSIZE) + (BLOCKSIZE / 4);
      makeCardboardbox(ownerObject.position.x + (ownerObject.direction.x * offset), ownerObject.position.y, ownerObject.position.z + (ownerObject.direction.z * offset), ownerObject.direction.x, ownerObject.direction.z);
      data.ammo -= 1;
    }
  };
  data.pickup = function() {
    var playerObject = objects_players.filter(findPlayerById, data.owner)[0];
    if (playerObject.inventory.length > 0) {
      var last = playerObject.inventory.length - 1;
      var playerItem = objects.filter(findObjectByUniqueIndex, playerObject.inventory[last])[0];
      if (playerItem.name == data.name && playerItem.ammo < playerItem.ammoMax) {
        var ammoFree = playerItem.ammoMax - playerItem.ammo;
        if (ammoFree < data.ammo) {
          playerItem.ammo = playerItem.ammoMax;
          data.ammo -= ammoFree;
        } else if (ammoFree >= data.ammo) {
          if (ammoFree == data.ammo) {
            playerItem.ammo = playerItem.ammoMax;
          } else {
            playerItem.ammo += data.ammo;
          }
          data.alive = false;
          playerObject.selectedItem = null;
        }
      } else if (playerObject.inventory.length < playerObject.inventoryMax) {
        var newItem = data;
        newItem.itemized = true;
        playerObject.inventory.push(data.uniqueIndex);
        playerObject.selectedItem = null;
      }
    } else {
      var newItem = data;
      newItem.itemized = true;
      playerObject.inventory.push(data.uniqueIndex);
      playerObject.selectedItem = null;
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeTable = function(varX, varY, varZ) {
  var data = {
    "name": "table",
    "size": 2.0,
    "height": 1,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 2.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ffff,
    "sizes": {"x": 3, "y": 1, "z": 3},
    "collision": "solid",
    "carried": false,
    "carriedBy": null,
    "dae": "table.dae"
  };
  data.act = function() {
    if (data.carried) {
      data.position.x = data.carriedBy.position.x;
      data.position.y = data.carriedBy.position.y + (data.carriedBy.size * BLOCKSIZE);
      data.position.z = data.carriedBy.position.z;
    }

    //	apply physics
    physics.apply(data);
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeCoffeetable = function(varX, varY, varZ) {
  var data = {
    "name": "table",
    "size": 1.0,
    "height": 0.5,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 1.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ffff,
    "sizes": {"x": 3, "y": 1, "z": 3},
    "collision": "solid",
    "carried": false,
    "carriedBy": null,
    "dae": "coffeetable.dae"
  };
  data.act = function() {
    if (data.carried) {
      data.position.x = data.carriedBy.position.x;
      data.position.y = data.carriedBy.position.y + (data.carriedBy.size * BLOCKSIZE);
      data.position.z = data.carriedBy.position.z;
    }

    //	apply physics
    physics.apply(data);
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeCouchseat = function(varX, varY, varZ) {
  var data = {
    "name": "couchseat",
    "size": 1.0,
    "height": 0.5,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 1.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ffff,
    "sizes": {"x": 3, "y": 1, "z": 3},
    "collision": "solid",
    "carried": false,
    "carriedBy": null,
    "dae": "couchseat.dae"
  };
  data.act = function() {
    if (data.carried) {
      data.position.x = data.carriedBy.position.x;
      data.position.y = data.carriedBy.position.y + (data.carriedBy.size * BLOCKSIZE);
      data.position.z = data.carriedBy.position.z;
    }

    //	apply physics
    physics.apply(data);
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeCouchback = function(varX, varY, varZ) {
  var data = {
    "name": "couchback",
    "size": 1.0,
    "height": 1,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 1.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ffff,
    "sizes": {"x": 3, "y": 1, "z": 3},
    "collision": "solid",
    "carried": false,
    "carriedBy": null,
    "dae": "couchback.dae"
  };
  data.act = function() {
    if (data.carried) {
      data.position.x = data.carriedBy.position.x;
      data.position.y = data.carriedBy.position.y + (data.carriedBy.size * BLOCKSIZE);
      data.position.z = data.carriedBy.position.z;
    }

    //	apply physics
    physics.apply(data);
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeFoamdart_item = function(varX, varY, varZ) {
  var data = {
    "name": "foamdart_item",
    "size": 0.25,
    "height": 1,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": RIGHT_DIRECTION, "z": 0},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 1.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x99ff99,
    "sizes": {"x": 0.25, "y": 1, "z": 0.25},
    "collision": "item",
    "owner": null,
    "itemized": false,
    "ammo": 15,
    "ammoMax": 15,
    "dae": "foamdartgun.dae"
  };
  data.act = function() {
    var ownerObject = objects_players.filter(findPlayerById, data.owner)[0];
    if (data.itemized) {
      data.position.x = ownerObject.position.x;
      data.position.y = ownerObject.position.y;
      data.position.z = ownerObject.position.z;
      data.direction.x = ownerObject.direction.x;
      data.direction.z = ownerObject.direction.z;
    }

    if (data.ammo <= 0) {
      ownerObject.inventory.pop();
      data.alive = false;
    }
    //	apply physics
    physics.apply(data);
  };
  data.use = function() {
    if (data.ammo > 0) {
      var ownerObject = objects_players.filter(findPlayerById, data.owner)[0];
      var offset = ((ownerObject.size / 2) * BLOCKSIZE) + (BLOCKSIZE / 4);
      makeFoamdart(ownerObject.position.x + (ownerObject.direction.x * offset), ownerObject.position.y + (ownerObject.height / 2 * BLOCKSIZE), ownerObject.position.z + (ownerObject.direction.z * offset), ownerObject.direction.x, ownerObject.direction.z);
      data.ammo -= 1;
    }
  };
  data.pickup = function() {
    var playerObject = objects_players.filter(findPlayerById, data.owner)[0];
    if (playerObject.inventory.length > 0) {
      var last = playerObject.inventory.length - 1;
      var playerItem = objects.filter(findObjectByUniqueIndex, playerObject.inventory[last])[0];
      if (playerItem.name == "foamdart_item" && playerItem.ammo < playerItem.ammoMax) {
        var ammoFree = playerItem.ammoMax - playerItem.ammo;
        if (ammoFree < data.ammo) {
          playerItem.ammo = playerItem.ammoMax;
          data.ammo -= ammoFree;
        } else if (ammoFree >= data.ammo) {
          if (ammoFree == data.ammo) {
            playerItem.ammo = playerItem.ammoMax;
          } else {
            playerItem.ammo += data.ammo;
          }
          data.alive = false;
          playerObject.selectedItem = null;
        }
      } else if (playerObject.inventory.length < playerObject.inventoryMax) {
        var newItem = data;
        newItem.itemized = true;
        playerObject.inventory.push(data.uniqueIndex);
        playerObject.selectedItem = null;
      }
    } else {
      var newItem = data;
      newItem.itemized = true;
      playerObject.inventory.push(data.uniqueIndex);
      playerObject.selectedItem = null;
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeFoamdart = function(varX, varY, varZ, dirX, dirZ) {
  var data = {
    "name": "foamdart",
    "size": 0.25,
    "height": 1,
    "speed": 8,
    "jumpSpeed": 2,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 2, "z": 0},
    "direction": {"x": dirX, "z": dirZ},
    "jumpLock": true,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 0.25,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x009900,
    "sizes": {"x": 0.25, "y": 1, "z": 0.25},
    "collision": "solid",
    "owner": null,
    "itemized": false,
    "dae": "foamdart.dae"
  };
  data.velocity.x = data.speed * data.direction.x;
  data.velocity.z = data.speed * data.direction.z;
  //  adjust speed for diagonals
  if (data.direction.x != 0 && data.direction.z != 0) {
    data.velocity.x = data.velocity.x / Math.sqrt(2);
    data.velocity.z = data.velocity.z / Math.sqrt(2);
  }
  data.act = function() {
    //  when it stops moving, change collision to itemized
    if (
      Math.floor(data.velocity.x) == 0 &&
      Math.floor(data.velocity.y) == 0 &&
      Math.floor(data.velocity.z) == 0
    ) {
      data.collision = "item";
    }
    //	apply physics
    physics.apply(data);
  };
  data.pickup = function() {
    var playerObject = objects_players.filter(findPlayerById, data.owner)[0];
    if (playerObject.inventory.length > 0) {
      var last = playerObject.inventory.length - 1;
      var playerItem = objects.filter(findObjectByUniqueIndex, playerObject.inventory[last])[0];
      if (playerItem.name == "foamdart_item" && playerItem.ammo < playerItem.ammoMax) {
        playerItem.ammo += 1;
        data.alive = false;
        playerObject.selectedItem = null;
      }
    } else {
      makeFoamdart_item(0, 0, 0);
      var newItem = objects[objects.length - 1];
      newItem.itemized = true;
      newItem.owner = data.owner;
      newItem.ammo = 1;
      playerObject.inventory.push(newItem.uniqueIndex);
      playerObject.selectedItem = null;
      data.alive = false;
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeTv = function(varX, varY, varZ) {
  var data = {
    "name": "tv",
    "size": 2.0,
    "height": 2,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION * -1},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 1.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ffff,
    "sizes": {"x": 3, "y": 1, "z": 3},
    "collision": "solid",
    "carried": false,
    "carriedBy": null,
    "dae": "tv.dae"
  };
  data.act = function() {
    if (data.carried) {
      data.position.x = data.carriedBy.position.x;
      data.position.y = data.carriedBy.position.y + (data.carriedBy.size * BLOCKSIZE);
      data.position.z = data.carriedBy.position.z;
    }

    //	apply physics
    physics.apply(data);
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var makeZombie = function(varX, varY, varZ) {
  var data = {
    "name": "zombie",
    "size": 0.5,
    "height": 11,
    "speed": 1,
    "jumpSpeed": 2,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 0.5,
    "alive": true,
    "target": null,
    "uniqueIndex": uniqueIndex,
    "color": 0xff0000,
    "sizes": {"x": 0.5, "y": 1, "z": 0.5},
    "collision": "solid",
    "dae": "zombie.dae"
  };
  data.act = function() {
    //	select a target
    if (data.target == null) {
      var num = Math.floor(Math.random() * objects_players.length);
      data.target = objects_players[num];
    } else {
      //	chase player
      if (
        data.target.position.z - (data.target.size / 2 * BLOCKSIZE) < data.position.z &&
        data.target.position.z + (data.target.size / 2 * BLOCKSIZE) > data.position.z
      ) {
        //	go horizontal
        if (data.target.position.x < data.position.x) {
          data.direction.x = RIGHT_DIRECTION * -1;
          data.direction.z = 0;
        } else if (data.target.position.x > data.position.x) {
          data.direction.x = RIGHT_DIRECTION;
          data.direction.z = 0;
        }
      } else {
        //	go vertical
        if (data.target.position.z < data.position.z) {
          data.direction.z = UP_DIRECTION;
          data.direction.x = 0;
        } else if (data.target.position.z > data.position.z) {
          data.direction.z = UP_DIRECTION * - 1;
          data.direction.x = 0;
        }
      }
    }

    //	set velocity
    data.velocity.x = data.speed * data.direction.x;
    data.velocity.z = data.speed * data.direction.z;

    //	apply physics
    physics.apply(data);
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

var removeObject = function(objectData, objectIndex) {
  io.emit('remove object', objectData);
  objects[objectIndex] = null;
};

//	miscellaneous
var spawnAtRandomHalfCell = function(makeObject) {
  var num1 = ((Math.floor(Math.random() * colCount * 2) - colCount) * (BLOCKSIZE / 2)) + (BLOCKSIZE / 4);
  var num2 = ((Math.floor(Math.random() * rowCount * 2) - rowCount) * (BLOCKSIZE / 2)) + (BLOCKSIZE / 4);
  makeObject(num1, 0, num2);
}

var findPlayerById = function(element, index, array) {
  if (element == undefined || element == null){
    return;
  }
  return element.playerId == this;
};

var findObjectByUniqueIndex = function(element, index, array) {
  if (element == undefined || element == null){
    return;
  }
  return element.uniqueIndex == this;
};

var getInventoryInfo = function(pId) {
  var thePlayer = objects_players.filter(findPlayerById, pId)[0];
  var theInventory = JSON.parse(JSON.stringify(thePlayer.inventory));
  for (var i = 0; i < theInventory.length; i++) {
    var itemObject = objects.filter(findObjectByUniqueIndex, theInventory[i])[0];
    theInventory[i] = {'name': itemObject.name, 'count': itemObject.ammo};
  }
  return theInventory;
};

//  maps name to make functions, may want to make this easier some day, because I have to keep adding it per new object
var defaultSpawnLocation = 1;
var spawnLocation_upright = {"x": 448, "y": 0, "z": -334};
var spawnLocation_downleft = {"x": -448, "y": 0, "z": 206};
var spawnLocation;
var spawn_map = function(name) {
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
  }
};

//  a spawner that spawns the next in line, options delay, placement, must be given name field
var spawnerQueue = [];
var spawnNext = null;
var spawnerTick = 0;
var spawner = setInterval(function() {
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
var rewardItem = function() {
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

var frameCount = 0;
var gameloop = function() {
    //  get delta frame time
    timeCurrent = new Date().getTime();
    delta = (timeCurrent - timePrevious) / 1000;
    modifier = delta * BLOCKSIZE;
    timePrevious = timeCurrent;

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
      var newInfo = {
        'zombieKillCount': zombieKillCount,
        'inventoryList': getInventoryInfo(playerUniqueId)
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
  for (var i = 0; i < 15; i++) {
    spawnerQueue.push({"name": "zombie", "delay": 5});
  }

  setInterval(gameloop, 1);
};
initialize();


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

http.listen(port, function(){
  console.log('listening on *:'+port);
});
