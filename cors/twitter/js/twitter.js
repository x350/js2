'use strict';

const url = 'https://neto-api.herokuapp.com/twitter/jsonp' + '?' + 'callback=receiveData';
function receiveData(data) {
	document.querySelector('[data-wallpaper]').src = data.wallpaper;
	document.querySelector('[data-username]').textContent = data.username;
	document.querySelector('[data-description]').textContent = data.description;
	document.querySelector('[data-pic]').src = data.pic;
	document.querySelector('[data-tweets]').textContent = data.tweets;
	document.querySelector('[data-followers]').textContent = data.followers;
	document.querySelector('[data-following]').textContent = data.following;
}

// Вариант № 1
// function addScript(url) {
// 	const script = document.createElement("script");
// 	script.src = url;
// 	document.body.appendChild(script);
// }
// addScript(url);


// Вариант № 2
function loadData(url) {
	return new Promise((done, fail) => {
	    const script = document.createElement("script");
	    script.src = url;
	    document.body.appendChild(script);
	});
}  
loadData(url).then(receiveData).catch(err => console.log(err));
