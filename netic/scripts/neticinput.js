//	~~~~~~~TD~~~~~~*
//	Flybot: Used primarily for testing purposes. Allows free movement in all 4 directions
//	~~~~~~~TD~~~~~~*
var neticinput = function(modifier) {
	if (key["left"] in keysDown) {
		objectList[selectedPlayer].x -= objectList[selectedPlayer].speed * modifier;
	}
	if (key["right"] in keysDown) {
		objectList[selectedPlayer].x += objectList[selectedPlayer].speed * modifier;
	}
	if (key["spacebar"] in keysDown && objectList[selectedPlayer].jumpTimer < objectList[selectedPlayer].jumpDuration && !(objectList[selectedPlayer].jumpTimer == 0 && objectList[selectedPlayer].jumpReady == false) ) {
		objectList[selectedPlayer].y -= objectList[selectedPlayer].jumpSpeed * modifier;
		objectList[selectedPlayer].jumpTimer++;
		objectList[selectedPlayer].jumpReady = false;
		objectList[selectedPlayer].dashReady = true;
	}
	
	//	Release keys so they can be pressed again
	if (!(key["left"] in keysDown)) {
		delete keysUp[key["left"]];
	}
	if (!(key["right"] in keysDown)) {
		delete keysUp[key["right"]];
	}
	if (!(key["spacebar"] in keysDown)) {
		objectList[selectedPlayer].jumpTimer = 0;
		delete keysUp[key["spacebar"]];
	}
};