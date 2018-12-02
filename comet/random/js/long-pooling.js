'use strict';
const url_longPool = 'https://neto-api.herokuapp.com/comet/long-pooling';
const longPool = document.querySelector('.long-pooling');
const longPoolButton = longPool.querySelectorAll('div');

function httpLongPooling(url_longPool) {
	const request = new XMLHttpRequest();
	request.open('GET', url_longPool);
	request.send();
	request.addEventListener('load', () => {
		const response = JSON.parse(request.response);
		if (response.error) { 
			console.log(response.message); 
		} else {
			deleteClass(longPoolButton);
			longPoolButton[response - 1].classList.add('flip-it');
		}
		httpLongPooling(url_longPool);
	});
}

httpLongPooling(url_longPool);
