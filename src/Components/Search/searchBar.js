import React, { Component } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { search } from '../../BooksAPI';
import Book from '../Books/Book';
// import { Debounce } from 'react-throttle';


class SearchBar extends Component {

    state = {
        words: "",
    };

    // Search a Book
    async searchBook(event) {

        let searchResults = [];

        // controlling the typing results
        if (event === undefined || event === "") {
            // if empty or undefined set the wordd list to an empty list.
            this.setState({ words: "" });
            console.log(event, 'inside empty');
            this.setState({ search: [] });
        }

        else {
            // if not empty or undefined make an api request to search books.
            this.setState(({ words: event }));
            console.log(event, 'not empty or undefined');
            searchResults = await search(event);
            console.log('searchResults:', searchResults)
        }



        this.props.searchResults(searchResults);

    }

    render() {
        console.log(this.state.words);
        return (

            <div className="search-books">

                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close</Link>
                    {/* <button className="close-search" onClick={() => this.props.history.goBack()}>go back</button> */}
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.words} onChange={(e) => this.searchBook(e.target.value)} />
                    </div>

                </div>

                <div className="search-books-results">
                    <ol className="books-grid">

                        {this.props.search.length > 0 ? this.props.search.map(book => {
                            //console.log(book.shelf, 'shelf');
                            return (<Book key={book.id} id={book.id} bookState={book.shelf} bookTitle={book.title} bookImage={'imageLinks' in book ? book.imageLinks.smallThumbnail : ''}
                                bookAuthors={book.authors} changeBook={this.props.changeBook} changeSearchBook={this.props.changeSearchBook} book={book} />)

                        }) : <p></p>}

                    </ol>
                </div>

            </div>
        )
    }


}

export default SearchBar