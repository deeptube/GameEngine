
const KEY_SPACE = 32;
const KEY_LEFT  = 37;
const KEY_UP    = 38;
const KEY_RIGHT = 39;
const KEY_DOWN  = 40;

class KeyboardBinder {

	constructor (target) {
		this.target    = target;
		this.down_keys = Object.create(null);

		target.addEventListener("keydown", (event) => {
			this.down_keys[event.keyCode] = true;
		});

		target.addEventListener("keyup", (event) => {
			this.down_keys[event.keyCode] = false;
		});
	}

	bind (key_code, action) {

	}

	is_key_down (key_code) {
		return this.down_keys[key_code] === true;
	}
}
