/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : engine.js
* Created at  : 2020-07-22
* Updated at  : 2020-07-22
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported Engine*/

// ignore:end

function create_canvas (width, height) {
    const canvas  = document.createElement("canvas");
    canvas.width  = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    context.translate(width / 2, height / 2);
    context.scale(1, -1);

    return { canvas, context };
}

class Engine {
    constructor (wrapper_element, options = {}) {
        this.wrapper_element = wrapper_element;

        const width  = wrapper_element.clientWidth;
        const height = wrapper_element.clientHeight;

        this.half_width  = width  / 2;
        this.half_height = height / 2;

        // Create canvas
        const {canvas, context} = create_canvas(width, height);
        this.canvas  = canvas;
        this.context = context;

        wrapper_element.appendChild(this.canvas);

        // Setup options
        this.options = {};
        this.set_option("use_double_buffer", options.use_double_buffer);

        //

        this.game_objects = [];
    }

    set_option (option, value) {
        switch (option) {
            case "use_double_buffer":
                if (value) {
                    if (! this.back_context) {
                        const {width, height}   = this.canvas;
                        const {canvas, context} = create_canvas(width, height);
                        this.back_canvas  = canvas;
                        this.back_context = context;
                    }
                    this.options.use_double_buffer = true;
                } else {
                    if (this.back_context) {
                        this.back_canvas  = null;
                        this.back_context = null;
                    }
                    this.options.use_double_buffer = false;
                }
                break;
        }
    }

    start () {
        let last_timestamp, delta_time;

        const loop = current_timestamp => {
            // Calculate delta time
            if (last_timestamp) {
                delta_time = (current_timestamp - last_timestamp) / 1000;
            } else {
                delta_time = 0;
            }
            last_timestamp = current_timestamp;

            // clear context
            const context = this.back_context || this.context;
            context.clearRect(
                -this.half_width   ,  this.half_height,
                 this.canvas.width , -this.canvas.height
            );

            // update
            for (const game_object of this.game_objects) {
                game_object.update(delta_time);
            }

            // draw
            for (const game_object of this.game_objects) {
                game_object.draw(context);
            }
            //this.back_context.fillRect(-400, 300, 800, -600);

            // swap buffer
            if (this.back_canvas) { this.swap_buffer(); }

            // register next RAF
            this.raf_id = requestAnimationFrame(loop);
        };

        this.raf_id = requestAnimationFrame(loop);
    }

    stop () {
        cancelAnimationFrame(this.raf_id);
    }

    swap_buffer () {
        this.context.save();
        this.context.scale(1, -1);
        this.context.translate(-this.half_width, -this.half_height);
        this.context.clearRect(0, 0, this.canvas.width , this.canvas.height);

        this.back_context.save();
        this.back_context.scale(1, -1);
        this.back_context.translate(-this.half_width, -this.half_height);

        /*
        this.context.clearRect(
            -this.half_width   ,  this.half_height,
             this.canvas.width , -this.canvas.height
        );
        */
        this.context.drawImage(
             this.back_canvas,
             0, 0
        );

        this.context.restore();
        this.back_context.restore();
    }
}




