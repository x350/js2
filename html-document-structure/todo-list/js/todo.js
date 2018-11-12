'use strict';

const done = document.querySelector('.done');
const mustDone = document.querySelector('.undone');
const allTasks =  document.querySelectorAll('.todo-list input');
Array.from(allTasks).forEach(item => item.addEventListener('click', changeStatus));

function changeStatus(event) {
	let itemInput = event.target;
	itemInput.children.checked = itemInput ? false : true;
	 if (itemInput.checked) {
	 	done.appendChild(itemInput.parentElement);
	 } else {
	 	mustDone.appendChild(itemInput.parentElement);
	 }
}
