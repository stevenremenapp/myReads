import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../../Components/Book'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        books: [],
        results: [],
        query: ''
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
        .then(response => {
            console.log(response);
            this.setState({ books: response });
        })
  }

  updateQuery = (query) => {
    this.setState({query: query}, this.submitQuery)
  }

  submitQuery() {
    if (this.state.query.trim() === '' || this.state.query.trim() === undefined) {
      return this.setState({ results: [] });
    } else {
      BooksAPI.search(this.state.query.trim()).then(response => {
        console.log(response);
        if (response.error) {
          this.setState({ results: [] });
        } else {
          response.forEach((b) => {
            let f = this.state.books.filter(book => book.id === b.id);
            // Assign shelf to book or if there is no shelf, assign it none
            if (f[0]) {
              b.shelf = f[0].shelf;
            } else {
              b.shelf = "none";
            }
          });
          // Additional check on query state alleviates the problem of async request leaving results while search input is empty (if user clears search all at once)
          if (this.state.query === '') {
            return this.setState({ results: [] });
          } else {
            return this.setState({ results: response });
          }
      }});
    }
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
        .then(response => {
            book.shelf = shelf;
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([book])
            }))
        })
  }

  render() {
      return(
          <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)} />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                this.state.results.map((book, key) => <Book updateBook={this.updateBook} key={key} book={book} />)
              }
            </ol>
          </div>
        </div>
      )
  }
}

export default SearchPage;