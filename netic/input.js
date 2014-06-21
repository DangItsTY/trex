//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Input
//	Each input is broken up into components. These components make the code easier to read/reusable.
//	They should each work separately, unless they have required components
//
//	TyNote: Compartamentalizing may cause preloading lag?
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var input = function(modifier) {
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].prevX = objectList[i].x;
		objectList[i].prevY = objectList[i].y;
	}
	objectList[selectedPlayer].runInput(modifier);
};