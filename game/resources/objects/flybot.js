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