import React, {Component} from 'react';
import './App.css';
import ArxivSearch from './components/arxiv-search.react';

class App extends Component {
	render() {
		return (
			<div>
				<ArxivSearch />
			</div>
		);
	}
}

export default App;
