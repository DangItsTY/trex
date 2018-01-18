var makeTower = function(varX, varY, varZ) {
  var data = {
    "name": "tower",
    "type": "neutral",
    "size": 1.0,
    "height": 1.0,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 1.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0xff9999,
    "sizes": {"x": 1, "y": 1, "z": 1},
    "collision": "solid",
    "carried": false,
    "carriedBy": null,
    "dae": "models/default.dae"
  };
  data.act = function() {
    //	apply physics
    physics.apply(data);
  };
  data.interact = function(sourceData) {
	var objectGrabbed = objects.filter(findObjectByUniqueIndex, sourceData.carriedObject)[0];
	if (sourceData.carriedObject != null && objectGrabbed.name == 'basicitem') {
		console.log("cooked!");
		makeBasicitem(data.position.x, data.position.y, data.position.z - 4*BLOCKSIZE);
	} else {
		makeBasicitem(data.position.x, data.position.y, data.position.z - 4*BLOCKSIZE);
	}
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeTower = makeTower; };
