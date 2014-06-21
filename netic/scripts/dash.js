//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Dash Script
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Last Modified: 4/17/14

var dash = function(modifier) {
	//	Make jump ready if dashing any direction
	if (objectList[selectedPlayer].dashLeftEnable > 1 || objectList[selectedPlayer].dashRightEnable > 1) {
		objectList[selectedPlayer].jumpReady = true;
	}

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
	
	//	Repeat for right dash
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

	//	Relese keys	
	if (!(key["left"] in keysDown)) {
		delete keysUp[key["left"]];
	}
	if (!(key["right"] in keysDown)) {
		delete keysUp[key["right"]];
	}
};

//	Dash Left
//	Dash left when left is tapped twice
//	Requires: dashLeftComboTimer, dashLeftComboDuration, dashLeftTimer, dashLeftDuration, dashLeftEnable, dashReady
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