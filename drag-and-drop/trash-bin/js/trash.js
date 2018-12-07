'use strict'

const trash = document.getElementById('trash_bin');
let movedDocument = null;
let startMove = {};


document.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(event) {
	event.preventDefault();
	if (event.target.classList.contains('logo')) {
		movedDocument = event.target;
		startMove = {x: movedDocument.style.left, y: movedDocument.style.top};
		movedDocument.classList.add('moving');
		movedDocument.style.cursor = 'default';
	}
}

function drag(event) {
	if (movedDocument) {    
		movedDocument.style.left = event.pageX - movedDocument.offsetWidth / 2 + 'px';
		movedDocument.style.top = event.pageY - movedDocument.offsetHeight / 2+ 'px';
	}
}

function endDrag(event) {
	if (movedDocument) {
		movedDocument.style.cursor = 'move';
		if (event.target === trash) {		
			movedDocument.classList.remove('moving');
			movedDocument.style.display = 'none';
			movedDocument = null;
		} else {
			movedDocument.style.left = startMove.x;
			movedDocument.style.top = startMove.y;
			movedDocument.classList.remove('moving');			
			movedDocument = null;
		
		}
	}
}

