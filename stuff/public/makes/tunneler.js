var makeTunneler = function(varX, varY, varZ) {
  var data = {
    "name": "tunneler",
    "type": "enemy",
    "size": 0.5,
    "health": 1,
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
    "dae": "models/zombie.dae",
    "tunnelTimer": 0,
    "tunnelTimerMax": 6.0,
    "digTimer": 0,
    "digTimerMax": 2.0,
    "tunnelExitPositions": {"x": null, "y": null, "z": null}
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

    //  create tunnel
    if (data.tunnelTimer >= data.tunnelTimerMax) {
      data.digTimer += delta;
      if (data.tunnelExitPositions.x == null && data.tunnelExitPositions.y == null && data.tunnelExitPositions.z == null) {
        data.tunnelExitPositions.x = data.target.position.x;
        data.tunnelExitPositions.y = data.target.position.y;
        data.tunnelExitPositions.z = data.target.position.z;
      }
    }
    if (data.digTimer >= data.digTimerMax) {
      var ownerObject = data;
      var offset = 0;
      makeTunnel(ownerObject.position.x + (ownerObject.direction.x * offset), ownerObject.position.y, ownerObject.position.z + (ownerObject.direction.z * offset), data.tunnelExitPositions.x, data.tunnelExitPositions.y, data.tunnelExitPositions.z);
      data.digTimer = 0;
      data.tunnelTimer = 0;
      data.tunnelExitPositions.x = null;
      data.tunnelExitPositions.y = null;
      data.tunnelExitPositions.z = null;

    } else if (data.digTimer == 0){
      data.tunnelTimer += delta;
      //	set velocity
      data.velocity.x = data.speed * data.direction.x;
      data.velocity.z = data.speed * data.direction.z;
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

module.exports = function() { this.makeTunneler = makeTunneler; };
