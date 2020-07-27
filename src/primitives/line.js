/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : line.js
* Created at  : 2020-07-28
* Updated at  : 2020-07-28
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals IGameObject, Vector2*/
/* exported Line*/

// ignore:end

class Line extends IGameObject {
    constructor (from, to) {
        super(from);
        this.destination = new Vector2(to.x, to.y);
    }

    draw (context) {
        context.beginPath();
        context.moveTo(this.position.x    , this.position.y);
        context.lineTo(this.destination.x , this.destination.y);

        context.stroke();
    }
}
