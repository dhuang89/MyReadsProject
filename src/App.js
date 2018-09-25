import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: false,
		allBooks: [],
		booksCurrent: [],
		booksWant: [],
		booksRead: []
	}

	// once main component mounts, call BooksAPI to get data
	componentDidMount() {
		BooksAPI.getAll()
			.then((allBooks) => {
				//first put all books in same array
				this.setState(() => ({
					allBooks
				}))
				//sort books based by bookshelf
				this.sortBooks()
			})
	}

	onShelfChange = (book, shelf) => {
		BooksAPI.update(book, shelf)
			.then(() => {
				this.setState(() => ({
					allBooks: [],
					booksCurrent: [],
					booksWant: [],
					booksRead: []
				}))
			})

		BooksAPI.getAll()
			.then((allBooks) => {
				//first put all books in same array
				this.setState(() => ({
					allBooks
				}))
				//sort books based by bookshelf
				this.sortBooks()
			})
	}

	//functions add a book to bookshelf in the state
	editCurrent(book) {
		this.setState(() => ({
			booksCurrent: this.state.booksCurrent.concat(book)
		}))
	}

	editWant(book) {
		this.setState(() => ({
			booksWant: this.state.booksWant.concat(book)
		}))
	}

	editRead(book) {
		this.setState(() => ({
			booksRead: this.state.booksRead.concat(book)
		}))
	}

	//iterates through allBooks array then calls function based on bookshelf 
	sortBooks = () => {
		for (var i = 0; i < this.state.allBooks.length; i++) {
			if (this.state.allBooks[i].shelf === "currentlyReading") {
				this.editCurrent(this.state.allBooks[i])
			}
			else if (this.state.allBooks[i].shelf === "wantToRead") {
				this.editWant(this.state.allBooks[i])
			}
			else {
				this.editRead(this.state.allBooks[i])
			}
		}
	}

	render() {
		return (
			<div className="app">
				{this.state.showSearchPage ? (
					<div className="search-books">
						<div className="search-books-bar">
							<a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
							<div className="search-books-input-wrapper">
								{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
								<input type="text" placeholder="Search by title or author" />

							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid"></ol>
						</div>
					</div>
				) : (
						<div className="list-books">
							<div className="list-books-title">
								<h1>MyReads</h1>
							</div>
							<div className="list-books-content">
								<div>
									<Bookshelf title="Currently Reading" moveBook={this.onShelfChange} allBooks={this.state.allBooks} books={this.state.booksCurrent} optionState="currentlyReading" />
									<Bookshelf title="Want to Read" moveBook={this.onShelfChange} allBooks={this.state.allBooks} books={this.state.booksWant} optionState="wantToRead" />
									<Bookshelf title="Read" moveBook={this.onShelfChange} allBooks={this.state.allBooks} books={this.state.booksRead} optionState="read" />
								</div>
							</div>
							<div className="open-search">
								<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
							</div>
						</div>
					)}
			</div>
		)
	}
}

export default BooksApp
