import consts  from "./consts.js"

class Player
{
	constructor(posX, posY)
	{
		this.x = posX;
		this.y = posY;
		this.vy = 0;
	}
	
	step(events)
	{
		// Actualizo posición X según teclado
		if (events.direction === consts.MOVE_EVTS.LEFT)
		{
			this.lastDirection = consts.MOVE_EVTS.LEFT;
			this.x -= consts.VX;
		} else if (events.direction === consts.MOVE_EVTS.RIGHT)
		{
			this.lastDirection = consts.MOVE_EVTS.RIGHT;
			this.x += consts.VX;
		}
		
		
		// Actualizo velocidad según gravedad
		if (this.vy < consts.VY_MAX)
			this.vy += consts.GRAVITY;
		
		// Actualizo posición Y según velocidad
		this.y += this.vy;
	}
}

export default Player;