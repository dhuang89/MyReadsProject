import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
	//moves book to different shelf, calls API udpate method
	moveBook = (value, title, id) => {
		var final = this.props.allBooks.filter(book => book.title === title && book.id === id);
		this.props.moveBook(final[0], value);
	}

	//handles book images. if undefined, give no image
	imageHandler = (imageArray) => {
		var final = "";
		if (typeof(imageArray) === 'undefined') {
			return final;
		} else {
			final = imageArray["thumbnail"];
			return final;
		}
	}

	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.allBooks.map((book) => (
							<li key={book.id}>
								<Book title={book.title} authors={book.authors} id={book.id} imageLink={this.imageHandler(book.imageLinks)} optionState={book.shelf ? book.shelf: 'none'} moveBook={this.moveBook} />
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Bookshelf