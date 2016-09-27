import consts from "./consts.js";
 
class Graphics
{
	constructor(logic, graphicContext)
	{
		this.camera = 0;
		this.logic = logic;
		this.graphicContext = graphicContext;
	}
	
	clear() 
	{
		this.graphicContext.clearRect(0, 0, consts.CANVAS_WIDTH, consts.CANVAS_HEIGHT);
	}
	
	draw()
	{
		this.clear();
		this.updateCamera();
		
		for (var platform of this.logic.platforms)
		{
			this.drawPlatform(platform);
		}
		
		this.drawPlayer(this.logic.player);
		this.drawScore();
	}
	
	updateCamera()
	{
		if (this.logic.player.y < consts.SKYLINE + this.camera)
		{
			this.camera = this.logic.player.y - consts.SKYLINE;
		}
		
		if (this.logic.player.y + consts.PLAYER_HEIGHT > consts.CANVAS_HEIGHT + this.camera)
		{
			this.camera = this.logic.player.y +  consts.PLAYER_HEIGHT - consts.CANVAS_HEIGHT;
		}
	}
	
	
	drawScore()
	{
		this.graphicContext.font = "30px Verdana";
		
		// Create gradient
		var gradient= this.graphicContext.createLinearGradient(0, 0, 300, 0);
		gradient.addColorStop("0", "magenta");
		gradient.addColorStop("0.5", "blue");
		gradient.addColorStop("1.0", "red");
		
		// Fill with gradient
		this.graphicContext.fillStyle=gradient;
		this.graphicContext.fillText(`Max Height! ${-this.logic.maxScore.toFixed(0)}` , 10, 40);
	}
	
	drawPlatform(plataforma)
	{
		this.graphicContext.drawImage(consts.BRICK_IMG, plataforma.x, plataforma.y - this.camera);
	}
	
	drawPlayer(player)
	{
		let img = player.lastDirection === consts.MOVE_EVTS.LEFT ? consts.PLEFT_IMG : consts.PRIGHT_IMG;
		this.graphicContext.drawImage(img, player.x - consts.PLAYER_COLLISION_PADDING, player.y - this.camera);
	}
	
	drawRectangle(x, y, width, height, color)
	{
		this.graphicContext.beginPath();
		this.graphicContext.fillStyle = color;
		this.graphicContext.rect(x, y, width, height);
		this.graphicContext.fillRect(x, y, width, height);
		this.graphicContext.stroke();
	}
}

export default Graphics;