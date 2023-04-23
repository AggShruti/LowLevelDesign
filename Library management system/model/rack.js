class Rack{
    constructor(){
        this._id = Rack.racks++;
        this.isAvailble = true;
    }
    static racks = 0;
    bookCopy;
    isAvailble
    static createRack(){
        return new Rack();
    }
    getRackId(){
        return this._id;
    }
    addBookToRack(bookCopy){
        this.bookCopy = bookCopy;
        this.isAvailble = false;
        return [ this.bookCopy, this._id];
    }
    checkAvailability(){
        return this.isAvailble;
    }

    removeBook(){
        this.bookCopy = null;
        this.isAvailble = true;
    }
    getBookCopy(){
        return this.bookCopy;
    }

}

module.exports.Rack = Rack;