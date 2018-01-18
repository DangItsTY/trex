var makeCloud = function(varX, varY, varZ) {
  var data = {
    "name": "cloud",
    "type": "enemy",
    "size": 2.0,
    "health": 1,
    "height": 11,
    "speed": 1,
    "jumpSpeed": 2,
    "damage": 1,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 2.0,
    "alive": true,
    "target": null,
    "uniqueIndex": uniqueIndex,
    "color": 0xff0000,
    "sizes": {"x": 2.0, "y": 2.0, "z": 2.0},
    "collision": "ghost",
    "owner": null,
    "dae": "models/default.dae"
  };
  data.act = function() {
    var ownerObject = objects.filter(findObjectByUniqueIndex, data.owner)[0];

    data.position.x = ownerObject.position.x;
    data.position.y = ownerObject.position.y;
    data.position.z = ownerObject.position.z;

    //	apply physics
    physics.apply(data);
  };
  data.collide = function(targetData) {
    if (data.alive && targetData.collision == "solid" && targetData.alive && targetData.type == "player" && typeof(targetData.onDamage) == 'function') {
      targetData.onDamage(data);
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeCloud = makeCloud; };
