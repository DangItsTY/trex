var makeTv = function(varX, varY, varZ) {
  var data = {
    "name": "tv",
    "type": "neutral",
    "size": 2.0,
    "height": 2,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION * -1},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 1.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ffff,
    "sizes": {"x": 3, "y": 1, "z": 3},
    "collision": "solid",
    "carried": false,
    "carriedBy": null,
    "dae": "models/tv.dae"
  };
  data.act = function() {
    if (data.carried) {
      data.position.x = data.carriedBy.position.x;
      data.position.y = data.carriedBy.position.y + (data.carriedBy.size * BLOCKSIZE);
      data.position.z = data.carriedBy.position.z;
    }

    //	apply physics
    physics.apply(data);
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeTv = makeTv; };
