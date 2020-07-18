
function draw_grid (context, grid_size, half_width, half_height, color) {
	context.beginPath();
	context.strokeStyle = color;

	for (var x = -half_width; x < half_width; x += grid_size) {
		context.moveTo(x, -half_height);
		context.lineTo(x,  half_height);
	}

	for (var y = -half_height; y < half_height; y += grid_size) {
		context.moveTo(-half_width, y);
		context.lineTo( half_width, y);
	}

	context.stroke();
}
