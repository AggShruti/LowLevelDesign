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

    addBookCopyToRack(rack, bookCopy){
        return rack.addBookToRack(bookCopy);
    }

    addBookCopiesToRacks( racks, bookCopies){
        console.log(bookCopies)
        console.log(racks);
        let rackBookMapping = [];
        for(let copyNo = 0; copyNo< bookCopies.length; ++copyNo){
            rackBookMapping.push(this.addBookCopyToRack(racks[copyNo], bookCopies[copyNo]));
            

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