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

	//handles book shelves. if undefined, set shelf to 'none'
	shelfHandler = (shelf) => {
		var final = "";
		if (typeof(shelf) === 'undefined') {
			final = "none";
			return final;
		} else {
			final = shelf;
			return final;
		}
	}

	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.books.map((book) => (
							<li key={book.id}>
								<Book title={book.title} authors={book.authors} id={book.id} imageLink={this.imageHandler(book.imageLinks)} optionState={this.shelfHandler(book.shelf)} moveBook={this.moveBook} />
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Bookshelf