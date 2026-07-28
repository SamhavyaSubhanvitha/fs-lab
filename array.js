// 1. Creating an array with initial values
const colors = ["Red", "Green", "Blue"];
console.log("Original List:", colors);

// 2. Accessing items using index numbers (Starts at 0)
console.log("First color (index 0):", colors[0]); // Output: Red
console.log("Second color (index 1):", colors[1]); // Output: Green

// 3. Finding the total number of items
console.log("Total colors in list:", colors.length); // Output: 3

// 4. Updating an item at a specific index
colors[1] = "Yellow"; // Changes "Green" to "Yellow"
console.log("After updating index 1:", colors);

// 5. Adding a new item to the END of the array
colors.push("Purple");
console.log("After adding to the end (.push):", colors);

// 6. Removing the last item from the array
const removedColor = colors.pop(); // Removes "Purple" and saves it
console.log("Removed color:", removedColor);
console.log("Array after removing last item (.pop):", colors);

const remove = colors.shift(); // Removes 1st element from array
console.log("Remove:",remove)

colors.unshift("Pink") //Adds element at 1st
console.log("adding at start",colors)

// 7. Looping through the array to see every item
console.log("\n--- Printing all colors one by one ---");
for (const color of colors) {
    console.log(`Color: ${color}`);
}
