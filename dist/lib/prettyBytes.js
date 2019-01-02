'use strict';

window.prettyBytes = function(num) {
    var UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	if (!Number.isFinite(num)) {
		throw new TypeError("Expected a finite number, got " + typeof num + ": " + num);
	}

	var neg = num < 0;

	if (neg) {
		num = -num;
	}

	if (num < 1) {
		return (neg ? '-' : '') + num + ' B';
	}

	var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), UNITS.length - 1);
	var numStr = Number((num / Math.pow(1000, exponent)).toFixed(2));
	var unit = UNITS[exponent];

	return (neg ? '-' : '') + numStr + ' ' + unit;
}
