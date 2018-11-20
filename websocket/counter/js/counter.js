'use strict';

const counter = document.querySelector('.counter');
const  countErrors = document.querySelector('.errors');
const url = 'wss://neto-api.herokuapp.com/counter';
const connection = new WebSocket(url);

window.addEventListener('beforeunload', () => {
	connection.close(1000);
});

connection.addEventListener('message', obtainMessage);
function obtainMessage(event) {
    const data = JSON.parse(event.data);
    console.log(data);
    counter.textContent = data.connections;
    countErrors.textContent = data.errors;
}
