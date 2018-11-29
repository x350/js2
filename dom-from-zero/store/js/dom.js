'use strict';

function createElement(block) {
	if (block === undefined || block === null || block === false) {
		return document.createTextNode('');
	}
	if (typeof block === 'string' || typeof block === 'number' || block === true) {
		return document.createTextNode(block);
	}
	if (Array.isArray(block)) {
		return block.reduce((f, elem) => {
			f.appendChild(createElement(elem));
			return f;
		}, document.createDocumentFragment());
	}

	const element = document.createElement(block.name || 'div');
	
	if (block.props) {
		element.className = block.props.class;
	}

	if (block.childs) {
		element.appendChild(createElement(block.childs));
	}
	return element;
}