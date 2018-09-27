import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Searchbar extends Component {
	state = {
		query: '',
		results: {}
	}

	//determine whether query needs to be trimmed or not	
	updateQuery = (query) => {
		if (query === "") {
			query = " ";
			this.searchCall(query);
		} else {
			this.searchCall(query);
		}
	}

	//when query value is changed, call BooksAPI and search using the query
	searchCall = (query) => {
		this.setState(() => ({
			query: query
		}))

		if (query === " ") {
			BooksAPI.search(query)
				.then((result) => {
					this.setState(() => ({
						results: result
					}))
					this.searchHandler()
				})
		} else {
			BooksAPI.search(query.trim())
				.then((result) => {
					this.setState(() => ({
						results: result
					}))
					this.searchHandler()
				})
		}
	}

	searchHandler() {
		this.props.searchBooks(this.state.results);
	}

	render() {
		const { query } = this.state
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className='close-search' onClick={this.props.clearSearch} to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)} />
					</div>
				</div>
				<div className="search-books-results">

				</div>
			</div>
		)
	}
}

export default Searchbar