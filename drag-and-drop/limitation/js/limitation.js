'use strict';

const block = document.querySelector('.block');
const message = document.querySelector('.message');
const textarea = document.querySelector('.textarea');

textarea.addEventListener('focus', () =>{
	block.classList.add('active');
	message.classList.remove('view');
})

textarea.addEventListener('blur', () =>{
	block.classList.remove('active');
})

textarea.addEventListener('keydown', () => {
	message.classList.remove('view');
	block.classList.add('active');
})

textarea.addEventListener('keydown', debounce(() =>{
	message.classList.add('view');
	block.classList.remove('active');
	textarea.blur();
},2000));


function debounce(callback, delay) {
	let timeout;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			callback();
		}, delay);
	};
};


