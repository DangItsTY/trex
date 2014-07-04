//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Library
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var drawList = function(list) {
	for (var i = 0; i < list.length; i++) {
		//	Parameters: image, image x, image y, image width, image height, location x, location y, width, height
		//	TyNote: This draws all objects to its center
		//	TyNote: On the spritesheet, y refers to states and x refers to animation frames
		
		//	TyTest - New draw method with new actcamera method
		if (list[i].x < cameraX+CANVASWIDTH+IMAGESIZE && list[i].y < cameraY+CANVASHEIGHT+IMAGESIZE && list[i].x > cameraX-IMAGESIZE && list[i].y > cameraY-IMAGESIZE)
			ctxOff.drawImage(list[i].image, list[i].imageX*list[i].size, list[i].imageY*list[i].size, list[i].size, list[i].size, list[i].x-cameraX-(list[i].size/2), list[i].y-cameraY-(list[i].size/2), list[i].size, list[i].size);
	}
};

var collidesWith = function(object, target) {
	if (object.collisionType == "transparent" || target.collisionType == "transparent")
		return false;
	else if (object.x <= target.x + object.size && object.x >= target.x - object.size &&
		object.y <= target.y + object.size && object.y >= target.y - object.size) {
		return true;
	}
	else {
		return false;
	}
};

var roll = function (min, max) {
	return (Math.floor(Math.random() * (max-min+1)) + min);
};

var findObject = function (list, objectName) {
	//	Finds the first occurance of objectName in given list
	var result = -1;
	for (var i = 0; i < list.length; i++) {
		if (list[i].name == objectName) {
			result = i;
			return result;
		}
	}
	return result;
};