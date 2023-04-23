class Book{
    constructor(name, title, author, publisher){
        this._id = Book.books++;
        this.name = name;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
    }
    static books = 0;
    bookCopyIds = [];
    misllaneous;    // to add other attributs for book

    static createBook(name, title, author, publisher){
        return new Book(name, title, author, publisher);
    }

    addBookCopyIds(copyIds){
        this.bookCopyIds = this.bookCopyIds.concat(copyIds);
    }
    getBookId(){
        return this._id;
    }
    getBookCopyIds(){
        return this.bookCopyIds;
    }
    removeBookCopy(copyId){
        this.bookCopyIds = this.bookCopyIds.filter(bookCopyId=>{bookCopyId != copyId})
    }

}

module.exports.Book = Book;