import cssVarsPonyfill from 'css-vars-ponyfill';

import(/* webpackChunkName: 'first' */ './first.js').then(m => {
	m.addExample();

	let variables = {
		'example-color': 'green',
		'example2-color': 'blue',
	};

	// I must call it after `first` will be loaded
	cssVarsPonyfill({
		onlyLegacy: false,

		variables,
	});

	import(/* webpackChunkName: 'second' */ './second.js').then(m => {
		m.addExample();

		// I must call it after `second` will be loaded
		// If I comment it, second square will be red (and no color, if CSS custom properties are not supported)
		cssVarsPonyfill({
			onlyLegacy: false,

			variables,
		});
	});
});

/*
	When I have complex application with a lot of chunks — it is hard to find all points,
	when chunk will be loaded at the first time to trigger `cssVarsPonyfill()`
*/