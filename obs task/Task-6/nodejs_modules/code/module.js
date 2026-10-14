// os module
const os = require("os");

console.log("Operating System:", os.platform());
console.log("CPU Architecture:", os.arch());
console.log("Home Directory:", os.homedir());
console.log("Number of CPUs:", os.cpus().length);

// path module
const path = require("path");

const filePath = path.join("students", "data.txt");

console.log("File Path:", filePath);
console.log("File Name:", path.basename(filePath));
console.log("Extension:", path.extname(filePath));

// fs module
const fs = require("fs");

fs.writeFileSync("message.txt", "Hello from Node.js!");

const data = fs.readFileSync("message.txt", "utf8");

console.log("File Content:", data);
