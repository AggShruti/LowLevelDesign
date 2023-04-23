let LibraryServiceInst = require("./services/libraryService.js").getInst();
let RackServiceInst = require("./services/rackService.js").getInst();
let BookServiceInst = require("./services/bookService.js").getInst();
let BookCopyServiceInst = require("./services/bookCopyService.js").getInst();
let UserServiceInst = require("./services/userService.js").getInst();
let Error = require("./exceptionHandling").Error;

class LibraryManager{
    constructor(){
    }
    library; 
    rackToBookMapping={};
    bookToRackMapping={};
    bookCopies = [];
    books = [];
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

    updateRackToBookMapping(rackBookMap){
        for(let map = 0; map<rackBookMap.length; ++map){
            this.rackToBookMapping[rackBookMap[map][0]] = rackBookMap[map][1];
        }
    }
    updateBookToRackMapping(rackBookMap){
        for(let map = 0; map<rackBookMap.length; ++map){
            this.bookToRackMapping[rackBookMap[map][1]] = rackBookMap[map][0];
        }
    }
    updateBookCopies(bookCopies){
        bookCopies.map((copy)=>{
            this.bookCopies.push(copy);
        })
    }
    updateBooksInLibrary(book){
        this.books.push(book);
    }

    addBookToLibrary( name, title, author, publisher, noOfBookCopies) {
        try {
            let racks = LibraryServiceInst.getAvailableRacks(this.library, noOfBookCopies);

            let [book, bookCopies] = BookServiceInst.createBookAndCopies(name, title, author, publisher, noOfBookCopies);
            this.updateBookCopies(bookCopies);
            this.updateBooksInLibrary(book);
            let rackBookMap = RackServiceInst.addBookCopiesToRacks(racks, bookCopies);
            console.log(rackBookMap);
            this.updateRackToBookMapping(rackBookMap);
            this.updateBookToRackMapping(rackBookMap);
            console.log(this.bookToRackMapping);
        }
        catch (err) {
            Error(err);
        }
    }

    getRackForBook(bookCopyId){
        return this.bookToRackMapping[bookCopyId];
    }

    removeBookFromRack(bookCopyId, rackId){
        delete this.bookToRackMapping[bookCopyId];
        delete this.rackToBookMapping[rackId];
    }

    removeBookCopy(bookCopyId){
        let rackId = this.getRackForBook(bookCopyId);
        let rack = this.library.getRackById(rackId);
        rack.removeBook();
        this.removeBookFromRack(bookCopyId, rack._id);
        console.log(this.library);
    }
    borrowBook(users, book_id, user_id, due_date){
        let user = UserServiceInst.getUser(users, user_id);
        console.log(user);
        let bookCopy = BookCopyServiceInst.getBook(this.bookCopies, book_id);
        console.log(bookCopy);
        user.updateBorrowedBook(book_id);
        bookCopy.borrowBookCopy(due_date);
        console.log(user)
        console.log(bookCopy);
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