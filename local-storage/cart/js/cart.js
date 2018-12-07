'use strict';
var rws = null;


const buttonCart = document.getElementById('AddToCart');
const cart = document.getElementById('quick-cart');
const size = document.getElementById('sizeSwatch');
const color = document.getElementById('colorSwatch');

const urlList = ['https://neto-api.herokuapp.com/cart/colors', 
				'https://neto-api.herokuapp.com/cart/sizes',
				'https://neto-api.herokuapp.com/cart',
				'https://neto-api.herokuapp.com/cart/remove'];

const snippetColor = `<div data-value="red" class="swatch-element color">
  <div class="tooltip">Красный</div>
  <input quickbeam="color" id="swatch-1" type="radio" name="color" value="red">
  <label for="swatch-1-" style="border-color: red;">
    <span style="background-color: red;"></span>
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`;
color.insertAdjacentHTML('beforeEnd', snippetColor);
const colorNode = color.removeChild(color.lastElementChild);

const snippetSize = `<div data-value="s" class="swatch-element plain">
  <input id="swatch-0" type="radio" name="size" value="s" disabled>
  <label for="swatch-0-">
    S
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`;
size.insertAdjacentHTML('beforeEnd', snippetSize);
const sizeNode = size.removeChild(size.lastElementChild);

const snippetProduct = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-" style="opacity: 1;">
  <div class="quick-cart-product-wrap">
    <img src="https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png" title="Tony Hunfinger T-Shirt New York">
    <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
    <span class="s2"></span>
  </div>
  <span class="count hide fadeUp" id="quick-cart-product-count-">1</span>
  <span class="quick-cart-product-remove remove" data-id="2721888517"></span>
</div>`;
cart.insertAdjacentHTML('beforeEnd', snippetProduct);
const productNode = cart.removeChild(cart.lastElementChild);

const snippetCart = `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
  <span>
    <strong class="quick-cart-text">Оформить заказ<br></strong>
    <span id="quick-cart-price">$800.00</span>
  </span>
</a>`;
cart.insertAdjacentHTML('beforeEnd', snippetCart);
const cartNode = cart.querySelector('#quick-cart-pay');
cartNode.classList.remove('open'); 
cartNode.querySelector('#quick-cart-price').textContent = '$0.00'; 

// ----------------------------------- 

function sendRequest(url,  fun, data = {}) {
	fetch(url, data)
	.then((res) => {
		if (200 <= res.status && res.status < 300) { 
			return res.json(); 
		}
		throw new Error(res.statusText);
	})
	.then((res) => {
		if (res.length) {
			res.forEach(fun);
		} else {
			if (fun === deleteFromCard) { fun({quantity: 0}) }
		}
	})
	.catch((error) => console.log(error));
} 

function insertNode(targetNode, node) {
	targetNode.appendChild(node);
}

function fillColor(item) {
	const currentNode = colorNode.cloneNode(true);
	currentNode.dataset.value = item.type;
	currentNode.classList.add(item.type);
	let tagInput = currentNode.getElementsByTagName('input')[0];
	tagInput.id += ('-' + item.type);
	tagInput.value= item.type;
	if (item.isAvailable) { 
		currentNode.classList.add('available'); 
		tagInput.disabled = false;
	} else {
		currentNode.classList.add('soldout');
		tagInput.disabled = true;
	}	
	currentNode.querySelector('label').htmlFor += item.type;
	currentNode.getElementsByClassName('tooltip')[0].textContent = item.title;
	currentNode.getElementsByTagName('span')[0].style.backgroundColor = item.type;
	insertNode(color, currentNode);
}

function fillSize(item) {
	const currentNode = sizeNode.cloneNode(true);
	currentNode.dataset.value = item.type;
	currentNode.classList.add(item.type);
	let tagInput = currentNode.getElementsByTagName('input')[0];
	tagInput.id += ('-' + item.type);
	tagInput.value= item.type;
	if (item.isAvailable) { 
		currentNode.classList.add('available'); 
		tagInput.disabled = false;
	} else {
		currentNode.classList.add('soldout');
		tagInput.disabled = true;
	}	
	currentNode.querySelector('label').textContent = item.title;
	currentNode.querySelector('label').htmlFor += item.type;
	insertNode(size, currentNode);
}

sendRequest(urlList[0], fillColor);
sendRequest(urlList[1], fillSize);
sendRequest(urlList[2], fillProduct);
window.addEventListener('load', loadChoice);

function loadChoice() {
	const storage = getForm();
	if (!storage) { return; }
	color.querySelector(`#swatch-1-${storage.color}`).checked = true;
	size.querySelector(`#swatch-0-${storage.size}`).checked = true;
}

buttonCart.addEventListener('click', addToCart);
function addToCart(event) {
	event.preventDefault();
	const order = document.getElementById('AddToCartForm');
	const form = new FormData(order);
	form.append('productId', order.dataset.productId);
	const data  = {
		body: form,
		credentials: 'same-origin',
		method: 'POST',	
	};
	sendRequest(urlList[2], fillProduct, data);
}

function fillProduct(item) {
	if (!item.quantity) { return; }
	const currentNode = productNode.cloneNode(true);
	currentNode.id += item.id;
	currentNode.querySelector('.count').id += item.id;
	currentNode.querySelector('.count').textContent = item.quantity;
	currentNode.querySelector('.remove').dataset.if = item.id;
	currentNode.querySelector('img').src = item.pic;
	currentNode.querySelector('img').title = item.title;
	currentNode.querySelector('.remove').addEventListener('click', removeProduct);
	if (cart.firstElementChild.classList.contains('quick-cart-product-static')) {
		cart.removeChild(cart.firstElementChild);
	}
	cart.insertBefore(currentNode, cartNode);

	let price = Number(cartNode.querySelector('#quick-cart-price').textContent.slice(1));
	price = item.price * item.quantity;
	if (price !== 0) { 
		cartNode.classList.add('open') ;
	}	
	cartNode.querySelector('#quick-cart-price').textContent = '$' + price;

}

function removeProduct(event) {	
	const form = new FormData();
	form.append('productId', event.target.dataset.id);
	const data  = {
		body: form,
		credentials: 'same-origin',
		method: 'POST',	
	};
	sendRequest(urlList[3], deleteFromCard, data);
}

function deleteFromCard(item) {
	const product = cart.querySelector('.quick-cart-product-static');
	const count = item.quantity || 0;
	if (count === 0) {
		product.parentNode.removeChild(product);
	} else {
		product.querySelector('#quick-cart-product-count-' + item.productId)
			.textContent = item.quantity;
	}
	let price = Number(cartNode.querySelector('#quick-cart-price').textContent.slice(1));
	price -= item.price;
	if (count <= 0) { 
		cartNode.classList.remove('open') ;
	}	
	cartNode.querySelector('#quick-cart-price').textContent = '$' + price;	
}

function saveForm(storage) {
	localStorage.storage = JSON.stringify(storage);
}

function getForm() {
	try {
		return JSON.parse(localStorage.storage);
	} catch (er) { return null; }
} 

window.addEventListener('beforeunload', saveSizeColor);
function saveSizeColor(event) {
	const order = document.getElementById('AddToCartForm');
	const form = new FormData(order);
	const storage = {};
	for (let [key, value] of form) {
		storage[key] = value;
	}
	saveForm(storage);
}