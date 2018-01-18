var makeWorm = function(varX, varY, varZ) {
  var data = {
    "name": "worm",
    "type": "enemy",
    "size": 0.25,
    "health": 1,
    "height": 1,
    "speed": 0.75,
    "jumpSpeed": 2,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 0.25,
    "alive": true,
    "target": null,
    "uniqueIndex": uniqueIndex,
    "color": 0xff0000,
    "sizes": {"x": 0.75, "y": 1, "z": 0.75},
    "collision": "solid",
    "dae": "models/zombie.dae"
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
  data.onDamage = function(sourceData) {
    data.health -= sourceData.damage;
    if (data.health <= 0) {
      zombieKillCount += 1;
      rewardItem();
      data.alive = false;
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeWorm = makeWorm; };
