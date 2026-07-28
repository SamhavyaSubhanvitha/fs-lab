const shoppingCart = ["Laptop", "Headphones", "Mouse Pad"];

// Function to print all items currently in the cart
function viewCart(cartArray) {
    console.log(`\n Your Cart (${cartArray.length} items)`);
    
    if (cartArray.length === 0) {
        console.log("Your cart is empty!");
        return; // Stops the function early if cart is empty
    }

    for (let i = 0; i < cartArray.length; i++) {
        console.log(`${i + 1}. ${cartArray[i]}`);
    }
}

// Function to add a new item to the cart
function addItem(cartArray, item) {
    cartArray.push(item);
    console.log(`Added to cart: ${item}`);
}

// Function to remove the very last item added
function removeLastItem(cartArray) {
    if (cartArray.length > 0) {
        const removed = cartArray.pop();
        console.log(`Removed from cart: ${removed}`);
    } else {
        console.log("Nothing to remove. Cart is already empty!");
    }
}

// 3. RUNNING THE PROGRAM (Calling the functions)

viewCart(shoppingCart);       // Shows the initial 3 items

addItem(shoppingCart, "Keyboard"); // Adds a 4th item
viewCart(shoppingCart);       // Shows updated list

removeLastItem(shoppingCart); // Removes "Keyboard"
viewCart(shoppingCart);       // Shows final list