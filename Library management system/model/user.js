class User{
    constructor(userName){
        this._id = User.users++;
        this.userName = userName;
    }
    static users = 0;
    userName;
    bookCopies = [];
    static createUser(username){
        return new User(username);
    }

    updateBorrowedBook(book_id){
        this.bookCopies.push(book_id);
    }
    getUserId(){
        return this._id;
    }
    getBorrowedCopies(){
        return this.bookCopies;
    }
}

module.exports.User = User;