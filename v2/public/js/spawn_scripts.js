//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Spawns
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

//	TYDO: make helper functions and a  separate spawn section (and another file later down the road)

//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Objects
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
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

var spawnBlockade = function(x, y, z) {
	theList.push(new blockade);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_blockade, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnKnife = function(x, y, z) {
	theList.push(new knife);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_knife, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnGrenade = function(x, y, z) {
	theList.push(new grenade);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_grenade, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};

var spawnHealth = function(x, y, z) {
	theList.push(new health);
	theList[theList.length-1].x = x;
	theList[theList.length-1].y = y;
	theList[theList.length-1].z = z;
	
	var material = new THREE.SpriteMaterial({map: assets_health, color: 0xffffff, fog: true});
	var sprite = new THREE.Sprite(material);
	sprite.position.set(theList[theList.length-1].x, theList[theList.length-1].y, theList[theList.length-1].z);
	sprite.scale.set(theList[theList.length-1].size,theList[theList.length-1].size,theList[theList.length-1].size);
	theSprites[theList.length-1] = sprite;
	
	return theList[theList.length-1];
};


//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Tiles
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

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