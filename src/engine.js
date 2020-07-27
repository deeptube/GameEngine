/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : engine.js
* Created at  : 2020-07-22
* Updated at  : 2020-07-28
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals TransformationMatrix2DH, Vector2*/
/* exported Engine*/

// ignore:end

function create_canvas (width, height) {
    const canvas  = document.createElement("canvas");
    canvas.width  = width;
    canvas.height = height;
    return canvas;
}

class Engine {
    constructor (wrapper_element, options = {}) {
        this.game_objects    = [];
        this.wrapper_element = wrapper_element;

        const width  = wrapper_element.clientWidth;
        const height = wrapper_element.clientHeight;

        this.half_width  = width  / 2;
        this.half_height = height / 2;

        // Create canvas
        this.canvas  = create_canvas(width, height);
        this.context = this.canvas.getContext("2d");

        this.transform = new TransformationMatrix2DH();
        this.transform.translate(this.half_width + 0.5, this.half_height + 0.5);
        this.transform.scale(1, -1);

        // Event handlers
        this.canvas.setAttribute("tabindex", 0);
        wrapper_element.appendChild(this.canvas);

        // Setup options
        this.options = {};
        this.set_option("use_double_buffer", options.use_double_buffer);
    }

    set_option (option, value) {
        switch (option) {
            case "use_double_buffer":
                if (value) {
                    if (! this.back_context) {
                        const {width, height} = this.canvas;
                        this.back_canvas  = create_canvas(width, height);
                        this.back_context = this.back_canvas.getContext("2d");
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

            // Reset and transform matrix to cartesian coordinate system
            const context = this.back_context || this.context;
            const {a,b,c,d,e,f} = this.transform;
            context.setTransform(a,b,c,d,e,f);

            // clear context
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
        this.back_context.setTransform(1,0,0,1,0,0);
        this.context.clearRect(0, 0, this.canvas.width , this.canvas.height);
        this.context.drawImage(this.back_canvas, 0, 0);
    }

    add_game_object (game_object) {
        game_object.initialize(this);
        this.game_objects.push(game_object);
    }

    remove_game_object (game_object) {
        const index = this.game_objects.indexOf(game_object);
        if (index !== -1) {
            this.game_objects[index].destroy();
            this.game_objects.splice(index, 1);
        }
    }

    to_world_coordinate (x, y) {
        return new Vector2(x - this.half_width, this.half_height - y);
    }
}




