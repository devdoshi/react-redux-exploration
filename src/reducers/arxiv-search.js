import {arxivActionTypes} from '../constants/arxiv-constants';
const reducer =
	(
		state = {
			query: '',
			results: [],
			isSearchInProgress: false
		},
	    payload
	) => {
		switch (payload.type) {
			case arxivActionTypes.SET_SEARCH_QUERY:
				return {
					...state,
					query: payload.query
				};
			case arxivActionTypes.FINISH_SEARCH:
				return {
					...state,
					isSearchInProgress: false,
					results: payload.results
				};
			case arxivActionTypes.START_SEARCH:
				return {
					...state,
					query: payload.query,
					isSearchInProgress: true
				};

			default:
				return state;
		}
	};

export {
	reducer
}