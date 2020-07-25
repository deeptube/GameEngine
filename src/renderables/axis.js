/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : axis.js
* Created at  : 2020-07-22
* Updated at  : 2020-07-26
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals IGameObject, Vector2*/
/* exported Axis*/

// ignore:end


class Axis extends IGameObject {
    constructor (options) {
        super(new Vector2(options.width, options.height));

        this.x_color    = options.x_color || "black";
        this.y_color    = options.y_color || "black";
        this.line_width = options.line_width || 2;
    }

    draw (context) {
        context.save();
        context.lineWidth = this.line_width;

        // X axis
        context.beginPath();
        context.strokeStyle = this.x_color;
        context.moveTo(-this.position.x, 0);
        context.lineTo( this.position.x, 0);
        context.stroke();

        // Y axis
        context.beginPath();
        context.strokeStyle = this.y_color;
        context.moveTo(0,  this.position.y);
        context.lineTo(0, -this.position.y);
        context.stroke();

        context.restore();
    }
}
