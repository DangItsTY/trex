//	~~~~~~~TD~~~~~~*
//	Flybot: Used primarily for testing purposes. Allows free movement in all 4 directions
//	~~~~~~~TD~~~~~~*
var actgravity = function(modifier) {
	objectList[selectedPlayer].y += objectList[selectedPlayer].weight * modifier;
};