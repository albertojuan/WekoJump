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
		moveLeft,
		moveRight,
		canvas = document.getElementById("game"), 
		logic = new Logic(), 
		context = canvas.getContext("2d"),
		graphics = new Graphics(logic, context);
		
	canvas.width = consts.CANVAS_WIDTH;
	canvas.height = consts.CANVAS_HEIGHT;
	
	// User actions
	document.onkeydown = (ev) => { keypressed = ev.keyCode; };
	document.onkeyup = (ev) => {
		
		if (ev.keyCode == keypressed)
			keypressed = 0;
	};
	
	function onTouch(evt) {
		evt.preventDefault();
		
		var touch = evt.changedTouches[0];
		if (touch)
		{
			switch (evt.type) {
				case "touchstart": 
					moveLeft = touch.pageX <= consts.CANVAS_WIDTH/2;
					moveRight = touch.pageY > consts.CANVAS_WIDTH/2;
					break;
				case "touchend":        
					moveLeft = moveRight = false;
					break;
			}
		}
	}
	
	canvas.addEventListener("touchstart", onTouch, false);
	canvas.addEventListener("touchend", onTouch, false);
	

	// Game loop using requestAnimFrame
	function mainStep()
	{
		let events = {
			direction: (keypressed === 65 || moveLeft) ? consts.MOVE_EVTS.LEFT : 
					(keypressed === 68 || moveRight) ? consts.MOVE_EVTS.RIGHT : 
					null
		};
					
		logic.step(events);
		graphics.draw();
	
		window.requestAnimFrame(mainStep);
	}
	
	mainStep();
	
})();