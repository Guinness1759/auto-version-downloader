if (!(Array.prototype.flat instanceof Function)) {
	Array.prototype.flat = function (depth) {
		if (depth < 1) {
			return this;
		}
		return [].concat(...this.map(x => x.flat(depth - 1)));
	}
}

if (!(Object.fromEntries instanceof Function)) {
	Object.fromEntries = function (entries) {
		return entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
	}
}

if (!(Array.prototype.first instanceof Function)) {
	Array.prototype.first = function() {
		return this[0];
	}
}
