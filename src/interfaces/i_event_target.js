/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : i_event_target.js
* Created at  : 2020-07-19
* Updated at  : 2020-07-19
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals Interface*/
/* exported*/

// ignore:end

class IEventTarget extends Interface {
    constructor (Constructor = IEventTarget) {
        super(Constructor);
        this._events = Object.create(null);
    }

    addEventListener (type, listener) {
        if (! this._events[type]) {
            this._events[type] = [];
        }
        this._events[type].push(listener);
        return listener;
    }

    removeEventListener (type, listener) {
        if (this._events[type]) {
            this._events[type] = this._events.filter(fn => fn !== listener);
        }
    }

    dispatchEvent (type, event) {
        if (this._events[type]) {
            this._events[type].forEach(fn => fn(event));
        }
    }
}

IEventTarget.prototype.on   = IEventTarget.prototype.addEventListener;
IEventTarget.prototype.off  = IEventTarget.prototype.removeEventListener;
IEventTarget.prototype.emit = IEventTarget.prototype.dispatchEvent;

