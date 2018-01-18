var makeFoamdart_item = function(varX, varY, varZ) {
  var data = {
    "name": "foamdart_item",
    "type": "neutral",
    "size": 0.25,
    "height": 1,
    "speed": 0,
    "jumpSpeed": 0,
    "position": {"x": varX, "y": varY, "z": varZ},
    "velocity": {"x": 0, "y": 0, "z": 0},
    "direction": {"x": RIGHT_DIRECTION, "z": 0},
    "jumpLock": false,
    "renderPos": {"x": varX, "y": varY, "z": varZ},
    "renderSize": 1.0,
    "alive": true,
    "uniqueIndex": uniqueIndex,
    "color": 0x99ff99,
    "sizes": {"x": 0.25, "y": 1, "z": 0.25},
    "collision": "item",
    "owner": null,
    "itemized": false,
    "ammo": 15,
    "ammoMax": 15,
    "dae": "models/foamdartgun.dae"
  };
  data.act = function() {
    var ownerObject = objects_players.filter(findPlayerById, data.owner)[0];
    if (data.itemized) {
      data.position.x = ownerObject.position.x;
      data.position.y = ownerObject.position.y;
      data.position.z = ownerObject.position.z;
      data.direction.x = ownerObject.direction.x;
      data.direction.z = ownerObject.direction.z;
    }

    if (data.ammo <= 0) {
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
      makeFoamdart(ownerObject.position.x + (ownerObject.direction.x * offset), ownerObject.position.y + (ownerObject.height / 2 * BLOCKSIZE), ownerObject.position.z + (ownerObject.direction.z * offset), ownerObject.direction.x, ownerObject.direction.z);
      data.ammo -= 1;
    }
  };
  data.pickup = function() {
    var playerObject = objects_players.filter(findPlayerById, data.owner)[0];
    if (playerObject.inventory.length > 0) {
      var last = playerObject.inventory.length - 1;
      var playerItem = objects.filter(findObjectByUniqueIndex, playerObject.inventory[last])[0];
      if (playerItem.name == "foamdart_item" && playerItem.ammo < playerItem.ammoMax) {
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

module.exports = function() { this.makeFoamdart_item = makeFoamdart_item; };
