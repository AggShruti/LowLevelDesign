class Library{
    constructor(){
        this._id = Library.libraries++;
    }
    static libraries = 0;
    name;
    racks = [];
    static createLibrary(){
        return new Library();
    }
    addRacks(rack){
        this.racks.push(rack);
    }
    getRacks(){
        return this.racks;
    }
    getRackById(rackId){
        return this.racks.find((rack)=> rack._id === rackId);
    }

}

module.exports.Library = Library;