//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Objects
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var object = function(x, y) {
	this.x = x;
	this.y = y;

	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/square_red.png";
	this.collisionType = "transparent";
	this.runInput = function(modifier) { flybot_input(modifier); };
	this.act = function(modifier, obj) { };
	this.resolve = function(modifier) { };

	oCount++;
};

var grasstile = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.size = 64;
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
	this.x = x;
	this.y = y;
	
	this.size = 64;
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

var tower = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/tower.png";
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { autoattackarrow(modifier, obj); };
	this.resolve = function(modifier) { };
	
	this.attackdamage = 5;
	this.attackspeed = 3;
	this.attacktimer = 0;

	oCount++;
};

var arrow = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/arrow.png";
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { movetotarget(modifier, obj); isinrangedie(modifier, obj); };
	this.resolve = function(modifier, obji) { die(modifier, obji) };
	
	this.speed = 256;
	this.target = objectList[99];
	this.readytodie = false;

	oCount++;
};

var autoattackarrow = function (modifier, obj) {
	//	Fires an arrow according to object attack speed
	if (obj.attacktimer > obj.attackspeed) {
		objectList[oCount] = new arrow(obj.x, obj.y);
		obj.attacktimer = 0;
	}
	obj.attacktimer += modifier;
};

var movetotarget = function (modifier, obj) {
	if (obj.x < obj.target.x) {
		obj.x += obj.speed*modifier;
	}
	else {
		obj.x -= obj.speed*modifier;
	}
	if (obj.y < obj.target.y) {
		obj.y += obj.speed*modifier;
	}
	else {
		obj.y -= obj.speed*modifier;
	}
};

var isinrangedie = function(object, target) {
	if (object.x <= target.x + object.size && object.x >= target.x - object.size &&
		object.y <= target.y + object.size && object.y >= target.y - object.size) {
		object.readytodie = true;
	}
};

var die = function (modifier, obj) {
	if (objectList[obj].readytodie) {
		delete objectList[obj];
	}
};