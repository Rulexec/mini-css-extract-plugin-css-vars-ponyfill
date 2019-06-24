import './style.css';

export {
	addExample,
};

function addExample() {
	let div = document.createElement('div');
	div.className = 'example';

	document.body.appendChild(div);
}