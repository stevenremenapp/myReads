import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Shelf from '../../Components/Shelf'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(response => {
                console.log(response);
                this.setState({ books: response });
            })
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
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Shelf updateBook={this.updateBook} name = "Currently Reading" books = {this.state.books.filter(b => b.shelf === 'currentlyReading')} />
                    <Shelf updateBook={this.updateBook} name = "Want To Read" books = {this.state.books.filter(b => b.shelf === 'wantToRead')} />
                    <Shelf updateBook={this.updateBook} name = "Read" books = {this.state.books.filter(b => b.shelf === 'read')} />
                </div>
                <div className="open-search">
                <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default MainPage;