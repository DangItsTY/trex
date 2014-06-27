//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Preload
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
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
	objectList[oCount] = new tower(2*64, 2*64);
	
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Update
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var update = function (modifier) {
	input(modifier);		//	First gather input
	act(modifier);			//	Then make all objects act based on inputs
	resolve(modifier);		//	Do collisions and resolve based on object's acts
	
	//	TyNote: Recommended to place debug messages here
	//document.getElementById("debug1").innerHTML = "#1 Some Debug Message " + somevaryouwanttosee;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Render
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var render = function (modifier) {
	ctxOff.fillStyle = "rgb(255,255,255)";
    ctxOff.fillRect (0,0,CANVASWIDTH,CANVASHEIGHT);		//	Draw black background
	
	drawList(objectList);	//	Draw objects (is now prerendered)
	
	ctx.drawImage(canvasOff, 0, 0);		//	Draw prerendered canvas onto "real" canvas
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	The Game Loop
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var gameloop = function() {
	//	TyNoteSpecial: Thank you to lostdecadegames for giving me the awesome tutorial that got me started with HTML5 game development!
	now = Date.now();
	delta = now-then;
	modifier = delta/1000;
	
	update(modifier);
	render(modifier);
	
	then = now;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Start Game Engine
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
then = Date.now();
preload();
setInterval(gameloop,1);