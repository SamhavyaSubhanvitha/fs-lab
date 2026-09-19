/**  Node.js File Management Application
 * Demonstrates: File Creation, Writing, Reading, Appending, and Verification */
const fs = require('fs');
const readline = require('readline');
const path = require('path');
// 1. Initialize readline interface for standard input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// 2. Promisify readline question for clean sequential async/await flow
const askQuestion = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
};
// 3. Main File Management Controller Function
async function runFileManager() {
    console.log('\n=============================================================');
    console.log('            NODE.JS FILE SYSTEM MANAGEMENT APPLICATION       ');
    console.log('=============================================================');
    try {
        // STEP 1: Prompt user for Filename
        let fileName = await askQuestion('\n[1] Enter the filename to create (e.g., student_record.txt): ');
        fileName = fileName.trim();
        if (!fileName) {
            fileName = 'default_record.txt';
            console.log(`>> No filename entered. Defaulting to: ${fileName}`);
        }
        // Ensure file is saved in current working directory
        const filePath = path.join(__dirname, fileName);
        // STEP 2: Prompt user for Initial Content & Write to File
        const initialContent = await askQuestion('\n[2] Enter initial content to write to the file:\n> ');
        console.log(`\n--> Creating and writing to "${fileName}"...`);
        fs.writeFileSync(filePath, initialContent + '\n', 'utf-8');
        console.log(`[✓] File "${fileName}" created and written successfully!`);
        // STEP 3: Read Initial Contents from File
        console.log('\n--> Reading contents from file...');
        const readContent1 = fs.readFileSync(filePath, 'utf-8');
        console.log('-------------------------------------------------------------');
        console.log('FILE CONTENTS (AFTER INITIAL WRITE):');
        console.log(readContent1.trim());
        console.log('-------------------------------------------------------------');
        // STEP 4: Prompt user for Additional Content to Append
        const appendContent = await askQuestion('\n[3] Enter additional content to append to the file:\n> ');
        console.log(`\n--> Appending content to "${fileName}"...`);
        fs.appendFileSync(filePath, appendContent + '\n', 'utf-8');
        console.log(`[✓] Additional content appended successfully!`);
        // STEP 5: Display Final File Contents and Metadata
        console.log('\n--> Reading final updated file contents...');
        const finalContent = fs.readFileSync(filePath, 'utf-8');
        const fileStats = fs.statSync(filePath);
        console.log('=============================================================');
        console.log(`FINAL FILE CONTENTS (${fileName}):`);
        console.log('=============================================================');
        console.log(finalContent.trim());
        console.log('=============================================================');
        console.log(`[INFO] File Size     : ${fileStats.size} bytes`);
        console.log(`[INFO] Last Modified : ${fileStats.mtime.toLocaleString()}`);
        console.log(`[INFO] Absolute Path : ${filePath}`);
        console.log('=============================================================\n');
    } catch (error) {
        console.error('\n[!] An error occurred during file operations:', error.message);
    } finally {
        rl.close();
        console.log('>> Session closed. File operations completed successfully.\n');
    }
}
// Execute Application
runFileManager();
