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