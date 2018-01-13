//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Objects
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
var entityList = new Array();		// 	holds all "living" things
var tileList = new Array();			//	holds tile objects that don't do anything
var projectileList = new Array();	//	holds all projectiles
var objectList = new Array();
var oCount = 0;
var PLAYER_ID;
var FLOOR_CONST = 20;
var WORLD_LEFT_CONST = 80;

// playing around
var theList = new Array();
var theSprites = new Array();

var player = function () {return {
	"name" : "player",
	"type" : "friendly",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 5,//0.1
	"jumpSpeed" : 3.5,
	"health" : 10,
	"direction" : 0,
	"size" : 1,
	"itemSlot" : 1,
	"lifetimer" : -1.0,
	"act" : ["null"],
	"weight" : 1,
	"friction" : "none",
	"frictionkey" : false,
	"jumpcount" : 0,
	"jumpkey" : true
}};

var zombie = function () {return {
	"name" : "zombie",
	"type" : "enemy",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 1,//0.1
	"jumpSpeed" : 0.1,//0.1
	"health" : 10,
	"direction" : 0,
	"size" : 1,
	"itemSlot" : 1,
	"lifetimer" : -1.0,
	"act" : ["follow"],
	"weight" : 0
}};

var bullet = function () {return {
	"name" : "bullet",
	"type" : "projectile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 5,//0.1
	"jumpSpeed" : 3.5,
	"health" : 10,
	"direction" : 0,
	"size" : 1,
	"itemSlot" : null,
	"lifetimer" : 3.0,
	"act" : ["null"],
	"weight" : 1,
	"friction" : "none",
	"frictionkey" : false,
	"jumpcount" : 0,
	"jumpkey" : true
}};

var blockade = function () {return {
	"name" : "blockade",
	"type" : "projectile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 5,//0.1
	"jumpSpeed" : 3.5,
	"health" : 10,
	"direction" : 0,
	"size" : 1,
	"itemSlot" : null,
	"lifetimer" : -1.0,
	"act" : ["null"],
	"weight" : 1,
	"friction" : "none",
	"frictionkey" : false,
	"jumpcount" : 0,
	"jumpkey" : true
}};

var knife = function () {return {
	"name" : "knife",
	"type" : "projectile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 5,//0.1
	"jumpSpeed" : 3.5,
	"health" : 10,
	"direction" : 0,
	"size" : 1,
	"itemSlot" : null,
	"lifetimer" : 1.0,
	"act" : ["null"],
	"weight" : 1,
	"friction" : "none",
	"frictionkey" : false,
	"jumpcount" : 0,
	"jumpkey" : true
}};

var grenade = function () {return {
	"name" : "grenade",
	"type" : "projectile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 5,//0.1
	"jumpSpeed" : 3.5,
	"health" : 10,
	"direction" : 0,
	"size" : 1,
	"itemSlot" : null,
	"lifetimer" : 3.0,
	"act" : ["null"],
	"weight" : 1,
	"friction" : "none",
	"frictionkey" : false,
	"jumpcount" : 0,
	"jumpkey" : true
}};

var health = function () {return {
	"name" : "health",
	"type" : "projectile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 5,//0.1
	"jumpSpeed" : 3.5,
	"health" : 10,
	"direction" : 0,
	"size" : 1,
	"itemSlot" : null,
	"lifetimer" : 1.0,
	"act" : ["null"],
	"weight" : 1,
	"friction" : "none",
	"frictionkey" : false,
	"jumpcount" : 0,
	"jumpkey" : true
}};


//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Tiles
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	

var grass = function () {return {
	"name" : "grass",
	"type" : "tile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 5,//0.1
	"jumpSpeed" : 0.1,//0.1
	"health" : 10,
	"direction" : 0,
	"size" : 1,
	"itemSlot" : 1,
	"lifetimer" : -1.0,
	"act" : ["null"],
	"weight" : 0,
	"friction" : "none",
	"frictionkey" : false,
	"jumpheight" : 2,
	"jumpcount" : 0,
	"jumpkey" : true
}};