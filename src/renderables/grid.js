/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : grid.js
* Created at  : 2020-07-22
* Updated at  : 2020-07-28
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals IGameObject, Vector2*/
/* exported Grid*/

// ignore:end

class Grid extends IGameObject {
    constructor (options) {
        super(new Vector2(options.x, options.y));
        this.size   = options.size;
        this.color  = options.color || "black";
        this.width  = options.width;
        this.height = options.height;
    }

    draw (context) {
        context.save();
        context.beginPath();

        const x_end = this.position.x + this.width;
        const y_end = this.position.y - this.height;

        for (let y = this.position.y; y > y_end; y -= this.size) {
            context.moveTo(this.position.x, y);
            context.lineTo(x_end, y);
        }

        for (let x = this.position.x; x < x_end; x += this.size) {
            context.moveTo(x, this.position.y);
            context.lineTo(x, y_end);
        }

        context.strokeStyle = this.color;
        context.stroke();
        context.restore();
    }
}
