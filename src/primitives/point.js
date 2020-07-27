/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : point.js
* Created at  : 2020-07-28
* Updated at  : 2020-07-28
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals IGameObject*/
/* exported Point*/

// ignore:end

class Point extends IGameObject {
    constructor (x, y) {
        super({x, y});
    }

    draw (context) {
        context.beginPath();
        context.fillRect(this.position.x, this.position.y, 1, 1);
    }
}
