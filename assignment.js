//Single Inheritance
console.log("Single Inheritance");
class Animal {
    constructor(name){
        this.name=name;
    }
    eat(){
        console.log(`${this.name} is eating.`);
    }
}
class Dog extends Animal{
    bark(){
        console.log(`${this.name} is barking.`)
    } 
}
const myDog = new Dog("Buddy");
myDog.eat();
myDog.bark();

//Multilevel Inheritance
console.log("Multilevel Inheritance");
class Vehicle {
    move(){
        console.log("Moving forward");
    }
}
class Bike extends Vehicle{
    wheels(){
        console.log("Bike has 2 Wheels");
    }
}
class Car extends Bike{
    windows(){
        console.log("Car has 4 Windows");
    }
}
const v = new Car();
v.move();
v.wheels();
v.windows();

//Hierarchial Inheritance
console.log("Hierarchial Inheritance");
class User{
    constructor(username){
        this.username = username;
    }
    login(){
        console.log(`${this.username} logged in.`);
    }
}
class Admin extends User{
    deleteUser(){
        console.log(`${this.username} deleted by admin`);
    }
}
class Customer extends User{
    checkout(){
        console.log(`${this.username} checked out successfully.`);
    }
}
const a = new Admin("Anvitha");
const c = new Customer("Sam");
a.login();
c.login();
a.deleteUser();
c.checkout();

//Multiple Inheritance
console.log("Multiple Inheritance");
//Using Mixins
const hall = {
    sofa(){
        console.log("Sofa is placed in Hall.");
    },
    tv(){
        console.log("Tv is placed in Hall.")
    }
}; 
const bedRoom = {
    bed(){
        console.log("Bed is in bedroom.");
    },
    closet(){
        console.log("Closet is in Bedroom.");
    }
};
class Building{
    constructor(houseNo){
        this.houseNo = houseNo;
    }
    house(){
        console.log(`Building House No: ${this.houseNo}`);
    }
}
class Area extends Building{
    constructor(houseNo,area){
        super(houseNo);
        this.area = area;
    }
}
Object.assign(Area.prototype,hall,bedRoom);
const name = new Area("403","Kommadi");
name.house();
name.sofa();
name.bed();
