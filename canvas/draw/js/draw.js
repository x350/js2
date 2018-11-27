'use strict';

let canvas = document.getElementById('draw');
canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 4;
let ctx = canvas.getContext('2d');
let color = 'hsl(' + random(0, 359) + ', 100%, 50%)';
let pointX = 0;
let pointY = 0;
ctx.fillStyle = 'white';
ctx.lineWidth = 10;
let switchLine = true;
let checkLeave = false;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.fillRect(0, 0, canvas.width, canvas.height);

window.onresize = clearCanvas;

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseleave', event => {
	stopDrow(event);
	checkLeave = true;

});

canvas.addEventListener('dblclick', clearCanvas);

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', stopDrow);

function startDraw(event) {
	if (!isButtonPressed(1, event.buttons)) { return; }
	pointX = event.layerX;
	pointY = event.layerY;
	checkLeave = false;
}

function stopDrow(event) {
	ctx.closePath();
}

function draw(event) {
	if (!isButtonPressed(1, event.buttons)) { return; }
	if(checkLeave) { return; }
	color = changeColor(color, event.shiftKey);

	ctx.beginPath();
	ctx.moveTo(pointX, pointY);
	pointX = event.layerX;
	pointY = event.layerY;
	ctx.lineTo(event.layerX, event.layerY);
	ctx.strokeStyle = color;
	changeLineWidth();
	ctx.closePath();
	ctx.stroke();
}

function clearCanvas() {
	canvas.width = window.innerWidth - 2;
	canvas.height = window.innerHeight - 4;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
}

function changeColor(hslColor, shiftKey) {
	let color = Number(hslColor.split('(')[1].split(',')[0]);
	if (shiftKey) { 
		if (color <= 0) { 
			color = 0;
		} else { color--; }
	} else {
		if (color >= 359) {
			color = 359;
		} else { color++; }
	}
	return 'hsl(' + String(color) + ', 100%, 50%)';
}

function isButtonPressed(buttonCode, pressed) {
	return (pressed & buttonCode) === buttonCode;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeLineWidth() {
	if (switchLine) {
		if (ctx.lineWidth < 100) { 
			ctx.lineWidth++;
		} else {
			switchLine = false;
			ctx.lineWidth--;
		}
	} else {
		if(ctx.lineWidth > 5) {
			ctx.lineWidth--;
		} else {
			switchLine = true;
			ctx.lineWidth++;
		}
	}
}

