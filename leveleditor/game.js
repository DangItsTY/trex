//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Preload
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var preload = function() {
    for(var i = 0; i < grid.length; i++){
    	for(var j = 0; j<grid[i].length;j++){
    		if (grid[i][j] == 0){
    			objectList[oCount] = new grasstile(j*IMAGESIZE,i*IMAGESIZE);
    		}
    		else if (grid[i][j] == 1){
    			objectList[oCount] = new bricksmile(j*IMAGESIZE,i*IMAGESIZE);
    		}
   		}
    }
	
	var temp = "";
	for(var i = 0; i < gridwaypoint.length; i++){
    	for(var j = 0; j<gridwaypoint[i].length;j++){
    		if (gridwaypoint[i][j] > 100 && gridwaypoint[i][j] < 200){
    			objectList[oCount] = new waypoint(j*IMAGESIZE,i*IMAGESIZE);
				//<div style="position:absolute; top:64px; left:64px;">100</div>
				temp += '	<div style="position:absolute; top:';
				temp +=	'	'+i*IMAGESIZE+'px; ';
				temp += '	left:';
				temp += '	'+j*IMAGESIZE+'px;">';
				temp += gridwaypoint[i][j];
				temp += '	</div>';
				/*
				temp += '	<div style="position:absolute; top:';
				temp += '	64';
				temp += '	px; left:';
				temp += '	64';
				temp += '	px;">';
				temp += '	100';
				temp += '	</div>';
				*/
    		}
   		}
    }
	document.getElementById("waypointlabels").innerHTML = temp;
	
	objectList[oCount] = new selector(0, 0);
	theSelector = objectList[oCount-1];	
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
	document.getElementById("debug5").innerHTML = "Test Waypoint Label: " + testWaypoint;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Render
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var render = function () {
	ctxOff.fillStyle = "rgb(0,0,0)";
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