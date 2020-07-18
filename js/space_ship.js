
var SpaceShip = {
	color       : "black",
	line_width  : 1,
	orientation : 0,

	create : function (position, scaler) {
		var new_space_ship = Object.create(SpaceShip);

		new_space_ship.position = position.clone();
		new_space_ship.velocity = new Vector2(0, 0);

		new_space_ship.vertices = [
			new Vector2( 0,  3),
			new Vector2( 2, -2),
			new Vector2( 1, -1),
			new Vector2(-1, -1),
			new Vector2(-2, -2),
		];

		for (var i = 0; i < new_space_ship.vertices.length; i += 1) {
			new_space_ship.vertices[i].scale(scaler);
		}

		return new_space_ship;
	},

	update : function (delta_time) {
		var delta_position = Vector2.scale(this.velocity, delta_time);
		this.position.add(delta_position);
	},

	draw : function (context) {
		const tranformer = new TransformationMatrix2DH();
		tranformer.rotate(this.orientation);

		context.beginPath();
		const point = tranformer.apply_to_point(this.vertices[0].x, this.vertices[0].y);
		point.add(this.position);
		context.moveTo(point.x, point.y);
		for (let i = 1; i < this.vertices.length; i += 1) {
			const point = tranformer.apply_to_point(this.vertices[i].x, this.vertices[i].y);
			point.add(this.position);
			context.lineTo(point.x, point.y);
		}
		context.closePath();
		
		context.lineWidth   = this.line_width;
		context.strokeStyle = this.color;
		context.stroke();
	}
};
