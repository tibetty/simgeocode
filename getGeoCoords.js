﻿#!/usr/bin/env node
'use strict';

const simGeocode = require('./simgeocode.js'),
	path = require('path');
	
if (process.argv.length >= 3) {
	simGeocode({
		url: `http://maps.googleapis.com/maps/api/geocode/json?address=${process.argv[2]}&language=en`
	}, 'zh-CN')
	.then(result => {
		console.log(result.address);
		console.log(result.coordinates);
	}).catch(err => {
		console.error(err.toString());
	});
} else {
	console.log('Usage: %s %s <name to geocode>', path.basename(process.argv[0]), path.basename(process.argv[1]));
}
