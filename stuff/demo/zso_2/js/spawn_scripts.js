//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Spawns
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

//	TYDO: make helper functions and a  separate spawn section (and another file later down the road)
var spawnPlayer = function(x, y, z) {
	PLAYER_ID = theList.length;
	theList.push(new player);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_player, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnZombie = function(x, y, z) {
	theList.push(new zombie);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_zombie, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnBullet = function(x, y, z) {
	theList.push(new bullet);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_bullet, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnPhotite = function(x, y, z) {
	theList.push(new photite);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_photite, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Tiles
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

var spawnTestGrass = function(x, y, z) {
	//	for testing grass purposes, should replace spawngrass function eventually
	theList.push(new grass);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_grasstest, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnGrass = function(x, y, z) {
	theList.push(new grass);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_grass, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnSand = function(x, y, z) {
	theList.push(new sand);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_sand, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnSand_2 = function(x, y, z) {
	theList.push(new sand_2);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_sand_2, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnTree = function(x, y, z) {
	theList.push(new tree);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_tree, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnTreetop = function(x, y, z) {
	theList.push(new treetop);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_treetop, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnTreeledge = function(x, y, z) {
	theList.push(new treeledge);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_treeledge, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnTreebg = function(x, y, z) {
	theList.push(new treebg);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_treebg, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnMammal = function(x, y, z) {
	theList.push(new mammal);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_mammal, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnPlantimal = function(x, y, z) {
	theList.push(new plantimal);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_plantimal, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnDeer = function(x, y, z) {
	theList.push(new deer);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_deer, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnFrog = function(x, y, z) {
	theList.push(new frog);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_frog, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnSpider = function(x, y, z) {
	theList.push(new spider);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_spider, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnBarricade = function(x, y, z) {
	theList.push(new barricade);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_barricade, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnGuardian = function(x, y, z) {
	theList.push(new guardian);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_guardian, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};