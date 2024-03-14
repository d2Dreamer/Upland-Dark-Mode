// content_script.js

let darkModeEnabled = false;

// Function to apply dark mode styles
function applyDarkMode() {
    // Add CSS styles for dark mode
    const style = document.createElement('style');
    style.id = 'uplandDarkModeStyle';
    style.textContent = `
        /* Change map colors for dark mode */
        .mapboxgl-canvas {
            filter: grayscale(100%) invert(100%) hue-rotate(180deg);
        }
        .mapboxgl-canvas.mapboxgl-interactive {
            filter: grayscale(100%) invert(100%) hue-rotate(180deg);
        }
        .mapboxgl-canvas.mapboxgl-overlay-pane svg path,
        .mapboxgl-canvas.mapboxgl-overlay-pane svg circle,
        .mapboxgl-canvas.mapboxgl-overlay-pane svg rect {
            stroke: #fff !important;
        }
        .mapboxgl-canvas.mapboxgl-overlay-pane svg path.mapboxgl-roads {
            fill: #ff0 !important;
        }
        .mapboxgl-canvas.mapboxgl-overlay-pane svg path.mapboxgl-water {
            fill: #001f3f !important;
        }
    `;
    document.head.appendChild(style);

    // Dynamically load Mapbox script
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js';
    script.onload = function() {
        // Once Mapbox script is loaded, initialize map
        mapboxgl.accessToken = 'pk.eyJ1IjoiZDJkcmVhbWVyIiwiYSI6ImNsMTE0ZXkxczA0ZjAzZm9iMzJibGZvaDYifQ.KT7S4Ka2A6yEeJs9ErWXuw'; // Replace with your Mapbox access token
        const map = new mapboxgl.Map({
            container: 'sc-krDsej gGetsl mapbox-container mapboxgl-map', // Replace with the ID of your Mapbox map container
            style: 'mapbox://styles/mapbox/streets-v11' // Replace with your desired Mapbox style
        });
    };
    document.head.appendChild(script);
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
