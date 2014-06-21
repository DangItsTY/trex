//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*
//	Resolve
//	~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*~~~~~~~TD~~~~~~*

var resolve = function (modifier) {
	for (var i = 0; i < objectList.length; i++) {
		for (var j = 0; j < tileList.length; j++) {
			if (collidesWith(objectList[i], tileList[j])) {
				//	Collide with right wall
				/*
				if ((objectList[i].x > tileList[j].x - 16 && objectList[i].x < tileList[j].x + 8) &&
						objectList[i].y > tileList[j].y - 12 && objectList[i].y < tileList[j].y + 12) {
					objectList[i].x = tileList[j].x - 16;
				}
				*/
				
				objectList[selectedPlayer].dashReady = true;
				objectList[selectedPlayer].jumpReady = true;
					
				//	Right Wall collision
				if (objectList[i].x < tileList[j].x - (objectList[i].size*0.25) &&
						objectList[i].y > tileList[j].y - (objectList[i].size*0.75) && objectList[i].y < tileList[j].y + (objectList[i].size*0.75)) {										
					objectList[i].x = tileList[j].x - 16;
					objectList[i].prevX = tileList[j].x - 16;	//	the previous coordinates (same as below) are shifted a bit to avoid infinite collision
					objectList[i].y -= objectList[i].weight/4 * modifier;
				}
				
				//	Left Wall collision
				if (objectList[i].x > tileList[j].x + (objectList[i].size*0.25) &&
						objectList[i].y > tileList[j].y - (objectList[i].size*0.75) && objectList[i].y < tileList[j].y + (objectList[i].size*0.75)) {										
					objectList[i].x = tileList[j].x + 16;
					objectList[i].prevX = tileList[j].x + 16;
					objectList[i].y -= objectList[i].weight/4 * modifier;
				}
				
				//	Floor collision
				if (objectList[i].y < tileList[j].y - (objectList[i].size*0.25) &&
						objectList[i].x > tileList[j].x - (objectList[i].size*0.75) && objectList[i].x < tileList[j].x + (objectList[i].size*0.75)) {										
					objectList[i].y = tileList[j].y - 16;
					objectList[i].prevY = tileList[j].y - 16;
					objectList[selectedPlayer].fastFallReady = false;
				}
				
				//	Ceiling collision
				if (objectList[i].y > tileList[j].y + (objectList[i].size*0.25) &&
						objectList[i].x > tileList[j].x - (objectList[i].size*0.75) && objectList[i].x < tileList[j].x + (objectList[i].size*0.75)) {
					objectList[i].y = tileList[j].y + 16;
					objectList[i].prevY = tileList[j].y + 16;
				}
			}
		}
	}
		
	//	Resolve Projectile
	for (var i = 0; i < projectileList.length; i++) {
		for (var j = 0; j < tileList.length; j++) {
			if (collidesWith(projectileList[i], tileList[j])) {
				projectileList.splice(i, 1);
				pCount -= 1;
				i -= 1;
			}
		}
	}
	
	actcamera(modifier);
};