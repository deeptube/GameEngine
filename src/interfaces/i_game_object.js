/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : i_game_object.js
* Created at  : 2020-07-19
* Updated at  : 2020-07-19
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
    constructor (position = new Vector2()) {
        super(IGameObject);
        this.position = position;
    }

    update () {}

    draw () { virtual_method(); }
}
