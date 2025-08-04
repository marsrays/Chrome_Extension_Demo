// Track current rotation
let currentRotation = 0;

// Apply rotation to the page
function rotatePage(degrees) {
    const body = document.body;
    const html = document.documentElement;
    
    // Apply transform to both body and html to ensure full page rotation
    const transform = `rotate(${degrees}deg)`;
    body.style.transform = transform;
    body.style.transformOrigin = 'center center';
    html.style.transform = transform;
    html.style.transformOrigin = 'center center';
    
    // Adjust viewport to prevent scrollbars when rotated
    if (degrees % 180 !== 0) {
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        
        // Scale down slightly to fit rotated content
        const scale = Math.min(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth) * 0.9;
        body.style.transform = `rotate(${degrees}deg) scale(${scale})`;
        html.style.transform = `rotate(${degrees}deg) scale(${scale})`;
    } else {
        body.style.overflow = '';
        html.style.overflow = '';
    }
    
    // Add transition for smooth rotation
    body.style.transition = 'transform 0.5s ease-in-out';
    html.style.transition = 'transform 0.5s ease-in-out';
	console.log("rotatePage " + degrees);
}

// Reset page to normal
function resetPage() {
    const body = document.body;
    const html = document.documentElement;
    
    body.style.transform = '';
    body.style.transformOrigin = '';
    body.style.overflow = '';
    body.style.transition = '';
    
    html.style.transform = '';
    html.style.transformOrigin = '';
    html.style.overflow = '';
    html.style.transition = '';
    
    currentRotation = 0;
	console.log("resetPage");
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'rotate') {
        currentRotation = (currentRotation + 90) % 360;
        rotatePage(currentRotation);
        sendResponse({rotation: currentRotation});
    } else if (request.action === 'reset') {
        resetPage();
        sendResponse({rotation: currentRotation});
    } else if (request.action === 'getCurrentRotation') {
        sendResponse({rotation: currentRotation});
    }
    
    return true; // Keep message channel open for async response
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    currentRotation = 0;
});