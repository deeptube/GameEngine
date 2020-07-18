/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : space_ship.js
* Created at  : 2020-07-19
* Updated at  : 2020-07-19
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals Vector2, IGameObject, TransformationMatrix2DH*/
/* exported SpaceShip*/

// ignore:end

class SpaceShip extends IGameObject {
    constructor (position, scaler) {
        super(position);

        this.color       = "black";
		this.velocity    = new Vector2(0, 0);
        this.line_width  = 1;
        this.orientation = 0;

		this.vertices = [
			Vector2.scale({ x:  0, y:  3 }, scaler),
		    Vector2.scale({ x:  2, y: -2 }, scaler),
		    Vector2.scale({ x:  1, y: -1 }, scaler),
		    Vector2.scale({ x: -1, y: -1 }, scaler),
		    Vector2.scale({ x: -2, y: -2 }, scaler),
		];
    }

    update (delta_time) {
		var delta_position = Vector2.scale(this.velocity, delta_time);
		this.position.add(delta_position);
    }

	draw (context) {
		const tranformer = new TransformationMatrix2DH();
		tranformer.rotate(this.orientation);

		context.beginPath();
		const point = tranformer.apply_to_point(this.vertices[0].x, this.vertices[0].y);
		point.add(this.position);
		context.moveTo(point.x, point.y);
		for (let i = 1; i < this.vertices.length; i += 1) {
			const point = tranformer.apply_to_point(this.vertices[i].x, this.vertices[i].y);
			point.add(this.position);
			context.lineTo(point.x, point.y);
		}
		context.closePath();

		context.lineWidth   = this.line_width;
		context.strokeStyle = this.color;
		context.stroke();
	}
}
