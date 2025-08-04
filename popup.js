document.addEventListener('DOMContentLoaded', function() {
    const rotateBtn = document.getElementById('rotateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const rotationDisplay = document.getElementById('rotationDisplay');
    
    // Get current rotation when popup opens
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'getCurrentRotation'}, function(response) {
            if (response && response.rotation !== undefined) {
                rotationDisplay.textContent = `Current: ${response.rotation}°`;
            }
        });
    });
    
    rotateBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'rotate'}, function(response) {
                if (response && response.rotation !== undefined) {
                    rotationDisplay.textContent = `Current: ${response.rotation}°`;
                }
            });
        });
    });
    
    resetBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'reset'}, function(response) {
                if (response && response.rotation !== undefined) {
                    rotationDisplay.textContent = `Current: ${response.rotation}°`;
                }
            });
        });
    });
});