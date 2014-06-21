//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	TyDoList
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	-	ThermoDynamics
//		-	Images get charred (apply a mask or special effect or something to individual pixels)
//	-	Thruster Script
//	-	Turn on a dime script
//	-	Chemical Reactions
//	-	Communication
//	-	Some bugs that may be mechanics: ceiling clinging, wall bouncing vertical jump, top of the block extra booster jump on corner
//	-	Energy: Perfectly balanced, almost perfectly (flickering) balance (fluctuation)
//	-	Energy: negative energy, enough makes you die? animates life? energy gives you powers, different phases? dark hell red and light angel blue? transform?
//	-	Energy Puzzle, restore the room to balance
//
//	Organize energy (library, act, object, netic input, perhaps draw a picture instead of changing the dom (seems slower))
//	Fly in the corners, see where 
//	Different controls
//	Monsters = trap based
//	Make energy system more sophisticated (big boost when dashing/jumping, lose more when shooting, adjust the rate of energy drain)
//	A function to step through game, frame by frame
//	Should input actually move player? or does the move happen in act...
//	Projects programs i've written

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Preload
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var preload = function() {
	//	Create an object
	objectList[oCount] = new object(CANVASWIDTH/2, CANVASHEIGHT/2, "netic");
	//objectList[oCount] = new object(400, 320);
	
	//	Set player
	selectedPlayer = 0;
	
	//	Center camera on player
	cameraX = objectList[selectedPlayer].x;
	cameraY = objectList[selectedPlayer].y;
	objectList[selectedPlayer].x = 0;
	objectList[selectedPlayer].y -= 500;
	
	//	Create a tile at 0,0
	tileList[tCount] = new tile(0, 0, "tree");
	
	//	Create a tile at 640, 640
	tileList[tCount] = new tile(640-16, 640-16, "grass1");
	
	//	Create a level 8x8
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 16; j++) {
			switch (roll(1, 10)) {
				case 1:
					generatePlatform(i*320, j*320);
					break;
				case 2:
					generatePlatform(i*320, j*320);
					break;
				case 3:
					generatePlatform(i*320, j*320);
					break;
				case 4:
					generateTwoWall(i*320, j*320);
					break;
				case 5:
					generateWall(i*320, j*320);
					break;
				case 6:
					generateTwoPlatform(i*320, j*320);
					break;
				case 7:
					generateTwoPlatform(i*320, j*320);
					break;
				case 8:
					generateTwoPlatform(i*320, j*320);
					break;
				case 9:
					generateBigWall(i*320, j*320);
					break;
				case 10:
					generateBigWall(i*320, j*320);
					break;
				default:
					generateBigWall(i*320, j*320);
			}
		}
	}
	
	//	Make border
	for (var i = 4; i < 320; i++) {
		tileList[tCount] = new tile(i*16, 0, "tree");
	}
	for (var i = 0; i < 320; i++) {
		tileList[tCount] = new tile(i*16, 5120-16, "tree");
	}
	for (var i = 1; i < 319; i++) {
		tileList[tCount] = new tile(0, i*16, "tree");
	}
	for (var i = 1; i < 319; i++) {
		tileList[tCount] = new tile(5120-16, i*16, "tree");
	}
	
	//	Create an enemy
	//objectList[oCount] = new object(300, 200, "enemy");
};

var preload_test = function() {
	//	Create an object
	objectList[oCount] = new object(CANVASWIDTH/2, CANVASHEIGHT/2, "flybot");
	//objectList[oCount] = new object(400, 320);
	
	//	Set player
	selectedPlayer = 0;
	
	//	Center camera on player
	//cameraX = objectList[selectedPlayer].x;
	//cameraY = objectList[selectedPlayer].y;
	//objectList[selectedPlayer].x = 0;
	//objectList[selectedPlayer].y -= 500;
	
	for (var i = 0; i < 20; i++) {
		tileList[tCount] = new tile(i*16, 0, "grass1");
	}
	
	for (var i = 0; i < 10; i++) {
		tileList[tCount] = new tile(16*10, i*-16, "grass1");
	}
	
	//	Create an enemy
	objectList[oCount] = new object(300, 200, "enemy");
	
}

var preload_testplatform = function () {
	//	Create an object
	objectList[oCount] = new object(CANVASWIDTH/2, CANVASHEIGHT/2, "flybot");
	
	//	Set player
	selectedPlayer = 0;
	
	//	Center camera on player
	cameraX = objectList[selectedPlayer].x;
	cameraY = objectList[selectedPlayer].y;
	objectList[selectedPlayer].x = 0;
	objectList[selectedPlayer].y -= 500;
	
	//	Create a tile at 0,0
	tileList[tCount] = new tile(0, 0, "tree");
	
	//	Create a tile at 640, 640
	tileList[tCount] = new tile(640-16, 640-16, "grass1");

	//generateBigWall(0, 0);
	//generatePlatform(0, 0);
	generateTwoWall(0, 0);
}

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Update
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var update = function (modifier) {
	input(modifier);		//	First gather input
	act(modifier);		//	Then make all objects act based on inputs
	resolve(modifier);	//	Do collisions and resolve based on object's acts
	
	//	TyTest: calculate fps
	fps_track += modifier;
	fps_count += 1;
	if (fps_track > 1) {
		fps = fps_count;
		fps_track = 0;
		fps_count = 0;
	}
	
	
	//	TyDebug
	//	Selected Player Info
	document.getElementById("debug1").innerHTML =
		"X: " + objectList[selectedPlayer].x + "<br>" +
		"Y: " + objectList[selectedPlayer].y + "<br>" +
		"Velocity X: " + objectList[selectedPlayer].vX + "<br>" +
		"Velocity Y: " + objectList[selectedPlayer].vY;
	document.getElementById("debug2").innerHTML = "Gravity Timer: " + objectList[selectedPlayer].gravityT;
	document.getElementById("debug3").innerHTML = "Gravity Delta Timer: " + objectList[selectedPlayer].gravityDT;
	document.getElementById("debug4").innerHTML = "Dash Left Enable: " + objectList[selectedPlayer].dashLeftEnable;
	document.getElementById("debug5").innerHTML = "Dash Left Timer: " + objectList[selectedPlayer].dashLeftTimer;
	document.getElementById("debug6").innerHTML = "Dash Ready: " + objectList[selectedPlayer].dashReady;
	document.getElementById("debug7").innerHTML = "Projectile List Length: " + projectileList.length;
	//document.getElementById("debug8").innerHTML = "Camera Y: " + cameraY;
	document.getElementById("debug9").innerHTML = "FPS: " + fps;
	//document.getElementById("debug2").innerHTML = "Velocity Y: " + objectList[selectedPlayer].vY;
	//document.getElementById("debug3").innerHTML = "Velocity X: " + objectList[selectedPlayer].vX;
	document.getElementById("debug14").innerHTML = "#14 Previous X " + objectList[selectedPlayer].prevX;
	document.getElementById("debug15").innerHTML = "#15 Previous Y " + objectList[selectedPlayer].prevY;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Render
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var render = function (modifier) {
	//	Draw a plain black||white background to wipe the screen clean
	ctxOff.fillStyle = "rgb(0,0,0)";
	//ctx.fillStyle = "rgb(255,255,255)";
    ctxOff.fillRect (0,0,CANVASWIDTH,CANVASHEIGHT);
	
	//	Draw objects (is now prerendered)
	drawList(tileList);
	drawList(objectList);
	drawList(energyList);
	drawList(projectileList);
	drawList(particleList);
	
	//	Draw prerendered canvas onto "real" canvas
	ctx.drawImage(canvasOff, 0, 0);
	
	//	Draw World
	//drawList(tileList);
	
	//	Draw Magnets
	//drawList(playerList);
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	The Game Loop
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var gameloop = function() {
	//	TyNote: Thank you to lostdecadegames for giving me the awesome tutorial that got me started with HTML5 game development!
	now = Date.now();
	delta = now-then;
	modifier = delta/1000;
	
	update(modifier);
	render(modifier);
	
	then = now;
};

//	Start the game!
then = Date.now();
preload();
setInterval(gameloop,1);