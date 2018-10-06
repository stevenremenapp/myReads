import React from 'react'

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: props.book
        }
    }

    componentDidMount() {
        console.log(this);
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'https://3.bp.blogspot.com/-s3yBaPBn8Hc/Uh4-wAZOQLI/AAAAAAAAJT8/GY9d_VJFm3o/s200/play-books-no-cover.jpg'})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.props.book.shelf || "None"} onChange={(event) => this.props.updateBook(this.props.book, event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title"><a href={this.props.book.previewLink} target="_blank">{this.props.book.title}</a></div>
                    <div className="book-authors">{this.props.book.authors ? this.props.book.authors[0] : "No Author Listed"}</div>
                </div>
            </li>
        )
    }
}

export default Book;

