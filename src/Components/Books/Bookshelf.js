import React, { Component } from 'react';
import Book from './Book.js';

class Bookshelf extends Component {

  render() {
    let filtered = this.props.books.filter((book) => book.shelf === this.props.shelf);
    return (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filtered.map(book => {

              return (<Book key={book.id} id={book.id} bookState={book.shelf} bookTitle={book.title} bookImage={'imageLinks' in book ? book.imageLinks.smallThumbnail : ''}
                bookAuthors={book.authors} changeBook={this.props.changeBook} changeSearchBook={this.props.changeSearchBook} />)
            }
            )
            }
          </ol>
        </div>
      </div>


    )
  }

}

export default Bookshelf