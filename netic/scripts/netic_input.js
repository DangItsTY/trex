//	~~~~~~~TD~~~~~~*
//	Flybot: Used primarily for testing purposes. Allows free movement in all 4 directions
//	~~~~~~~TD~~~~~~*
var netic_input = function(modifier) {
	jumpAfterDash_input(modifier);
	dashLeft_input(modifier);
	dashRight_input(modifier);
	left_input(modifier);
	right_input(modifier);
	jump_input(modifier);
	dashAfterJump_input(modifier);
	releaseLeft_input(modifier);
	releaseRight_input(modifier);
	releaseSpacebarJump_input(modifier);
	shoot_input(modifier);
	releaseX_input(modifier);
	fastFall_input(modifier);
	fastFallJumpReset_input(modifier);
	giveEnergy_input(modifier);
};