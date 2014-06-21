//	~~~~~~~TD~~~~~~*
//	Flybot: Used primarily for testing purposes. Allows free movement in all 4 directions
//	~~~~~~~TD~~~~~~*
var flybot = function(modifier) {
	if (key["left"] in keysDown) {
		objectList[selectedPlayer].x -= objectList[selectedPlayer].speed * modifier;
	}
	if (key["right"] in keysDown) {
		objectList[selectedPlayer].x += objectList[selectedPlayer].speed * modifier;
	}
	if (key["up"] in keysDown) {
		objectList[selectedPlayer].y -= objectList[selectedPlayer].speed * modifier;
	}
	if (key["down"] in keysDown) {
		objectList[selectedPlayer].y += objectList[selectedPlayer].speed * modifier;
	}
	
	//	Release keys so they can be pressed again
	if (!(key["left"] in keysDown)) {
		delete keysUp[key["left"]];
	}
	if (!(key["right"] in keysDown)) {
		delete keysUp[key["right"]];
	}
	if (!(key["up"] in keysDown)) {
		delete keysUp[key["up"]];
	}
	if (!(key["down"] in keysDown)) {
		delete keysUp[key["down"]];
	}
};