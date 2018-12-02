'use strict';
const url_websocket = 'wss://neto-api.herokuapp.com/comet/websocket';
const ws = document.querySelector('.websocket');
const wsButton = ws.querySelectorAll('div');

var connection = new WebSocket(url_websocket);
connection.addEventListener('open', () => console.log('Connection opened.'));
connection.addEventListener('message', viewRequest);



connection.addEventListener('error', error => console.log(error.data));
connection.addEventListener('close', event => console.log(event.code));
window.addEventListener('beforeunload', connection.close(1000));

function deleteClass(elements) {
	Array.from(elements).forEach(item => item.classList.remove('flip-it'));
}

function viewRequest(event) {
	console.log(event);
	if (event) {
		deleteClass(wsButton);
		wsButton[event + 1].classList.add('flip-it');
	}
}