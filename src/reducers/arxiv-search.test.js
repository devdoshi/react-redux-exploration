import {reducer} from './arxiv-search';

it('should have the right initial state', () => {
	const newState = reducer(undefined, {});
	expect(newState).toEqual({
		query: '',
		results: [],
		isSearchInProgress: false,
	});
});

it('should update the query', () => {
	const newState = reducer(undefined, {type: 'SET_SEARCH_QUERY', query: 'qqq'});
	expect(newState).toEqual({
		query: 'qqq',
		results: [],
		isSearchInProgress: false,
	});
});

it('should update the search status when starting a search', () => {
	const newState = reducer(undefined, {type: 'START_SEARCH', query: 'qqq'});
	expect(newState).toEqual({
		query: 'qqq',
		results: [],
		isSearchInProgress: true,
	});
});

it('should update the search status and results when finishing a search', () => {
	const newState = reducer(undefined, {type: 'FINISH_SEARCH', results: ['rrr']});
	expect(newState).toEqual({
		query: '',
		results: ['rrr'],
		isSearchInProgress: false,
	});
});