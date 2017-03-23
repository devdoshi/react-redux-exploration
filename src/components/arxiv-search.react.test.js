import React from 'react';
import ReactDOM from 'react-dom';
import ArxivSearch from './arxiv-search.react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {storeFactory} from '../store';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const store = storeFactory();
	ReactDOM.render(<Provider store={store}><ArxivSearch /></Provider>, div);
});

it('renders query', () => {
	const store = storeFactory({
		search: {
			results: [],
			query: 'qqq',
		}
	});
	const component = mount(<Provider store={store}><ArxivSearch /></Provider>);
	expect(component.find('input[value="qqq"]')).toHaveLength(1);
});

it('renders no results', () => {

	const store = storeFactory({
		search: {
			results: [],
			query: 'qqq',
		}
	});
	const component = mount(<Provider store={store}><ArxivSearch /></Provider>);
	expect(component.find('h1')).toHaveLength(0);
});

const assertResultExists = (component, title, authors, summary, link) => {

	expect(component.contains(<h1>{title}</h1>)).toEqual(true);
	expect(component.contains(<h2>{authors}</h2>)).toEqual(true);
	expect(component.contains(<pre>{summary}</pre>)).toEqual(true);
	expect(component.contains(<a href={link}>pdf</a>)).toEqual(true);
};

it('renders single result', () => {

	const store = storeFactory({
		search: {
			results: [{
				authors: ['aaa-111', 'aaa-222'],
				title: 'ttt',
				summary: 'sss',
				link: 'pdf-111',
			}],
			query: 'qqq',
		}
	});
	const component = mount(<Provider store={store}><ArxivSearch /></Provider>);
	expect(component.find('div.result')).toHaveLength(1);
	assertResultExists(component, 'ttt', 'aaa-111, aaa-222', 'sss', 'pdf-111');
});

it('renders multiple results', () => {

	const store = storeFactory({
		search: {
			results: [
				{
					authors: ['aaa-111', 'aaa-222'],
					title: 'ttt-111',
					summary: 'sss-111',
					link: 'pdf-111',
				},
				{
					authors: ['aaa-333'],
					title: 'ttt-222',
					summary: 'sss-222',
					link: 'pdf-222',
				},
				{
					authors: ['aaa-444', 'aaa-555'],
					title: 'ttt-333',
					summary: 'sss-333',
					link: 'pdf-333',
				},
			],
			query: 'qqq',
		}
	});
	const component = mount(<Provider store={store}><ArxivSearch /></Provider>);
	expect(component.find('div.result')).toHaveLength(3);
	assertResultExists(component, 'ttt-111', 'aaa-111, aaa-222', 'sss-111', 'pdf-111');
	assertResultExists(component, 'ttt-222', 'aaa-333', 'sss-222', 'pdf-222');
	assertResultExists(component, 'ttt-333', 'aaa-444, aaa-555', 'sss-333', 'pdf-333');
});
