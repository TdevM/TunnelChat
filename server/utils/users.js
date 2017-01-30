/**
 * Created by Tridev on 28-01-2017.
 */
[{
    id:'73gswjhb',
    name:'Sachin',
    room:'Office Fans'
}]

// addUser(id,name,room);
// removeUser(id);
// getUser(id);
// getUserList(room);

// class Person {                                          // Amazing ES6!
//     constructor(name,age){
//      this.name = name;
//      this.age = age;
//     }
//
//     getUserDescription(){
//         return `${this.name} is ${this.age} years old`
//     }
// }
//
// var me = new Person('Tridev',21);
// console.log(me.age+me.name);
// console.log(me.getUserDescription());


class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};
