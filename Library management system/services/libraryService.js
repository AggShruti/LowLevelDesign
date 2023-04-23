let library = require("../model/library").Library;
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")

class LibraryService{
    constructor(){
    }
    createLibrary(){
        return library.createLibrary();
    }
    addRacktoLibrary(library, rack){
        library.addRack(rack);
    }

    addBooksToLibrary(library, book){
        let bookCopyIds = book.getBookCopyIds();
        library.addBookCopiesToRack(bookCopyIds.length);
        library.addBook(book);
    }

    getAvailableRacks(library, requiredRacks) {
        console.log("hi")
        try {
            let allAvailableRacks = [];
            let availableRackCount = library.getRacksAvailablity();
            if (availableRackCount < requiredRacks) {
                throw "Racks Not Available";
            }
            let allRacks = library.getRacks();
            console.log(allRacks);
            for (let rackId in allRacks) {
                console.log(allRacks[rackId]);
                if (allRacks[rackId].checkAvailability()) {
                    allAvailableRacks.push(allRacks[rackId]);
                }
            }
            return allAvailableRacks;
        }
        catch (err) {
            throw err;
        }

    }
    removeBookCopy(library, bookId, rack){
        let book = library.getBook(bookId);

        if(book.getBookCopyIds().length === 0){
            library.removeBook(bookId);
        }
        book.removeBookCopy();
        library.increaseRackAvailability();
        rack.removeBook();

    }

}

module.exports = {
    "getInst":()=>{
        return new LibraryService();
    }
}