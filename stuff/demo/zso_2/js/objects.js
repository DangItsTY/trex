//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Objects
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*		
var objectList = new Array();
var oCount = 0;
var PLAYER_ID;
var FLOOR_CONST = 20;

// playing around
var theList = new Array();
var theSprites = new Array();

var tile = function(x, y, z) {
	this.name = "tile";
	this.type = "tile";
	this.x = x;
	this.y = y;
	this.z = z;
	this.speed = 0;
	this.health = 1;
	this.act = function(object) {};
	this.deathtimer = 0.5;
	this.lifetimer = 0.0;
	this.direction = 0;
	this.size = 1.0;
	
	this.material = new THREE.SpriteMaterial({map: assets_grass, color: 0xffffff, fog: true});
	this.sprite = new THREE.Sprite(this.material);
	this.sprite.position.set(this.x, this.y, this.z);
	this.sprite.scale.set(1.0,1.0,1.0);
	//scene.add(this.sprite);
	
	oCount++;
};

var test = {
	"name":"tile",
	"x":0,
	"y":0,
	"z":0,
	"act": function(object) {},
	"material": function() {new THREE.SpriteMaterial({map: assets_grass, color: 0xffffff, fog: true})}
};

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
	"jumpSpeed" : 0.1,//0.1
	"health" : 10,
	"direction" : 0,
	"size" : 1,
	"itemSlot" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 2,
	"friction" : "none",
	"frictionkey" : false,
	"jumpheight" : 2,
	"jumpcount" : 0,
	"jumpkey" : true
}};
		
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
	"speed" : 0,
	"jumpSpeed" : 0,
	"health" : 1,
	"direction" : 0,
	"size" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 1
}};

var sand = function () {return {
	"name" : "sand",
	"type" : "tile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0,
	"jumpSpeed" : 0,
	"health" : 1,
	"direction" : 0,
	"size" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 1
}};

var sand_2 = function () {return {
	"name" : "sand_2",
	"type" : "tile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0,
	"jumpSpeed" : 0,
	"health" : 1,
	"direction" : 0,
	"size" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 1
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
	"speed" : 0.01,
	"jumpSpeed" : 0.25,
	"health" : 1,
	"direction" : 0,
	"size" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["follow"],
	"weight" : 1
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
	"speed" : 0.5,
	"jumpSpeed" : 0.25,
	"health" : 1,
	"direction" : 0,
	"size" : 0.25,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["projectile_straight"],
	"weight" : 1
}};

var tree = function () {return {
	"name" : "tree",
	"type" : "tile_decorative",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0,
	"jumpSpeed" : 0,
	"health" : 1,
	"direction" : 0,
	"size" : 24,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["make_photite"],
	"weight" : 0,
	"skilltimer_1" : 5,
	"skillcounter_1" : 0
}};

var photite = function () {return {
	"name" : "photite",
	"type" : "resource",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0,
	"jumpSpeed" : 0,
	"health" : 1,
	"direction" : 0,
	"size" : 0.5,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 1
}};

var treetop = function () {return {
	"name" : "treetop",
	"type" : "tile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0,
	"jumpSpeed" : 0,
	"health" : 1,
	"direction" : 0,
	"size" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 1
}};

var treeledge = function () {return {
	"name" : "treeledge",
	"type" : "tile",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0,
	"jumpSpeed" : 0,
	"health" : 1,
	"direction" : 0,
	"size" : 0.5,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 1
}};

var treebg = function () {return {
	"name" : "treebg",
	"type" : "tile_decorative",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0,
	"jumpSpeed" : 0,
	"health" : 1,
	"direction" : 0,
	"size" : 32,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 0
}};

var mammal = function () {return {
	"name" : "mammal",
	"type" : "friendly",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0.02,
	"jumpSpeed" : 0.1,
	"health" : 1,
	"direction" : 0,
	"size" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["wander"],
	"weight" : 1,
	"skilltimer_1" : 2,
	"skillcounter_1" : 0,
	"behavior_1": 1
}};

var plantimal = function () {return {
	"name" : "plantimal",
	"type" : "friendly",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0.1,
	"jumpSpeed" : 0.1,
	"health" : 1,
	"direction" : 0,
	"size" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 1
}};

var deer = function () {return {
	"name" : "deer",
	"type" : "friendly",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0.02,
	"jumpSpeed" : 0.1,
	"health" : 1,
	"direction" : 0,
	"size" : 2,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["wander"],
	"weight" : 0,
	"skilltimer_1" : 2,
	"skillcounter_1" : 0,
	"behavior_1": 1
}};

var frog = function () {return {
	"name" : "frog",
	"type" : "friendly",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0.02,
	"jumpSpeed" : 0.1,
	"health" : 1,
	"direction" : 0,
	"size" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["wander"],
	"weight" : 1,
	"skilltimer_1" : 2,
	"skillcounter_1" : 0,
	"behavior_1": 1
}};

var spider = function () {return {
	"name" : "spider",
	"type" : "friendly",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0.02,
	"jumpSpeed" : 0.1,
	"health" : 1,
	"direction" : 0,
	"size" : 0.5,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["wander"],
	"weight" : 1,
	"skilltimer_1" : 2,
	"skillcounter_1" : 0,
	"behavior_1": 1
}};

var barricade = function () {return {
	"name" : "barricade",
	"type" : "object",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0.5,
	"jumpSpeed" : 0.25,
	"health" : 1,
	"direction" : 0,
	"size" : 1,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 1
}};

var guardian = function () {return {
	"name" : "guardian",
	"type" : "friendly",
	"x" : 0,
	"y" : 0,
	"z" : 0,
	"vx" : 0,
	"vy" : 0,
	"ax" : 0,
	"ay" : 0,
	"speed" : 0.5,
	"jumpSpeed" : 0.25,
	"health" : 1,
	"direction" : 0,
	"size" : 4,
	"deathtimer" : 0.5,
	"lifetimer" : 0.0,
	"act" : ["null"],
	"weight" : 0
}};

// need to build an actual HUD, probably just one object that contains one image
// and then its fields will contain information about what items it has
var hud = function () {return {
}};