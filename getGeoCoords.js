#!/usr/bin/env node
'use strict';

const simGeocode = require('./simgeocode.js'),
	path = require('path');
	
if (process.argv.length >= 3) {
	simGeocode(process.argv[2], 'en')
	.then(result => {
		console.log(result.address);
		console.log([result.coordinate[1],result.coordinate[0]]);
		console.log(result.coordinate);
	}).catch(err => {
		console.error(err.toString());
	});
} else {
	console.log('Usage: %s %s <name to geocode>', path.basename(process.argv[0]), path.basename(process.argv[1]));
}
