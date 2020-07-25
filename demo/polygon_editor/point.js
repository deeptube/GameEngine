/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : point.js
* Created at  : 2020-07-26
* Updated at  : 2020-07-26
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals IGameObject, Vector2*/
/* exported Point*/

// ignore:end

const TAU = Math.PI * 2;

class Point extends IGameObject {
    constructor (options) {
        super(new Vector2(options.x, options.y));

        this.radius = options.radius;
        this.style  = options.style;
    }

    draw (context) {
        context.save();
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, TAU);

        if (this.style === "stroke") {
            context.stroke();
        } else {
            context.fill();
        }

        context.restore();
    }
}
