#!/usr/bin/env node

// http://node-swig.github.io/swig-templates/docs/


Array.prototype.size = function(size, value) {
	return this.slice(0, size).concat(Array.apply(null, Array(Math.max(size - this.length, 0))).map(el => value));
}

const swig = require('swig');
const INPUT = require('./input');
const TASKS = 50;

const input = {
	html: INPUT.filter( el => String(el['type']).match(/html/i) ).map( el => ({ q: el['question'], a: el['answer'] }) ),
	css: INPUT.filter( el => String(el['type']).match(/css/i) ).map( el => ({ q: el['question'], a: el['answer'] }) ),
	js: INPUT.filter( el => String(el['type']).match(/js/i) ).map( el => ({ q: el['question'], a: el['answer'] }) )
};

//console.log(Object.keys(input));console.log(input[Object.keys(input)[2]]);return;

function randInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function rand(A, K) {
	return K.map( el => A[el][randInt(0, A[el].length)] );
}

const tasks = Object.assign.apply({}, [].size(TASKS)
	.map(function (value, index, ARRAY) {
		const id = index + 1;
		const T = rand(input, ['html', 'html', 'css', 'css', 'js']);
		return {
			[id]: {
				'id': id,
				'questions': T.map(el => el.q),
				'answers': T.map(el => el.a)
			}
		};
	}));
//console.log(tasks);return;

const tpl = new swig.Swig({
	cache: false,
	locals: {},
	loader: swig.loaders.fs('storage', {
		encoding: 'utf8'
	})
});

const html = tpl.renderFile('index.html', {tasks: tasks});
//console.log(html);return;

const fs = require('fs');
fs.writeFileSync('storage/test.html', html, {encoding: 'utf8'});
