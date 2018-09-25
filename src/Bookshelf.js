import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
	//moves book to different shelf, calls API udpate method
	moveBook = (value, title) => {
		var final = this.props.allBooks.filter(book => book.title === title);
		this.props.moveBook(final[0], value);
	}

	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.books.map((book) => (
							<li key={book.id}>
								<Book title={book.title} authors={book.authors} imageLink={book.imageLinks["thumbnail"]} optionState={this.props.optionState} moveBook={this.moveBook} />
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Bookshelf