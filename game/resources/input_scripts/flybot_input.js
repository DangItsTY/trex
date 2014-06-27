//	~~~~~~~TD~~~~~~*
//	Flybot: Used primarily for testing purposes. Allows free movement in all 4 directions
//	~~~~~~~TD~~~~~~*
var flybot_input = function(modifier) {
	left_input(modifier);
	right_input(modifier);
	up_input(modifier);
	down_input(modifier);
	releaseLeft_input(modifier);
	releaseRight_input(modifier);
	releaseUp_input(modifier);
	releaseDown_input(modifier);
};