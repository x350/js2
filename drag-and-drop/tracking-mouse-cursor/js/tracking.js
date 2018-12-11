'use strict';

const cat = document.querySelector('.cat');
const left_eye = document.querySelector('.cat_position_for_left_eye');
const right_eye = document.querySelector('.cat_position_for_right_eye');
const left_pupil = document.querySelector('.cat_eye_left');
const right_pupil = document.querySelector('.cat_eye_right');

document.addEventListener('mousemove', setBounds);

function setBounds(event) {
	event.preventDefault();
	const leftBounds = left_eye.getBoundingClientRect();
	const rightBounds = right_eye.getBoundingClientRect();

    let x = event.pageX - leftBounds.left;
    let y = event.pageY - leftBounds.top;
    let xx = event.pageX - rightBounds.left;
    let yy = event.pageY - rightBounds.top;

    const minX = left_eye.offsetLeft + left_pupil.offsetWidth / 2 - 70;
	const minY = left_eye.offsetTop + left_pupil.offsetHeight / 2 - 114;
	const maxX = left_eye.offsetLeft + left_eye.offsetWidth - left_pupil.offsetWidth / 2 - 70;
	const maxY = left_eye.offsetTop + left_eye.offsetHeight - left_pupil.offsetHeight / 2 - 114;
	x = Math.min(x, maxX);
	y = Math.min(y, maxY);
	x = Math.max(x, minX);
	y = Math.max(y, minY);

    const minXX = right_eye.offsetLeft + right_pupil.offsetWidth / 2 - 164;
	const minYY = right_eye.offsetTop + right_pupil.offsetHeight / 2 - 114;
	const maxXX = right_eye.offsetLeft + right_eye.offsetWidth - right_pupil.offsetWidth / 2 - 164;
	const maxYY = right_eye.offsetTop + right_eye.offsetHeight - right_pupil.offsetHeight / 2 - 114;
	xx = Math.min(xx, maxXX);
	yy = Math.min(yy, maxYY);
	xx = Math.max(xx, minXX);
	yy = Math.max(yy, minYY);

	left_pupil.style.left = `${x}px`;
	left_pupil.style.top = `${y}px`;

	right_pupil.style.left = `${xx}px`;
	right_pupil.style.top = `${yy}px`;
}

