//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Resolve
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var resolve = function (modifier) {
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].resolve(modifier, i);
	}
	
	cleanobjectlist();
};

var cleanobjectlist = function () {
	for (var i = 0; i < objectList.length; i++) {
		if (objectList[i].readytodie) {
			objectList.splice(i, 1);
			oCount -= 1;
			i -= 1;
		}
	}
};