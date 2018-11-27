'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const minStar = 200;
const maxStar = 400;
const countStar = random(minStar, maxStar);
const width = canvas.width;
const height = canvas.height;

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function sizeStar() {
	let min = 0, max = 1.1;
	min *= 10;
	max *= 10;
	return Math.floor((Math.random() * (max - min + 1) + min)) / 10;
}

function brightStar() {
	const bright = ['#ffffff', '#ffe9c4', '#d4fbff'];
	return bright[random(0, 2)];
}

function createRandomStar() {
	const size = sizeStar();
	ctx.fillRect(random(0, width), random(0, height), size, size);
	ctx.fillStyle = brightStar();
	ctx.fill();
}

for (let x = 0; x < countStar; x++) {
	createRandomStar();	
}

