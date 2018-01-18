var makeBubble = function(varX, varY, varZ, dirX, dirZ) {
  var data = {
    "name": "bubble",
    "type": "enemy",
    "size": 0.5,
    "health": 1,
    "height": 1,
    "speed": 1,
    "jumpSpeed": 0,
    "damage": 1,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": dirX, "z": dirZ},
    "jumpLock": true,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 0.5,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x009900,
    "sizes": {"x": 0.5, "y": 1, "z": 0.5},
    "collision": "ghost",
    "dae": "models/default.dae"
  };
  data.act = function() {
    //  chase
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
        } else if (data.target.position.x > data.position.x) {
          data.direction.x = RIGHT_DIRECTION;
        }
      } else {
        //	go vertical
        if (data.target.position.z < data.position.z) {
          data.direction.z = UP_DIRECTION;
        } else if (data.target.position.z > data.position.z) {
          data.direction.z = UP_DIRECTION * - 1;
        }
      }
    }
    //	set velocity
    data.velocity.x = data.speed * data.direction.x;
    data.velocity.z = data.speed * data.direction.z;

    //	apply physics
    physics.apply(data);
  };
  data.collide = function(targetData) {
    if (data.alive && data.collision == "solid" && targetData.alive && targetData.type == "player" && typeof(targetData.onDamage) == 'function') {
      targetData.onDamage(data);
      data.alive = false;
    }
  };
  data.onDamage = function(sourceData) {
    data.health -= sourceData.damage;
    if (data.health <= 0) {
      data.alive = false;
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeBubble = makeBubble; };
