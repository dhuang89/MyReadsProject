import React, { Component } from 'react'

class Book extends Component {
	//called when user selects option in menu. calls back to moveBook function in Bookshelf.js
	changeHandler = (options, title) => {
		this.props.moveBook(options, title);
	}

	render() {
		const url = this.props.imageLink;
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + url + '")'}}></div>
					<div className="book-shelf-changer">
						<select onChange={(event) => this.changeHandler(event.target.value, this.props.title)} defaultValue={this.props.optionState}>
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{this.props.title}</div>
				<div className="book-authors">{this.props.authors[0]}</div>
			</div>
		)
	}
}

export default Book