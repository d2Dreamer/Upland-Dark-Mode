// content_script.js

let darkModeEnabled = false;

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

// Function to remove dark mode styles
function removeDarkMode() {
    const style = document.querySelector('#uplandDarkModeStyle');
    if (style) {
        style.remove();
    }
}

// Toggle dark mode when the toggle button is clicked
function toggleDarkMode() {
    darkModeEnabled = !darkModeEnabled;
    if (darkModeEnabled) {
        applyDarkMode();
    } else {
        removeDarkMode();
    }
}

// Add listener for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggleDarkMode') {
        toggleDarkMode();
    }
});

// Apply dark mode if enabled when page loads
if (darkModeEnabled) {
    applyDarkMode();
}
