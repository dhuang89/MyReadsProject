import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Searchbar from './Searchbar'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
	state = {
		allBooks: [],
		booksSearch: []
	}

	// once main component mounts, call BooksAPI to get data
	componentDidMount() {
		BooksAPI.getAll()
			.then((allBooks) => {
				//first put all books in same array
				this.setState(() => ({
					allBooks
				}))
			})
	}

	//when book is moved to different shelf, call BooksAPI.update then refresh list of books
	onShelfChange = (book, shelf) => {
		BooksAPI.update(book, shelf)
			.then(() => {
				this.setState(() => ({
					allBooks: [],
					booksCurrent: [],
					booksWant: [],
					booksRead: []
				}))
				BooksAPI.getAll()
					.then((allBooks) => {
						//first put all books in same array
						this.setState(() => ({
							allBooks
						}))
					})
			})
	}

	//called when user exits search and navigates back to home. clears search results 
	clearSearch = () => {
		this.setState(() => ({
			booksSearch: []
		}))
	}

	//once search query has been run, take response and set state of booksSearch to display new books
	searchBooks = (books) => {
		if (typeof(books) === 'undefined' || books.error === "empty query") {
			books = [];
		}

		for (var i = 0; i < books.length; i++) {
			for (var j = 0; j < this.state.allBooks.length; j++) {
				if ((this.state.allBooks[j].title === books[i].title) && (this.state.allBooks[j].id === books[i].id)) {			
					books[i].shelf = this.state.allBooks[j].shelf;
				}
			}
		}

		this.setState(() => ({
			booksSearch: books
		}))
	}

	render() {
		return (
			<div className="app">
				<Route path='/search' render={() => (
					<div>
						<Searchbar searchBooks={this.searchBooks} clearSearch={this.clearSearch} />
						<Bookshelf title="" moveBook={this.onShelfChange} allBooks={this.state.booksSearch} books={this.state.booksSearch} />
					</div>
				)} />

				<Route exact path='/' render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								<Bookshelf title="Currently Reading" moveBook={this.onShelfChange} allBooks={this.state.allBooks.filter(book => book.shelf === "currentlyReading")} />
								<Bookshelf title="Want to Read" moveBook={this.onShelfChange} allBooks={this.state.allBooks.filter(book => book.shelf === "wantToRead")} />
								<Bookshelf title="Read" moveBook={this.onShelfChange} allBooks={this.state.allBooks.filter(book => book.shelf === "read")}  />
							</div>
						</div>
						<div className="open-search">
							<Link to='/search'>Add a book</Link>
						</div>
					</div>
				)} />


			</div>
		)
	}
}

export default BooksApp
