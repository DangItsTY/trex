var makeExploisonspit = function(varX, varY, varZ, dirX, dirZ) {
  var data = {
    "name": "exploisonspit",
    "type": "enemy",
    "size": 0.25,
    "health": 1,
    "height": 1,
    "speed": 6,
    "jumpSpeed": 6,
    "damage": 1,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 6, "z": 0},
    "direction": {"x": dirX, "z": dirZ},
    "jumpLock": true,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 0.25,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x009900,
    "sizes": {"x": 0.25, "y": 1, "z": 0.25},
    "collision": "solid",
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
    if (data.health == 0) {
      var ownerObject = data;
      var offset = 0;
      makeExploison(ownerObject.position.x + (ownerObject.direction.x * offset), ownerObject.position.y, ownerObject.position.z + (ownerObject.direction.z * offset), ownerObject.direction.x, ownerObject.direction.z);
      data.alive = false;
    }

    //  when it stops moving, change collision to itemized
    if (
      Math.floor(data.velocity.x) == 0 &&
      Math.floor(data.velocity.y) == 0 &&
      Math.floor(data.velocity.z) == 0
    ) {
      data.health = 0;
    }
    //	apply physics
    physics.apply(data);
  };
  data.collide = function(targetData) {
    if (data.alive && data.collision == "solid" && targetData.alive && targetData.type == "player" && typeof(targetData.onDamage) == 'function') {
      data.health = 0;
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeExploisonspit = makeExploisonspit; };
