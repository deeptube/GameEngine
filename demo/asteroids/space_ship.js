/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : space_ship.js
* Created at  : 2020-07-19
* Updated at  : 2020-07-28
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals Vector2, IGameObject, TransformationMatrix2DH, KEY*/
/* exported SpaceShip*/

// ignore:end

const MAX_VELOCITY  = 120;
//const MIN_VELOCITY  = 0;
const ACCELERATION  = MAX_VELOCITY * 3;
const ANGULAR_SPEED = 1.5;
const VELOCITY_DRAG = 0.01;

function translate_x (ship, dx) {
    ship.position.x += dx;
    ship.transformed_points.forEach(point => {
        point.x += dx;
    });
}

function translate_y (ship, dy) {
    ship.position.y += dy;
    ship.transformed_points.forEach(point => {
        point.y += dy;
    });
}

class SpaceShip extends IGameObject {
    constructor (position, scaler) {
        super(position);

        this.color             = "black";
		this.velocity          = new Vector2(0, 0);
        this.line_width        = 1;
        this.orientation       = 0;
        this.is_accelerating   = false;
        this.is_rotating_left  = false;
        this.is_rotating_right = false;

		this.points = [
			Vector2.scale({ x:  0, y:  3 }, scaler),
		    Vector2.scale({ x:  2, y: -2 }, scaler),
		    Vector2.scale({ x:  1, y: -1 }, scaler),
		    Vector2.scale({ x: -1, y: -1 }, scaler),
		    Vector2.scale({ x: -2, y: -2 }, scaler),
		];

        this.transformed_points = this.points.map(p => p.clone());
    }

    initialize (engine) {
        // Keydown event handler
        this.on_keydown = event => {
            switch (event.keyCode) {
                case KEY.ARROW_UP :
                    this.is_accelerating = true;
                    break;
                case KEY.ARROW_LEFT :
                    this.is_rotating_left = true;
                    break;
                case KEY.ARROW_RIGHT :
                    this.is_rotating_right = true;
                    break;
            }
        };
        this.on_keyup = event => {
            switch (event.keyCode) {
                case KEY.ARROW_UP :
                    this.is_accelerating = false;
                    break;
                case KEY.ARROW_LEFT :
                    this.is_rotating_left = false;
                    break;
                case KEY.ARROW_RIGHT :
                    this.is_rotating_right = false;
                    break;
            }
        };

        engine.canvas.addEventListener("keyup"  , this.on_keyup);
        engine.canvas.addEventListener("keydown", this.on_keydown);
        this.engine = engine;
    }

    destroy () {
        this.engine.canvas.removeEventListener("keyup"  , this.on_keyup);
        this.engine.canvas.removeEventListener("keydown", this.on_keydown);
    }

    update (delta_time) {
        const {engine} = this;

        // Angular transformation
        if (this.is_rotating_right) {
            this.orientation -= ANGULAR_SPEED * delta_time;
        }
        if (this.is_rotating_left) {
            this.orientation += ANGULAR_SPEED * delta_time;
        }

        // Linear transformation
        if (this.is_accelerating) {
            const direction_to_accelerate = new Vector2(
                -Math.sin(this.orientation), Math.cos(this.orientation)
            );
            this.velocity.add(
                direction_to_accelerate.scale(ACCELERATION * delta_time)
            );
        } else {
            this.velocity.scale(1 - VELOCITY_DRAG);
        }

        // translate position
		const delta_position = Vector2.scale(this.velocity, delta_time);
		this.position.add(delta_position);

        // update transformed_points
		const tranformer = new TransformationMatrix2DH();
		tranformer.rotate(this.orientation);
        this.transformed_points = this.points.map(point => {
			point = tranformer.apply_to_point(point.x, point.y);
			return point.add(this.position);
        });

        // check boundary X direction
        if (this.position.x > 0) {
            const is_out_of_boundary = this.transformed_points.every(point => {
                return point.x > engine.half_width;
            });
            if (is_out_of_boundary) {
                const xs    = this.transformed_points.map(point => point.x);
                const max_x = Math.max(...xs);

                const dx = engine.canvas.width + (max_x - engine.half_width);
                translate_x(this, -dx);
            }
        } else if (this.position.x < 0) {
            const is_out_of_boundary = this.transformed_points.every(point => {
                return point.x < -engine.half_width;
            });
            if (is_out_of_boundary) {
                const xs    = this.transformed_points.map(point => point.x);
                const min_x = -Math.min(...xs);

                const dx = engine.canvas.width + (min_x - engine.half_width);
                translate_x(this, dx);
            }
        }

        // check boundary Y direction
        if (this.position.y > 0) {
            const is_out_of_boundary = this.transformed_points.every(point => {
                return point.y > engine.half_height;
            });
            if (is_out_of_boundary) {
                const ys    = this.transformed_points.map(point => point.y);
                const max_y = Math.max(...ys);

                const dy = engine.canvas.height + (max_y - engine.half_height);
                translate_y(this, -dy);
            }
        } else if (this.position.y < 0) {
            const is_out_of_boundary = this.transformed_points.every(point => {
                return point.y < -engine.half_height;
            });
            if (is_out_of_boundary) {
                const ys    = this.transformed_points.map(point => point.y);
                const min_y = -Math.min(...ys);

                const dy = engine.canvas.height + (min_y - engine.half_height);
                translate_y(this, dy);
            }
        }
    }

	draw (context) {
		context.beginPath();
        const {x, y} = this.transformed_points[0];
		context.moveTo(x, y);
		for (let i = 1; i < this.transformed_points.length; i += 1) {
            const {x, y} = this.transformed_points[i];
			context.lineTo(x, y);
		}
		context.closePath();

		context.lineWidth   = this.line_width;
		context.strokeStyle = this.color;
		context.stroke();
	}
}
