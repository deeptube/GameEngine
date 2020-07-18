
var Matrix_2x2 = {

	create : function (a, b, c, d) {
		var new_matrix = Object.create(Matrix_2x2);

		new_matrix.a = a; new_matrix.b = b;
		new_matrix.c = c; new_matrix.d = d;

		return new_matrix;
	},

	create_identity : function () {
		return Matrix_2x2.create(
			1, 0,
			0, 1
		);
	},

	create_rotation_matrix : function (angle_in_radian) {
		var cos_result = Math.cos(angle_in_radian);
		var sin_result = Math.sin(angle_in_radian);

		return Matrix_2x2.create(
			cos_result, -sin_result,
			sin_result,  cos_result
		);
	},

	create_rotation_matrix_using_degree : function (angle_in_degree) {
		var angle_in_radian = to_radian(angle_in_degree);
		return Matrix_2x2.create_rotation_matrix(angle_in_radion);
	},

	scale : function (scaler_x, scaler_y) {
		this.a *= scaler_x;
		this.d *= scaler_y;
		return this;
	},

	scale_new : function (scaler_x, scaler_y) {
		return Matrix_2x2.create(
			this.a * scaler_x, this.b,
			this.c           , this.d * scaler_y
		);
	},

	scale_x : function (scaler_x) {
		this.a *= scaler_x;
		return this;
	},

	scale_x_new : function (scaler_x) {
		return Matrix_2x2.create(this.a * scaler_x, this.b, this.c, this.d);
	},

	scale_y : function (scaler_y) {
		this.d *= scaler_y;
		return this;
	},

	scale_y_new : function (scaler_y) {
		return Matrix_2x2.create(this.a, this.b, this.c, this.d * scaler_y);
	},

	//
	multiply_by_vector : function (vector) {
		return Vector2.create(
			(this.a * vector.x) + (this.b * vector.y),
			(this.c * vector.x) + (this.d * vector.y)
		);
	},

};
