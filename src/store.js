import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {reducer} from './reducers';
const storeFactory = (
	defaultState = {}
) => {
	const loggerMiddleware = createLogger();
	return createStore(reducer, defaultState, applyMiddleware(loggerMiddleware, thunkMiddleware));
};

export {
	storeFactory
}