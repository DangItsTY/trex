//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Input
//	Each input is broken up into components. These components make the code easier to read/reusable.
//	They should each work separately, unless they have required components
//
//	TyNote: Compartamentalizing may cause preloading lag?
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
var input = function() {
	//objectList[selectedPlayer].runInput();
	if (keysDown["leftclick"] && !keysUp["leftclick"]) {
		document.getElementById("debug1").innerHTML = "X : " + mousePos.x + " Y: " + mousePos.y;
		objectList[oCount] = new tower(mousePos.x, mousePos.y);
		objectList[oCount-1].range = 9*64;
		keysUp["leftclick"] = true;
	}
	if (!keysDown["leftclick"]) {
		delete keysUp["leftclick"];
	}
};