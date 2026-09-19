/** Interactive Product Calculator
  * Demonstrates DOM Manipulation, Event Listeners, and Dynamic Price Calculation */
document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Element References
    const productNameInput = document.getElementById('productName');
    const unitPriceInput = document.getElementById('productPrice');
    const quantityInput = document.getElementById('productQuantity');
    const resetBtn = document.getElementById('resetBtn');
    const presetBtns = document.querySelectorAll('.preset-btn');
    // 2. Summary Card DOM References
    const summaryName = document.getElementById('summaryName');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryQuantity = document.getElementById('summaryQuantity');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryTax = document.getElementById('summaryTax');
    const summaryTotal = document.getElementById('summaryTotal');
    const statusText = document.getElementById('statusText');
    // 3. Error Feedback DOM References
    const nameError = document.getElementById('nameError');
    const priceError = document.getElementById('priceError');
    const qtyError = document.getElementById('qtyError');
    // 4. Helper Function: Currency Formatter
    const formatCurrency = (amount) => {
        return '₹' + amount.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };
    // 5. Dynamic Calculation and DOM Update Function
    function calculateTotal() {
        const name = productNameInput.value.trim();
        const price = parseFloat(unitPriceInput.value);
        const qty = parseInt(quantityInput.value, 10);
        let isValid = true;
        // Validation for Product Name
        if (!name) {
            nameError.textContent = 'Please enter a product name.';
            productNameInput.classList.add('invalid');
            isValid = false;
        } else {
            nameError.textContent = '';
            productNameInput.classList.remove('invalid');
        }
        // Validation for Unit Price
        if (isNaN(price) || price < 0) {
            priceError.textContent = 'Price must be a valid positive number.';
            unitPriceInput.classList.add('invalid');
            isValid = false;
        } else {
            priceError.textContent = '';
            unitPriceInput.classList.remove('invalid');
        }
        // Validation for Quantity
        if (isNaN(qty) || qty < 1) {
            qtyError.textContent = 'Quantity must be at least 1.';
            quantityInput.classList.add('invalid');
            isValid = false;
        } else {
            qtyError.textContent = '';
            quantityInput.classList.remove('invalid');
        }
        // DOM Update Branch
        if (isValid) {
            const subtotal = price * qty;
            const tax = subtotal * 0.18; // 18% GST calculation
            const grandTotal = subtotal + tax;
            // Dynamically update text nodes without refreshing the webpage
            summaryName.textContent = name;
            summaryPrice.textContent = formatCurrency(price);
            summaryQuantity.textContent = qty;
            summarySubtotal.textContent = formatCurrency(subtotal);
            summaryTax.textContent = formatCurrency(tax);
            summaryTotal.textContent = formatCurrency(grandTotal);
            statusText.textContent = 'Dynamically Calculated (No Page Reload)';
            statusText.style.color = '#2b6cb0';
        } else {
            // Guard state on invalid input
            summaryTotal.textContent = '₹0.00';
            statusText.textContent = 'Invalid inputs detected. Please correct errors.';
            statusText.style.color = '#e53e3e';
        }
    }
    // 6. Attach Event Listeners for Dynamic Real-Time Updates
    productNameInput.addEventListener('input', calculateTotal);
    unitPriceInput.addEventListener('input', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);
    // Also attach 'change' event to handle number spinner button interactions
    unitPriceInput.addEventListener('change', calculateTotal);
    quantityInput.addEventListener('change', calculateTotal);
    // 7. Preset Selection Handler
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            productNameInput.value = btn.dataset.name;
            unitPriceInput.value = btn.dataset.price;
            quantityInput.value = btn.dataset.qty;
            calculateTotal();
        });
    });
    // 8. Form Reset Handler
    resetBtn.addEventListener('click', () => {
        productNameInput.value = 'Wireless Gaming Mouse';
        unitPriceInput.value = '1499.00';
        quantityInput.value = '2';
        nameError.textContent = '';
        priceError.textContent = '';
        qtyError.textContent = '';
        productNameInput.classList.remove('invalid');
        unitPriceInput.classList.remove('invalid');
        quantityInput.classList.remove('invalid');
        calculateTotal();
    });
    // Run initial calculation to populate default summary
    calculateTotal();
});
