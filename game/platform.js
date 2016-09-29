import consts from "./consts.js"

class Platform
{
	constructor(posX, posY, width, heigth)
	{
		this.x = posX;
		this.y = posY;
		this.width = width;
		this.heigth = heigth;
	}
}

function * generatePlatform()
{
	var fy = consts.FIRST_PLATFORM_Y;
	while(true)
	{
		var x = Math.random() * consts.PLATFORM_RANGE_X;
		fy -= Math.random() * consts.PLATFORM_MARGIN_Y;
		yield new Platform(x, fy, consts.PLATFORM_WIDTH, consts.PLATFORM_HEIGHT);
	}
}

Platform.generatePlatform = generatePlatform;

export default Platform