/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : i_game_object.js
* Created at  : 2020-07-19
* Updated at  : 2020-07-28
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals virtual_method, IEventTarget, Vector2*/
/* exported IGameObject*/

// ignore:end

class IGameObject extends IEventTarget {
    constructor ({x, y}) {
        super(IGameObject);
        this.position = new Vector2(x, y);
    }

    initialize () {}
    destroy () {}

    update () {}
    draw () { virtual_method(); }
}
