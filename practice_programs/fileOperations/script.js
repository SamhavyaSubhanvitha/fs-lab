//Asynchronous file operations
const fs = require('fs');
fs.readFile('task.txt','utf-8',(err,data) =>{
    if(err) throw err;
    console.log(data);
});
//synchronous file operations
try {
    const data = fs.readFileSync('task.txt','utf-8');
    console.log(data);
} catch(err){
    console.error(err);
}
//Asnchronous file writing
const content = "This is new content";
fs.writeFile('newfile.txt',content,err =>{
    if(err) throw err;
    console.log("File written successfully");
})
//Synchronous file writing
const contentSync = "This is new content for synchronous writing";
try{
    fs.writeFileSync('newfile.txt',contentSync);
    console.log("File wrote");
} catch(err){
    console.error(err);
}
//File appending
fs.appendFile('example.txt', '\nThis is appended content.', err => {
  if (err) throw err;
  console.log('Content appended');
});
//File deletion
fs.unlink('file.txt', err => {
  if (err) throw err;
  console.log('File was deleted.');
});
//if file exists
fs.access('example.txt', fs.constants.F_OK, (err) => {
  if (err) {
    console.log('File does not exist.');
  } else {
    console.log('File exists.');
  }
});



