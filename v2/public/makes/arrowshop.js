var makeArrowshop = function(varX, varY, varZ) {
  var data = {
    "name": "arrowshop",
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
    "color": 0x3333ff,
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
	  	  console.log("making arrow");
		var objectGrabbed = objects.filter(findObjectByUniqueIndex, sourceData.carriedObject)[0];
	if (sourceData.carriedObject != null && objectGrabbed.name == 'log') {
		makeArrow(data.position.x, data.position.y, data.position.z + 2*BLOCKSIZE);
		objectGrabbed.alive = false;
		sourceData.carriedObject = null;
	}
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeArrowshop = makeArrowshop; };
