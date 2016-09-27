"use strict";

import consts from "./consts.js";
import Player from "./player.js";
import Platform from "./platform.js";
import Logic from "./logic.js";
import Graphics from "./graphics.js";

// requestAnimFramew polifill
window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
		window.setTimeout(callback, 1000 / 60);
		};
	})();

// Anonymous function autocall
(function ()
{
	
	// Game initialization
	let keypressed, 
		canvas = document.getElementById("game"), 
		logic = new Logic(), 
		context = canvas.getContext("2d"),
		graphics = new Graphics(logic, context);
		
	canvas.width = consts.CANVAS_WIDTH;
	canvas.height = consts.CANVAS_HEIGHT;
		
	document.onkeydown = (ev) => { keypressed = ev.keyCode; };
	document.onkeyup = (ev) => {
		
		if (ev.keyCode == keypressed)
			keypressed = 0;
	};
	

	// Game loop using requestAnimFrame
	function mainStep()
	{
		let events = {
			direction: keypressed === 65 ? consts.MOVE_EVTS.LEFT : 
					keypressed === 68 ? consts.MOVE_EVTS.RIGHT : 
					null
		};
					
		logic.step(events);
		graphics.draw();
	
		window.requestAnimFrame(mainStep);
	}
	
	mainStep();
	
})();