let Book = require("../model/book").Book;
let BookCopyServiceInst = require("./bookCopyService.js").getInst();
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")


class BookService{
    constructor(){
    }

    createBook(name, title, author, publisher){
        return Book.createBook(name, title, author, publisher);
    }

    createBookCopies(book, noOfbookCopies){
        return BookCopyServiceInst.createBookCopies(book, noOfbookCopies);
    }

    addBookCopiesToBook(bookCopies, book){
        let bookCopyIds = bookCopies.map((copy)=> copy.getBookCopyId());
        book.addBookCopyIds(bookCopyIds);
    }

    createBookAndCopies( name, title, author, publisher, noOfbookCopies){
        let book = this.createBook(name, title, author, publisher);
        let bookCopies = this.createBookCopies(book, noOfbookCopies);
        return [book, bookCopies];
    }

}

module.exports = {
    "getInst":()=>{
        return new BookService();
    }
}