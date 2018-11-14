'use strict';

const tabsNav = document.querySelector('.tabs-nav');
const tab = tabsNav.firstElementChild;
tabsNav.removeChild(tab);
const articleList = document.getElementsByClassName('tabs-content')[0].children;

Array.from(articleList).forEach(item => {
	let newTab = tab.cloneNode(true);
	newTab.firstElementChild.innerText = item.dataset.tabTitle;
	newTab.firstElementChild.classList.add(item.dataset.tabIcon);
	tabsNav.appendChild(newTab);
});
tabsNav.firstElementChild.classList.add('ui-tabs-active');
let title = tabsNav.firstElementChild.textContent;
Array.from(articleList).forEach(item => {
	item.classList.add('hidden');
	if (item.dataset.tabTitle === title) { item.classList.remove('hidden'); }
});

Array.from(tabsNav.children).forEach(item => item.addEventListener('click', selectTab));
function selectTab(event) {
	Array.from(tabsNav.children).forEach(item => item.classList.remove('ui-tabs-active'));
	event.currentTarget.classList.add('ui-tabs-active');
	let title = event.currentTarget.firstElementChild.textContent;
	Array.from(articleList).forEach(item => {
		item.classList.add('hidden');
		if (item.dataset.tabTitle === title) { item.classList.remove('hidden'); }
	});
}