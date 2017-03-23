import {arxivActionTypes} from '../constants/arxiv-constants.js';
import {parseString} from 'xml2js';
const setSearchQuery = (query) => {
	return {
		type: arxivActionTypes.SET_SEARCH_QUERY,
		query,
	};
};

const finishSearch = (results, didFail) => {
	return {
		type: arxivActionTypes.FINISH_SEARCH,
		results,
		didFail,
	};
};

const getArxivUrl = (query) => {
	return `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}`;
};

const startSearch = (query) => {
	return (dispatch) => {
		dispatch({type: arxivActionTypes.START_SEARCH, query});
		return window
			.fetch(getArxivUrl(query))
			.then(response => response.text())
			.then(xml => {
				parseString(xml, (err, json) => {
					if (err) {
						const didFail = true;
						dispatch(finishSearch([], didFail));
					}
					else {
						const results = json.feed.entry.map(entry => {
							let {author, title, summary, link} = entry;
							return {
								authors: author.map(x => x.name[0]),
								title: title[0],
								summary: summary[0],
								link: link.find(x => x.$.title === 'pdf').$.href
							}
						});
						const didFail = false;
						dispatch(finishSearch(results, didFail));
					}
				});
			})
			.catch(() => {
				const didFail = true;
				dispatch(finishSearch([], didFail));
			});
	};
};


export {
	setSearchQuery,
	startSearch,
	finishSearch,
}