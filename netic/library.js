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
		
		/*	Working Draw Method
		if (list[i].x < CANVASWIDTH+IMAGESIZE && list[i].y < CANVASHEIGHT+IMAGESIZE && list[i].x > -IMAGESIZE && list[i].y > -IMAGESIZE)
			ctxOff.drawImage(list[i].image, list[i].imageX*list[i].size, list[i].imageY*list[i].size, list[i].size, list[i].size, list[i].x-(list[i].size/2), list[i].y-(list[i].size/2), list[i].size, list[i].size);
		*/
	}
};

/*
var collidesWith = function(object, target) {
	//	Make a line collision
	var point_right = 0;
	var point_left = 0;
	var point_top = 0;
	var point_bottom = 0;
	if (object.x > object.prevX) {
		point_right = object.x;
		point_left = object.prevX;
	}
	else {
		point_right = object.prevX;
		point_left = object.x;
	}
	
	if (object.y > object.prevY) {
		point_bottom = object.y;
		point_top = object.prevY;
	}
	else {
		point_bottom = object.prevY;
		point_top = object.y;
	}
	point_right += object.size;
	point_left -= object.size;
	point_top += object.size;
	point_bottom -= object.size;
	
	if (object.collisionType == "transparent" || target.collisionType == "transparent")
		return false;
	else if (target.x <= point_right && target.x >= point_left &&
		target.y <= point_top && target.y >= point_bottom) {
		return true;
	}
	else {
		return false;
	}
};
*/

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

var magnitude = function(number) {
	if (number < 0)
		return number *= -1;
	else
		return number;
};

var	direction = function(number) {
	if (number < 0)
		return -1;
	else
		return 1;
}

var repositionCam = function(nonfocusMag, focusMag) {
	var difference = playerList[nonfocusMag].x - playerList[focusMag].x;
	for (i = 0; i < tileList.length; i++) {
		tileList[i].x += difference;
	}
	playerList[nonfocusMag].x += difference;
	playerList[focusMag].x += difference;
};

//	Transfer dark energy from source to destination
/*
var transferDarkEnergy = function(entityS, entityD) {
	entityD.darkEnergy[entityD.darkEnergyCount] = entityS.darkEnergy[entityS.darkEnergyCount - 1];
	entityS.darkEnergy.splice(entityS.darkEnergyCount - 1, 1);
	entityD.darkEnergy[entityD.darkEnergyCount].x = entityD.x;
	entityD.darkEnergy[entityD.darkEnergyCount].y = entityD.y;
	entityD.darkEnergyCount += 1;
	entityS.darkEnergyCount -= 1;
	entityS.energy = entityS.lightEnergyCount - entityS.darkEnergyCount;
	entityD.energy = entityD.lightEnergyCount - entityD.darkEnergyCount;
};
*/

//	Transfer energy from light source to dark destination
var transferEnergy = function (entityS, entityD) {
	entityS.energy -= 1;
	entityD.energy += 1;
	entityS.energyObject.imageX = 100 + entityS.energy;
	entityD.energyObject.imageX = 100 + entityD.energy;
}

//	TyTest
/*
var findNearestTile = function (entity) {
	var nearest = 1000;
	var nearestTile = 0;
	var distance = 0;
	for (var i = 0; i < tileList.length; i++) {
		distance = Math.sqrt( ((entity.x - tileList[i].x)*(entity.x - tileList[i].x)) + ((entity.y - tileList[i].y)*(entity.y - tileList[i].y)) );
		if (distance < nearest) {
			nearest = distance;
			nearestTile = i;
		}
	}
	
	//	Do the energy transfer
	tileList[nearestTile].energy += entity.energy;
	tileList[nearestTile].energyObject.imageX = 100 + tileList[nearestTile].energy;
}
*/

var findNearestTile = function (entity) {
	var nearest = 100;
	var nearestTile = new Array();
	var	nearestCount = 0;
	var distance = 0;
	for (var i = 0; i < tileList.length; i++) {
		distance = Math.sqrt( ((entity.x - tileList[i].x)*(entity.x - tileList[i].x)) + ((entity.y - tileList[i].y)*(entity.y - tileList[i].y)) );
		if (distance < nearest) {
			nearestTile[nearestCount] = i;
			nearestCount += 1;
		}
	}
	
	//	Do the energy transfer
	var random = Math.floor(Math.random() * nearestTile.length);
	tileList[nearestTile[random]].energy += entity.energy;
	tileList[nearestTile[random]].energyObject.imageX = 100 + tileList[nearestTile[random]].energy;
	particleList[paCount] = new particle(entity, tileList[nearestTile[random]]);
	particleList[paCount-1].energy = entity.energy;
	if (particleList[paCount-1].energy > 0)
		particleList[paCount-1].imageX = 1;
	//tileList[nearestTile[random]].energyObject.imageX = 0;
}

//	Resets the jump button so that the object can jump again
var resetJump = function (entity) {
	entity.jumpCounter = 0;
	entity.vY = 0;
	entity.gravityT = 0;
	entity.gravityDT = 0;
	delete keysUp[key["spacebar"]];
}

//	Pick a row, Pick a column, Pick a length, generate that platform in an area of 10x10
var	generatePlatform = function (cursorX, cursorY) {
	var random_row = roll(1, 18);
	var random_col = roll(1, 10);
	var random_length = roll(8, 18-random_col);
	
	for (var i = 0; i < random_length; i++) {
		tileList[tCount] = new tile(((random_col + i) * IMAGESIZE) + cursorX, (random_row * IMAGESIZE) + cursorY);
	}
}

//	Generate a wall with random height, length, and position
var	generateBigWall = function (cursorX, cursorY) {
	var random_length = roll(8, 16);
	var random_height = roll(8, 16);
	var random_positionX = roll(4, 16-random_length);
	var random_positionY = roll(4, 16-random_height);
	
	//	Top Edge
	for (var i = 0; i < random_length; i++) {
		tileList[tCount] = new tile( ((i + random_positionX) * IMAGESIZE) + cursorX, ((random_positionY) * IMAGESIZE) + cursorY);
	}
	//	Bottom Edge
	for (var i = 0; i < random_length; i++) {
		tileList[tCount] = new tile( ((i + random_positionX) * IMAGESIZE) + cursorX, ((random_height-1 + random_positionY) * IMAGESIZE) + cursorY);
	}
	//	Left Edge
	for (var i = 1; i < random_height-1; i++) {
		tileList[tCount] = new tile( ((random_positionX) * IMAGESIZE) + cursorX, ((i + random_positionY) * IMAGESIZE) + cursorY);
	}
	//	Right Edge
	for (var i = 1; i < random_height-1; i++) {
		tileList[tCount] = new tile( ((random_length-1 + random_positionX) * IMAGESIZE) + cursorX, ((i + random_positionY) * IMAGESIZE) + cursorY);
	}
	
	/*	Big Wall filled in (causes a little lag)
	for (var i = 0; i < random_height; i++) {
		for (var j = 0; j < random_length; j++) {
			tileList[tCount] = new tile( ((j + random_positionX) * IMAGESIZE) + cursorX, ((i + random_positionY) * IMAGESIZE) + cursorY);
		}
	}
	*/
	
	//	TyBug
	//document.getElementById("debug10").innerHTML = "Random Length: " + random_length;
	//document.getElementById("debug11").innerHTML = "Random Height: " + random_height;
	//document.getElementById("debug12").innerHTML = "Random X: " + random_positionX;
	//document.getElementById("debug13").innerHTML = "Random Y: " + random_positionY;
}

var	generateTwoPlatform = function (cursorX, cursorY) {
	var random_row = roll(1, 9);
	var random_length = roll(4, 10);
	var random_col = roll(1, 18-random_length);
	
	for (var i = 0; i < random_length; i++) {
		tileList[tCount] = new tile(((random_col + i) * IMAGESIZE) + cursorX, (random_row * IMAGESIZE) + cursorY);
	}
	
	var random_row = roll(10, 18);
	var random_length = roll(4, 10);
	var random_col = roll(1, 18-random_length);
	
	for (var i = 0; i < random_length; i++) {
		tileList[tCount] = new tile(((random_col + i) * IMAGESIZE) + cursorX, (random_row * IMAGESIZE) + cursorY);
	}
	
	//	TyBug
	//document.getElementById("debug10").innerHTML = "Random Row: " + random_row;
	//document.getElementById("debug11").innerHTML = "Random Length: " + random_length;
	//document.getElementById("debug12").innerHTML = "Random Col: " + random_col;
}

//	Pick a row, Pick a column, Pick a length, generate that platform in an area of 10x10
var	generateWall = function (cursorX, cursorY) {
	var random_row = roll(1, 10);
	var random_col = roll(1, 18);
	var random_length = roll(18-random_row, 8);
	
	for (var i = 0; i < random_length; i++) {
		tileList[tCount] = new tile((random_row * IMAGESIZE) + cursorX, ((random_col + i) * IMAGESIZE) + cursorY);
	}
	
	//	TyBug
	document.getElementById("debug10").innerHTML = "Random Row: " + random_row;
	document.getElementById("debug11").innerHTML = "Random Length: " + random_length;
	document.getElementById("debug12").innerHTML = "Random Col: " + random_col;
}

//	Pick a row, Pick a column, Pick a length, generate that platform in an area of 10x10
var	generateTwoWall = function (cursorX, cursorY) {
	var random_col = roll(1, 9);
	var random_length = roll(4, 10);
	var random_row = roll(1, 18-random_length);
	
	for (var i = 0; i < random_length; i++) {
		tileList[tCount] = new tile((random_col * IMAGESIZE) + cursorX, ((random_row + i) * IMAGESIZE) + cursorY);
	}
	
	var random_col = roll(10, 18);
	var random_length = roll(4, 10);
	var random_row = roll(1, 18-random_length);
	
	for (var i = 0; i < random_length; i++) {
		tileList[tCount] = new tile((random_col * IMAGESIZE) + cursorX, ((random_row + i) * IMAGESIZE) + cursorY);
	}
	
	//	TyBug
	document.getElementById("debug10").innerHTML = "Random Row: " + random_row;
	document.getElementById("debug11").innerHTML = "Random Length: " + random_length;
	document.getElementById("debug12").innerHTML = "Random Col: " + random_col;
}

var roll = function (min, max) {
	return (Math.floor(Math.random() * (max-min+1)) + min);
}








//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Input Library
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var left_input = function(modifier) {
	if (key["left"] in keysDown) {
		objectList[selectedPlayer].x -= objectList[selectedPlayer].speed * modifier;
		objectList[selectedPlayer].direction = -1;
	}
}

var right_input = function(modifier) {
	if (key["right"] in keysDown) {
		objectList[selectedPlayer].x += objectList[selectedPlayer].speed * modifier;
		objectList[selectedPlayer].direction = 1;
	}
}

var up_input = function(modifier) {
	if (key["up"] in keysDown) {
		objectList[selectedPlayer].y -= objectList[selectedPlayer].speed * modifier;
	}
}

var down_input = function(modifier) {
	if (key["down"] in keysDown) {
		objectList[selectedPlayer].y += objectList[selectedPlayer].speed * modifier;
	}
}

var shoot_input = function(modifier) {
	if (key["x"] in keysDown && !(key["x"] in keysUp)) {
		projectileList[pCount] = new projectile(objectList[selectedPlayer]);
		projectileList[pCount-1].speed = 1024 * objectList[selectedPlayer].direction;
	}
	keysUp[key["x"]] = true;
}

//	Allows for one jump
//	Required: jumpSpeed, jumpTimer, jumpDuration, jumpReady
//	Note: You need to decide where jumpReady = true is
var jump_input = function(modifier) {
	if (key["spacebar"] in keysDown && objectList[selectedPlayer].jumpTimer < objectList[selectedPlayer].jumpDuration && !(objectList[selectedPlayer].jumpTimer == 0 && objectList[selectedPlayer].jumpReady == false) ) {
		objectList[selectedPlayer].y -= objectList[selectedPlayer].jumpSpeed * modifier;
		objectList[selectedPlayer].jumpTimer++;
		objectList[selectedPlayer].jumpReady = false;
	}
}

//	Readys dash after successful jump
var dashAfterJump_input = function(modifier) {
	if (key["spacebar"] in keysDown && objectList[selectedPlayer].jumpTimer < objectList[selectedPlayer].jumpDuration && !(objectList[selectedPlayer].jumpTimer == 0 && objectList[selectedPlayer].jumpReady == false) ) {
		objectList[selectedPlayer].dashReady = true;
	}
}

var	releaseLeft_input = function(modifier) {
	if (!(key["left"] in keysDown)) {
		delete keysUp[key["left"]];
	}
}

var	releaseRight_input = function(modifier) {
	if (!(key["right"] in keysDown)) {
		delete keysUp[key["right"]];
	}
}

var releaseUp_input = function(modifier) {
	if (!(key["up"] in keysDown)) {
		delete keysUp[key["up"]];
	}
}

var releaseDown_input = function(modifier) {
	if (!(key["down"] in keysDown)) {
		delete keysUp[key["down"]];
	}
}

var releaseX_input = function(modifier) {
	if (!(key["x"] in keysDown)) {
		delete keysUp[key["x"]];
	}
}

var releaseSpacebarJump_input = function(modifier) {
	if (!(key["spacebar"] in keysDown)) {
		objectList[selectedPlayer].jumpTimer = 0;
		delete keysUp[key["spacebar"]];
	}
}

//	Dash Left
//	Dash left when left is tapped twice
//	Requires: dashLeftComboTimer, dashLeftComboDuration, dashLeftTimer, dashLeftDuration, dashLeftEnable, dashReady
//	Note: You need to decide where dashReady = true is
var dashLeft_input = function(modifier) {
	//	On left key press, refresh dash timer and increment dash enable if player double taps fast enough. Also reset dash right count to 0
	if (key["left"] in keysDown && !(key["left"] in keysUp) && !(objectList[selectedPlayer].dashLeftTimer == 0 && objectList[selectedPlayer].dashReady == false) ) {
		objectList[selectedPlayer].dashLeftComboTimer = objectList[selectedPlayer].dashLeftComboDuration;
		if (objectList[selectedPlayer].dashLeftComboTimer > 0) {
			objectList[selectedPlayer].dashLeftEnable += 1;
			if (objectList[selectedPlayer].dashLeftEnable == 2) {
				objectList[selectedPlayer].dashLeftTimer = objectList[selectedPlayer].dashLeftDuration;
				objectList[selectedPlayer].dashReady = false;
			}
		}
		keysUp[key["left"]] = true;
		objectList[selectedPlayer].dashRightEnable = 0;
	}

	//	On left key release, either set the enable back to 0 if currently dashing (enable == 2) or if player did not double tap fast enough
	if (!(key["left"] in keysDown)) {
		if (objectList[selectedPlayer].dashLeftEnable == 2)
			objectList[selectedPlayer].dashLeftEnable = 0;
		if (objectList[selectedPlayer].dashLeftComboTimer == 0)
			objectList[selectedPlayer].dashLeftEnable = 0;
		objectList[selectedPlayer].dashLeftTimer = 0;
		delete keysUp[key["left"]];
	}
		
	if (key["left"] in keysDown && objectList[selectedPlayer].dashLeftEnable > 1) {
		if (objectList[selectedPlayer].dashLeftTimer > 0) {
			objectList[selectedPlayer].x -= objectList[selectedPlayer].speed * modifier * 2;
			objectList[selectedPlayer].dashLeftTimer -= 1;
		}
		else {
			objectList[selectedPlayer].dashLeftEnable = 0;
			objectList[selectedPlayer].dashLeftTimer = objectList[selectedPlayer].dashLeftDuration;
		}
	}
	
	if (objectList[selectedPlayer].dashLeftComboTimer > 0)
		objectList[selectedPlayer].dashLeftComboTimer -= 1;
}

//	Dash Right
//	Dash Right when right is tapped twice
//	Requires: dashRightComboTimer, dashRightComboDuration, dashRightTimer, dashRightDuration, dashRightEnable, dashReady
//	Note: You need to decide where dashReady = true is
var dashRight_input = function(modifier) {
	if (key["right"] in keysDown && !(key["right"] in keysUp) && !(objectList[selectedPlayer].dashRightTimer == 0 && objectList[selectedPlayer].dashReady == false) ) {
		objectList[selectedPlayer].dashRightComboTimer = objectList[selectedPlayer].dashRightComboDuration;
		if (objectList[selectedPlayer].dashRightComboTimer > 0) {
			objectList[selectedPlayer].dashRightEnable += 1;
			if (objectList[selectedPlayer].dashRightEnable == 2) {
				objectList[selectedPlayer].dashRightTimer = objectList[selectedPlayer].dashRightDuration;
				objectList[selectedPlayer].dashReady = false;
			}
		}
		keysUp[key["right"]] = true;
		objectList[selectedPlayer].dashLeftEnable = 0;
	}
	if (!(key["right"] in keysDown)) {
		if (objectList[selectedPlayer].dashRightEnable == 2)
			objectList[selectedPlayer].dashRightEnable = 0;
		if (objectList[selectedPlayer].dashRightComboTimer == 0)
			objectList[selectedPlayer].dashRightEnable = 0;
		objectList[selectedPlayer].dashRightTimer = 0;
		delete keysUp[key["right"]];
	}
	if (key["right"] in keysDown && objectList[selectedPlayer].dashRightEnable > 1) {
		if (objectList[selectedPlayer].dashRightTimer > 0) {
			objectList[selectedPlayer].x += objectList[selectedPlayer].speed * modifier * 2;
			objectList[selectedPlayer].dashRightTimer -= 1;
		}
		else {
			objectList[selectedPlayer].dashRightEnable = 0;
			objectList[selectedPlayer].dashRightTimer = objectList[selectedPlayer].dashRightDuration;
		}
	}
	if (objectList[selectedPlayer].dashRightComboTimer > 0)
		objectList[selectedPlayer].dashRightComboTimer -= 1;
}

//	Make jump ready if dashing any direction
//	Requires: Some dash_input
var jumpAfterDash_input = function(modifier) {
	if (objectList[selectedPlayer].dashLeftEnable > 1 || objectList[selectedPlayer].dashRightEnable > 1) {
		objectList[selectedPlayer].jumpReady = true;
	}
}

//	Fast Fall: Double-tap down to quickly fall to the floor
//	Requires: fastFallTimer, fastFallDuration, fastFallEnable
var fastFall_input = function(modifier) {
	if (key["down"] in keysDown && !(key["down"] in keysUp)) {
		objectList[selectedPlayer].fastFallTimer = objectList[selectedPlayer].fastFallDuration;
		if (objectList[selectedPlayer].fastFallTimer > 0)
			objectList[selectedPlayer].fastFallEnable += 1;
		keysUp[key["down"]] = true;
	}

	if (!(key["down"] in keysDown)) {
		if (objectList[selectedPlayer].fastFallTimer == 0)
			objectList[selectedPlayer].fastFallEnable = 0;
		delete keysUp[key["down"]];
	}
		
	if (objectList[selectedPlayer].fastFallEnable > 1) {
		objectList[selectedPlayer].fastFallReady = true;
		objectList[selectedPlayer].fastFallEnable = 0;
	}
	
	if (objectList[selectedPlayer].fastFallReady) {
		objectList[selectedPlayer].y += objectList[selectedPlayer].weight * modifier * 2;
	}
	
	if (objectList[selectedPlayer].fastFallTimer > 0)
		objectList[selectedPlayer].fastFallTimer -= 1;
		
	document.getElementById("debug10").innerHTML = "#10 Fast Fall Timer: " + objectList[selectedPlayer].fastFallTimer;
	document.getElementById("debug11").innerHTML = "#11 Fast Fall Duration: " + objectList[selectedPlayer].fastFallDuration;
	document.getElementById("debug12").innerHTML = "#12 Fast Fall Enable: " + objectList[selectedPlayer].fastFallEnable;
	document.getElementById("debug13").innerHTML = "#13 Fast Fall Ready: " + objectList[selectedPlayer].fastFallReady;
}

//	Reset fast fall on jump
var fastFallJumpReset_input = function(modifier) {
	if (key["spacebar"] in keysDown) {
		objectList[selectedPlayer].fastFallReady = false;
	}
}

//	Give energy if action is pressed
var giveEnergy_input = function(modifier) {
	if ((key["left"] in keysDown || key["right"] in keysDown || key["spacebar"] in keysDown) && objectList[selectedPlayer].energy < 100) {
		objectList[selectedPlayer].energy += 10 * modifier;
	}
};







//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	AI Library
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var follow_ai = function(modifier, source, target) {
	if (source.x < target.x)
		source.directionX = 1;
	else
		source.directionX = -1;
		
	if (source.y < target.y)
		source.directionY = 1;
	else
		source.directionY = -1;
		
	source.x += source.speed * source.directionX * modifier;
	source.y += source.speed * source.directionY * modifier;
	document.getElementById("debug8").innerHTML = "Hi : " + source.speed;
}