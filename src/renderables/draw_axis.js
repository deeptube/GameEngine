
function draw_axis (context, length, color) {
	context.beginPath();
	context.strokeStyle = color;

	// X axis
	context.moveTo(-length, 0);
	context.lineTo( length, 0);

	// Y axis
	context.moveTo(0, -length);
	context.lineTo(0,  length);

	context.stroke();
}
