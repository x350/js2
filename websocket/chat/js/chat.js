'use strict';

const chat = document.querySelector('.chat');
const sendForm = document.querySelector('.message-box');
const inputMessage = document.querySelector('.message-box');
const sendButton = document.querySelector('.message-submit');
const viewNewMessage = document.querySelector('.messages-content');
const templates = document.querySelectorAll('.message');
const status = document.querySelector('.chat-status');
const url = 'wss://neto-api.herokuapp.com/chat';

const connection = new WebSocket(url);
connection.addEventListener('open', openWebSocket);
function openWebSocket(event) {
	status.textContent = status.dataset.online;
	sendButton.disabled = false;
	const tempNode = templates[3].cloneNode(true);
	tempNode.firstElementChild.textContent = "Пользователь появился в сети.";
	viewNewMessage.appendChild(tempNode);
}

connection.addEventListener('message', receiveMessage);
function receiveMessage(event) {
	// был бы try, если JSON.
	messageProcessing(event.data); 
}

function messageProcessing(data) {
	if (data === '...') {
		const tempNode = templates[0].cloneNode(true);
		viewNewMessage.appendChild(tempNode);
	} else {
		const tempNode = viewNewMessage.lastElementChild;
		if (tempNode.classList.contains('loading')) {
			viewNewMessage.removeChild(tempNode);
		}
		const insertNode = templates[1].cloneNode(true);
		insertNode.querySelector('.message-text').textContent = data;
		insertNode.querySelector('.timestamp').textContent = getTime();
		checkCountMessage();
		viewNewMessage.appendChild(insertNode);
	}
}

function getTime() {
	const now = new Date();
	return checkTime(now.getHours()) +':' + checkTime(now.getMinutes());
}

sendButton.addEventListener('click', event => {
	event.preventDefault();
	sendMessage(event);
});

function sendMessage(event) {
	const message = document.querySelector('.message-input').value;
	connection.send(message);
	const insertNode = templates[2].cloneNode(true);
	insertNode.querySelector('.message-text').textContent = message;
	insertNode.querySelector('.timestamp').textContent = getTime();
	checkCountMessage();
	viewNewMessage.appendChild(insertNode);
}

function checkCountMessage() {
	if (viewNewMessage.children.length > 7) {
		viewNewMessage.removeChild(viewNewMessage.firstElementChild);
	}
}

document.addEventListener('keypress', event => {
	if (event.code !== 'Enter') { 
		return; 
	} else { sendMessage(); }
})

function checkTime(i)
{
if (i<10) 
{
i="0" + i;
}
return i;
}