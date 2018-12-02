'use strict';
const url = 'wss://neto-api.herokuapp.com/draw';
var connection = new WebSocket(url);
connection.addEventListener('open', () => console.log('Connection opened.'));
connection.addEventListener('message', event => console.log(event.data));

window.editor.addEventListener('update', event => {
	event.canvas.toBlob(blob => connection.send(blob));
	// var bb = new Blob([event.canvas], { type: 'image/jpeg' });
	// connection.send(bb);
});


connection.addEventListener('error', error => console.log(error.data));
connection.addEventListener('close', event => console.log(event.code));
window.addEventListener('beforeunload', connection.close(1000));