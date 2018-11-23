'use strict';

const url = {};
url.profile = 'https://neto-api.herokuapp.com/profile/me' + '?callback=getProfile',
url.techno = 'https://neto-api.herokuapp.com/profile/:id/technologies' + '?callback=getTechno'
const insertTag = '<span class="devicons "></span>';
const boxForTech = document.querySelector('[data-technologies]');
boxForTech.insertAdjacentHTML('beforeEnd', insertTag);
const insertNode = boxForTech.removeChild(boxForTech.lastElementChild);

function getProfile(data) {
	document.querySelector('[data-name]').textContent = data.name;
	document.querySelector('[data-description]').textContent = data.description;
	document.querySelector('[data-pic]').src = data.pic;
	document.querySelector('[data-position]').textContent = data.position;
	const urlRequestTechno = url.techno.replace(':id', data.id);
	addScript(urlRequestTechno);
}

function getTechno(data) {	
	data.forEach( item => {
		const currentNode = insertNode.cloneNode(true);
		currentNode.classList.add('devicons-' + item);
		boxForTech.appendChild(currentNode);
	})
	document.querySelector('.content').style.display = 'initial';
}

function addScript(url) {
	const script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
}

addScript(url.profile);
