#!/usr/bin/env node
'use strict';

const request = require('request');

function simGeocode(address, lang) {
	let hl = lang || 'en';
	return new Promise((resolve, reject) => {
		let options = {
			url: 'http://maps.googleapis.com/maps/api/geocode/json',
			'Accept-Language': 'en-US;q=1',
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
			}
		}

		if (typeof address === 'string') {
			options.qs = {
				address: address,
				language: lang
			};
		} else Object.assign(options, address);
		
		request(options, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				let obj = JSON.parse(body);
				// for backward compatiblity consideration, not recommended
				obj.address = obj.results[0].formatted_address;
				obj.coordinate = [obj.results[0].geometry.location.lat, obj.results[0].geometry.location.lng];
				resolve(obj);
			} else 
				reject(`Error occured when requesting google map service: ${error || require('http').STATUS_CODES[response.statusCode]}`);
		});
	});
}

module.exports = simGeocode;
