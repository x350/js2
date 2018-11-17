'use strict';

function dataFromForm(form) {
	const object = {};
	for (const[k, v] of form) {
		object[k] = v;
	}
	return object;
}

// Вариант 1. 

// const loginForm = document.querySelector('.login-form');
// loginForm.addEventListener('submit', sendSign);

// function sendSign(event) {
// 	event.preventDefault();
// 	const sign = event.target;
// 	let url = '';
// 	const outMessage = sign.querySelector('.error-message');
// 	const request = new XMLHttpRequest();
// 	if (sign.classList[0] === 'sign-in-htm') {
// 		url = 'https://neto-api.herokuapp.com/signin';
// 	} else if (sign.classList[0] === 'sign-up-htm') {
// 		url = 'https://neto-api.herokuapp.com/signup';
// 	}
// 	request.open('POST', url);
// 	request.setRequestHeader('Content-Type', 'application/json');
// 	request.send(JSON.stringify(dataFromForm(new FormData(sign))));
// 	request.addEventListener('load', () => {
// 		const response = JSON.parse(request.response);
// 		if (response.error) { 
// 			outMessage.textContent = response.message; 
// 		} else {
// 			if (sign.classList[0] === 'sign-in-htm') {
// 				outMessage.textContent = "«Пользователь Иван успешно авторизован»";
// 			}
// 			else if (sign.classList[0] === 'sign-up-htm') {
// 				outMessage.textContent = "«Пользователь Иван успешно зарегистрирован»";
// 			}
// 		}
// 	});
// }


// Вариант 2.

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', sendSign);

function sendSign(event) {
	event.preventDefault();
	const sign = event.target;
	const outMessage = sign.querySelector('.error-message');
	let url = '';
	if (sign.classList[0] === 'sign-in-htm') {
	  url = 'https://neto-api.herokuapp.com/signin';
	} else if (sign.classList[0] === 'sign-up-htm') {
	  url = 'https://neto-api.herokuapp.com/signup';
	}

	const data =  {
  	  body: JSON.stringify(dataFromForm(new FormData(sign))),
	  credentials: 'same-origin',
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' }
	};

	const request = fetch(url, data)
	  .then(response => response.json())
	  .then(data => {
	  	if (data.error) { 
			outMessage.textContent = data.message; 
		} else {
			if (sign.classList[0] === 'sign-in-htm') {
				outMessage.textContent = "«Пользователь Иван успешно авторизован»";
			}
			else if (sign.classList[0] === 'sign-up-htm') {
				outMessage.textContent = "«Пользователь Иван успешно зарегистрирован»";
			}
		}
	  })
	  .catch(error => console.log(error));
}

