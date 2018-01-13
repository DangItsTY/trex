//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Controls
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
var runControls = function() {
	//	Move
	thePlayer.ax = 0;
	if ((!(key["left"] in keysDown) && !(key["right"] in keysDown)) ||
		((key["left"] in keysDown) && (key["right"] in keysDown))) {
		thePlayer.frictionkey = false;
		thePlayer.vx = 0;
		thePlayer.ax = 0;
	} else {
		if (key["left"] in keysDown) {
			//thePlayer.x -= 1*theList[PLAYER_ID].speed;
			if (Math.abs(thePlayer.vx) < 2) { // give initial velocity
				thePlayer.vx = -2;
			}
			thePlayer.ax = -1*theList[PLAYER_ID].speed;
			thePlayer.direction = -1;
			thePlayer.friction = "none";
			thePlayer.frictionkey = true;
		}
		if (key["right"] in keysDown) {
			//thePlayer.x += 1*theList[PLAYER_ID].speed;
			if (Math.abs(thePlayer.vx) < 2) { // give initial velocity
				thePlayer.vx = 2;
			}
			thePlayer.ax = 1*theList[PLAYER_ID].speed;
			thePlayer.direction = 1;
			thePlayer.friction = "none";
			thePlayer.frictionkey = true;
		}
	}
	//	Jump
	if (key["spacebar"] in keysDown) {
		//console.log("[Log]: player.ay is " + thePlayer.ay);
		if (thePlayer.jumpkey) {
			thePlayer.vy = 5;
			thePlayer.jumpkey = false;
		}
		//thePlayer.y += 2*theList[PLAYER_ID].jumpSpeed;
	}
	if (key["x"] in keysDown && !(key["x"] in keysUp)) {
		//console.log("[Log]: bullet created");
		useItem(thePlayer.itemSlot);
	}
	
	//	Item Selection
	if (key["1"] in keysDown) {
		console.log("[Log]: switched to item 1");
		thePlayer.itemSlot = 1;
	}
	if (key["2"] in keysDown) {
		console.log("[Log]: switched to item 2");
		thePlayer.itemSlot = 2;
	}
	
	//	Release keys (for the purpose of toggling, holding, different modes of controls, etc.)
	if (!(key["up"] in keysDown)) {
		delete keysUp[key["up"]];
	}
	if (!(key["down"] in keysDown)) {
		delete keysUp[key["down"]];
	}
	if (!(key["left"] in keysDown)) {
		delete keysUp[key["left"]];
	}
	if (!(key["right"] in keysDown)) {
		delete keysUp[key["right"]];
	}
	if (!(key["spacebar"] in keysDown)) {
		delete keysUp[key["spacebar"]];
	}
	if (!(key["a"] in keysDown)) {
		delete keysUp[key["a"]];
	}
	if (!(key["b"] in keysDown)) {
		delete keysUp[key["b"]];
	}
	if (!(key["y"] in keysDown)) {
		delete keysUp[key["y"]];
	}
	if (!(key["x"] in keysDown)) {
		delete keysUp[key["x"]];
	}
	if (!(key["start"] in keysDown)) {
		delete keysUp[key["start"]];
	}
};