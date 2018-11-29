'use strict';
const url = 'https://neto-api.herokuapp.com/plane/';

const acSelect = document.getElementById('acSelect');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');
const btnSetFull = document.getElementById('btnSetFull');
btnSetFull.disabled = true;
const btnSetEmpty = document.getElementById('btnSetEmpty');
btnSetEmpty.disabled = true;
btnSetFull.addEventListener('click', setFullSeat);
btnSetEmpty.addEventListener('click', setEmptySeat);


const seatMap = document.getElementById('btnSeatMap');
seatMap.addEventListener('click', fillSeatMap);
function fillSeatMap(event) {
  event.preventDefault();
  makeRequest(url + acSelect.value, parseSeatMap);
} 

function parseSeatMap(data) {
  console.log(data);
  const title = document.getElementById('seatMapTitle');
  title.textContent = data.title + ` (${data.passengers} пассажиров)`;
  const mapSeat = document.getElementById('seatMapDiv');
  Array.from(mapSeat.children).forEach(item => item.remove());
  for(let item = 0; item <= data.scheme.length; item++) {
  	if (data.scheme[item ] === 6) {
  		mapSeat.appendChild(browserJSEnj(getTemplateSix(item)));
  	} else if (data.scheme[item] === 4) {
  		mapSeat.appendChild(browserJSEnj(getTemplateFour(item)));
  	} else if (data.scheme[item] === 0) {
  		mapSeat.appendChild(browserJSEnj(getTemplateNoSead(item)));
  	}
  }
  addEventForSeat();
  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;
}

function getTemplateSix(rowNumber) {
  return {
	tag: 'div',
	cls: ['row', 'seating-row', 'text-center'],
	content: [
		{
			tag: 'div',
			cls: ['col-xs-1', 'row-number'],
			content: {
				tag: 'h2',
				cls: '',
				content: rowNumber + 1
				}	
		},
		{
			tag: 'div',
			cls: ['col-xs-5'],
			content: [
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
						tag: 'span',
						cls: ['seat-label'],
						content: 'A'
					}					
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
						tag: 'span',
						cls: ['seat-label'],
						content: 'B'
					}					
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
					tag: 'span',
					cls: ['seat-label'],
					content: 'C'
					}					
				}
			]
		},
		{
			tag: 'div',
			cls: ['col-xs-5'],
			content: [
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
						tag: 'span',
						cls: ['seat-label'],
						content: 'D'
					}					
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
						tag: 'span',
						cls: ['seat-label'],
						content: 'E'
					}					
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
						tag: 'span',
						cls: ['seat-label'],
						content: 'f'
					}								
				}
			]						
		}
		]
	}
}

function getTemplateFour(rowNumber) {
  return {
	tag: 'div',
	cls: ['row', 'seating-row', 'text-center'],
	content: [
		{
			tag: 'div',
			cls: ['col-xs-1', 'row-number'],
			content: {
				tag: 'h2',
				cls: '',
				content: rowNumber + 1
				}	
		},
		{
			tag: 'div',
			cls: ['col-xs-5'],
			content: [
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
						tag: 'span',
						cls: ['seat-label'],
						content: 'A'
					}					
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
						tag: 'span',
						cls: ['seat-label'],
						content: 'B'
					}					
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'no-seat']					
				}
			]
		},
		{
			tag: 'div',
			cls: ['col-xs-5'],
			content: [
				{
					tag: 'div',
					cls: ['col-xs-4', 'no-seat']					
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
						tag: 'span',
						cls: ['seat-label'],
						content: 'C'
					}					
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'seat'],
					content: {
						tag: 'span',
						cls: ['seat-label'],
						content: 'D'
					}					
				}
			]						
		}
		]
	}
}

function getTemplateNoSead(rowNumber) {
  return {
	tag: 'div',
	cls: ['row', 'seating-row', 'text-center'],
	content: [
		{
			tag: 'div',
			cls: ['col-xs-1', 'row-number'],
			content: {
				tag: 'h2',
				cls: '',
				content: rowNumber + 1
				}	
		},
		{
			tag: 'div',
			cls: ['col-xs-5'],
			content: [
				{
					tag: 'div',
					cls: ['col-xs-4', 'no-seat']					
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'no-seat']			
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'no-seat']					
				}
			]
		},
		{
			tag: 'div',
			cls: ['col-xs-5'],
			content: [
				{
					tag: 'div',
					cls: ['col-xs-4', 'no-seat']				
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'no-seat']									
				},
				{
					tag: 'div',
					cls: ['col-xs-4', 'no-seat']								
				}
			]						
		}
		]
	}
}

function browserJSEnj(block) {
	if (block === undefined || block === null || block === false) {
		return document.createTextNode('');
	}
	if (typeof block === 'string' || typeof block === 'number' || block === true) {
		return document.createTextNode(block);
	}
	if (Array.isArray(block)) {
		return block.reduce((f, elem) => {
			f.appendChild(browserJSEnj(elem));
			return f;
		}, document.createDocumentFragment())
	}
	const element = document.createElement(block.tag || 'div');
	element.classList.add(...[].concat(block.cls).filter(Boolean));
	if (block.attrs) {
		Object.keys(block.attrs).forEach(key => {
			element.setAttribute(key, block.attrs[key]);
		});
	}
	if (block.content) {
		element.appendChild(browserJSEnj(block.content));
	}
	return element;
}

function makeRequest(url, parseData) {
  fetch(url)
  .then((res) => {
  	if(200 <= res.status && res.status < 300) {
  		return res;
  	}
  	throw new Error(res.statusText);
  })
  .then((res) => res.json())
  .then((data) => parseData(data))
  .catch((err) => console.log(err));
}

function addEventForSeat() {
	const seats = document.getElementsByClassName('seat');
	Array.from(seats).forEach(item => item.addEventListener('click', changeStatusSeat));
}

function changeStatusSeat(event) {
	if (event.currentTarget.classList.contains('adult')) {
		event.currentTarget.classList.remove('adult');
		return;
	}
	if (event.currentTarget.classList.contains('half')) {
		event.currentTarget.classList.remove('half');
		return;		
	}
	if (event.altKey) {
		event.currentTarget.classList.add('half');
	} else {
		event.currentTarget.classList.add('adult');
	}
	let adult = document.getElementsByClassName('adult').length;
	let half = document.getElementsByClassName('half').length;
	totalPax.textContent = adult + half;
	totalAdult.textContent = adult;
	totalHalf.textContent = half;
}

function setFullSeat(event) {
	event.preventDefault();
	const seats = document.getElementsByClassName('seat');
	Array.from(seats).forEach(item => {
		if ( !item.classList.contains('adult') || 
			!item.classList.contains('half')) {
			item.classList.add('adult')
		}
	});
}
function setEmptySeat(event) {
	event.preventDefault();
	Array.from(document.getElementsByClassName('adult'))
		.forEach(item => item.classList.remove('adult'));
	Array.from(document.getElementsByClassName('half'))
		.forEach(item => item.classList.remove('half'));
}



