'use strict';

const counter = document.getElementById('counter');
let count = localStorage.count ? localStorage.count : 0;
counter.textContent = count;
const buttonsBoard = document.querySelector('.wrap-btns');
buttonsBoard.addEventListener('click', event => {	
	if (event.target.id === 'increment') {
		count++;
	} else if ( event.target.id === 'decrement') {
		count--;
		if (count < 0 ) { count = 0; }
	} else if (event.target.id === 'reset') {
		count = 0;
	} else { return; }
	localStorage.count = count;
	counter.textContent = count;
})