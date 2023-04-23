class Book{
    constructor(name, title, author, publisher){
        this._id = Book.books++;
        this.name = name;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
    }
    static books = 0;
    bookCopies = [];
    misllaneous;    // to add other attributs for book

    static createBook(name, title, author, publisher){
        return new Book(name, title, author, publisher);
    }

    addBookCopies(copyIds){
        copyIds.map((copy)=> this.bookCopies.push(copy));
    }
    getBookId(){
        return this._id;
    }

}

module.exports.Book = Book;