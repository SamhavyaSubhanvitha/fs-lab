//fs module
const fs = require("fs");
fs.writeFileSync("hello.txt","hello node.js");
console.log("File created");
//os module
const os = require("os");
console.log(os.platform()); //os which we are using
console.log(os.cpus().length); //no. of cpu cores
//path module
const path = require("path");
console.log(path.basename("C:/Users/anits/Desktop/A24126552126/week5/hello.txt"));
// http module
const http = require("http");
const server = http.createServer((req, res) => {
    res.end("Hello from Node.js!");
});
server.listen(3000);
console.log("Server running on port 3000");
// url module
const { URL } = require("url");
const myURL = new URL("https://example.com:8080/products?id=101");
console.log("Protocol:", myURL.protocol);
console.log("Host:", myURL.host);
console.log("Path:", myURL.pathname);
console.log("Query:", myURL.search);
//events module
const EventEmitter = require("events");
const myEvent = new EventEmitter();
myEvent.on("welcome", () => {
    console.log("Welcome to Node.js!");
});
myEvent.emit("welcome");