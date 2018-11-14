'use strict';

function handleTableClick(event) {
  const target = event.target;
  if (!target.classList.contains('prop__name')) { return; }
  const field = target.getAttribute('data-prop-name');
  if (!target.dataset.dir) {
  	target.dataset.dir = 1;
  } else {
  	target.dataset.dir *= -1;
  }
  document.getElementsByTagName('table')[0].dataset.sortBy = field;
  sortTable(field, target.dataset.dir);
}
