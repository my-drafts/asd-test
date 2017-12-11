#!/usr/bin/env node

// http://node-swig.github.io/swig-templates/docs/

const swig = require('swig');
const INPUT = require('./input');
const TASKS = 75;

const input = [
	[
		[].concat(INPUT[0], INPUT[1]),
		[].concat(INPUT[2]),
		[].concat(INPUT[5])
	],
	[
		[].concat(INPUT[0], INPUT[1]),
		[].concat(INPUT[3]),
		[].concat(INPUT[4])
	]
];
//console.log(input);

function rand (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const test = Object.assign.apply({}, Array.apply(null, Array(TASKS))
	.map(function (value, index, ARRAY) {
		const id = index + 1;
		const idx = rand(0, input.length);
		const idx0 = rand(0, input[idx][0].length);
		const idx1 = rand(0, input[idx][1].length);
		const idx2 = rand(0, input[idx][2].length);
		return {
			[id]: {
				'id': id,
				't1x': idx0,
				't2x': idx1,
				't3x': idx2,
				't1': input[idx][0][idx0],
				't2': input[idx][1][idx1],
				't3': input[idx][2][idx2],
			}
		}
	}));
//console.log(test);

const tpl = new swig.Swig({
	cache: false,
	locals: {},
	loader: swig.loaders.fs('storage', {
		encoding: 'utf8'
	})
});

const html = tpl.renderFile('index.html', {rows: test});
console.log(html);

const fs = require('fs');
fs.writeFileSync('storage/test.html', html, {encoding: 'utf8'});
