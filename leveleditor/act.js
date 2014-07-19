//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Act
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var act = function () {
	//	Call act on all objects. Pass in a time variable, and a reference to itself
	//	Modifier - calculated time. ex: x += 50*modifier means move 50 pixels to the right in 1 second
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].act(objectList[i]);
	}
};