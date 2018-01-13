var makeFoamdart = function(varX, varY, varZ, dirX, dirZ) {
  var data = {
    "name": "foamdart",
    "type": "player",
    "size": 0.25,
    "height": 1,
    "speed": 8,
    "jumpSpeed": 2,
    "damage": 1,
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
    "dae": "models/foamdart.dae"
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
  data.collide = function(targetData) {
    if (data.alive && data.collision == "solid" && targetData.alive && targetData.type == "enemy" && typeof(targetData.onDamage) == 'function') {
      targetData.onDamage(data);
      data.alive = false;
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeFoamdart = makeFoamdart; };
