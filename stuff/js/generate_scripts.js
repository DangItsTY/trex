//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Generate
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

var generateSimple = function(a, b) {
	//	draws a floor
	for (var i = 0; i < 100; i++) {
		spawnGrass(WORLD_LEFT_CONST - 50 + i, FLOOR_CONST, 0);
		spawnGrass(WORLD_LEFT_CONST - 50 + i, FLOOR_CONST - 1, 0);
	}
	
	//	draws a platform
	for (var i = 0; i < 12; i++) {
		spawnGrass(WORLD_LEFT_CONST + 3 + i, FLOOR_CONST + 4, 0);
	}
};