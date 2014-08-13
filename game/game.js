//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Preload
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var tdtheory_1 = function () {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	//	Draw Path
	objectList[oCount] = new bricksmile(4*64, 0*64);
	objectList[oCount] = new bricksmile(4*64, 1*64);
	objectList[oCount] = new bricksmile(4*64, 2*64);
	objectList[oCount] = new bricksmile(4*64, 3*64);
	objectList[oCount] = new bricksmile(4*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 5*64);
	objectList[oCount] = new bricksmile(3*64, 6*64);
	objectList[oCount] = new bricksmile(4*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 5*64);
	objectList[oCount] = new bricksmile(5*64, 4*64);
	objectList[oCount] = new bricksmile(6*64, 4*64);
	objectList[oCount] = new bricksmile(7*64, 4*64);
	objectList[oCount] = new bricksmile(8*64, 4*64);
	objectList[oCount] = new bricksmile(9*64, 4*64);
	//	Make Waypoint List
	var tempList = new Array();
	objectList[oCount] = new waypoint(4*64, 0*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(4*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(9*64, 4*64);
	tempList.push(objectList[oCount-1]);
	//	Create Spawner and set to waypointlist	
	objectList[oCount] = new spawner(4*64, 0*64);
	objectList[oCount-1].waypointlist = tempList;
	objectList[oCount-1].target = objectList[oCount-1].waypointlist[0];
	objectList[oCount-1].spawnspeed = 3;
	
	objectList[oCount] = new tower(4*64, 5*64);
	
	var temp = '<div style="width:192px;">';
	temp += "Theory 1: Equilibrium. When the amount of HP being inputted is the same amount of damage the tower can handle, no leak will occur.";
	temp += "<br>";
	temp += "Here it is show that a tower deals 100 damage. Dinosaurs have 300 hp and move 1 block/second. Spawner spawns dinosaur every 3 seconds. This is good.";
	temp += '</div>';
	document.getElementById("debug1").innerHTML = temp;
};

var tdtheory_2 = function () {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	//	Draw Path
	objectList[oCount] = new bricksmile(4*64, 0*64);
	objectList[oCount] = new bricksmile(4*64, 1*64);
	objectList[oCount] = new bricksmile(4*64, 2*64);
	objectList[oCount] = new bricksmile(4*64, 3*64);
	objectList[oCount] = new bricksmile(4*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 5*64);
	objectList[oCount] = new bricksmile(3*64, 6*64);
	objectList[oCount] = new bricksmile(4*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 5*64);
	objectList[oCount] = new bricksmile(5*64, 4*64);
	objectList[oCount] = new bricksmile(6*64, 4*64);
	objectList[oCount] = new bricksmile(7*64, 4*64);
	objectList[oCount] = new bricksmile(8*64, 4*64);
	objectList[oCount] = new bricksmile(9*64, 4*64);
	//	Make Waypoint List
	var tempList = new Array();
	objectList[oCount] = new waypoint(4*64, 0*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(4*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(9*64, 4*64);
	tempList.push(objectList[oCount-1]);
	//	Create Spawner and set to waypointlist	
	objectList[oCount] = new spawner(4*64, 0*64);
	objectList[oCount-1].waypointlist = tempList;
	objectList[oCount-1].target = objectList[oCount-1].waypointlist[0];
	objectList[oCount-1].spawnspeed = 8;
	objectList[oCount-1].act = function(object) { spawndino2(object); };
	
	objectList[oCount] = new tower(4*64, 5*64);
	
	var temp = '<div style="width:192px;">';
	temp += "Theory 2: Equilibrium Part 2. Pathing can help in reaching equilibrium. Here it is shown that all 8 blocks are used.";
	temp += "<br>";
	temp += "Dinosaurs have 800 hp, spawns every 8 seconds, but this defense is still able to maintain the wave.";
	temp += '</div>';
	document.getElementById("debug1").innerHTML = temp;
};

var tdtheory_3 = function () {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	//	Draw Path
	objectList[oCount] = new bricksmile(4*64, 0*64);
	objectList[oCount] = new bricksmile(4*64, 1*64);
	objectList[oCount] = new bricksmile(4*64, 2*64);
	objectList[oCount] = new bricksmile(4*64, 3*64);
	objectList[oCount] = new bricksmile(4*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 5*64);
	objectList[oCount] = new bricksmile(3*64, 6*64);
	objectList[oCount] = new bricksmile(4*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 5*64);
	objectList[oCount] = new bricksmile(5*64, 4*64);
	objectList[oCount] = new bricksmile(6*64, 4*64);
	objectList[oCount] = new bricksmile(7*64, 4*64);
	objectList[oCount] = new bricksmile(8*64, 4*64);
	objectList[oCount] = new bricksmile(9*64, 4*64);
	//	Make Waypoint List
	var tempList = new Array();
	objectList[oCount] = new waypoint(4*64, 0*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(4*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(9*64, 4*64);
	tempList.push(objectList[oCount-1]);
	//	Create Spawner and set to waypointlist	
	objectList[oCount] = new spawner(4*64, 0*64);
	objectList[oCount-1].waypointlist = tempList;
	objectList[oCount-1].target = objectList[oCount-1].waypointlist[0];
	objectList[oCount-1].spawnspeed = 1.5;
	
	objectList[oCount] = new tower(3*64, 2*64);
	objectList[oCount] = new tower(5*64, 2*64);
	
	var temp = '<div style="width:192px;">';
	temp += "Theory 3: Leaking due to damage inefficiency. Spawn rate has doubled (1.5 intervals) but now there are two towers.";
	temp += "<br>";
	temp += "Dinosaurs have 300 hp, spawns every 1.5 seconds. Even though there are two towers to help out twice as many dinosaurs, each time a dinosaur is killed, ";
	temp += "there is a loss of 100 damage wasted (2 towers, 2 attacks, 400 damage). Watch as after the 4th dinosaur has died, there is a total damage leak of 400.";
	temp += "Defenses have now been penetrated and dinosaurs are now leaking in.";
	temp += '</div>';
	document.getElementById("debug1").innerHTML = temp;
};

var tdtheory_4 = function () {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	//	Draw Path
	objectList[oCount] = new bricksmile(4*64, 0*64);
	objectList[oCount] = new bricksmile(4*64, 1*64);
	objectList[oCount] = new bricksmile(4*64, 2*64);
	objectList[oCount] = new bricksmile(4*64, 3*64);
	objectList[oCount] = new bricksmile(4*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 5*64);
	objectList[oCount] = new bricksmile(3*64, 6*64);
	objectList[oCount] = new bricksmile(4*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 5*64);
	objectList[oCount] = new bricksmile(5*64, 4*64);
	objectList[oCount] = new bricksmile(6*64, 4*64);
	objectList[oCount] = new bricksmile(7*64, 4*64);
	objectList[oCount] = new bricksmile(8*64, 4*64);
	objectList[oCount] = new bricksmile(9*64, 4*64);
	//	Make Waypoint List
	var tempList = new Array();
	objectList[oCount] = new waypoint(4*64, 0*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(4*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(9*64, 4*64);
	tempList.push(objectList[oCount-1]);
	//	Create Spawner and set to waypointlist	
	objectList[oCount] = new spawner(4*64, 0*64);
	objectList[oCount-1].waypointlist = tempList;
	objectList[oCount-1].target = objectList[oCount-1].waypointlist[0];
	objectList[oCount-1].spawnspeed = 1.5;
	
	objectList[oCount] = new tower(3*64, 2*64);
	objectList[oCount-1].damage = 50;
	objectList[oCount-1].attackspeed = 0.5;
	objectList[oCount] = new tower(5*64, 2*64);
	objectList[oCount-1].damage = 50;
	objectList[oCount-1].attackspeed = 0.5;
	
	var temp = '<div style="width:192px;">';
	temp += "Theory 4: Damage Efficiency. Faster attacking towers are more damage efficient.";
	temp += "<br>";
	temp += "Now these towers attack at double the speed, but half the damage. DPS is still 100/sec, however this way is more damage efficient.";
	temp += "<br>";
	temp += "Watch as how these two towers, with the same DPS as before, are now holding up the defenses because they are more damage efficient.";
	temp += '</div>';
	document.getElementById("debug1").innerHTML = temp;
};


var tylevel_1 = function () {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	//	Draw Path
	objectList[oCount] = new bricksmile(4*64, 0*64);
	objectList[oCount] = new bricksmile(4*64, 1*64);
	objectList[oCount] = new bricksmile(4*64, 2*64);
	objectList[oCount] = new bricksmile(4*64, 3*64);
	objectList[oCount] = new bricksmile(4*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 5*64);
	objectList[oCount] = new bricksmile(3*64, 6*64);
	objectList[oCount] = new bricksmile(4*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 5*64);
	objectList[oCount] = new bricksmile(5*64, 4*64);
	objectList[oCount] = new bricksmile(6*64, 4*64);
	objectList[oCount] = new bricksmile(7*64, 4*64);
	objectList[oCount] = new bricksmile(8*64, 4*64);
	objectList[oCount] = new bricksmile(9*64, 4*64);
	//	Make Waypoint List
	objectList[oCount] = new waypoint(4*64, 0*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(4*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(9*64, 4*64);
	tempList.push(objectList[oCount-1]);
	//	Make Timeline
	objectList[oCount] = new timeline(0, 0);
	
	objectList[oCount] = new selector(0, 0);
	theSelector = objectList[oCount-1];
};

var tylevel_1_short = function () {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	
	//	Draw Path
	var tempPathList = new Array([4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [3, 4], [3, 5], [3, 6], [4, 6], [5, 6], [5, 5], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4]);
	for (var i = 0; i < tempPathList.length; i++) {
		objectList[oCount] = new bricksmile(tempPathList[i][0]*64, tempPathList[i][1]*64);
	}
	
	//	Make Waypoint List
	var tempWaypointList = new Array([4, 0], [4, 4], [3, 4], [3, 6], [5, 6], [5, 4], [9, 4]);
	for (var i = 0; i < tempWaypointList.length; i++) {
		objectList[oCount] = new waypoint(tempWaypointList[i][0]*64, tempWaypointList[i][1]*64);
		tempList.push(objectList[oCount-1]);
	}

	//	Make Timeline
	objectList[oCount] = new timeline(0, 0);
	
	//	Make Selector
	objectList[oCount] = new selector(0, 0);
	theSelector = objectList[oCount-1];
};

var tyload_2 = function() {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	//	Draw Path
	objectList[oCount] = new bricksmile(0*64, 4*64);
	objectList[oCount] = new bricksmile(1*64, 4*64);
	objectList[oCount] = new bricksmile(2*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 4*64);
	objectList[oCount] = new bricksmile(4*64, 4*64);
	objectList[oCount] = new bricksmile(5*64, 4*64);
	objectList[oCount] = new bricksmile(6*64, 4*64);
	objectList[oCount] = new bricksmile(7*64, 4*64);
	objectList[oCount] = new bricksmile(8*64, 4*64);
	objectList[oCount] = new bricksmile(9*64, 4*64);
	//	Make Waypoint List
	var tempList = new Array();
	objectList[oCount] = new waypoint(0*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(9*64, 4*64);
	tempList.push(objectList[oCount-1]);
	//	Create Spawner and set to waypointlist	
	objectList[oCount] = new spawner(0*64, 4*64);
	objectList[oCount-1].waypointlist = tempList;
	objectList[oCount-1].target = objectList[oCount-1].waypointlist[0];
	
	//objectList[oCount] = new tower(4*64, 3*64);
	objectList[oCount] = new tower(4*64, 5*64);
	//objectList[oCount] = new tower(5*64, 3*64);
};

var tyload_1 = function() {
	//	Draw Grass
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	//	Draw Path
	
	objectList[oCount] = new bricksmile(4*64, 0*64);
	objectList[oCount] = new bricksmile(4*64, 1*64);
	objectList[oCount] = new bricksmile(4*64, 2*64);
	objectList[oCount] = new bricksmile(4*64, 3*64);
	objectList[oCount] = new bricksmile(4*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 4*64);
	objectList[oCount] = new bricksmile(3*64, 5*64);
	objectList[oCount] = new bricksmile(3*64, 6*64);
	objectList[oCount] = new bricksmile(4*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 6*64);
	objectList[oCount] = new bricksmile(5*64, 5*64);
	objectList[oCount] = new bricksmile(5*64, 4*64);
	objectList[oCount] = new bricksmile(6*64, 4*64);
	objectList[oCount] = new bricksmile(7*64, 4*64);
	objectList[oCount] = new bricksmile(8*64, 4*64);
	objectList[oCount] = new bricksmile(9*64, 4*64);
	//	Make Waypoint List
	var tempList = new Array();
	objectList[oCount] = new waypoint(4*64, 0*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(4*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(3*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 6*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(5*64, 4*64);
	tempList.push(objectList[oCount-1]);
	objectList[oCount] = new waypoint(9*64, 4*64);
	tempList.push(objectList[oCount-1]);
	//	Create Spawner and set to waypointlist	
	objectList[oCount] = new spawner(4*64, 0*64);
	objectList[oCount-1].waypointlist = tempList;
	objectList[oCount-1].target = objectList[oCount-1].waypointlist[0];
	objectList[oCount-1].spawnspeed = 1;
	
	objectList[oCount] = new tower(4*64, 5*64);
	objectList[oCount] = new tower(5*64, 7*64);
	objectList[oCount] = new tower(6*64, 5*64);
};

var preload = function() {
	//objectList[oCount] = new flybot(CANVASWIDTH/2, CANVASHEIGHT/2);		//	Creates an object inside objectList
	//selectedPlayer = 0;		//	Sets currently controlled object to the first object created (ie the one above)
	
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			objectList[oCount] = new grasstile(j*64, i*64);
		}
	}
	for (var i = 0; i<5; i++) {
		objectList[oCount] = new bricksmile(4*64,i*64);
	}
	for (var i = 5; i<7; i++) {
		objectList[oCount] = new bricksmile(i*64,4*64);
	}
	for (var i = 5; i<8; i++) {
		objectList[oCount] = new bricksmile(6*64,i*64);
	}
	for (var i = 3; i<6; i++) {
		objectList[oCount] = new bricksmile(i*64,7*64);
	}
	for (var i = 8; i<10; i++) {
		objectList[oCount] = new bricksmile(3*64,i*64);
	}
	
	//	Create Waypoints (doing this backwards)
	objectList[oCount] = new waypoint(3*64, 9*64);
	objectList[oCount-1].target = objectList[oCount-1];
	objectList[oCount] = new waypoint(3*64, 7*64);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new waypoint(6*64, 7*64);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new waypoint(6*64, 4*64);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new waypoint(4*64, 4*64);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new waypoint(4*64, 0);
	objectList[oCount-1].target = objectList[oCount-2];
	
	objectList[oCount] = new dinosaur(0, 0);
	objectList[oCount-1].target = objectList[oCount-2];
	objectList[oCount] = new tower(2*64, 2*64);
	objectList[oCount-1].target = objectList[oCount-2];
	//objectList[oCount] = new unikitty(320, 320);
	//objectList[oCount-1].target = objectList[oCount-2];
	
	objectList[oCount] = new spawner(4*64, 0);
	//objectList[oCount] = new batObj(9*64, 9*64);
	
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Update
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var update = function () {
	input();		//	First gather input
	act();			//	Then make all objects act based on inputs
	resolve();		//	Do collisions and resolve based on object's acts
	
	//	TyNote: Recommended to place debug messages here
	//document.getElementById("debug1").innerHTML = "#1 Some Debug Message " + somevaryouwanttosee;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Render
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var render = function () {
	ctxOff.fillStyle = "rgb(255,255,255)";
    ctxOff.fillRect (0,0,CANVASWIDTH,CANVASHEIGHT);		//	Draw black background
	
	drawList(objectList);	//	Draw objects (is now prerendered)
	
	ctx.drawImage(canvasOff, 0, 0);		//	Draw prerendered canvas onto "real" canvas
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	The Game Loop
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
// shim layer with setTimeout fallback 
      // window.requestAnimFrame = (function(){ 
      //   return  window.requestAnimationFrame       ||  
      //           window.webkitRequestAnimationFrame ||  
      //           window.mozRequestAnimationFrame    ||  
      //           window.oRequestAnimationFrame      ||  
      //           window.msRequestAnimationFrame     ||  
      //           function( callback ){ 
      //             window.setTimeout(callback, 1000 / 60); 
      //           }; 
      // })();

var gameloop = function() {
	 
      // window.requestAnimFrame(gameloop);
	//	TyNoteSpecial: Thank you to lostdecadegames for giving me the awesome tutorial that got me started with HTML5 game development!
	now = Date.now();
	delta = now-then;
	modifier = delta/1000;
	
	update();
	render();
	
	then = now;
};

//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Start Game Engine
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
then = Date.now();
objectList[oCount] = new timeline(0, 0);
objectList[oCount-1].act = function(object) { level_1(); };
// level_1();
// window.requestAnimFrame(gameloop);
setInterval(gameloop,1);