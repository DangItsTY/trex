//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Objects
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var object = function(x, y) {
	//	This is a basic template for all objects. You can follow this template when creating new objects.

	//	~~~~~~~*~~~~~~~*
	//	General Fields
	//	~~~~~~~*~~~~~~~*
	this.name = "object";	//	Name the object. This should be the same as the variable name.
	this.type = "neutral";	//	Give the object a type. Example: enemy, player, neutral, tile
	this.description = "This is a basic object. This is a good example of what objects should follow.";	//	Describe the object.
	this.x = x;		//	The x position.
	this.y = y;		//	The y position.
	this.size = 16;		//	The size of the object in terms of a square (example: 16x16). Usually reflects size of the image (in pixels).
	this.imageX = 0;	//	The x location of the object on the image. Used for spritesheets.
	this.imageY = 0;	//	The y location of the object on the image. Used for spritesheets.
	this.image = new Image();		//	Create an image associated with this object.
	this.image.src = "resources/images/square_red.png";		//	The image source for this object.
	this.collisionType = "transparent";			//	The collision type of the object, used for collision management.
	this.runInput = function() { flybot_input(); };		//	Input scripts go here. Aka player control scripts. Leave this blank if the object is an NPC.
	this.act = function(object) { };		//	Act scripts that make the object "alive" go here. For example, AI scripts go here.
	this.resolve = function(object) { };		//	Resolve scripts go here. These are used to resolve any conflicts that may occur during the Act stage.
	oCount++;		//	Used to automatically increment the counter variable holding objects in objectList.
	
	//	~~~~~~~*~~~~~~~*
	//	Typical fields for a typical fighting moving object
	//	~~~~~~~*~~~~~~~*
	this.health;		//	The amount of health a unit has until it is dead.
	this.damage;		//	The amount of damage a unit deals
	this.range;			//	The attack range
	this.attackspeed;	//	The attack speed as 1/attackspeed attacks per second. Example: 3 means an attack every 3 seconds.
	this.attacktimer;	//	A timer used for attack animation, delaying an attack, etc.
	this.speed;			//	Movement speed in terms of pixels per second.
	this.target;		//	The target the unit is focused on attacking/doing some action.
	this.readytoattack;	//	If ready to inflict damage, this is true.
	this.readytodie;	//	If true, this object is ready to die. Note: If true, the object does not act or get drawn
};








//	~~*Table of Contents~~*
//	Miscellaneous Objects
//	Tile Objects
//	Tool Objects
//	Tower Objects
//	Dinosaur Objects








//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*
//	Miscellaneous Objects
//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*

var flybot = function(x, y) {
	this.name = "flybot";
	this.type = "neutral";
	this.description = "A fast bot with no collision. Useful when doing testing and you want to fly around the map, so to speak.";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/square_red.png";
	this.collisionType = "transparent";
	this.runInput = function() { flybot_input(); };
	this.act = function(object) { };
	this.resolve = function(object) { };
	oCount++;
	
	this.speed = 256;
};

var unikitty = function(x, y) {
	this.name = "unikitty";
	this.x = x;
	this.y = y;
	
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/unikitty.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { gettarget(object); movetotarget(object); bite(object); };
	this.resolve = function(object) { };
	
	this.speed = 50;
	this.target;

	this.health = 5; 
	this.readytodie = false;			//	If true, this object is ready to be removed from the game.
	
	this.damage = 9000;
    
	this.animationspeed = 0.3;
	this.animationtime = 0;

	oCount++;
};

// std
var batObj = function(x, y) {
	this.name = "batObj";
	this.x = x;
	this.y = y;

	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/bat.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { movetotarget(object); };
	this.resolve = function(object) { };
	this.target = objectList[99];

	this.speed = 50;
	    
	this.animationspeed = 0.3;
	this.animationtime = 0;

	oCount++;
};

//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*
//	Tile Objects
//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*

var grasstile = function(x, y) {
	this.name = "grasstile";
	this.x = x;
	this.y = y;
	
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/grass.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { };
	this.resolve = function(object) { };

	oCount++;
};

var bricksmile = function(x, y) {
	this.name = "bricksmile";
	this.x = x;
	this.y = y;
	
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/brick.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { };
	this.resolve = function(object) { };

	oCount++;
};

var selector = function (x, y) {
	this.name = "selector";
	this.type = "neutral";
	this.description = "An indicator. Shows selected square.";
	this.x = x;
	this.y = y;
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/selector.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { followMouseGrid(object); };
	this.resolve = function(object) { };
	oCount++;
};

//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*
//	Tool Objects
//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*

var spawner = function(x, y) {
	this.name = "spawner";
	this.type = "neutral";
	this.description = "Spawns dinosaurs";
	this.x = x;
	this.y = y;
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src;
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { spawndino(object); };
	this.resolve = function(object) { };    
	oCount++;
	
	this.waypointlist;
	this.target;
	this.spawnspeed = 3;
	this.spawntime = 8;
	this.spawnmax = 5;
	this.spawncount = 0;
	this.readytodie = false;
};

var timeline = function(x, y) {
	this.name = "timeline";
	this.type = "neutral";
	this.description = "The timeline that holds all of the events to happen in the game";
	this.x = x;
	this.y = y;
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src;
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { level1(object); };
	this.resolve = function(object) { };    
	oCount++;
	
	this.timelinetimer = 0;		//	Keeps track of time passed
	this.event = 0;		//	The event number
};

var waypoint = function(x, y) {
	this.name = "waypoint";
	this.type = "neutral";
	this.description = "A region on the map. Holds just a location.";
	this.x = x;
	this.y = y;
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src;
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { };
	this.resolve = function(object) { };    
	oCount++;
};

//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*
//	Tower Objects
//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*

var tower = function(x, y) {
	this.name = "tower";
	this.type = "player";
	this.description = "A basic arrow tower. Shoots arrows.";
	this.x = x;
	this.y = y;
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/tower.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { tower_ai(object); };
	this.resolve = function(object) { };
	oCount++;
	
	this.health = 5;
	this.damage = 100;
	this.range = 1.5*64;
	this.attackspeed = 1;
	this.attacktimer = 0;
	this.speed = 256;
	this.target;
};

var turret = function(x, y) {
	this.name = "turret";
	this.type = "player";
	this.description = "Pew Pew Pew!";
	this.x = x;
	this.y = y;
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/tower.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { tower_ai(object); };
	this.resolve = function(object) { };
	oCount++;
	
	this.health = 5;
	this.damage = 1;
	this.range = 3*64;
	this.attackspeed = 0.1;
	this.attacktimer = 0;
	this.speed = 0;
	this.target;
};

var arrow = function(x, y) {
	this.name = "arrow";
	this.type = "projectile";
	this.description = "A basic projectile";
	this.x = x;
	this.y = y;
	
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/arrow.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { follow(object); attack(object); isinrangedie(object); };
	this.resolve = function(objecti) { };
	oCount++;
	
	this.health = 5;
	this.damage;
	this.range;
	this.speed;
	this.target;
	this.readytoattack;
	this.readytodie;
};

//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*
//	Dinosaur Objects
//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*

var dinosaur = function(x, y) {
	this.name = "dinosaur";
	this.type = "enemy";
	this.description = "A fearless dinosaur. Follows waypoints. Simple creature.";
	this.x = x;
	this.y = y;
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/charlie.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { dino_ai(object); };
	this.resolve = function(object) { };
	oCount++;
	
	
	this.health = 300;
	this.damage = 0;
	this.range = 0;
	this.attackspeed = 0;
	this.attacktimer = 0;
	this.speed = 64;
	this.target;
	
	this.animationspeed = 0.3;
	this.animationtime = 0;
	
	this.readytodie = false;			//	If true, this object is ready to be removed from the game.
	this.animationspeed = 0.3;
	this.animationtime = 0;
	
	this.waypointlist = new Array();
};

var dinosaur2 = function(x, y) {
	this.name = "dinosaur";
	this.type = "enemy";
	this.description = "A fearless dinosaur. Follows waypoints. Simple creature.";
	this.x = x;
	this.y = y;
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/charlie.png";
	this.collisionType = "transparent";
	this.runInput = function() { };
	this.act = function(object) { dino_ai(object); };
	this.resolve = function(object) { };
	oCount++;
	
	
	this.health = 1100;
	this.damage = 0;
	this.range = 0;
	this.attackspeed = 0;
	this.attacktimer = 0;
	this.speed = 64;
	this.target;
	
	this.animationspeed = 0.3;
	this.animationtime = 0;
	
	this.readytodie = false;			//	If true, this object is ready to be removed from the game.
	this.animationspeed = 0.3;
	this.animationtime = 0;
	
	this.waypointlist = new Array();
};