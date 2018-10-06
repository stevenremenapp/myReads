import React from 'react'
import Book from './Book'

class Shelf extends React.Component {
    componentDidMount() {
        console.log(this);
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        this.props.books.map((book) => <Book updateBook={this.props.updateBook} book={book} key={book.id} />)
                    }
                </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;