'use strict';

const shop = document.querySelector('.items-list');
shop.addEventListener('click', shopping);
function shopping(event) {
	if (!event.target.classList.contains('add-to-cart')) { return; }
	addToCart(event.target.dataset);
}