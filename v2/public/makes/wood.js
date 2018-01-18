var makeWood = function(varX, varY, varZ) {
  var data = {
    "name": "wood",
    "type": "item",
    "size": 0.5,
    "height": 0.5,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 0.5,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x99ff99,
    "sizes": {"x": 0.5, "y": 1, "z": 0.5},
    "collision": "solid",
    "carried": false,
    "carriedBy": null,
    "dae": "models/default.dae"
  };
  data.act = function() {
    if (data.position.y == 0) {
      data.carriedBy = null;
      data.jumpLock = false;
    }

    if (data.carried) {
      data.position.x = data.carriedBy.position.x;
      data.position.y = data.carriedBy.position.y + ((data.carriedBy.size + data.carriedBy.height) * BLOCKSIZE);
      data.position.z = data.carriedBy.position.z;
      data.jumpLock = true;
    }

    //	apply physics
    physics.apply(data);
  };
  data.interact = function(sourceData) {
	  	  console.log("making tower");
	var objectGrabbed = objects.filter(findObjectByUniqueIndex, sourceData.carriedObject)[0];
	if (sourceData.carriedObject != null && objectGrabbed.name == 'wood') {
		makeTower(data.position.x, data.position.y, data.position.z);
		objectGrabbed.alive = false;
		sourceData.carriedObject = null;
		data.alive = false;
	}
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeWood = makeWood; };
