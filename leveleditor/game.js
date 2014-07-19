//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Preload
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var preload = function() {
	//objectList[oCount] = new flybot(CANVASWIDTH/2, CANVASHEIGHT/2);		//	Creates an object inside objectList
	//selectedPlayer = 0;		//	Sets currently controlled object to the first object created (ie the one above)
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
preload();
// window.requestAnimFrame(gameloop);
setInterval(gameloop,1);