import consts from "./consts.js";
import Player from "./player.js";
import Platform from "./platform.js";

class Logic
{
	constructor()
	{
		this.maxScore = 0;
		this.player = new Player(consts.CANVAS_WIDTH/2 - consts.PLAYER_WITH/2, consts.CANVAS_HEIGHT - consts.PLAYER_HEIGHT);
		this.platforms = [];
		this.platformGenerator = Platform.generatePlatform();
	}
	
	createPlatforms()
	{
		if(this.platforms.length === 0 || this.platforms.slice(-1)[0].y > (this.player.y - consts.CANVAS_HEIGHT))
		{
			var platform = this.platformGenerator.next().value;
			console.debug(platform);
			this.platforms.push(platform);
		} 
	}
	

	checkJumpCollision()
	{
		if (this.player.vy > 0)
		{
			// Colisiona suelo salta
			if (this.player.y + consts.PLAYER_HEIGHT >= consts.PLAYER_BOTTOM)
			{
				return true;
			}
			
			// Colisiona plataforma salta
			for (let platform of this.platforms)
			{
				if (this.checkCollisionPlayerWithPlatform(this.player, platform))
				{
					return true;
				}
			}
		}
		
		return false;
	}
	
	checkCollisionPlayerWithPlatform(player, platform)
	{
		return (((player.x  >= platform.x 
					&& player.x <= platform.x + consts.PLATFORM_WIDTH) ||
					(player.x + consts.PLAYER_WITH >= platform.x 
					&& player.x + consts.PLAYER_WITH <= platform.x + consts.PLATFORM_WIDTH))
					&& player.y + consts.PLAYER_HEIGHT >= platform.y
					&& player.y + consts.PLAYER_HEIGHT <= platform.y + consts.PLATFORM_HEIGHT);
	}
	
	
	updateScore()
	{
		this.maxScore = Math.min(this.maxScore, this.player.y - consts.CANVAS_HEIGHT);
	}
	
	step(events)
	{
		this.createPlatforms();
		
		if (this.checkJumpCollision(this.player))
		{
			this.player.vy = consts.V_JUMP;
		}
	
		this.player.step(events);
		this.updateScore();
	}	
}

export default Logic