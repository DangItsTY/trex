//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Act Scripts
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var followMouseGrid = function (object) {
//	~~~~~~~*~~~~~~~*
//	Requirements:
//	Description: Follow wherever the mouse is in a grid-like manner
//	Note: Perhaps just make a mouse object? Nah, mice are special.
//	Note: Hard coded values Fix this
//	~~~~~~~*~~~~~~~*
	if (mousePos != null) {
		object.x = Math.floor((mousePos.x+(IMAGESIZE/2))/IMAGESIZE) * IMAGESIZE;
		object.y = Math.floor((mousePos.y+(IMAGESIZE/2))/IMAGESIZE) * IMAGESIZE;
	}
};


//	~~~~~~~TD~~~~~~*
//	Act Gravity: Applies a downward force on player object
//	~~~~~~~TD~~~~~~*
var actgravity = function() {
	objectList[selectedPlayer].y += objectList[selectedPlayer].weight * modifier;
};

//	~~~~~~~TD~~~~~~*
//	Act Camera: Move the camera
//	~~~~~~~TD~~~~~~*
var actcamera = function() {
	//	Act the camera
	//	1.	Get the change in position during the last and current game frame
	//	2.	Then move all entity lists
	
	//	TyTest - Camera Code
	cameraX = objectList[selectedPlayer].x - CANVASWIDTH/2;
	cameraY = objectList[selectedPlayer].y - CANVASHEIGHT/2;
	
	/*	Working Camera Code
	cameraDeltaX = cameraX - objectList[selectedPlayer].x;
	cameraDeltaY = cameraY - objectList[selectedPlayer].y;
	for (i = 0; i < objectList.length; i++) {
		objectList[i].x += cameraDeltaX;
		objectList[i].y += cameraDeltaY;
	}
	for (i = 0; i < tileList.length; i++) {
		tileList[i].x += cameraDeltaX;
		tileList[i].y += cameraDeltaY;
	}
	for (i = 0; i < energyList.length; i++) {
		energyList[i].x += cameraDeltaX;
		energyList[i].y += cameraDeltaY;
	}
	for (i = 0; i < projectileList.length; i++) {
		projectileList[i].x += cameraDeltaX;
		projectileList[i].y += cameraDeltaY;
	}
	for (i = 0; i < particleList.length; i++) {
		particleList[i].x += cameraDeltaX;
		particleList[i].y += cameraDeltaY;
	}
	objectList[selectedPlayer].x = CANVASWIDTH/2;
	objectList[selectedPlayer].y = CANVASHEIGHT/2;
	*/
};