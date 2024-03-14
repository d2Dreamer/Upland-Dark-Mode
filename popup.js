// popup.js

document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Set initial state based on stored value or default to false (off)
    chrome.storage.sync.get('darkModeEnabled', function (data) {
        darkModeToggle.checked = data.darkModeEnabled || false;
    });

    darkModeToggle.addEventListener('change', function () {
        const darkModeEnabled = darkModeToggle.checked;
        chrome.storage.sync.set({ 'darkModeEnabled': darkModeEnabled });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleDarkMode', darkModeEnabled: darkModeEnabled });
        });
    });
});
