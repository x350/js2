'use strict';

const url = [];
url[0] = 'https://neto-api.herokuapp.com/food/42' + '?callback=getRecipe';
url[1] = 'https://neto-api.herokuapp.com/food/42/rating' + '?callback=getRating';
url[2] = 'https://neto-api.herokuapp.com/food/42/consumers' + '?callback=getUsers';
const userTag = `<img src="" title="Виктория">`;

function addScript(url) {
	const script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
}

function getRecipe(data) {
	document.querySelector('[data-pic]').style.backgroundImage = `url(${data.pic}`;
	document.querySelector('[data-title]').textContent = data.title;
	document.querySelector('[data-ingredients]').textContent = data.ingredients.join(', ');
	addScript(url[1]);
	addScript(url[2]);
}

function getRating(data) {
	const rating = Math.round(data.rating * 100) / 100;
	document.querySelector('[data-rating]').textContent = rating;
	document.querySelector('[data-votes]').textContent = data.votes;
}

function getUsers(data) {
	const users = data.consumers;
	const parentUsers = document.querySelector('.consumers');
	parentUsers.insertAdjacentHTML('beforeEnd', userTag);
	const insertNode = parentUsers.removeChild(parentUsers.lastElementChild);
	users.forEach(item => {
		const currentNode = insertNode.cloneNode(true);
		currentNode.src = item.pic;
		currentNode.title = item.name;
		parentUsers.appendChild(currentNode);
	});
	const totalUsers = document.createElement('span');
	totalUsers.textContent = ` (+${data.total})`;
	parentUsers.appendChild(totalUsers);
}

addScript(url[0]);