// global objects
global.app = "MyNodeApp";
function show(){
    console.log(`App Name: ${global.app}`);
}
show();
// console
console.log("Hello World");
console.warn("This is a warning");
console.error("This is an error");
// process
// process ID
console.log("Process ID:", process.pid);
// Current working directory
console.log("Current working directory:", process.cwd());
//platform
console.log("Platform:", process.platform);
// Buffer
const buf = Buffer.from("Hi");
console.log("Buffer:", buf);
console.log("Buffer as string:", buf.toString());
// __dirname
console.log("Directory of this file:", __dirname);
// __filename
console.log("Full path of this file:", __filename);
// setTimeout
console.log("Before setTimeout");
setTimeout(() => {
    console.log("setTimeout executed after 2 seconds");
}, 2000);
console.log("After setTimeout");
// setInterval
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log("setInterval executed:", count);
    if (count === 3) {
        clearInterval(intervalId);
        console.log("setInterval stopped");
    }
}, 1000);
