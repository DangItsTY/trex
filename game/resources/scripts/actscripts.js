//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Act Scripts
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*















//	~~~~~~~TD~~~~~~*
//	Flybot: Used primarily for testing purposes. Allows free movement in all 4 directions
//	~~~~~~~TD~~~~~~*
var actgravity = function(modifier) {
	objectList[selectedPlayer].y += objectList[selectedPlayer].weight * modifier;
};

//	~~~~~~~TD~~~~~~*
//	Act Camera: Move the camera
//	~~~~~~~TD~~~~~~*
var actcamera = function(modifier) {
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