import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {store} from './common/helpers';
import {App} from './app';

import {configureHTTPBackend} from './common/helpers';
configureHTTPBackend();

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);