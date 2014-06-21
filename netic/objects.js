//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Objects
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var objectList = new Array();
var oCount = 0;
var object = function(x, y, type) {
	this.type = type;
	this.x = x;
	this.y = y;
	this.vX = 0;
	this.vY = 0;
	this.aX = 0;
	this.aY = 0;
	this.direction = 1;	//	1 is right, -1 is left
	this.directionX = 1;
	this.directionY = 1;
	this.speed = 640;
	this.jumpSpeed = 640;
	this.jumpCounter = 0;
	this.gravityT = 0;
	this.gravityDT = 0;
	this.frictionT = 0;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "images/square_red.png";
	this.collisionType = "solid";
	this.energy = 100;
	this.energyT = 0;
	this.energyObject = new energy(this);
	this.runInput = function(modifier) { flybot_input(modifier); };
	this.prevX = 0;
	this.prevY = 0;
	oCount++;
	
	switch (this.type) {
		case "netic":
			this.image.src = "images/netic.png";
			this.dashLeftEnable = 0;		//	1 means dash is on
			this.dashLeftComboTimer = 0;	//	Timer to keep track of combo duration
			this.dashLeftComboDuration = 30;	//	Time period that left must be executed within each other
			this.dashLeftTimer = 0;			//	Timer to keep track of dash duration
			this.dashLeftDuration = 60;	//	Duration of dash
			this.dashRightEnable = 0;
			this.dashRightComboTimer = 0;
			this.dashRightComboDuration = 30;
			this.dashRightTimer = 0;
			this.dashRightDuration = 60;
			this.dashReady = true;
			this.fastFallTimer = 0;
			this.fastFallDuration = 60;
			this.fastFallEnable = 0;
			this.fastFallReady = false;
			this.speed = 240;
			this.jumpSpeed = 640;
			this.weight = 240;
			this.jumpTimer = 0;
			this.jumpDuration = 60;
			this.jumpReady = true;
			this.wallSlide = false;
			this.runInput = function(modifier) { netic_input(modifier); };
			break;
		case "flybot":
			this.collisionType = "transparent";
			this.weight = 0;
			this.speed = 640;
			break;
		case "enemy":
			this.collisionType = "transparent";
			this.weight = 0;
			this.speed = 240;
			this.image.src = "images/square_red.png";
			this.follow_behavior = function(modifier, source, target) { follow_ai(modifier, source, target); };
			break;
		default:
	}
};

var tileList = new Array();
var tCount = 0;
var tile = function(x, y, type) {
	this.x = x;
	this.y = y;
	this.size = 16;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "images/square_green.png";
	this.collisionType = "solid";
	this.energy = 0;
	this.energyObject = new energy(this);
	tCount++;
	
	switch (type) {
		case "grass1":
			this.image.src = "images/grass1.png";
			break;
		case "tree":
			this.image.src = "images/tree.png";
			break;
		case "sky":
			this.image.src = "images/sky.png";
			this.collisionType = "transparent";
			break;
		default:
	}
};

var energyList = new Array();
var eCount = 0;
var energy = function(entity) {
	this.x = entity.x;
	this.y = entity.y;
	this.size = 16;
	this.imageX = 100;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "images/energy.png";
	energyList[eCount] = this;
	eCount++;
};

var projectileList = new Array();
var pCount = 0;
var projectile = function(entity) {
	this.x = entity.x;
	this.y = entity.y;
	this.vX = 0;
	this.vY = 0;
	this.aX = 0;
	this.aY = 0;
	this.speed = 128;
	this.gravityT = 0;
	this.gravityDT = 0;
	this.frictionT = 0;
	this.size = 8;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "images/projectile.png";
	this.energy = 0;
	//this.energyObject = new energy(this);	Do'nt need this, this is energy itself
	projectileList[pCount] = this;
	pCount++;
};

var particleList = new Array();
var paCount = 0;
var particle = function(entity, target) {
	this.x = entity.x;
	this.y = entity.y;
	this.target = target;
	this.vX = 0;
	this.vY = 0;
	this.aX = 0;
	this.aY = 0;
	this.speed = 128;
	this.size = 8;
	this.imageX = 0;
	this.imageY = 0;
	this.image = new Image();
	this.image.src = "images/projectile.png";
	this.energy = 0;
	particleList[paCount] = this;
	paCount++;
};