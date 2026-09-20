/** Document Object Model (DOM) Manipulation Script
 * Demonstrates: Content, Style, and Attribute Modifications */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Target DOM Element References
    const targetCard = document.getElementById('targetCard');
    const cardBadge = document.getElementById('cardBadge');
    const cardImage = document.getElementById('cardImage');
    const cardTitle = document.getElementById('cardTitle');
    const cardDescription = document.getElementById('cardDescription');
    const featureList = document.getElementById('featureList');
    const targetBtn = document.getElementById('targetBtn');
    const targetLink = document.getElementById('targetLink');
    const codeOutput = document.getElementById('codeOutput');
    // Helper to log executed commands in inspector
    function logCommand(cmd) {
        codeOutput.textContent = cmd;
    }
    // 1. CONTENT MANIPULATION
    // A. Modify text content using .textContent
    document.getElementById('btnTextContent').addEventListener('click', () => {
        cardTitle.textContent = "Title Updated via textContent (" + new Date().toLocaleTimeString() + ")";
        logCommand(`cardTitle.textContent = "Title Updated via textContent (...)";`);
    });
    // B. Inject formatted HTML markup using .innerHTML
    document.getElementById('btnInnerHTML').addEventListener('click', () => {
        cardBadge.innerHTML = '<span style="background: #10b981; color: white; padding: 3px 8px; border-radius: 4px;">✔ Status: Active (Injected via innerHTML)</span>';
        logCommand(`cardBadge.innerHTML = '<span style="background: #10b981; color: white; ...">✔ Status: Active</span>';`);
    });
    // C. Append child element to DOM tree
    let nodeCounter = 3;
    document.getElementById('btnAddNode').addEventListener('click', () => {
        const newItem = document.createElement('li');
        newItem.textContent = `Dynamic DOM Node Item ${nodeCounter++} (Created via createElement)`;
        newItem.style.color = '#2563eb';
        featureList.appendChild(newItem);
        logCommand(`const li = document.createElement('li');\nli.textContent = "New Node...";\nfeatureList.appendChild(li);`);
    });
    // D. Reset Content
    document.getElementById('btnResetContent').addEventListener('click', () => {
        cardTitle.textContent = "Default Component Title";
        cardBadge.innerHTML = "Status: Normal";
        cardDescription.textContent = "This is the original paragraph content. JavaScript can dynamically alter its text, inline styles, classes, and attributes.";
        featureList.innerHTML = '<li>Standard DOM Node Item 1</li><li>Standard DOM Node Item 2</li>';
        nodeCounter = 3;
        logCommand(`// Content reset to initial default markup`);
    });
    // 2. STYLE MANIPULATION
    // A. Direct Inline Style Modification (element.style.property)
    let isColorToggled = false;
    document.getElementById('btnChangeColor').addEventListener('click', () => {
        isColorToggled = !isColorToggled;
        cardDescription.style.color = isColorToggled ? '#d97706' : '#475569';
        cardDescription.style.fontWeight = isColorToggled ? 'bold' : 'normal';
        logCommand(`cardDescription.style.color = "${cardDescription.style.color}";\ncardDescription.style.fontWeight = "${cardDescription.style.fontWeight}";`);
    });
    // B. Toggle CSS Class (classList.toggle)
    document.getElementById('btnToggleTheme').addEventListener('click', () => {
        targetCard.classList.toggle('dark-theme');
        const hasDark = targetCard.classList.contains('dark-theme');
        logCommand(`targetCard.classList.toggle('dark-theme'); // isDark: ${hasDark}`);
    });
    // C. Toggle Highlight Border
    document.getElementById('btnToggleBorder').addEventListener('click', () => {
        targetCard.classList.toggle('highlight-border');
        const hasHighlight = targetCard.classList.contains('highlight-border');
        logCommand(`targetCard.classList.toggle('highlight-border'); // Active: ${hasHighlight}`);
    });
    // D. Increase Font Size dynamically
    let currentFontSize = 14;
    document.getElementById('btnIncreaseFont').addEventListener('click', () => {
        currentFontSize = currentFontSize >= 20 ? 14 : currentFontSize + 2;
        cardDescription.style.fontSize = currentFontSize + 'px';
        logCommand(`cardDescription.style.fontSize = "${currentFontSize}px";`);
    });
    // 3. ATTRIBUTE MANIPULATION
    // A. Swap image source via setAttribute('src', ...)
    let isSecondImage = false;
    document.getElementById('btnSwapImage').addEventListener('click', () => {
        isSecondImage = !isSecondImage;
        const newSrc = isSecondImage
            ? "https://images.pexels.com/photos/6424589/pexels-photo-6424589.jpeg"
            : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29kZXxlbnwwfHwwfHx8MA%3D%3D";
        const newAlt = isSecondImage ? "Coding on Laptop" : "Laptop Workspace";
        cardImage.setAttribute('src', newSrc);
        cardImage.setAttribute('alt', newAlt);
        logCommand(`cardImage.setAttribute('src', "${newSrc.substring(0, 45)}...");\ncardImage.setAttribute('alt', "${newAlt}");`);
    });
    // B. Toggle boolean attribute (disabled)
    document.getElementById('btnToggleDisabled').addEventListener('click', () => {
        targetBtn.disabled = !targetBtn.disabled;
        targetBtn.textContent = targetBtn.disabled ? "Button Disabled" : "Target Action Button";
        logCommand(`targetBtn.disabled = ${targetBtn.disabled};`);
    });
    // C. Modify hyperlink target via setAttribute('href', ...)
    let isGoogleLink = false;
    document.getElementById('btnChangeLink').addEventListener('click', () => {
        isGoogleLink = !isGoogleLink;
        const newUrl = isGoogleLink ? "https://www.google.com" : "https://developer.mozilla.org";
        const newText = isGoogleLink ? "Visit Google Search &rarr;" : "Visit MDN Web Docs &rarr;";
        targetLink.setAttribute('href', newUrl);
        targetLink.innerHTML = newText;
        logCommand(`targetLink.setAttribute('href', "${newUrl}");`);
    });
    // D. Update Tooltip attribute (title)
    document.getElementById('btnSetTooltip').addEventListener('click', () => {
        const newTooltip = `Updated Tooltip at ${new Date().toLocaleTimeString()}`;
        targetCard.setAttribute('title', newTooltip);
        logCommand(`targetCard.setAttribute('title', "${newTooltip}");`);
        alert(`Tooltip updated! Hover your mouse over the card to view:\n"${newTooltip}"`);
    });
});
