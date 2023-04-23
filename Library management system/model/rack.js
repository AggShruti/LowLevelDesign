class Rack{
    constructor(){
        this._id = Rack.racks++;
        this.isAvailble = true;
    }
    static racks = 0;
    bookCopyId;
    isAvailble
    static createRack(){
        return new Rack();
    }
    getRackId(){
        return this._id;
    }
    addBookToRack(bookCopyId){
        this.bookCopyId = bookCopyId;
        this.isAvailble = false;
        return [ this.bookCopyId, this._id];
    }
    checkAvailability(){
        return this.isAvailble;
    }

    removeBook(){
        this.bookCopyId = undefined;
        this.isAvailble = true;
    }

}

module.exports.Rack = Rack;