//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Input Scripts
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

//	~~~~~~~TD~~~~~~*
//	Flybot: Used primarily for testing purposes. Allows free movement in all 4 directions
//	~~~~~~~TD~~~~~~*
var flybot_input = function() {
	left_input();
	right_input();
	up_input();
	down_input();
	releaseLeft_input();
	releaseRight_input();
	releaseUp_input();
	releaseDown_input();
};