//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Batch - run a bunch of stuff
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

var runCamera = function() {
	camera.position.x = theList[PLAYER_ID].x;
	camera.position.y = theList[PLAYER_ID].y + 2;
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
	/*
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
	*/
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

var runLife = function() {
	for (var i = 0; i < theList.length; i++) {
		if (theList[i].type == "projectile" && theList[i].lifetimer > 0) {
			theList[i].lifetimer -= modifier;
			if (theList[i].lifetimer <= 0) {
				theList[i].health = 0;
			}
		}
	}
};