// Function
function add(a, b) {
    return a + b;
}
console.log(add(10, 20));
// Class
class Student {
    constructor(name, course) {
        this.name = name;
        this.course = course;
    }
    introduce() {
        console.log("I am " + this.name +
                    " studying " + this.course);
    }
}
// Creating multiple objects
const student1 = new Student("Samhavya", "CSM");
const student2 = new Student("Anvitha", "CSD");
student1.introduce();
student2.introduce();
