'use strict';

const navigationButtons =  document.querySelector('.slider-nav').children;
const slides = document.querySelector('.slides');
slides.firstElementChild.classList.add('slide-current');
document.querySelector('a[data-action=prev]').classList.add('disabled');
document.querySelector('a[data-action=first]').classList.add('disabled');

Array.from(navigationButtons).forEach(item => { 
	switch (item.dataset.action) {
		case 'prev': 
			item.addEventListener('click', prevSlide);
			break;
		case 'next':
			item.addEventListener('click', nextSlide);
			break;		
		case 'first':
			item.addEventListener('click', firstSlide);
			break;	
		case 'last':
			item.addEventListener('click', lastSlide);
			break;					
	}
});

function prevSlide(event) {
	if (event.currentTarget.classList.contains('disabled')) { return; }
	let currentSlide = document.querySelector('.slide-current');
	let prevSlide = currentSlide.previousElementSibling;
	if (prevSlide) {
		currentSlide.classList.remove('slide-current');
		prevSlide.classList.add('slide-current');
		Array.from(navigationButtons).forEach(item => item.classList.remove('disabled'));
		if (!prevSlide.previousElementSibling) {
			event.currentTarget.classList.add('disabled');
			document.querySelector('a[data-action=first]').classList.add('disabled');			
		}
	}
}

function nextSlide() {
	if (event.currentTarget.classList.contains('disabled')) { return; }
	let currentSlide = document.querySelector('.slide-current');
	let nextSlide = currentSlide.nextElementSibling;
	if (nextSlide) {
		currentSlide.classList.remove('slide-current');
		nextSlide.classList.add('slide-current');
		Array.from(navigationButtons).forEach(item => item.classList.remove('disabled'));
		if (!nextSlide.nextElementSibling) {
			event.currentTarget.classList.add('disabled');
			document.querySelector('a[data-action=last]').classList.add('disabled');			
		}
	}
}

function firstSlide(event) {
	if (event.currentTarget.classList.contains('disabled')) { return; }
	Array.from(slides.children).forEach(item => item.classList.remove('slide-current'));
	slides.firstElementChild.classList.add('slide-current');
	Array.from(navigationButtons).forEach(item => item.classList.remove('disabled'));
	event.currentTarget.classList.add('disabled');
	document.querySelector('a[data-action=prev]').classList.add('disabled');
}

function lastSlide(event) {
	if (event.currentTarget.classList.contains('disabled')) { return; }
	Array.from(slides.children).forEach(item => item.classList.remove('slide-current'));
	slides.lastElementChild.classList.add('slide-current');
	Array.from(navigationButtons).forEach(item => item.classList.remove('disabled'));
	event.currentTarget.classList.add('disabled');
	document.querySelector('a[data-action=next]').classList.add('disabled');
}