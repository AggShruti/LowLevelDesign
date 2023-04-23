const { BookCopy } = require("../model/bookCopy.js");

let Rack = require("../model/rack.js").Rack;
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")
// let library = require("../model")


class RackService{
    constructor(){
    }

    createRack(){
        return Rack.createRack();
    }

    addBookCopyToRack(rack, bookCopyId){
        return rack.addBookToRack(bookCopyId);
    }

    addBookCopiesToRacks(racks, bookCopies){
        let rackBookMapping = [];
        for(let copyNo = 0; copyNo< bookCopies.length; ++copyNo){
            rackBookMapping.push(this.addBookCopyToRack(racks[copyNo], bookCopies[copyNo].getBookCopyId()));

        }
        return rackBookMapping;
    }
    removeBookCopy(rack){
        rack.removeBookFromRack();
    }
}

module.exports = {
    "getInst":()=>{
        return new RackService();
    }
}