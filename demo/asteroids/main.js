/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.js
* Created at  : 2020-07-22
* Updated at  : 2020-07-28
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals Engine, SpaceShip, Vector2*/
/* exported*/

// ignore:end

const engine = new Engine(document.getElementById("game"), {
    use_double_buffer: true,
});

const ship = new SpaceShip(new Vector2(), 10);
ship.line_width = 2;

engine.add_game_object(ship);

engine.start();

/*
let grid_size = 100;

let ship = new SpaceShip(new Vector2(), 10);
ship.line_width = 2;

let keyboard_binder = new KeyboardBinder(document);


const MAX_VELOCITY  = 120;
const MIN_VELOCITY  = 0;
const ACCELERATION  = MAX_VELOCITY * 3;
const ANGULAR_SPEED = 1.5;
const VELOCITY_DRAG = 0.01;

let new_velocity;
let last_timestamp = 0;

// Game Loop 0.016
function main_loop (current_timestamp) {
	let delta_time = (current_timestamp - last_timestamp) / 1000;

	// 1. clear screen
	context.clearRect(-half_width, half_height, width, -height);

	draw_grid(context, grid_size, half_width, half_height, "rgba(0, 0, 0, 0.3)");
	draw_axis(context, Math.max(half_width, half_height), "black");

	// 2. update
	// Linear movement
	if (keyboard_binder.is_key_down(KEY_UP)) {
		let direction_to_accelerate = new Vector2(-Math.sin(ship.orientation), Math.cos(ship.orientation));
		let delta_velocity = Vector2.scale(direction_to_accelerate, ACCELERATION * delta_time);

		ship.velocity.add(delta_velocity);
	} else {
		ship.velocity.scale(1 - VELOCITY_DRAG);
	}

	// Angular movement
	if (keyboard_binder.is_key_down(KEY_RIGHT)) {
		ship.orientation -= ANGULAR_SPEED * delta_time;
	}
	if (keyboard_binder.is_key_down(KEY_LEFT)) {
		ship.orientation += ANGULAR_SPEED * delta_time;
	}

	// Debug
	if (keyboard_binder.is_key_down(KEY_SPACE)) {
		console.log(ship.velocity);
	}
	ship.update(delta_time);

	// 3. draw
	ship.draw(context);

	// 4. goto step 1
	last_timestamp = current_timestamp;
	requestAnimationFrame(main_loop);
};

// Start main loop
requestAnimationFrame(main_loop);
*/
