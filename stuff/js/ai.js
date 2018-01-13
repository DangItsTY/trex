//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	AI
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
var follow = function (object) {
	if (object.x < thePlayer.x) {
		object.vx = object.speed;
		object.direction = 1;
	} else {
		object.vx = object.speed * -1;
		object.direction = -1;
	}
};

var projectile_straight = function (object) {
	//	goes straight according to direction
	if (object.direction == -1) {
		object.x -= object.speed;
	} else if (object.direction == 1) {
		object.x += object.speed;
	} else {
		//	don't move
	}
};

var make_photite = function (object) {
	//	probably should make a helper timer function
	if (object.skillcounter_1 >= object.skilltimer_1) {
		var random = Math.floor((Math.random() * object.size)) - (object.size/2);
		spawnPhotite(object.x + random, object.y, 0);
		object.skillcounter_1 = 0;
		console.log("[Log]: Spawned photite");
	} else {
		object.skillcounter_1 += modifier;
	}
};

var wander = function (object) {
	//	wander around your guarded area
	//var threshold = (object.x - object.guardLocationX) / object.guardDistance; too lazy to do the math, finish this later
	
	//	probably will be buggy. should we be switching directions this often?
	if (object.skillcounter_1 >= object.skilltimer_1) {
		object.behavior_1 = Math.floor((Math.random() * 3)) + 1;
		object.skillcounter_1 = 0;
	} else {
		object.skillcounter_1 += modifier;
	}
	switch (object.behavior_1) {
		case 1:
			//console.log("[Log]: Stay");
			break;
		case 2:
			//console.log("[Log]: Left");
			object.direction = -1;
			object.x += object.speed * object.direction;
			break;
		case 3:
			//console.log("[Log]: Right");
			object.direction = 1;
			object.x += object.speed * object.direction;
			break;
		default:
	}
};

//	A simple ai to follow player (aka the camera)