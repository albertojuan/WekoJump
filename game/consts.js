const s = ((Math.random()*4 + 1).toFixed(0));
const PLEFT_IMG = new Image();
PLEFT_IMG.src = `resources/sprites${s}/pleft.png`;

const PRIGHT_IMG = new Image();
PRIGHT_IMG.src = `resources/sprites${s}/pright.png`;

const BRICK_IMG = new Image();
BRICK_IMG.src = `resources/sprites${s}/brick.png`;

const consts = {
 CANVAS_WIDTH: 640,
 CANVAS_HEIGHT: 1024,
 GRAVITY: 1.10,
 V_JUMP: -24,
 VX: 6,
 PLAYER_WITH: 55,
 PLAYER_HEIGHT: 124,
 PLATFORM_HEIGHT: 34,
 PLATFORM_WIDTH: 116,
 PLAYER_BOTTOM: 1024,
 PLAYER_COLLISION_PADDING: 34,
 VY_MAX: 26,
 SKYLINE: 450,
 MOVE_EVTS: { LEFT: Symbol("move left"), RIGHT: Symbol("move right")  },
 FIRST_PLATFORM_Y: 1000,
 PLATFORM_MARGIN_Y: 200,
 PLATFORM_RANGE_X: 500,
 
 // ES6 Feature: Autoresolves creates a property with the same name and value than the consts declared at the top
 PLEFT_IMG,
 PRIGHT_IMG,
 BRICK_IMG
};

export default consts;

