import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {storeFactory} from './store';
import App from './App';
import './index.css';
import {BrowserRouter, Route} from 'react-router-dom';

const store = storeFactory();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Route path="/" component={App} />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
