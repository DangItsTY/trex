var makeExploison = function(varX, varY, varZ, dirX, dirZ) {
  var data = {
    "name": "exploison",
    "type": "enemy",
    "size": 0.5,
    "height": 1,
    "speed": 0,
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
    "sizes": {"x": 0.25, "y": 1, "z": 0.25},
    "collision": "solid",
    "dae": "models/foamdart.dae",
    "aliveCountdown": 1.0,
    "damageList": []
  };
  data.act = function() {
    if (data.aliveCountdown <= 0) {
      data.alive = false;
    }
    data.aliveCountdown -= delta;
    //	apply physics
    physics.apply(data);
  };
  data.collide = function(targetData) {
    var alreadyDamaged = data.damageList.indexOf(targetData.uniqueIndex);
    if (data.alive && data.collision == "solid" && targetData.alive && targetData.type == "player" && typeof(targetData.onDamage) == 'function' && alreadyDamaged == -1) {
      targetData.onDamage(data);
      data.damageList.push(targetData.uniqueIndex);
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeExploison = makeExploison; };
