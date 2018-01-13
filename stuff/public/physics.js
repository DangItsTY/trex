var physics = {
  "gravity": 0.2,
  "friction": 0.2,
  "UPBOUND": -(totalHeight / 2) + (BLOCKSIZE / 4),
  "DOWNBOUND": (totalHeight / 2) - (BLOCKSIZE / 4),
  "LEFTBOUND": -(totalWidth / 2) + (BLOCKSIZE / 4),
  "RIGHTBOUND": (totalWidth / 2) - (BLOCKSIZE / 4),
  "BUFFERSIZE": 2,
  "apply": function(data) {
    //  Set variables
    var jumpOffset = 0;
    var sourceData = data;
    var sourcePosition = data.position;
    var targetData;
    var targetPosition;

    //  apply friction
    if (!data.jumpLock) {
      if (data.velocity.x < this.friction && data.velocity.x > -this.friction) {
        data.velocity.x = 0;
      } else if (data.velocity.x > 0) {
        data.velocity.x -= RIGHT_DIRECTION * this.friction * modifier;
      } else if (data.velocity.x < 0) {
        data.velocity.x -= (RIGHT_DIRECTION * -1) * this.friction * modifier;
      }
      if (data.velocity.z < this.friction && data.velocity.z > -this.friction) {
        data.velocity.z = 0;
      } else if (data.velocity.z > 0) {
        data.velocity.z -= RIGHT_DIRECTION * this.friction * modifier;
      } else if (data.velocity.z < 0) {
        data.velocity.z -= (RIGHT_DIRECTION * -1) * this.friction * modifier;
      }
    }

    //	set movement
    data.position.x += data.velocity.x * modifier;
    data.position.y += data.velocity.y * modifier;
    data.position.z += data.velocity.z * modifier;

    //	jump
    if (!data.carried) {
      if (data.position.y > 0) {
        data.velocity.y -= this.gravity * modifier;
      }
    }

    //	collision
    itemStillColliding = false;
    objectStillColliding = false;
    for (var i = 0; i < objects.length; i++) {
      if (objects[i] != null) {
        if (
          objects[i] != data && (objects[i].collision != "none" && sourceData.collision != "none") && !objects[i].itemized && !sourceData.itemized &&  //  not self, none are none collision, not itemized
          objects[i].name != sourceData.name
        ) {
          targetData = objects[i];
          targetPosition = objects[i].position;
          var sourceVertices = [
            {"x": sourcePosition.x - (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": sourcePosition.z - (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": sourcePosition.x + (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": sourcePosition.z - (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": sourcePosition.x + (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": sourcePosition.z + (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": sourcePosition.x - (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": sourcePosition.z + (sourceData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
          ];
          var targetVertices = [
            {"x": targetPosition.x - (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": targetPosition.z - (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": targetPosition.x + (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": targetPosition.z - (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": targetPosition.x + (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": targetPosition.z + (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)},
            {"x": targetPosition.x - (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE), "z": targetPosition.z + (targetData.size / 2 * BLOCKSIZE - this.BUFFERSIZE)}
          ];
          if (
            (this.pointInSquareCollision(sourceVertices, targetVertices) || this.pointInSquareCollision(targetVertices, sourceVertices)) &&
            (targetPosition.y + (targetData.height * BLOCKSIZE) >= sourcePosition.y && targetPosition.y <= sourcePosition.y)
          ) {
            //  universal collision rules
            if (sourceData.collision == "solid" && targetData.collision == "solid") {
              //	jump on top
              if (sourceData.velocity.y <= 0 && (sourcePosition.y + (-1 * sourceData.velocity.y) >= targetPosition.y + (targetData.height * BLOCKSIZE))) {
                data.position.y = targetPosition.y + (targetData.height * BLOCKSIZE);
                data.velocity.y = 0;
                data.jumpLock = false;
              } else {
                //	undo the movements
                data.position.x -= data.velocity.x * modifier;
                data.position.z -= data.velocity.z * modifier;
              }
              // if (!done) {
              //   console.log(i);
              //   console.log(sourceData);
              //   console.log(targetData);
              //   done = true;
              // }
            }
            //  object collision rules
            if (typeof(sourceData.collide) == 'function') {
              sourceData.collide(targetData);
            }
          }
        }
      }
    }
    if (!itemStillColliding && sourceData.selectedItem) {
      sourceData.selectedItem = null;
    }
    if (!objectStillColliding && sourceData.adjacentObject) {
      sourceData.adjacentObject = null;
    }

    //  wall collision
    if (
      sourceData.position.z < physics.UPBOUND - this.BUFFERSIZE ||
      sourceData.position.z > physics.DOWNBOUND + this.BUFFERSIZE ||
      sourceData.position.x < physics.LEFTBOUND - this.BUFFERSIZE ||
      sourceData.position.x > physics.RIGHTBOUND + this.BUFFERSIZE
    ) {
      data.position.x -= data.velocity.x * modifier;
      data.position.z -= data.velocity.z * modifier;
    }

    //  floor collision
    if (sourceData.position.y < 0) {
      data.position.y = 0;
      data.velocity.y = 0;
      data.jumpLock = false;
    }

    //	set render positions
    data.renderPos.x = data.position.x;
    data.renderPos.y = data.position.y;
    data.renderPos.z = data.position.z;
  },
  "boxCollisionOld": function(targetPosition, targetData, sourcePosition, sourceData) {
    if (
      ((targetPosition.x + (BLOCKSIZE * targetData.size / 2) >= sourcePosition.x - (BLOCKSIZE * sourceData.size / 2) && targetPosition.x + (BLOCKSIZE * targetData.size / 2) <= sourcePosition.x + (BLOCKSIZE * sourceData.size / 2)) ||
      (targetPosition.x - (BLOCKSIZE * targetData.size / 2) >= sourcePosition.x - (BLOCKSIZE * sourceData.size / 2) && targetPosition.x - (BLOCKSIZE * targetData.size / 2) <= sourcePosition.x + (BLOCKSIZE * sourceData.size / 2))) &&
      ((targetPosition.z + (BLOCKSIZE * targetData.size / 2) >= sourcePosition.z - (BLOCKSIZE * sourceData.size / 2) && targetPosition.z + (BLOCKSIZE * targetData.size / 2) <= sourcePosition.z + (BLOCKSIZE * sourceData.size / 2)) ||
      (targetPosition.z - (BLOCKSIZE * targetData.size / 2) >= sourcePosition.z - (BLOCKSIZE * sourceData.size / 2) && targetPosition.z - (BLOCKSIZE * targetData.size / 2) <= sourcePosition.z + (BLOCKSIZE * sourceData.size / 2))) &&
      (targetPosition.y + targetData.height >= sourcePosition.y && targetPosition.y <= sourcePosition.y)
    ) {
      return true;
    } else {
      return false;
    }
  },
  "pointInPolygonCollisionOld": function(point, rectVertices) {
    //  Implementing a "Point in Polygon" using a ray casting algorithm
    var collided = false;
    for (var i = 0; i < 4; i++) {
      var v1 = rectVertices[i];
      var v2 = rectVertices[i+1] || rectVertices[0];
      if (((point.z > v1.z) != (point.z > v2.z)) &&
      (point.x < ((v1.x - v2.x) * v1.z / (v1.z - v2.z)))) {
        collided = !collided;
      }
    }
    return collided;
  },
  "pointInSquareCollision": function(sourceVertices, targetVertices) {
    //  Implementing a "Point in Polygon" using a ray casting to the right algorithm.
    //  If any source points pass the test, then collision is true
    //  Winding order is top left, clockwise
    var collided = false;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        var p = sourceVertices[i];
        var v1 = targetVertices[j];
        var v2 = targetVertices[j + 1] || targetVertices[0];
        if (
          ((p.z > v1.z) != (p.z > v2.z)) &&
          (p.x < v1.x)
        ) {
          collided = !collided;
        }
      }
      if (collided) {
        return collided;
      }
    }
    return false;
  }
};

module.exports = function() { this.physics = physics; };
