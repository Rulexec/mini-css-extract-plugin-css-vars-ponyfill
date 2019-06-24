import './style2.css';

export {
	addExample,
};

function addExample() {
	let div = document.createElement('div');
	div.className = 'example2';

	document.body.appendChild(div);
}