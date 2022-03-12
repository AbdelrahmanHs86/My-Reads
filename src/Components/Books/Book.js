import React, { Component } from 'react';
import ChangeBook from './ChangeBook.js';

class Book extends Component {

  render() {

    return (

      <li >
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${this.props.bookImage} )` }} > </div>
            <ChangeBook shelf={this.props.bookState} bookId={this.props.id} changeBook={this.props.changeBook} changeSearchBook={this.props.changeSearchBook} book={this.props.book} />
          </div>
          <div className="book-title">{this.props.bookTitle}</div>
          <div className="book-authors">{this.props.bookAuthors?.join(', ')}</div>
          {/* this.props.bookAuthors.map((author)=>(author)) */}
        </div>
      </li >

    )
  }
}

export default Book