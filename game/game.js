//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Preload
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var tyload_2 = function() {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	//	Draw Path
	objectList[oCount] = new bricksmile(0*64, 4*64);
	objectList[oCount] = new bricksmile(1*64, 4*64);
	objectList[oCount] = new bricksmile(2*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 4*64);
	objectList[oCount] = new bricksmile(4*64, 4*64);
	objectList[oCount] = new bricksmile(5*64, 4*64);
	objectList[oCount] = new bricksmile(6*64, 4*64);
	objectList[oCount] = new bricksmile(7*64, 4*64);
	objectList[oCount] = new bricksmile(8*64, 4*64);
	objectList[oCount] = new bricksmile(9*64, 4*64);
	//	Make Waypoint List
	var tempList = new Array();
	objectList[oCount] = new waypoint(0*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(9*64, 4*64);
	tempList.push(objectList[oCount-1]);
	//	Create Spawner and set to waypointlist	
	objectList[oCount] = new spawner(0*64, 4*64);
	objectList[oCount-1].waypointlist = tempList;
	objectList[oCount-1].target = objectList[oCount-1].waypointlist[0];
	
	//objectList[oCount] = new tower(4*64, 3*64);
	objectList[oCount] = new tower(4*64, 5*64);
	//objectList[oCount] = new tower(5*64, 3*64);
};

var tyload_1 = function() {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	//	Draw Path
	objectList[oCount] = new bricksmile(0*64, 4*64);
	objectList[oCount] = new bricksmile(1*64, 4*64);
	objectList[oCount] = new bricksmile(2*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 5*64);
	objectList[oCount] = new bricksmile(3*64, 6*64);
	objectList[oCount] = new bricksmile(4*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 5*64);
	objectList[oCount] = new bricksmile(5*64, 4*64);
	objectList[oCount] = new bricksmile(6*64, 4*64);
	objectList[oCount] = new bricksmile(7*64, 4*64);
	objectList[oCount] = new bricksmile(8*64, 4*64);
	objectList[oCount] = new bricksmile(9*64, 4*64);
	//	Make Waypoint List
	var tempList = new Array();
	objectList[oCount] = new waypoint(0*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(9*64, 4*64);
	tempList.push(objectList[oCount-1]);
	//	Create Spawner and set to waypointlist	
	objectList[oCount] = new spawner(0*64, 4*64);
	objectList[oCount-1].waypointlist = tempList;
	objectList[oCount-1].target = objectList[oCount-1].waypointlist[0];
	
	objectList[oCount] = new tower(4*64, 5*64);
	objectList[oCount] = new tower(2*64, 5*64);
};

var preload = function() {
	//objectList[oCount] = new flybot(CANVASWIDTH/2, CANVASHEIGHT/2);		//	Creates an object inside objectList
	//selectedPlayer = 0;		//	Sets currently controlled object to the first object created (ie the one above)
	
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	for (var i = 0; i<5; i++) {
		objectList[oCount] = new bricksmile(4*64,i*64);
	}
	for (var i = 5; i<7; i++) {
		objectList[oCount] = new bricksmile(i*64,4*64);
	}
	for (var i = 5; i<8; i++) {
		objectList[oCount] = new bricksmile(6*64,i*64);
	}
	for (var i = 3; i<6; i++) {
		objectList[oCount] = new bricksmile(i*64,7*64);
	}
	for (var i = 8; i<10; i++) {
		objectList[oCount] = new bricksmile(3*64,i*64);
	}
	
	//	Create Waypoints (doing this backwards)
	objectList[oCount] = new waypoint(3*64, 9*64);
	objectList[oCount-1].target = objectList[oCount-1];
	objectList[oCount] = new waypoint(3*64, 7*64);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new waypoint(6*64, 7*64);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new waypoint(6*64, 4*64);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new waypoint(4*64, 4*64);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new waypoint(4*64, 0);
	objectList[oCount-1].target = objectList[oCount-2];
	
	objectList[oCount] = new dinosaur(0, 0);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new tower(2*64, 2*64);
	objectList[oCount-1].target = objectList[oCount-2];
	//objectList[oCount] = new unikitty(320, 320);
	//objectList[oCount-1].target = objectList[oCount-2];
	
	objectList[oCount] = new spawner(4*64, 0);
	//objectList[oCount] = new batObj(9*64, 9*64);
	
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Update
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var update = function () {
	input();		//	First gather input
	act();			//	Then make all objects act based on inputs
	resolve();		//	Do collisions and resolve based on object's acts
	
	//	TyNote: Recommended to place debug messages here
	//document.getElementById("debug1").innerHTML = "#1 Some Debug Message " + somevaryouwanttosee;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Render
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var render = function () {
	ctxOff.fillStyle = "rgb(255,255,255)";
    ctxOff.fillRect (0,0,CANVASWIDTH,CANVASHEIGHT);		//	Draw black background
	
	drawList(objectList);	//	Draw objects (is now prerendered)
	
	ctx.drawImage(canvasOff, 0, 0);		//	Draw prerendered canvas onto "real" canvas
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	The Game Loop
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
// shim layer with setTimeout fallback 
      // window.requestAnimFrame = (function(){ 
      //   return  window.requestAnimationFrame       ||  
      //           window.webkitRequestAnimationFrame ||  
      //           window.mozRequestAnimationFrame    ||  
      //           window.oRequestAnimationFrame      ||  
      //           window.msRequestAnimationFrame     ||  
      //           function( callback ){ 
      //             window.setTimeout(callback, 1000 / 60); 
      //           }; 
      // })();

var gameloop = function() {
	 
      // window.requestAnimFrame(gameloop);
	//	TyNoteSpecial: Thank you to lostdecadegames for giving me the awesome tutorial that got me started with HTML5 game development!
	now = Date.now();
	delta = now-then;
	modifier = delta/1000;
	
	update();
	render();
	
	then = now;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Start Game Engine
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
then = Date.now();
tyload_2();
// window.requestAnimFrame(gameloop);
setInterval(gameloop,1);