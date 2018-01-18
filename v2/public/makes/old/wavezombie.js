var makeWavezombie = function(varX, varY, varZ) {
  var data = {
    "name": "wavezombie",
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
    "sizes": {"x": 0.75, "y": 1, "z": 0.75},
    "collision": "solid",
    "dae": "models/zombie.dae",
    "shootTimer": 0,
    "shootTimerPause": 2.5,
    "shootTimerMax": 3.5,
  };
  data.act = function() {
    if (data.shootTimer >= data.shootTimerMax) {
      //  shoot
      var ownerObject = data;
      var offset = ((ownerObject.size / 2) * BLOCKSIZE) + (BLOCKSIZE / 4);
      makeSpit(ownerObject.position.x + (ownerObject.direction.x * offset), ownerObject.position.y, ownerObject.position.z + (ownerObject.direction.z * offset), ownerObject.direction.x, ownerObject.direction.z);
      data.shootTimer = 0;

      var angle = Math.PI / 6;
      if (ownerObject.direction.x == 1 && ownerObject.direction.z == 0) {
        angle = Math.PI / 6;
      } else if (ownerObject.direction.x == 0 && ownerObject.direction.z == 1) {
        angle = 2 * Math.PI / 3;
      } else if (ownerObject.direction.x == -1 && ownerObject.direction.z == 0) {
        angle = 7 * Math.PI / 6;
      } else if (ownerObject.direction.x == 0 && ownerObject.direction.z == -1) {
        angle = 5 * Math.PI / 3;
      }
      makeSpit(ownerObject.position.x + (ownerObject.direction.x * offset), ownerObject.position.y, ownerObject.position.z + (ownerObject.direction.z * offset), Math.cos(angle), Math.sin(angle));
      makeSpit(ownerObject.position.x + (ownerObject.direction.x * offset), ownerObject.position.y, ownerObject.position.z + (ownerObject.direction.z * offset), Math.cos(angle - (Math.PI / 3)), Math.sin(angle - (Math.PI / 3)));
    } if (data.shootTimer >= data.shootTimerPause) {
      data.velocity.x = 0;
      data.velocity.y = 0;
    } else {
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
    }
    data.shootTimer += delta;

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

module.exports = function() { this.makeWavezombie = makeWavezombie; };
