/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.js
* Created at  : 2020-07-22
* Updated at  : 2020-07-28
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals Engine, Grid, Axis, Circle*/
/* exported*/

// ignore:end

let closest_circle;
const radius           = 3;
const grid_size        = 50;
const pre_element      = document.querySelector("pre");
const wrapper_element  = document.getElementById("game");
const selected_circles = [];

const update_ui = () => {
    const vectors = selected_circles.map(c => c.position);
    pre_element.textContent = JSON.stringify(vectors, null, 4);
};

const engine = new Engine(wrapper_element, {
    use_double_buffer: true,
});

const get_closest_circle = event => {
    const x_length = Math.round(event.offsetX / grid_size);
    const y_length = Math.round(event.offsetY / grid_size);
    if (x_length && x_length <= 15 && y_length && y_length <= 11) {
        const index    = 2 + (y_length - 1) * 15 + x_length - 1;
        return engine.game_objects[index];
    }
    return null;
};

const grid = new Grid({
    x      : -engine.half_width,
    y      : engine.half_height,
    size   : grid_size,
    color  : "rgba(0,0,0, 0.2)",
    width  : engine.canvas.width,
    height : engine.canvas.height,
});

const axis = new Axis({
    width      : engine.half_width,
    height     : engine.half_height,
    line_width : 3,
    x_color    : "green",
    y_color    : "red",
});

engine.add_game_object(grid);
engine.add_game_object(axis);

for (let y = engine.half_height - grid_size; y > -engine.half_height; y -= grid_size) {
    for (let x = -engine.half_width + grid_size; x < engine.half_width; x += grid_size) {
        engine.add_game_object(new Circle({x,y}, radius));
    }
}

engine.canvas.addEventListener("mousemove", event => {
    if (closest_circle && ! closest_circle.is_selected) {
        closest_circle.radius        = radius;
        closest_circle.options.style = "stroke";
    }

    closest_circle = get_closest_circle(event);
    if (closest_circle) {
        const {x, y} = engine.to_world_coordinate(event.offsetX, event.offsetY);
        if (closest_circle.is_colided(x, y)) {
            closest_circle.radius = 5;
        }
    }
});

engine.canvas.addEventListener("click", event => {
    const closest_circle = get_closest_circle(event);
    if (closest_circle) {
        const {x, y} = engine.to_world_coordinate(event.offsetX, event.offsetY);
        if (closest_circle.is_colided(x, y)) {
            closest_circle.is_selected = ! closest_circle.is_selected;
            if (closest_circle.is_selected) {
                closest_circle.radius        = 5;
                closest_circle.options.style = "fill";
                selected_circles.push(closest_circle);
            } else {
                const index = selected_circles.indexOf(closest_circle);
                selected_circles.splice(index, 1);
            }

            update_ui();
        }
    }
});

engine.start();
