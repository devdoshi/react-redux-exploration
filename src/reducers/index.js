import {combineReducers} from 'redux';
import {reducer as search} from './search';

const reducer = combineReducers({search});
export {
	reducer
}