import {combineReducers} from 'redux';
import {reducer as search} from './arxiv-search';

const reducer = combineReducers({search});
export {
	reducer
}