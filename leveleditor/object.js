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

var selector = function (x, y) {
	this.name = "selector";
	this.type = "neutral";
	this.description = "An indicator. Shows selected square.";
	this.x = x;
	this.y = y;
	this.size = IMAGESIZE;
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

var grasstile = function(x, y) {
	this.name = "grasstile";
	this.x = x;
	this.y = y;
	
	this.size = IMAGESIZE;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/grass.png";
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { };
	this.resolve = function(modifier) { };

	oCount++;
};

var bricksmile = function(x, y) {
	this.name = "bricksmile";
	this.x = x;
	this.y = y;
	
	this.size = IMAGESIZE;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/brick.png";
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { };
	this.resolve = function(modifier) { };

	oCount++;
};

var spawnpoint = function(x, y) {
	this.name = "spawnpoint";
	this.x = x;
	this.y = y;
	
	this.size = IMAGESIZE;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/spawnpoint.png";
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { };
	this.resolve = function(modifier) { };

	oCount++;
};