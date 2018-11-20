'use strict';

const url = 'wss://neto-api.herokuapp.com/mouse';
const connection = new WebSocket(url);
showBubbles(connection);
document.addEventListener('click', sendMessage);
function sendMessage(event) {
	const clickObject = {};
	clickObject.x = event.pageX;
	clickObject.y = event.pageY;
	connection.send(JSON.stringify(clickObject));
}
window.addEventListener('beforeunload', () => {
	connection.close();
});