let bookCopy = require("../model/bookCopy").BookCopy;
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")


class BookCopyService{
    constructor(){
    }
    createBookCopy(bookId){
        return bookCopy.createBookCopy(bookId);
    }

    createBookCopies(book, noOfbookCopies){
        let copies = [];
        for(let copyNo=0; copyNo<noOfbookCopies; ++copyNo){
            copies.push(this.createBookCopy(book.getBookId()));
        }
        return copies;
    }
    
    getBook(bookCopies, book_id){
        let bookCopy = bookCopies.find((copy)=> copy._id == book_id);
        if(bookCopy){
            return bookCopy;
        }
        else{
            throw "Invalid Book ID";
        }
    }
    
    getBookCopiesByIds(allBookCopies, bookCopyIds){
        let selectedBookCopies=[];
        for(let copyNo = 0; copyNo < bookCopyIds.length; ++copyNo){
            selectedBookCopies.push(allBookCopies.find((copy)=> copy._id == bookCopyIds[copyNo]));
        }
        return selectedBookCopies;
    }

}

module.exports = {
    "getInst":()=>{
        return new BookCopyService();
    }
}