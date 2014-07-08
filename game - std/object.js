//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Objects
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Flybot - Allows you to move freely
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var flybot = function(x, y) {
	this.x = x;
	this.y = y;
	this.speed = 256;

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

var object = function(x, y) {
	this.name = "object";
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
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { movetotarget(modifier, obj); };
	this.resolve = function(modifier) { };
	this.target = objectList[99];

	this.speed = 50;
	    
	this.animationspeed = 0.3;
	this.animationtime = 0;

	oCount++;
};

var batAi = function(modifier, obj){

};

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
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { };
	this.resolve = function(modifier) { };

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
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { };
	this.resolve = function(modifier) { };

	oCount++;
};

var tower = function(x, y) {
	this.name = "tower";
	this.x = x;
	this.y = y;
	
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/tower.png";
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { gettarget(modifier, obj); autoattackarrow(modifier, obj); };
	this.resolve = function(modifier) { };
	
	this.attackdamage = 5;
	this.attackspeed = 3;
	this.attacktimer = 0;
	this.target;

	oCount++;
};

var arrow = function(x, y) {
	this.name = "arrow";
	this.x = x;
	this.y = y;
	
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/arrow.png";
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { movetotarget(modifier, obj); attack(modifier, obj); isinrangedie(modifier, obj); };
	this.resolve = function(modifier, obji) { };
	
	this.speed = 256;
	this.target;
	this.readytodie = false;			//	If true, this object is ready to be removed from the game.

	this.damage = 2; 

	oCount++;
};

var gettarget = function (modifier, obj) {
	if (obj.target.readytodie == true) {
		var temp = findObject(objectList, "dinosaur");
		if (temp != -1) {
			obj.target = objectList[temp];
		}
	}
};

var autoattackarrow = function (modifier, obj) {
	//	Fires an arrow according to object attack speed
	if (obj.attacktimer > obj.attackspeed) {
		objectList[oCount] = new arrow(obj.x, obj.y);
		objectList[oCount-1].target = obj.target;
		obj.attacktimer = 0;
	}
	obj.attacktimer += modifier;
};

var switchtarget = function(modifier, obj) {
	if (obj.x <= obj.target.x + obj.size && obj.x >= obj.target.x - obj.size &&
		obj.y <= obj.target.y + obj.size && obj.y >= obj.target.y - obj.size) {
		obj.target = (obj.target).target;
	}
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

var attack = function(modifier,obj) {
	if (obj.x <= obj.target.x + obj.size/16 && obj.x >= obj.target.x - obj.size/16 &&
		obj.y <= obj.target.y + obj.size/16 && obj.y >= obj.target.y - obj.size/16) {
		obj.target.health -= obj.damage;
	}
};

var isinrangedie = function(modifier, obj) {
	if (obj.x <= obj.target.x + obj.size/16 && obj.x >= obj.target.x - obj.size/16 &&
		obj.y <= obj.target.y + obj.size/16 && obj.y >= obj.target.y - obj.size/16) {
		obj.readytodie = true;
	}
};

var die = function (modifier, obj) {
	if (objectList[obj].readytodie) {
		delete objectList[obj];
	}
};

var isdead = function(modifier,obj) {
	if (obj.health <=0) {
		obj.readytodie = true;
	}

};
var dinosaur = function(x, y) {
	this.name = "dinosaur";
	this.x = x;
	this.y = y;
	
	this.size = 64;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "resources/images/charlie.png";
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { movetotarget(modifier, obj); switchtarget(modifier, obj); dinoanimate(modifier, obj); isdead(modifier, obj); };
	this.resolve = function(modifier) { };
	
	this.speed = 50;
	this.target;

	this.health = 5; 
	this.readytodie = false;			//	If true, this object is ready to be removed from the game.
    
	this.animationspeed = 0.3;
	this.animationtime = 0;

	oCount++;
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
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { gettarget(modifier, obj); movetotarget(modifier, obj); bite(modifier, obj); };
	this.resolve = function(modifier) { };
	
	this.speed = 50;
	this.target;

	this.health = 5; 
	this.readytodie = false;			//	If true, this object is ready to be removed from the game.
	
	this.damage = 9000;
    
	this.animationspeed = 0.3;
	this.animationtime = 0;

	oCount++;
};

var bite = function(modifier, obj) {
	if (obj.x <= obj.target.x + obj.size/16 && obj.x >= obj.target.x - obj.size/16 &&
		obj.y <= obj.target.y + obj.size/16 && obj.y >= obj.target.y - obj.size/16) {
		obj.target.health -= obj.damage;
	}
};

var dinoanimate = function(modifier, obj) {
	if (obj.animationtime > obj.animationspeed) {
		if (obj.imageX == 0) {
			obj.imageX = 1;
		}
		else if (obj.imageX == 1) {
			obj.imageX = 0;
		}
		obj.animationtime = 0;
	}
	obj.animationtime += modifier;
};

var waypoint = function(x, y) {
	this.name = "waypoint";
	this.x = x;
	this.y = y;
	
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src;
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { };
	this.resolve = function(modifier) { };
	
	this.target;
    

	oCount++;
};

var spawner = function(x, y) {
	this.name = "spawner";
	this.x = x;
	this.y = y;
	
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src;
	this.collisionType = "transparent";
	this.runInput = function(modifier) { };
	this.act = function(modifier, obj) { spawndino(modifier, obj); };
	this.resolve = function(modifier) { };    

	this.spawnspeed = 10;
	this.spawntime = 0;
	oCount++;
};

var spawndino = function (modifier, obj) {
	if (obj.spawntime > obj.spawnspeed) {
		objectList[oCount] = new dinosaur(obj.x, obj.y);
		objectList[oCount-1].target = objectList[120];	//definitely hardcoded lol
		obj.spawntime = 0;
	}
	obj.spawntime += modifier;
};