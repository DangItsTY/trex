var makePlayer = function(varX, varY, varZ, varId) {
  var data = {
    "name": "player",
    "type": "player",
    "size": 0.5,
    "health": 10,
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
    "dae": "models/person.dae",
    "invulnerable": false,
    "invulnerableTimer": 0,
    "invulnerableTimerMax": 2.0
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
	
	//	interact NEW!!!
    if (data.keys[keyMap.use] && !data.useLock && data.adjacentObject != null) {
		console.log("am i interacting");
		var target = objects.filter(findObjectByUniqueIndex, data.adjacentObject)[0];
		if (typeof(target.interact) == 'function') {
			target.interact(data);
		}
		
		data.adjacentObject = null;
		data.useLock = true;
    }
    if (!data.keys[keyMap.use]) {
      data.useLock = false;
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

    //  invulnerability
    if (data.invulnerableTimer >= data.invulnerableTimerMax) {
      data.invulnerableTimer = 0;
    } else if (data.invulnerableTimer > 0) {
      data.invulnerableTimer += delta;
    }

    //  apply physics
    physics.apply(data);
  };
  data.collide = function(targetData) {
    data.adjacentObject = targetData.uniqueIndex;
    objectStillColliding = true;
  };
  data.onDamage = function(sourceData) {
    if (data.invulnerableTimer == 0) {
      data.health -= sourceData.damage;
      data.invulnerableTimer += delta;
    }
    if (data.health <= 0 && !data.invulnerable) {
      data.alive = false;
    }
  };
  objects.push(data);
  objects_players.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makePlayer = makePlayer; };
