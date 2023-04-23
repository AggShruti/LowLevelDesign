class BookCopy{
    constructor(bookId){
        this._id = BookCopy.bookCopies++;
        this.bookId = bookId
    }
    static bookCopies = 0;
    isBorrowed;
    dueDate;
    bookId;
    static createBookCopy(bookId){
        return new BookCopy(bookId);
    }
    getBookCopyId(){
        return this._id;
    }
    borrowBookCopy(dueDate){
        this.isBorrowed = true;
        this.dueDate = dueDate;
    }
    getBookId(){
        return this.bookId;
    }
  
}

module.exports.BookCopy = BookCopy;