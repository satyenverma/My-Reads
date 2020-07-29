import React from 'react';
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookList from './BookList';
import Search from './Search';
import NotFound from './NotFound';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    //Invoke BooksAPI's getAll() method to get all the books
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  changeShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then(response => {
      changedBook.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== changedBook.id)
          .concat(changedBook)
      }));
    });
  };

  render() {
    const { books } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route
              path="/search"
              render={() => (
                <Search books={books} changeShelf={this.changeShelf} />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <BookList books={books} changeShelf={this.changeShelf} />
                  <div className="open-search">
                    <Link to="/search">Search</Link>
                  </div>
                </div>
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp
