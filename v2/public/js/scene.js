var scene = function() {
	makeTree(-4*BLOCKSIZE, 0, -4.5*BLOCKSIZE);
	makeWorkbench(-2*BLOCKSIZE, 0, -4.5*BLOCKSIZE);
	makeArrowshop(0, 0, -4.5*BLOCKSIZE);
	
	makeWood(-4*BLOCKSIZE, 0, -2.5*BLOCKSIZE);
	makeLog(-2*BLOCKSIZE, 0, -2.5*BLOCKSIZE);
	makeArrow(0, 0, -2.5*BLOCKSIZE);
}

module.exports = function() { this.scene = scene; };