//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Functions
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

var zombieTimer = 1;
var zombieTimerCount = 0;
var spawnZombies = function(mod) {
	zombieTimerCount += mod;
	
	if (zombieTimerCount >= zombieTimer) {
		console.log("[Log]: " + "A zombie has spawned");
		var rand = Math.floor(Math.random()*10);
		zombieTimerCount = 0;
		
		spawnZombie(WORLD_LEFT_CONST + 20 + rand, FLOOR_CONST, 0);
	} else {
	}
};

var collide = function(a, b) {
	//	simple box collision
	if (a.x < b.x+(b.size/2) && a.x > b.x-(b.size/2) &&
		a.y < b.y+(b.size) && a.y > b.y-(b.size)) {
		return true;
	}
};


var cleanObjectList = function() {
	for (var i = 0; i < theList.length; i++) {
		if (theList[i].health <= 0) {
			scene_temp.remove(theSprites[i]);
			theList.splice(i, 1);
			theSprites.splice(i, 1);
			i -= 1;
		}
	}
};

//	playing around with some floor generating algorithms
//	first let's generate some biome nodes
var weightedNodes = [7, 5, 1, 3];	//sentientforest, wastelands, city, hills
var generateWorld = function() {
	console.log("[Log]: Loading World....");
	generateSimple(WORLD_LEFT_CONST, WORLD_LEFT_CONST + 100);
	console.log("[Log] World Loaded! Total Tiles: " + theList.length);
};

var itMatters = function(object) {
	// return true if object is within sight of player
	var boundary_left = theList[PLAYER_ID].x - 40;
	var boundary_right = theList[PLAYER_ID].x + 40;
	var boundary_up = theList[PLAYER_ID].y + 40;
	var boundary_down = theList[PLAYER_ID].y - 40;
	
	if (object.x > boundary_left && object.x < boundary_right &&
		object.y > boundary_down && object.y < boundary_up) {
		return true;
	} else {
		return false;
	}
};

var debug_playerStats = function() {
	console.log("[Log]: player speed is " + thePlayer.vx);
	console.log("[Log]: player friction is " + thePlayer.friction);
	console.log("[Log]: player frictionkey is " + thePlayer.frictionkey);
};