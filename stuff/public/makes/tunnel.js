var makeTunnel = function(varX, varY, varZ, varX2, varY2, varZ2) {
  var data = {
    "name": "tunnel",
    "type": "enemy",
    "size": 0.5,
    "height": 1,
    "speed": 0,
    "jumpSpeed": 0,
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
    "collision": "ghost",
    "dae": "models/default.dae",
    "tunnelExit":  null,
    "tunnelExitPositions": {"x": varX2, "y": varY2, "z": varZ2},
    "tunnelCountdown": 6.0
  };
  data.act = function() {
    if (data.tunnelExitPositions.x != null && data.tunnelExitPositions.y != null && data.tunnelExitPositions.z != null && data.tunnelExit == null) {
      makeTunnel(data.tunnelExitPositions.x, data.tunnelExitPositions.y, data.tunnelExitPositions.z, null, null, null);
      data.tunnelExit = objects[objects.length - 1];
    }

    if (data.tunnelCountdown <= 0) {
      data.alive = false;
    } else {
      data.tunnelCountdown -= delta;
    }

    //	apply physics
    physics.apply(data);
  };
  data.collide = function(targetData) {
    if (data.alive && targetData.collision == "solid" && targetData.alive && targetData.type == "enemy" && data.tunnelExit) {
      targetData.position.x = data.tunnelExit.position.x;
      targetData.position.y = data.tunnelExit.position.y;
      targetData.position.z = data.tunnelExit.position.z;
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeTunnel = makeTunnel; };
