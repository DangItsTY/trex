//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Act
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var act = function (modifier) {
	actgravity(modifier);
	
	//	Act Projectiles
	for (var i = 0; i < projectileList.length; i++) {
		projectileList[i].x += projectileList[i].speed * modifier;
	}
	
	//	Act Enemies
	for (var i = 0; i < objectList.length; i++) {
		if (objectList[i].type == "enemy")
			objectList[i].follow_behavior(modifier, objectList[i], objectList[selectedPlayer]);
	}
	
	//	Act Energy Drain
	if (objectList[selectedPlayer].energy > 0) {
		objectList[selectedPlayer].energy -= 5 * modifier;
	}
	else if (objectList[selectedPlayer].energy < 0) {
		objectList[selectedPlayer].energy = 0;
	}
	document.getElementById("energy").style.width=""+objectList[selectedPlayer].energy+"px";
};