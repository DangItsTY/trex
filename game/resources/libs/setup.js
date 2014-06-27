//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Setup Variables
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

//	Public variables
var now;		//	The current time
var then;		//	The previous time
var delta;		//	The change in time from previous frame to current frame in milliseconds
var modifier;	//	This is delta in seconds and is used throughout the game engine based on frame delay
var selectedPlayer = 0;		//	This refers to the player object currently in control
var cameraX = 0;
var cameraY = 0;
var cameraDeltaX = 0;
var cameraDeltaY = 0;
var objectList = new Array();
var oCount = 0;

//	CONSTANTS
var IMAGESIZE = 16;
var CANVASWIDTH = 640;
var CANVASHEIGHT = 640;

//	The canvas
//var canvas = document.createElement("canvas");
var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");
canvas.width = CANVASWIDTH;
canvas.height = CANVASHEIGHT;
document.body.appendChild(canvas);

//	The Off Canvas (for prerendering)
var canvasOff = document.createElement("canvas");
var ctxOff = canvasOff.getContext("2d");
canvasOff.width = CANVASWIDTH;
canvasOff.height = CANVASHEIGHT;

//	Key variables
var keysDown = {};	//	Holds a list of all keys that are down
var keysUp = {};	//	Keys that are released

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	keysUp[e.keyCode] = true;
	delete keysDown[e.keyCode];
}, false);

//	Key Mapping
var key = new Array();
key["up"] = 87;
key["down"] = 83;
key["left"] = 65;
key["right"] = 68;
key["y"] = 78;
key["x"] = 74;
key["b"] = 77;
key["a"] = 75;
key["l"] = 16;
key["r"] = 186;
key["start"] = 27;
key["select"] = 13;
key["spacebar"] = 32;