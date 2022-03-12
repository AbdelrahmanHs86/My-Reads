import React, { Component } from 'react';
import Book from '../Books/Book';

class SearchResults extends Component {

    render() {
        return (
            <div className="search-books-results">
                <ol className="books-grid">

                    {this.props.search.length > 0 ? this.props.search.map(book => {
                        //console.log(book.shelf, 'shelf');
                        return (<Book key={book.id} id={book.id} bookState={book.shelf} bookTitle={book.title} bookImage={'imageLinks' in book ? book.imageLinks.smallThumbnail : ''}
                            bookAuthors={book.authors} changeBook={this.props.changeBook} changeSearchBook={this.props.changeSearchBook} book={book} />)

                    }) : <p></p>}

                </ol>
            </div>
        )
    }

}

export default SearchResults