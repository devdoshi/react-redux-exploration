import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormTextInput from './form-text-input.react';
import FormButton from './form-button.react';
import {setSearchQuery, startSearch} from '../actions/arxiv-actions';

class ArxivSearch extends Component {
	constructor(props) {
		super(props);
		this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
		this.handleStartSearch = this.handleStartSearch.bind(this);
	}

	render() {
		const results = this.renderResults(this.props.results);
		return (
			<form>
				<FormTextInput
					value={this.props.query}
					placeholder="search query"
					onChange={this.handleSearchQueryChange}
				    disabled={this.props.isSearchInProgress}
				/>
				<FormButton
					label="search"
					onClick={this.handleStartSearch}
					disabled={this.props.isSearchInProgress}
				/>
				<div>{results}</div>
			</form>
		)
	}

	renderResults(results) {
		if (results.length === 0) {
			return (
				<div>no results</div>
			)
		}
		else {
			return results.map(result => {
				const {title, author, summary, link} = result;
				return (
					<div>
						<h1>{title}</h1>
						<h2>{author}</h2>
						<pre>{summary}</pre>
						<a href={link}>pdf</a>
					</div>
				)
			})
		}
	}

	handleSearchQueryChange(value) {
		this.props.dispatch(setSearchQuery(value));
	}

	handleStartSearch() {
		this.props.dispatch(startSearch(this.props.query));
		return false;
	}
}
const mapStateToProps = (state) => {
	return {
		query: state.search.query,
		results: state.search.results,
		isSearchInProgress: state.search.isSearchInProgress
	};
};
export default connect(mapStateToProps)(ArxivSearch);