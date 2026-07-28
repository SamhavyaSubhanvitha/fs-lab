class BankAccount {
  // 1. Declare the private field using the '#' prefix
  #balance = 0; 

  constructor(owner) {
    this.owner = owner; // Public property
  }

  // 2. Control access via a public method (Getter)
  getBalance() {
    return this.#balance;
  }

  // 3. Validate modifications via a public method (Setter-like operation)
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited ${amount}.`);
    } else {
      console.log("Invalid deposit amount.");
    }
  }
}

// --- Usage ---
const myAccount = new BankAccount("Alex");

myAccount.deposit(500);       // Output: Deposited 500.
console.log(myAccount.getBalance()); // Output: 500