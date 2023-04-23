let Book = require("../model/book").Book;
let BookCopyServiceInst = require("./bookCopyService.js").getInst();
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")


class BookService{
    constructor(){
    }
    createBookAndCopies( name, title, author, publisher, noOfbookCopies){
        let book = Book.createBook(name, title, author, publisher);
        let bookCopies = BookCopyServiceInst.createBookCopies(book, noOfbookCopies);
        return [book, bookCopies];
    }

}

module.exports = {
    "getInst":()=>{
        return new BookService();
    }
}