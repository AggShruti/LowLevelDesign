const userServiceInst = require("./services/userService").getInst();

const prompt=require("prompt-sync")({sigint:true});
const libraryManager = require("./libraryManager").getInst();


let user1 = userServiceInst.addUser("Shruti");
let user2 = userServiceInst.addUser("Diksha");
let user3 = userServiceInst.addUser("Anushka");

let users = [user1, user2, user3];
console.log(users);

let done = 1;
while(done){
    // console.log("1. Create Library ");
    let input = prompt("Please insert your command: "); 
    // console.log(input);
    let command = input.split(" ")
    switch (command[0]){
        case "create_library" :
            let numberOfRacks = parseInt(command[1]);
            libraryManager.createLibrary(numberOfRacks);
            break;
        case "add":
            libraryManager.addBookToLibrary(command[1],command[2],command[3],command[4],command[5]);
            break;
        case "remove_book_copy": 
            libraryManager.removeBookCopy(command[1]);
            break;

        case "borrow_book_copy":
            libraryManager.borrowBook(users, command[1], command[2], command[3]);
            break;
        case "print_borrowed":
            libraryManager.printBorrowed(command[1], users);
            break;
        case "exit": done = 0;
    }
    
        


}


//create_library 3
// add book title pp pp 3
//remove_book_copy 1
//borrow_book_copy 2 1 20-2-2020
// print_borrowed 1