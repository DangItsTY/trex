//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Act Scripts
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*




//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*
//	AI Scripts
//	~~~~~~~*~~~~~~~*~~~~~~~*~~~~~~~*


var dino_ai = function (object) {
//	~~~~~~~*~~~~~~~*
//	Requirements: waypointlist
//	Description: Basic projectile attack. If target is within range, and attack is ready, spawn projectile.
//	Uses: updatewaypoint, follow
//	~~~~~~~*~~~~~~~*
	if (object.target != null) {
		updatewaypoint(object);
		follow(object);
	}
	isdead(object);
};

var tower_ai = function (object) {
	//	~~~~~~~*~~~~~~~*
	//	Requirements:
	//	Description: If health is 0 or less, get ready to kill object.
	//	Note: A dead object means it does not act or get drawn. It may still exist in the list until it is properly removed from the game
	//	~~~~~~~*~~~~~~~*
	if (object.target == null || object.target.readytodie) {
		object.target = null;
		for (var i = 0; i < objectList.length; i++) {
			if (objectList[i].type == "enemy" && isInRange(object, objectList[i], object.range)) {
				object.target = objectList[i];
				i = objectList.length;
			}
		}
	}
	else if (isInRange(object, object.target, object.range)) {
		shoot(object);
	}
	else {
		object.target = null;
	}
	//	Timers
	if (object.attacktimer < object.attackspeed) {
		object.attacktimer += modifier;
	}
	isdead(object);
};

var updatewaypoint = function (object) {
//	~~~~~~~*~~~~~~~*
//	Requirements: waypointlist
//	Description: A simple algorithm that makes object follow its waypoint list, like following driving directions. Switches object's target.
//	Note: waypointlist should not have any duplicate waypoints.
//	~~~~~~~*~~~~~~~*

//	if object is in range of its target (region size 64) and also it's not the last waypoint,
//	increment its target to the next waypoint
	if (isInRange(object, object.target, 1) && object.target != object.waypointlist[object.waypointlist.length-1]) {
		for (var i = 0; i < object.waypointlist.length; i++) {
			if (object.target == object.waypointlist[i]) {
				object.target = object.waypointlist[i+1];
				break;
			}
		}
	}
};

var follow = function (object) {
//	~~~~~~~*~~~~~~~*
//	Requirements:
//	Description: A very very simple move command to move object towards its target's location
//	Note: object moves faster in diagonals b/c trig. object also appers to only walk in 8 directions.
//	~~~~~~~*~~~~~~~*
	if (object.target != null) {
		if (object.x < object.target.x) {
			object.x += object.speed*modifier;
		}
		else {
			object.x -= object.speed*modifier;
		}
		if (object.y < object.target.y) {
			object.y += object.speed*modifier;
		}
		else {
			object.y -= object.speed*modifier;
		}
	}
};

var isdead = function (object) {
//	~~~~~~~*~~~~~~~*
//	Requirements:
//	Description: If health is 0 or less, get ready to kill object.
//	Note: A dead object means it does not act or get drawn. It may still exist in the list until it is properly removed from the game
//	~~~~~~~*~~~~~~~*
	if (object.health <=0) {
		object.readytodie = true;
	}
};

var shoot = function (object) {
	//	~~~~~~~*~~~~~~~*
	//	Requirements: attacktimer, attackspeed
	//	Description: Basic projectile attack. If target is within range, and attack is ready, spawn projectile.
	//	~~~~~~~*~~~~~~~*
	if (object.attacktimer >= object.attackspeed) {
		objectList[oCount] = new arrow(object.x, object.y);
		objectList[oCount-1].target = object.target;
		objectList[oCount-1].damage = object.damage;
		objectList[oCount-1].speed = object.speed;
		object.attacktimer = 0;
	}
};

var spawndino = function (object) {
	if (object.spawntime >= object.spawnspeed) {
		objectList[oCount] = new dinosaur(object.x, object.y);
		objectList[oCount-1].waypointlist = object.waypointlist;
		objectList[oCount-1].target = object.waypointlist[0];
		object.spawntime = 0;
	}
	object.spawntime += modifier;
};

var spawndino2 = function (object) {
	if (object.spawntime >= object.spawnspeed) {
		objectList[oCount] = new dinosaur2(object.x, object.y);
		objectList[oCount-1].waypointlist = object.waypointlist;
		objectList[oCount-1].target = object.waypointlist[0];
		object.spawntime = 0;
	}
	object.spawntime += modifier;
};


























var gettarget = function (object) {
//	~~~~~~~*~~~~~~~*
//	Requirements:
//	Description: A simple algorithm that makes object follow its waypoint list, like following driving directions. Switches object's target.
//	Note: waypointlist should not have any duplicate waypoints.
//	~~~~~~~*~~~~~~~*
	if (object.target.readytodie == true) {
		var temp = findObject(objectList, "dinosaur");
		if (temp != -1) {
			object.target = objectList[temp];
		}
	}
};

var autoattackarrow = function (object) {
	//	Fires an arrow according to object attack speed
	if (object.attacktimer > object.attackspeed) {
		objectList[oCount] = new arrow(object.x, object.y);
		objectList[oCount-1].target = object.target;
		object.attacktimer = 0;
	}
	object.attacktimer += modifier;
};

var switchtarget = function(object) {
	if (object.x <= object.target.x + object.size && object.x >= object.target.x - object.size &&
		object.y <= object.target.y + object.size && object.y >= object.target.y - object.size) {
		object.target = (object.target).target;
	}
};

var attack = function(object) {
	if (object.x <= object.target.x + object.size/16 && object.x >= object.target.x - object.size/16 &&
		object.y <= object.target.y + object.size/16 && object.y >= object.target.y - object.size/16) {
		object.target.health -= object.damage;
	}
};

var isinrangedie = function(object) {
	if (object.x <= object.target.x + object.size/16 && object.x >= object.target.x - object.size/16 &&
		object.y <= object.target.y + object.size/16 && object.y >= object.target.y - object.size/16) {
		object.readytodie = true;
	}
};

var die = function (object) {
	if (objectList[object].readytodie) {
		delete objectList[object];
	}
};

var bite = function(object) {
	if (object.x <= object.target.x + object.size/16 && object.x >= object.target.x - object.size/16 &&
		object.y <= object.target.y + object.size/16 && object.y >= object.target.y - object.size/16) {
		object.target.health -= object.damage;
	}
};

var dinoanimate = function(object) {
	if (object.animationtime > object.animationspeed) {
		if (object.imageX == 0) {
			object.imageX = 1;
		}
		else if (object.imageX == 1) {
			object.imageX = 0;
		}
		object.animationtime = 0;
	}
	object.animationtime += modifier;
};














//	~~~~~~~TD~~~~~~*
//	Flybot: Used primarily for testing purposes. Allows free movement in all 4 directions
//	~~~~~~~TD~~~~~~*
var actgravity = function() {
	objectList[selectedPlayer].y += objectList[selectedPlayer].weight * modifier;
};

//	~~~~~~~TD~~~~~~*
//	Act Camera: Move the camera
//	~~~~~~~TD~~~~~~*
var actcamera = function() {
	//	Act the camera
	//	1.	Get the change in position during the last and current game frame
	//	2.	Then move all entity lists
	
	//	TyTest - Camera Code
	cameraX = objectList[selectedPlayer].x - CANVASWIDTH/2;
	cameraY = objectList[selectedPlayer].y - CANVASHEIGHT/2;
	
	/*	Working Camera Code
	cameraDeltaX = cameraX - objectList[selectedPlayer].x;
	cameraDeltaY = cameraY - objectList[selectedPlayer].y;
	for (i = 0; i < objectList.length; i++) {
		objectList[i].x += cameraDeltaX;
		objectList[i].y += cameraDeltaY;
	}
	for (i = 0; i < tileList.length; i++) {
		tileList[i].x += cameraDeltaX;
		tileList[i].y += cameraDeltaY;
	}
	for (i = 0; i < energyList.length; i++) {
		energyList[i].x += cameraDeltaX;
		energyList[i].y += cameraDeltaY;
	}
	for (i = 0; i < projectileList.length; i++) {
		projectileList[i].x += cameraDeltaX;
		projectileList[i].y += cameraDeltaY;
	}
	for (i = 0; i < particleList.length; i++) {
		particleList[i].x += cameraDeltaX;
		particleList[i].y += cameraDeltaY;
	}
	objectList[selectedPlayer].x = CANVASWIDTH/2;
	objectList[selectedPlayer].y = CANVASHEIGHT/2;
	*/
};