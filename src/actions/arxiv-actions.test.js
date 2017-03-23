import {setSearchQuery, startSearch, finishSearch} from './arxiv-actions';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
const mockStore = configureMockStore([thunkMiddleware]);
it('should setSearchQuery', () => {
	const expected = {
		type: 'SET_SEARCH_QUERY',
		query: 'qqq'
	};

	expect(setSearchQuery('qqq')).toEqual(expected);
});

it('should startSearch and detect failure', () => {
	const expected = [{
		type: 'START_SEARCH',
		query: 'qqq'
	}, {
		type: 'FINISH_SEARCH',
		results: [],
		didFail: true
	}];

	const store = mockStore();
	global.fetch = jest.fn().mockImplementation(() => {
		const p = new Promise((resolve, reject) => {
			reject();
		});
		return p;
	});


	return store.dispatch(startSearch('qqq')).then(() => {
		expect(store.getActions()).toEqual(expected);
	});
});

it('should startSearch and detect failure', () => {
	const expected = [{
		type: 'START_SEARCH',
		query: 'qqq'
	}, {
		type: 'FINISH_SEARCH',
		results: [{
			authors: ['aaa-111', 'aaa-222'],
			title: 'ttt',
			summary: 'sss',
			link: 'pdf-111'
		}],
		didFail: false
	}];

	const store = mockStore();
	global.fetch = jest.fn().mockImplementation(() => {
		const p = new Promise((resolve, reject) => {
			resolve({
				text() {
					return `
						<?xml version="1.0" encoding="UTF-8"?>
						<feed xmlns="http://www.w3.org/2005/Atom">
						  <entry>
						    <title>ttt</title>
						    <summary>sss</summary>
						    <author>
						      <name>aaa-111</name>
						    </author>
						    <author>
						      <name>aaa-222</name>
						    </author>
						    <link href="http://arxiv.org/abs/1611.04228v1" rel="alternate" type="text/html"/>
						    <link title="pdf" href="pdf-111" rel="related" type="application/pdf"/>
						  </entry>
						</feed>
					`;
				}
			});
		});
		return p;
	});


	return store.dispatch(startSearch('qqq')).then(() => {
		expect(store.getActions()).toEqual(expected);
	});
});

it('should finishSearch', () => {
	const expected = {
		type: 'FINISH_SEARCH',
		results: ['rrr'],
		didFail: true
	};

	expect(finishSearch(['rrr'], true)).toEqual(expected);
});