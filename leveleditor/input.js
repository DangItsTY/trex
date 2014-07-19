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
		var tempx = Math.floor(theSelector.x/IMAGESIZE);
		var tempy = Math.floor(theSelector.y/IMAGESIZE);
		document.getElementById("debug2").innerHTML=tempx;
		document.getElementById("debug3").innerHTML=tempy;
		document.getElementById("debug1").innerHTML=grid[tempy][tempx];
		document.getElementById("debug4").innerHTML=testSelector;

		grid[tempy][tempx] = parseInt(testSelector);		
		for (var i = 0; i < objectList.length; i++){
			objectList.splice(i, 1);
			oCount -= 1;
			i -= 1;
		}

		preload();

		keysUp["leftclick"] = true;
	}
	if (!keysDown["leftclick"]) {
		delete keysUp["leftclick"];
	}
};

