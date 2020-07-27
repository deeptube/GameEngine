/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : circle.js
* Created at  : 2020-07-28
* Updated at  : 2020-07-28
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals IGameObject, TAU*/
/* exported Circle*/

// ignore:end

class Circle extends IGameObject {
    constructor (position, radius, options = {}) {
        super(position);
        this.radius  = radius;
        this.options = options;
    }

    draw (context) {
        context.save();
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, TAU);

        if (this.options.style === "fill") {
            context.fillStyle = this.options.fill_color || "black";
            context.fill();
        }

        context.strokeStyle = this.options.stroke_color || "black";
        context.stroke();

        context.restore();
    }

    is_colided (x, y) {
        return x >= this.position.x - this.radius &&
               x <= this.position.x + this.radius &&
               y >= this.position.y - this.radius &&
               y <= this.position.y + this.radius;
    }
}
