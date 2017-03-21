import {arxivActionTypes} from '../constants/arxiv-constants.js';
import {parseString} from 'xml2js';
const setSearchQuery = (query) => {
	return {
		type: arxivActionTypes.SET_SEARCH_QUERY,
		query,
	};
};

const finishSearch = (results) => {
	return {
		type: arxivActionTypes.FINISH_SEARCH,
		results
	};
};

const getArxivUrl = (query) => {
	return `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}`;
};

const startSearch = (query) => {
	return (dispatch) => {
		dispatch({type: arxivActionTypes.START_SEARCH});
		return window
			.fetch(getArxivUrl(query))
			.then(response => response.text())
			.then(xml => {
				console.log(xml);
				parseString(xml, (err, json) => {
					if (err) {
						dispatch(finishSearch([]));
					}
					else {
						const results = json.feed.entry.map(entry => {
							let {author, title, summary, link} = entry;
							return {
								author: author[0].name[0],
								title: title[0],
								summary: summary[0],
								link: link.find(x => x.$.title === 'pdf').$.href
							}
						});
						dispatch(finishSearch(results));
					}
				});
			})
			.catch(() => {
				dispatch(finishSearch([]));
			});
	};
};


export {
	setSearchQuery,
	startSearch,
	finishSearch,
}