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
        library.addRacks(rack);
    }

    getAvailableRacks(library, requiredRacks){
        let racks = library.getRacks();
        let allAvailableRacks = [];
        let requiredRacksCount = requiredRacks;
        for(let rackNo=0; (rackNo<racks.length && requiredRacksCount >0) ; ++rackNo){
            let rack = racks[rackNo];
            if(rack.checkAvailability()){
                requiredRacksCount -= 1;
                allAvailableRacks.push(rack);
            }
        }
        console.log(allAvailableRacks.length);
        console.log(requiredRacks);
        if(allAvailableRacks.length == requiredRacks){
            return allAvailableRacks;
        }
        else{
            throw "Racks Not Available";
        }
    }
    

}

module.exports = {
    "getInst":()=>{
        return new LibraryService();
    }
}