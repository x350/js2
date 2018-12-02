'use strict';
const url_pooling = 'https://neto-api.herokuapp.com/comet/pooling';
const pooling = document.querySelector('.pooling');
const poolingButton = pooling.querySelectorAll('div');

function httpPooling() {
  fetch(url_pooling)
  .then((res) => {
  	if(200 <= res.status && res.status < 300) {
  		return res;
  	}
  	throw new Error(res.statusText);
  })
  .then((res) => res.json())
  .then((data) => {
  	    deleteClass(poolingButton);
		poolingButton[data - 1].classList.add('flip-it');
  })
  .catch((err) => console.log(err));
}

setInterval(httpPooling, 5000);

