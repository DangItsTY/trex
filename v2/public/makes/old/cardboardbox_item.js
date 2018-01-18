var makeCardboardbox_item = function(varX, varY, varZ) {
  var data = {
    "name": "cardboardbox_item",
    "type": "neutral",
    "size": 0.25,
    "height": 1,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": 0, "z": UP_DIRECTION},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 0.25,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x00ffff,
    "sizes": {"x": 0.25, "y": 1, "z": 0.25},
    "collision": "item",
    "carried": false,
    "carriedBy": null,
    "owner": null,
    "itemized": false,
    "ammo": 1,
    "ammoMax": 4,
    "dae": "models/default.dae"
  };
  data.act = function() {
    if (data.itemized) {
      data.position.y = 1000;
    }

    if (data.ammo <= 0) {
      var ownerObject = objects_players.filter(findPlayerById, data.owner)[0];
      ownerObject.inventory.pop();
      data.alive = false;
    }

    //	apply physics
    physics.apply(data);
  };
  data.use = function() {
    if (data.ammo > 0) {
      var ownerObject = objects_players.filter(findPlayerById, data.owner)[0];
      var offset = ((ownerObject.size / 2) * BLOCKSIZE) + (BLOCKSIZE / 4);
      makeCardboardbox(ownerObject.position.x + (ownerObject.direction.x * offset), ownerObject.position.y, ownerObject.position.z + (ownerObject.direction.z * offset), ownerObject.direction.x, ownerObject.direction.z);
      data.ammo -= 1;
    }
  };
  data.pickup = function() {
    var playerObject = objects_players.filter(findPlayerById, data.owner)[0];
    if (playerObject.inventory.length > 0) {
      var last = playerObject.inventory.length - 1;
      var playerItem = objects.filter(findObjectByUniqueIndex, playerObject.inventory[last])[0];
      if (playerItem.name == data.name && playerItem.ammo < playerItem.ammoMax) {
        var ammoFree = playerItem.ammoMax - playerItem.ammo;
        if (ammoFree < data.ammo) {
          playerItem.ammo = playerItem.ammoMax;
          data.ammo -= ammoFree;
        } else if (ammoFree >= data.ammo) {
          if (ammoFree == data.ammo) {
            playerItem.ammo = playerItem.ammoMax;
          } else {
            playerItem.ammo += data.ammo;
          }
          data.alive = false;
          playerObject.selectedItem = null;
        }
      } else if (playerObject.inventory.length < playerObject.inventoryMax) {
        var newItem = data;
        newItem.itemized = true;
        playerObject.inventory.push(data.uniqueIndex);
        playerObject.selectedItem = null;
      }
    } else {
      var newItem = data;
      newItem.itemized = true;
      playerObject.inventory.push(data.uniqueIndex);
      playerObject.selectedItem = null;
    }
  };
  objects.push(data);
  uniqueIndex += 1;
  io.emit('add object', data);
};

module.exports = function() { this.makeCardboardbox_item = makeCardboardbox_item; };
