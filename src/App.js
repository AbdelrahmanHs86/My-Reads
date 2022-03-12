import React from 'react'
import * as BooksAPI from './BooksAPI.js'
import './App.css'
import Header from './Components/Header/Header';
import Bookshelf from './Components/Books/Bookshelf';
import Book from './Components/Books/Book';
import SearchBar from './Components/Search/searchBar';
import SearchResults from './Components/Search/SearchResults';
// import { Debounce } from 'react-throttle';
import { Link, Route, Router, Routes } from 'react-router-dom';




class BooksApp extends React.Component {

  async componentDidMount() {

    try {
      const Books = await BooksAPI.getAll();
      this.setState({ books: Books })
    }

    catch (error) {
      return error;
    }

  }


  // STATE MANEGMENT

  state = {
    books: [],
    search: [],
    words: '',
  };



  // CHANGE THE SHELF OF THE BOOK IN BOOKS LIST AND THE BACKEND 
  changeBook = (bookid, bookshelf) => {

    BooksAPI.update(bookid, bookshelf);
    console.log(bookid, bookshelf);
    this.state.books.forEach(book => {

      if (book.id === bookid) { book.shelf = bookshelf; console.log(book.shelf, bookshelf); }
    })
    this.setState({
      books: this.state.books
    });
  };


  // CHANGE THE SHELF OF THE BOOK in Search list books.
  changeSearchBook = (bookid, bookshelf, book) => {

    BooksAPI.update(bookid, bookshelf);
    console.log(bookid, bookshelf);

    this.state.search.forEach(book => {

      if (book.id === bookid) {
        book.shelf = bookshelf;
      }
    })

    this.setState({
      search: this.state.search
    });

    //add the book only if it does not exist in the booklist
    if (this.state.books.filter(e => e.id === bookid).length <= 0) { this.addBook(book); }

  }


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
      searchResults = await BooksAPI.search(event);
      console.log('searchResults:', searchResults)
    }


    try {
      this.setState({ search: searchResults });
      console.log('added');
    }

    catch (err) {
      console.log('error');
      this.setState({ search: [] });
      console.log('search list: ', this.state.search)

    }


    // this.props.searchResults(searchResults);

  }


  // get the searchresults from the searchbar component and assign to search list.
  // searchResults = (searchResults) => {

  //   try {
  //     this.setState({ search: searchResults });
  //     console.log('added');
  //   }

  //   catch (err) {
  //     console.log('error');
  //     this.setState({ search: [] });
  //     console.log('search list: ', this.state.search)

  //   }

  // }


  // Add a book to the book list 
  addBook = (book) => {

    this.setState((prev) => ({
      books: [...prev.books, book]
    }));

  }




  render() {

    // const navigate = useNavigate();

    return (
      <div className="app">


        <Route exact path="/search">

          {/* <SearchBar searchResults={this.searchResults} search={this.state.search} changeSearchBook={this.changeSearchBook} changeBook={this.changeBook} /> */}


          <div className="search-books">

            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              {/* <button className="close-search" onClick={() => navigate(-1)}>go back</button> */}
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.words} onChange={(e) => this.searchBook(e.target.value)} />
              </div>

            </div>

            <div className="search-books-results">
              <ol className="books-grid">

                {this.state.search.length > 0 ? this.state.search.map(book => {
                  //console.log(book.shelf, 'shelf');
                  return (<Book key={book.id} id={book.id} bookState={book.shelf} bookTitle={book.title} bookImage={'imageLinks' in book ? book.imageLinks.smallThumbnail : ''}
                    bookAuthors={book.authors} changeBook={this.changeBook} changeSearchBook={this.changeSearchBook} book={book} />)

                }) : <p></p>}

              </ol>
            </div>

          </div>

        </Route>


        <Route exact path="/">
          <div className="list-books">
            <Header title="My Reads" />
            <div className="list-books-content">
              <div>
                <Bookshelf shelfName="Currently Reading" books={this.state.books} shelf="currentlyReading" changeBook={this.changeBook} changeSearchBook={this.changeSearchBook} />
                <Bookshelf shelfName="Read" books={this.state.books} shelf="read" changeBook={this.changeBook} changeSearchBook={this.changeSearchBook} />
                <Bookshelf shelfName="Want To Read" books={this.state.books} shelf="wantToRead" changeBook={this.changeBook} changeSearchBook={this.changeSearchBook} />
              </div>
            </div>
            <div className="open-search">
              <Link to="./search">Add a book</Link>
            </div>
          </div>
        </Route>



      </div>
    )
  }
}

export default BooksApp;
//export BooksApp.changeBook;


