//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Functions
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
var drawFloor = function() {
	for (var i = -40; i < 40; i ++) {
		var material = new THREE.SpriteMaterial( { map: assets_grass, color: 0xffffff, fog: true } );
		var sprite = new THREE.Sprite( material );
		sprite.position.set(0 + i*1, FLOOR_CONST, 0);
		//scene.add( sprite );
	}
};

var drawCeiling = function() {
	for (var i = -14; i < 14; i ++) {
		var map = THREE.ImageUtils.loadTexture("assets/images/grass.png");
		var material = new THREE.SpriteMaterial( { map: assets_grass, color: 0xffffff, fog: true } );
		var sprite = new THREE.Sprite( material );
		sprite.position.set(0, i, 0);
		//scene.add( sprite );
	}
};

var drawTest = function() {
	for (var i = -20; i < 20; i ++) {
			for (var j = -20; j < 20; j++) {
			var material = new THREE.SpriteMaterial( { map: assets_grass, color: 0xffffff, fog: true } );
			var sprite = new THREE.Sprite( material );
			sprite.position.set(i, j, 0);
			//scene.add( sprite );
		}
	}
};

var runPhysics = function() {
	//	Gravity
	for (var i = 0; i < theList.length; i++) {
		if (itMatters(theList[i])) {
			if (theList[i].type != "tile" && theList[i].type != "projectile") {
				if (theList[i].y > FLOOR_CONST+1) {
					//theList[i].y -= 1*0.1*theList[i].weight;
					theList[i].vy -= 1*0.1*theList[i].weight;
				} else {
					theList[i].y = FLOOR_CONST+1;
					if (theList[i].name == "player" && !(theList[i].frictionkey)) { // this is so hardcoded, so bad
						thePlayer.friction = "grassfriction";
					}
				}
			}
		}
	}
	
	//	Friction
	//	applys only to player right now
	for (var i = 0; i < theList.length; i++) {
		if (theList[i].name == "player") {
			if (theList[i].friction == "grassfriction") { // harcoded for now
				if (Math.abs(theList[i].vx) > 10*modifier*theList[i].weight) {
					if (theList[i].vx > 0) {
						theList[i].vx -= 10*modifier*theList[i].weight;
					} else if (theList[i].vx < 0) {
						theList[i].vx += 10*modifier*theList[i].weight;
					}
				} else {
					// set speed to absolute 0 if small enough
					theList[i].vx = 0;
				}
			}
		}
	}
};

var runBarricadePhysics = function() {
	for (var i = 0; i < objectList.length; i++) {
		if (objectList[i].name == "barricade") {
			objectList[i].y -= 1*0.1;
			if (objectList[i].y <= FLOOR_CONST) {
				objectList[i].y = FLOOR_CONST;
			}
		}
	}
};

var zombieTimer = 1;
var zombieTimerCount = 0;
var spawnZombies = function(mod) {
	zombieTimerCount += mod;
	
	if (zombieTimerCount >= zombieTimer) {
		console.log("[Log]: " + "A zombie has spawned");
		var rand = Math.floor(Math.random()*200) + 40;
		zombieTimerCount = 0;
		
		spawnZombie(rand, FLOOR_CONST, 0);
	} else {
	}
};

var runAct = function() {
	//	Calls act on every object
	//	Uses itself as a reference for act()
	for (var i = 0; i < theList.length; i++) {
		if (itMatters(theList[i])) {
			for (var j = 0; j < theList[i].act.length; j++) {
				var theAct = theList[i].act[j];
				if (theAct == "follow") {
					follow(theList[i]);
				}
				if (theAct == "projectile_straight") {
					projectile_straight(theList[i]);
				}
				if (theAct == "make_photite") {
					make_photite(theList[i]);
				}
				if (theAct == "wander") {
					wander(theList[i]);
				}
			}
		}
	}
};

var runMove = function() {
	//	Do some physics math before hand. this is actualy velocity not acceleration
	for (var i = 0; i < theList.length; i++ ) {
		if (Math.abs(theList[i].vx) <= theList[i].speed) {
			theList[i].vx += theList[i].ax * modifier;
		}
		if (theList[i].vy <= theList[i].speed) {
			theList[i].vy += theList[i].ay * modifier;
		}
	}
	for (var i = 0; i < theList.length; i++ ) {
		theList[i].x += theList[i].vx * modifier;
		theList[i].y += theList[i].vy * modifier;
	}
	
	//	Visually move each object via their sprite object
	for (var i = 0; i < theList.length; i++ ) {
		theSprites[i].position.x = theList[i].x;
		theSprites[i].position.y = theList[i].y;
		theSprites[i].position.z = theList[i].z;
	}
};

var collide = function(a, b) {
	//	simple box collision
	if (a.x < b.x+(b.size/2) && a.x > b.x-(b.size/2) &&
		a.y < b.y+(b.size) && a.y > b.y-(b.size)) {
		return true;
	}
};

var runCollisions = function() {
	for (var i = 0; i < theList.length; i++) {
		if (itMatters(theList[i])) {
			for (var j = i+1; j < theList.length; j++) {
				if (collide(theList[i], theList[j])) {
					//	Make a proper resolve function for this
					if (theList[i].name == "bullet" && theList[j].type == "enemy" ||
						theList[i].type == "enemy" && theList[j].name == "bullet") {
						console.log("hit!");
						theList[i].health -= 1;
						theList[j].health -= 1;
					}
					if (theList[i].name == "barricade" && theList[j].type == "enemy" ||
						theList[i].type == "enemy" && theList[j].name == "barricade") {
						theList[i].x += theList[i].speed * theList[i].direction * -1;
						theList[j].x += theList[j].speed * theList[j].direction * -1;
					}
					
					//	bullet tile collision
					/*
					if (theList[i].type == "projectile" && theList[j].type == "tile") {
						theList[i].health -= 1;
					}
					if (theList[i].type == "tile" && theList[j].type == "projectile") {
						theList[j].health -= 1;
					}
					*/
					
					//	Barricade collision
					if (theList[i].name == "barricade" && theList[j].name == "barricade") {
						var lowerObject;
						var upperObject;
						if (theList[i].y < theList[j].y) {
							lowerObject = theList[i];
							upperObject = theList[j];
						} else {
							lowerObject = theList[j];
							upperObject = theList[i];
						}
						upperObject.y = lowerObject.y + lowerObject.size;
					}
					
					//	Player barricade collision
					if (theList[i].name == "player" && theList[j].name == "barricade") {
						theList[PLAYER_ID].y = theList[j].y + theList[j].size;
					}
					if (theList[i].name == "barricade" && theList[j].name == "player") {
						theList[PLAYER_ID].y = theList[i].y + theList[i].size;
					}
					
					//	Player tile collision
					if (theList[i].name == "player" && theList[j].type == "tile") {
						theList[i].y = theList[j].y + (theList[j].size/2) + (theList[i].size/2);
						theList[i].vy = 0;
						theList[i].jumpkey = true;
						//theList[i].friction = "grassfriction";
					}
					if (theList[i].type == "tile" && theList[j].name == "player") {
						theList[j].y = theList[i].y + (theList[i].size/2) + (theList[j].size/2);
						theList[j].vy = 0;
						theList[j].jumpkey = true;
						//theList[j].friction = "grassfriction";
					}
					
					//	resource tile collision
					if (theList[i].name == "resource" && theList[j].type == "tile") {
						theList[i].y = theList[j].y + (theList[j].size/2) + (theList[i].size/2);
					}
					if (theList[i].type == "tile" && theList[j].name == "resource") {
						theList[j].y = theList[i].y + (theList[i].size/2) + (theList[j].size/2);
					}
					
					// enemy tile collision
					if (theList[i].type == "enemy" && theList[j].type == "tile") {
						theList[i].y = theList[j].y + theList[j].size;
					}
					if (theList[i].type == "tile" && theList[j].type == "enemy") {
						theList[j].y = theList[i].y + theList[i].size;
					}
				}
			}
		}
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

var use_bullet = function() {
	spawnBullet(thePlayer.x, thePlayer.y, thePlayer.z);
	theList[theList.length-1].direction = thePlayer.direction;
	keysUp[key["x"]] = true;
};

var use_barricade = function() {
	spawnBarricade(thePlayer.x + thePlayer.direction, thePlayer.y, thePlayer.z);
	keysUp[key["x"]] = true;
};

var useItem = function(id) {
	//	array must refer to actual item log, but for now this is what it would kind of look like
	switch(id) {
		case 1:
			use_bullet();
			break;
		case 2:
			use_barricade();
			break;
		default:
	}
};

var runCamera = function() {
	camera.position.x = theList[PLAYER_ID].x;
	camera.position.y = 32;
	//camera.position.y = theList[PLAYER_ID].y + 5; //i used this code when using camera z to 15
	//camera.position.y = theList[PLAYER_ID].y + 3;
	//camera.position.y = FLOOR_CONST + 4;
};

//	playing around with some floor generating algorithms
//	first let's generate some biome nodes
var weightedNodes = [7, 5, 1, 3];	//sentientforest, wastelands, city, hills
var generateWorld = function() {
	console.log("[Log]: Loading World....");
	generateWorld_test(40, 200);
	spawnMammal(90, FLOOR_CONST, 0);
	spawnPlantimal(105, FLOOR_CONST, 0);
	spawnDeer(95, FLOOR_CONST+1.5, 0);
	spawnFrog(93, FLOOR_CONST, 0);
	spawnSpider(102, FLOOR_CONST, 0);
	spawnGuardian(100, FLOOR_CONST+2.5, 0);
	spawnTree(100, FLOOR_CONST+12, 0);
	//generateWorld_desert(40, 120);
	//spawnTree(100, FLOOR_CONST+5, 0);
	//generateWorld_hills(120, 200);
	//generateWorld_forest(200, 280);
	/*
	for (var i = 0; i < 100; i++) {
		generateWorld_desert(120 * (i+1), (120 * (i+1)) + 80);
	}
	*/
	/*
	for (var i = 0; i < 1000; i++) {
		objectList[oCount] = test;
	};
	*/
	//	 todo, what's making my game lag????
	//generateWorld_hills(-40, 40);
	//generateWorld_desert(40, 120);
	//generateWorld_forest(120, 200);
	//generateWorld_forest(200, 280);
	//generateWorld_forest(280, 360);
	//generateWorld_hills(360, 440);
	//generateWorld_desert(440, 520);
	console.log("[Log] World Loaded! Total Tiles: " + theList.length);
};

var generateWorld_test = function(a, b) {
	//	Draws a floor
	for (var i = a; i < b; i ++) {
		spawnGrass(0 + i*1, FLOOR_CONST, 0);
	}
	
	
	//	Draws a treetop
	for (var i = (a+20); i < (b-120); i ++) {
		spawnTreetop(0 + i*1, FLOOR_CONST+8, 0);
	}
	//	with treeledges
	spawnTreeledge(0 + a+30, FLOOR_CONST+6, 0);
	spawnTreeledge(0 + a+30, FLOOR_CONST+4, 0);
	spawnTreeledge(0 + a+30, FLOOR_CONST+2, 0);
	//	with treeledges
	spawnTreeledge(0 + a+39, FLOOR_CONST+6, 0);
	spawnTreeledge(0 + a+39, FLOOR_CONST+4, 0);
	spawnTreeledge(0 + a+39, FLOOR_CONST+2, 0);
	//	with treeledges
	spawnTreeledge(0 + a+20, FLOOR_CONST+6, 0);
	spawnTreeledge(0 + a+20, FLOOR_CONST+4, 0);
	spawnTreeledge(0 + a+20, FLOOR_CONST+2, 0);
	
	
	//	Draws a treetop
	for (var i = (a+10); i < (b-110); i ++) {
		spawnTreetop(0 + i*1, FLOOR_CONST+16, 0);
	}
	//	with treeledges
	spawnTreeledge(0 + a+10, FLOOR_CONST+14, 0);
	spawnTreeledge(0 + a+10, FLOOR_CONST+12, 0);
	spawnTreeledge(0 + a+10, FLOOR_CONST+10, 0);
	spawnTreeledge(0 + a+10, FLOOR_CONST+8, 0);
	spawnTreeledge(0 + a+10, FLOOR_CONST+6, 0);
	spawnTreeledge(0 + a+10, FLOOR_CONST+4, 0);
	spawnTreeledge(0 + a+10, FLOOR_CONST+2, 0);
	//	with treeledges
	spawnTreeledge(0 + a+35, FLOOR_CONST+14, 0);
	spawnTreeledge(0 + a+35, FLOOR_CONST+12, 0);
	spawnTreeledge(0 + a+35, FLOOR_CONST+10, 0);
	//	with treeledges
	spawnTreeledge(0 + a+49, FLOOR_CONST+14, 0);
	spawnTreeledge(0 + a+49, FLOOR_CONST+12, 0);
	spawnTreeledge(0 + a+49, FLOOR_CONST+10, 0);
	spawnTreeledge(0 + a+49, FLOOR_CONST+8, 0);
	spawnTreeledge(0 + a+49, FLOOR_CONST+6, 0);
	spawnTreeledge(0 + a+49, FLOOR_CONST+4, 0);
	spawnTreeledge(0 + a+49, FLOOR_CONST+2, 0);
	
	
	//	Draws a treetop
	for (var i = (a+70); i < (b-20); i ++) {
		spawnTreetop(0 + i*1, FLOOR_CONST+9, 0);
	}
	//	with treeledges
	spawnTreeledge(0 + a+70, FLOOR_CONST+7, 0);
	spawnTreeledge(0 + a+70, FLOOR_CONST+5, 0);
	spawnTreeledge(0 + a+70, FLOOR_CONST+3, 0);
	spawnTreeledge(0 + a+70, FLOOR_CONST+1, 0);
	//	with treeledges
	spawnTreeledge(0 + a+100, FLOOR_CONST+7, 0);
	spawnTreeledge(0 + a+100, FLOOR_CONST+5, 0);
	spawnTreeledge(0 + a+100, FLOOR_CONST+3, 0);
	spawnTreeledge(0 + a+100, FLOOR_CONST+1, 0);
	//	with treeledges
	spawnTreeledge(0 + b-21, FLOOR_CONST+7, 0);
	spawnTreeledge(0 + b-21, FLOOR_CONST+5, 0);
	spawnTreeledge(0 + b-21, FLOOR_CONST+3, 0);
	spawnTreeledge(0 + b-21, FLOOR_CONST+1, 0);
	
	
	//	Draws a treetop
	for (var i = (a+75); i < (b-40); i ++) {
		spawnTreetop(0 + i*1, FLOOR_CONST+18, 0);
	}
	//	with treeledges
	spawnTreeledge(0 + a+75, FLOOR_CONST+16, 0);
	spawnTreeledge(0 + a+75, FLOOR_CONST+14, 0);
	spawnTreeledge(0 + a+75, FLOOR_CONST+12, 0);
	spawnTreeledge(0 + a+75, FLOOR_CONST+10, 0);
	//	with treeledges
	spawnTreeledge(0 + b-41, FLOOR_CONST+16, 0);
	spawnTreeledge(0 + b-41, FLOOR_CONST+14, 0);
	spawnTreeledge(0 + b-41, FLOOR_CONST+12, 0);
	spawnTreeledge(0 + b-41, FLOOR_CONST+10, 0);
	//	with treeledges
	spawnTreeledge(0 + a+95, FLOOR_CONST+16, 0);
	spawnTreeledge(0 + a+95, FLOOR_CONST+14, 0);
	spawnTreeledge(0 + a+95, FLOOR_CONST+12, 0);
	spawnTreeledge(0 + a+95, FLOOR_CONST+10, 0);
	
	
	//	Draws a background forest
	for (var i = a; i < b; i+=10) {
		spawnTreebg(0 + i*1, FLOOR_CONST+16, -1);
	}
};

var generateWorld_desert = function(a, b) {
	//	generate a list of nodes
	//	then stretch the nodes
	var rand;
	var totalWeight = weightedNodes[0] + weightedNodes[1] + weightedNodes[2] + weightedNodes[3]; //there's probably a function that adds this quicker or neater
	var worldNodes = [];
	for (var i = 0; i < 16; i++) {
		rand = Math.random();
		if (rand < weightedNodes[0]/totalWeight) {
			worldNodes.push(0);
		} else if (rand >= (weightedNodes[0]/totalWeight) && rand < ((weightedNodes[0]+weightedNodes[1])/totalWeight)) {
			worldNodes.push(1);
		} else if (rand >= (weightedNodes[0]+weightedNodes[1]/totalWeight) && rand < ((weightedNodes[0]+weightedNodes[1]+weightedNodes[2])/totalWeight)) {
			worldNodes.push(2);
		} else {
			worldNodes.push(3);
		}
	}
	
	//	first, generate a sandy place
	//	creates a flat floor that occasionally "rises" to create small mountains
	//	of just 1 height
	var sandyswitch = 0;
	for (var i = a; i < b; i ++) {
		rand = Math.random();
		if (rand < 0.1) {
			if (sandyswitch == 0) sandyswitch = 1;
			else sandyswitch = 0;
		}
		if (sandyswitch == 0) {
			spawnSand(0 + i*1, FLOOR_CONST, 0);
		}
		if (sandyswitch == 1) {
			spawnSand_2(0 + i*1, FLOOR_CONST, 0);
			spawnSand(0 + i*1, FLOOR_CONST+1, 0);
		}
	}
};

var generateWorld_hills = function(a, b) {
	//	Then a hillsy world
	var hillsWeight = [3, 1, 6];	// up hill, down hill, neutral
	var hillsTotal = 0;
	var hillDirection = 0;
	var hillMaxHeight = 4;
	for (var i = 0; i < hillsWeight.length; i++) {
		hillsTotal += hillsWeight[i];
	}
	
	for (var i = a; i < (a+b/2); i ++) {
		rand = Math.random();
		if (rand < hillsWeight[0]/hillsTotal) {
			hillDirection += 1;
			if (hillDirection >= hillMaxHeight) {
				hillDirection = hillMaxHeight;
			}
		} else if (rand >= hillsWeight[0]/hillsTotal && rand < ((hillsWeight[0]+hillsWeight[1])/hillsTotal)) {
			hillDirection += -1;
			if (hillDirection < 0) {
				hillDirection = 0;
			}
		} else {
			hillDirection += 0;
		}
		for (var j = FLOOR_CONST; j <= FLOOR_CONST+hillDirection; j++) {
			spawnGrass(i, j, 0);
		}
	}
	
	hillsWeight = [1, 3, 6];	// up hill, down hill, neutral
	hillsTotal = 0;
	for (var i = 0; i < hillsWeight.length; i++) {
		hillsTotal += hillsWeight[i];
	}
	
	for (var i = (a+b/2); i < b; i ++) {
		rand = Math.random();
		if (rand < hillsWeight[0]/hillsTotal) {
			hillDirection += 1;
		} else if (rand >= hillsWeight[0]/hillsTotal && rand < ((hillsWeight[0]+hillsWeight[1])/hillsTotal)) {
			hillDirection += -1;
			if (hillDirection < 0) {
				hillDirection = 0;
			}
		} else {
			hillDirection += 0;
		}
		for (var j = FLOOR_CONST; j <= FLOOR_CONST+hillDirection; j++) {
			spawnGrass(i, j, 0);
		}
	}
};

var generateWorld_forest = function(a, b) {
	//	generate ground floor
	for (var i = a; i < b; i++) {
		spawnGrass(0 + i, FLOOR_CONST, 0);
	}
	
	//	generate first floor
	var random_length;
	var random_distance = Math.floor(Math.random() * 8) + 4;
	for (var i = a; i < b; i+=random_distance) {
		random_length = Math.floor(Math.random() * 4);
		random_distance = Math.floor(Math.random() * 8) + 4;
		for (var j = 0; j < random_length; j++) {
			if (j == 0 || j == random_length-1) {
				spawnGrass(0 + i+j, FLOOR_CONST+7, 0);
			} else {
				spawnGrass(0 + i+j, FLOOR_CONST+8, 0);
			}
		}
	}
	
	//	generate second floor
	var random_length;
	var random_distance = Math.floor(Math.random() * 8) + 4;
	for (var i = a; i < b; i+=random_distance) {
		random_length = Math.floor(Math.random() * 8) + 4;
		random_distance = Math.floor(Math.random() * 8) + 4;
		for (var j = 0; j < random_length; j++) {
			if (j == 0 || j == random_length-1) {
				spawnGrass(0 + i+j, FLOOR_CONST+15, 0);
			} else {
				spawnGrass(0 + i+j, FLOOR_CONST+16, 0);
			}
		}
	}
	
	//	generate top floor
	var random_length;
	var random_distance = Math.floor(Math.random() * 4);
	for (var i = a; i < b; i+=random_distance) {
		random_length = Math.floor(Math.random() * 8) + 4;
		random_distance = Math.floor(Math.random() * 4);
		for (var j = 0; j < random_length; j++) {
			if (j == 0 || j == random_length-1) {
				spawnGrass(0 + i+j, FLOOR_CONST+23, 0);
			} else {
				spawnGrass(0 + i+j, FLOOR_CONST+24, 0);
			}
		}
	}
};

var runDraw = function() {
	for (var i = 0; i < theList.length; i++) {
		if (itMatters(theList[i])) {
			scene_temp.add(theSprites[i]);
		} else {
			scene_temp.remove(theSprites[i]);
		}
	}
	renderer.render(scene_temp, camera);
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