//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Item Skills
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

var useItem = function(id) {
	//	array must refer to actual item log, but for now this is what it would kind of look like
	switch(id) {
		case 1:
			use_bullet();
			break;
		case 2:
			use_blockade();
			break;
		case 3:
			use_knife();
			break;
		case 4:
			use_grenade();
			break;
		case 5:
			use_health();
			break;
		default:
	}
};

var use_bullet = function() {
	spawnBullet(thePlayer.x, thePlayer.y, thePlayer.z);
	theList[theList.length-1].direction = thePlayer.direction;
	keysUp[key["x"]] = true;
};

var use_blockade = function() {
	spawnBlockade(thePlayer.x + thePlayer.direction, thePlayer.y, thePlayer.z);
	keysUp[key["x"]] = true;
};

var use_knife = function() {
	spawnKnife(thePlayer.x + thePlayer.direction, thePlayer.y, thePlayer.z);
	keysUp[key["x"]] = true;
};

var use_grenade = function() {
	spawnGrenade(thePlayer.x + thePlayer.direction, thePlayer.y, thePlayer.z);
	keysUp[key["x"]] = true;
};

var use_health = function() {
	spawnHealth(thePlayer.x + thePlayer.direction, thePlayer.y, thePlayer.z);
	keysUp[key["x"]] = true;
};