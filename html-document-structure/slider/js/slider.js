'use strict';

const navigationButtons =  document.querySelector('.slider-nav').children;
const slides = document.querySelector('.slides');
const prev = document.querySelector('[data-action="prev"]');
const next = document.querySelector('[data-action="next"]');
const first = document.querySelector('[data-action="first"]');
const last = document.querySelector('[data-action="last"]');

slides.firstElementChild.classList.add('slide-current');
prev.classList.add('disabled');
first.classList.add('disabled');

Array.from(navigationButtons).forEach(item => 
			item.addEventListener('click', getSlide));
				
function getSlide(event) {
	if (event.currentTarget.classList.contains('disabled')) { return; }
	let currentSlide = document.querySelector('.slide-current');	
	Array.from(navigationButtons).forEach(item => item.classList.remove('disabled'));
	Array.from(slides.children).forEach(item => item.classList.remove('slide-current'));
	switch (event.currentTarget.dataset.action) {
			case 'prev': 
				let prevSlide = currentSlide.previousElementSibling;
				if (prevSlide) {
					prevSlide.classList.add('slide-current');					
					if (!prevSlide.previousElementSibling) {
						prev.classList.add('disabled');
						first.classList.add('disabled');			
					}
				}
				break;

			case 'next':
				let nextSlide = currentSlide.nextElementSibling;
				if (nextSlide) {
					nextSlide.classList.add('slide-current');
					if (!nextSlide.nextElementSibling) {
						next.classList.add('disabled');
						last.classList.add('disabled');			
					}
				}
				break;		

			case 'first':
				slides.firstElementChild.classList.add('slide-current');
				first.classList.add('disabled');
				prev.classList.add('disabled');
				break;

			case 'last':
				slides.lastElementChild.classList.add('slide-current');
				last.classList.add('disabled');
				next.classList.add('disabled');
				break;					
			}	
}