//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Input Library
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var left_input = function() {
	if (key["left"] in keysDown) {
		objectList[selectedPlayer].x -= objectList[selectedPlayer].speed * modifier;
		objectList[selectedPlayer].direction = -1;
	}
}

var right_input = function() {
	if (key["right"] in keysDown) {
		objectList[selectedPlayer].x += objectList[selectedPlayer].speed * modifier;
		objectList[selectedPlayer].direction = 1;
	}
}

var up_input = function() {
	if (key["up"] in keysDown) {
		objectList[selectedPlayer].y -= objectList[selectedPlayer].speed * modifier;
	}
}

var down_input = function() {
	if (key["down"] in keysDown) {
		objectList[selectedPlayer].y += objectList[selectedPlayer].speed * modifier;
	}
}

var	releaseLeft_input = function() {
	if (!(key["left"] in keysDown)) {
		delete keysUp[key["left"]];
	}
}

var	releaseRight_input = function() {
	if (!(key["right"] in keysDown)) {
		delete keysUp[key["right"]];
	}
}

var releaseUp_input = function() {
	if (!(key["up"] in keysDown)) {
		delete keysUp[key["up"]];
	}
}

var releaseDown_input = function() {
	if (!(key["down"] in keysDown)) {
		delete keysUp[key["down"]];
	}
}