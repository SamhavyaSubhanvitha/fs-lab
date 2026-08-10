// Store all expenses
let expenses = [];
// Get HTML elements
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addButton = document.getElementById("addButton");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");
const themeButton = document.getElementById("themeButton");
// Add an expense
function addExpense() {
    const name = expenseName.value;
    const amount = Number(expenseAmount.value);
// Check if inputs are empty
    if (name === "" || amount <= 0) {
        alert("Please enter a valid expense.");
        return;
    }
    const expense = {
        name: name,
        amount: amount
    };
    expenses.push(expense);
    displayExpenses();
    calculateTotal();
    expenseName.value = "";
    expenseAmount.value = "";
}
// Display expenses
function displayExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(function(expense, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>
                ${expense.name} - ₹${expense.amount}
            </span>
            <button onclick="deleteExpense(${index})">
                Delete
            </button>
        `;
        expenseList.appendChild(li);
    });
}
// Calculate total expenses
function calculateTotal() {
    let totalAmount = 0;
    expenses.forEach(function(expense) {
        totalAmount = totalAmount + expense.amount;
    });
    total.textContent = "₹" + totalAmount;
}
// Delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
    calculateTotal();
}

addButton.addEventListener("click", addExpense);

themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark");
});
