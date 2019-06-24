import cssVarsPonyfill from 'css-vars-ponyfill';

const variables = {
	'example-color': 'green',
	'example2-color': 'blue',
};

/*
	I have global function, but now I'm not worry about calling `cssVarsPonyfill` at random places
*/
window._miniCssOnLoad = function(linkEl) {
	// Actually here I can do:
	//   linkEl.setAttribute('data-css-vars-ponyfill', '');
	// not in the `webpack.config.js`

	return new Promise((resolve, reject) => {
		cssVarsPonyfill({
			onlyLegacy: false,

			variables,

			include: '[data-css-vars-ponyfill]',

			onComplete() {
				resolve();
			},
			onError(e) {
				reject(e);
			}
		});
	});
};

// My product that I'm working on has damn balancing for 10% of users (beta),
// where I need to pass special URL-parameter to fetch some data from required group of servers
window._miniCssHrefUpdate = function(href) {
	return href + '?v=2';
};

import(/* webpackChunkName: 'first' */ './first.js').then(m => {
	m.addExample();

	import(/* webpackChunkName: 'second' */ './second.js').then(m => {
		m.addExample();
	});
});
