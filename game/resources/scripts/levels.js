var level_1 = function(){
/*
	Enemies: Microceratus, Triceratops
	5 Waves
	20 seconds between Waves
	2 second spawn time
*/
	// clear object list at the start of every level
	var grid = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];

	var pathlist = [
		{"x":0, "y":11},
		{"x":7, "y":11},
		{"x":8, "y":12},
		{"x":9, "y":13},
		{"x":13, "y":13},
		{"x":14, "y":12},
		{"x":15, "y":11},
		{"x":15, "y":0}
	];
	
	// console.log(path);
	var templist = createPath(pathlist);
	createCanvas(grid);
	var waveTimer = 0;
	var waveEvent = 0;

	//if (waveTimer > 5 && waveEvent == 0) {		
		objectList[oCount] = new spawner(0*IMAGESIZE+IMAGESIZE/2, 11*IMAGESIZE+IMAGESIZE/2);
		objectList[oCount-1].waypointlist = tempList;
		objectList[oCount-1].target = objectList[oCount-1].waypointlist[0];
		objectList[oCount-1].act = function(object) { spawndino(object); };
		objectList[oCount-1].spawnspeed = 5;
		waveEvent += 1;
		
		var tempmsg = '<h3>Wave1</h3><br>';
		tempmsg += 'Dinosaurs attack!';
		document.getElementById("debug1").innerHTML = tempmsg;
	//}

	waveTimer++;
	console.log(waveTimer);


}; // end level 1

function createCanvas(pGrid){
	var xlength = pGrid.length;
    var ylength = pGrid[0].length;
    // console.log(xlength + " " + ylength);
	 // draw the canvas based on the grid
	for (i = 0; i<ylength; i++)
	{
	  for (j = 0; j<xlength; j++)
	  {	  	
	     if(pGrid[i][j]== 0) // grass
	     {
	     	objectList[oCount] = new grasstile(j*IMAGESIZE+IMAGESIZE/2, i*IMAGESIZE+IMAGESIZE/2);	     
	  	 }
	     else if(pGrid[i][j] == 1) // pathway
	     {
	     	objectList[oCount] = new bricksmile(j*IMAGESIZE+IMAGESIZE/2, i*IMAGESIZE+IMAGESIZE/2);	       
	     }	     
	  }
	}
	// console.log(objectList);
};

function createPath(pPathlist){
	var returnList = new Array();		
	for(i = 0; i < pPathlist.length; i++){
		objectList[oCount] = new waypoint(pPathlist[i].y*IMAGESIZE+IMAGESIZE/2, pPathlist[i].x*IMAGESIZE+IMAGESIZE/2);
		returnList.push(objectList[oCount-1]);		
	}	
	return(returnList);
	// console.log(objectList);
};