'use strict';

const canvas = document.getElementById('wall');
let ctx  = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const minObj = 50;
const maxObj = 200;
const totalCount = random(50, 200);
const totalCross = totalCount / 2 >> 0;
const totalCircle = totalCross;
const timeFunction = [];
timeFunction[0] = function nextPoint(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
};
timeFunction[1] = function nextPoint(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}


function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randDecimal(min, max) {	
	min *= 10;
	max *= 10;
	return Math.floor((Math.random() * (max - min + 1) + min)) / 10;
}

class Shape {
  constructor(x, y) {
  	this.x = x;
  	this.y = y;
  	this.size = randDecimal(0.1, 0.6);
  	this.color = 'white';
  	this.thickness = this.size * 5; 
  	this.nextPoint = timeFunction[random(0,1)];
  }
}

class Circle extends Shape {
	constructor(x, y) {
		super(x, y);
		this.radius = this.size * 12;
	}
	draw() {

	}
}

class Cross extends Shape {
	constructor(x, y) {
		super(x, y);
		this.side = this.size * 20;
		this.speed = randDecimal(-0.2, 0.2);
		this.angle = random(0, 360);
	}
	draw() {
		ctx.strokeStyle = 'white';
		const ang = inRad(this.angle);
		let [x1, y1] = pointRotate(ang, this.x, this.y);
		ctx.rotate(ang);
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x1 + this.side, y1);
		ctx.moveTo(x1, y1);
		ctx.lineTo(x1,y1 + this.side);
		ctx.moveTo(x1, y1);
		ctx.lineTo(x1 - this.side, y1);
		ctx.moveTo(x1, y1);
		ctx.lineTo(x1 ,y1 - this.side);
		ctx.closePath();
		ctx.stroke();
		ctx.rotate(-1 * ang);
	}
}

function createCircle() {
	return new Circle(random(0, width), random(0, height));
}

function createCross() {
	return new Cross(random(0, width), random(0, height));
}


function inRad(num) {
	return num * Math.PI / 180;
}

function pointRotate(rad, x, y) {
	const r = Math.sqrt(x**2 + y**2);
	const a = Math.atan(y/x);
	const x1 = r * Math.cos(a - rad);
	const y1 = r * Math.sin(a - rad);
	return [x1, y1];
}