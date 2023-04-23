class Library{
    constructor(){
        this._id = Library.libraries++;
    }
    static libraries = 0;
    name;
    racks = {};
    books = {};
    racksAvailable=0;
    bookCount=0;
    static createLibrary(){
        return new Library();
    }
    addRack(rack){
        this.racks[rack.getRackId()] = rack;
        this.racksAvailable += 1;
    }
    getRacks(){
        return this.racks;
    }
    addBookCopiesToRack(count){
        this.racksAvailable -= count;
    }
    increaseRackAvailability(){
        this.racksAvailable +=1;
    }
    getRackById(rackId){
        return this.racks[rackId];
    }
    getRacksAvailablity(){
        this.racksAvailable;
    }
    addBook(book){
        this.books[book.getBookId()] = book;
        this.bookCount += 1;
    }
    getBook(bookId){
        return this.books[bookId];
    }
    removeBook(bookId){
        delete this.books[bookId];
        this.bookCount -= 1;
    }

}

module.exports.Library = Library;