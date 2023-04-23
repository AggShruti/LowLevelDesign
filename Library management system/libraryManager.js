let LibraryServiceInst = require("./services/libraryService.js").getInst();
let RackServiceInst = require("./services/rackService.js").getInst();
let BookServiceInst = require("./services/bookService.js").getInst();
let BookCopyServiceInst = require("./services/bookCopyService.js").getInst();
let UserServiceInst = require("./services/userService.js").getInst();
let Error = require("./exceptionHandling").Error;
let data = require("./contants.json");

class LibraryManager{
    constructor(){
    }
    library; 
    rackToBookMapping={};
    bookToRackMapping={};
    bookCopies = [];
    createLibrary(numberOfRacks){
        this.library = LibraryServiceInst.createLibrary();
        this.createNRackInLibrary(this.library, numberOfRacks);
        console.log(this.library);
        return this.library;
    }
    createAndAddRackToLibrary(library){
        let rack = RackServiceInst.createRack();
        return LibraryServiceInst.addRacktoLibrary(library, rack);
    }

    createNRackInLibrary(library, N){
        for(let i=0; i<N; ++i){
            this.createAndAddRackToLibrary(library);
        }
    }

    updateRackToBookMapping(rackBookMap) {
        try {
            for (let map = 0; map < rackBookMap.length; ++map) {
                let bookCopy = rackBookMap[map][0];
                this.rackToBookMapping[rackBookMap[map][1]] = bookCopy.getBookCopyId();
            }
        }
        catch (err) {
            throw err;
        }
    }
    updateBookToRackMapping(rackBookMap) {
        try {
            for (let map = 0; map < rackBookMap.length; ++map) {
                let bookCopy = rackBookMap[map][0];
                this.bookToRackMapping[bookCopy.getBookCopyId()] = rackBookMap[map][1];
            }
        }
        catch (err) {
            throw err;
        }
    }
    updateBookCopies(bookCopies){
        bookCopies.map((copy)=>{
            this.bookCopies.push(copy);
        })
    }


    addBookToLibrary( name, title, author, publisher, noOfBookCopies) {
        try {
            let racks = LibraryServiceInst.getAvailableRacks(this.library, noOfBookCopies);

            let [book, bookCopies] = BookServiceInst.createBookAndCopies(name, title, author, publisher, noOfBookCopies);
            BookServiceInst.addBookCopiesToBook(bookCopies, book);
            this.updateBookCopies(bookCopies);
            LibraryServiceInst.addBooksToLibrary(this.library, book);
            let rackBookMap = RackServiceInst.addBookCopiesToRacks(racks, bookCopies);
            this.updateRackToBookMapping(rackBookMap);
            this.updateBookToRackMapping(rackBookMap);
            console.log(this.library);
        }
        catch (err) {
            Error(err);
        }
    }

    getRackIdForBook(bookCopyId){
        let rack = this.bookToRackMapping[bookCopyId];
        if(rack){
            return rack;
        }
        else{
            throw "Invalid Book Copy ID";
        }
    }

    updateMapping(bookCopyId, rackId){
        delete this.bookToRackMapping[bookCopyId];
        delete this.rackToBookMapping[rackId];
    }

    removeBookCopy(bookCopyId) {
        try {
            let rackId = this.getRackIdForBook(bookCopyId);
            let rack = this.library.getRackById(rackId);
            let bookCopy = rack.getBookCopy();
            let bookId = bookCopy.getBookId();
            LibraryServiceInst.removeBookCopy(this.library, bookId, rack);
            this.updateMapping(bookCopyId, rack._id);
            console.log(this.library);
        }
        catch (err) {
            Error(err);
        }
    }

    borrowBook(users, book_id, user_id, due_date) {
        try {
            let user = UserServiceInst.getUser(users, user_id);
            let bookCopies = user.getBorrowedCopies();
            if(bookCopies.length >= data.NUMBER_OF_BOOKS_ALLOWED_PER_USER){
                throw "Overlimit";
            }
            let bookCopy = BookCopyServiceInst.getBook(this.bookCopies, book_id);
            console.log(bookCopy);
            user.updateBorrowedBook(book_id);
            bookCopy.borrowBookCopy(due_date);
            console.log(user)
            console.log(bookCopy);
        }
        catch (err) {
            Error(err);
        }
    }
    
    getBookCopy(bookCopyId){
         console.log(BookCopyServiceInst.getBook(this.bookCopies, bookCopyId));
    }
    printBorrowed(userId, users){
        let user = UserServiceInst.getUser(users, userId);
        let borrowedCopiesIds = user.getBorrowedCopies();
        console.log(BookCopyServiceInst.getBookCopiesByIds(this.bookCopies, borrowedCopiesIds));
    }

}

module.exports = {
    "getInst":()=>{
        return new LibraryManager();
    }
}