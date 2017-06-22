#!/usr/bin/env node
'use strict';

const http = require('http'),
	request = require('request');

const DEFAULT_REQUEST_TIMEOUT = 30 * 1000;			// 30s

function simGeocode(name, lang = 'en', timeout = DEFAULT_REQUEST_TIMEOUT) {
	return new Promise((resolve, reject) => {
		let options = {
			url: 'https://www.google.com/search',
			qs: {
				tbm: 'map',
				fp: 1,
				authuser: 0,
				hl: lang,
				pb: '!4m12!1m3!1d10613.069360017376!2d116.3367512!3d40.02996545!2m3!1f0!2f0!3f0!3m2!1i823!2i667!4f13.1!7i20!10b1!12m6!2m3!5m1!2b0!20e3!10b1!16b1!19m3!2m2!1i392!2i106!20m44!2m2!1i203!2i100!3m1!2i4!6m6!1m2!1i86!2i86!1m2!1i408!2i256!7m30!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!1m3!1e4!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!2b1!4b1!9b0!22m6!1ssh4mV9WpIpLejwPmgIPwCg!4m1!2i11887!7e81!12e3!18e15!24m5!2b1!5m1!5b1!10m1!8e3!26m3!2m2!1i80!2i92!30m28!1m6!1m2!1i0!2i0!2m2!1i458!2i667!1m6!1m2!1i773!2i0!2m2!1i823!2i667!1m6!1m2!1i0!2i0!2m2!1i823!2i20!1m6!1m2!1i0!2i647!2m2!1i823!2i667!37m1!1e81!42b1!47m0!49m1!3b1',
				q: null,
				oq: null,
				gs_l: 'maps.12..115i144.4226.33110.1.35562.12.12.0.0.0.0.2012.4199.3-4j6-1j9-1.6.0....0...1ac.1.64.maps..6.6.4199.0..38i39i128.',
				tch: 1,
				ech: 1,
				psi: 'sh4mV9WpIpLejwPmgIPwCg.1462116011570.1'
			},
			'Accept-Language': 'en-US;q=0.8,ja;q=0.2',
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
			},
			timeout: timeout
		}
		options.qs.q = options.qs.oq = name;
		
		request(options, (error, response, body) => {
			if (error) return reject(error);
			if (response.statusCode === 200) {
				let itemRegEx = /\[null,null,([0-9\-\.]+?),([0-9\-\.]+?)\]\\n,[^,]+?,\\"([^\\"]+?)\\",[^,]+?,(.)/mg;
				let matches = null;
				if (matches = itemRegEx.exec(body)) {
					let addRegEx = /[^,]+?,[^,]+?,[^,]+?,[^,]+?,[^,]+?,\\"([^\\"]+?)\\"/mg;
					if (matches[4] === '[') addRegEx = /\[[^\]]+?\]\\n,[^,]+?,[^,]+?,[^,]+?,[^,]+?,\\"([^\\"]+?)\\"/mg;
					addRegEx.lastIndex = matches.index + matches[0].length - 1;
					let addMatches = addRegEx.exec(body);
					resolve({address: addMatches[1], coordinate: [parseFloat(matches[1]), parseFloat(matches[2])]});
				} else {
					 reject(new Error('parse ENOMATCH no match found'));
				}
			} else {
				reject(new Error(http.STATUS_CODES[response.statusCode]));
			}
		});
	});
}

module.exports = simGeocode;