// content_script.js

// Function to apply dark mode styles
function applyDarkMode() {
    // Add CSS styles for dark mode
    const style = document.createElement('style');
    style.textContent = `
        /* Add your dark mode styles here */
        body {
            background-color: #1e1e1e !important;
            color: #fff !important;
        }
        /* Example: Change background and text color */
        .header {
            background-color: #333 !important;
        }
    `;
    document.head.appendChild(style);
}

// Apply dark mode when page loads
applyDarkMode();
