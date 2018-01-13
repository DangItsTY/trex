var makeFroggy = function(varX, varY, varZ) {
  var data = {
    "name": "froggy",
    "type": "enemy",
    "size": 0.5,
    "health": 1,
    "height": 11,
    "speed": 4,
    "jumpSpeed": 4,
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
    "dae": "models/zombie.dae",
    "hopTimer": 0,
    "hopTimerMax": 2.0
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

    //	hop
    if (!data.jumpLock && data.hopTimer >= data.hopTimerMax) {
      data.velocity.x = data.speed * data.direction.x;
      data.velocity.z = data.speed * data.direction.z;
      data.velocity.y = data.jumpSpeed;
      data.jumpLock = true;
    } else if (data.jumpLock && Math.floor(data.position.y) <= 0 && data.velocity.y <= 0) {
      data.hopTimer = 0;
      data.jumpLock = false;
    } else if (Math.floor(data.position.y) <= 0 && data.velocity.y <= 0) {
      data.hopTimer += delta;
      data.velocity.x = 0;
      data.velocity.z = 0;
      data.velocity.y = 0;
      data.jumpLock = false;
    }


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

module.exports = function() { this.makeFroggy = makeFroggy; };
