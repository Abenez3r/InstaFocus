let isActive; // Variable to track the active status

// Function to update the status text in the popup
function updateStatus() {
    document.getElementById('status-text').textContent = isActive ? 'Status: On' : 'Status: Off'; // Update the status text based on isActive
}

// Retrieve the current state of 'isActive' from Chrome's storage
chrome.storage.sync.get('isActive', (data) => {
    isActive = data.isActive !== undefined ? data.isActive : true; // Set isActive to the stored value or default to true
    updateStatus(); // Update the status text
});

// Add click event listener for the toggle button
document.getElementById('toggle-button').addEventListener('click', () => {
    isActive = !isActive; // Toggle the isActive status
    chrome.storage.sync.set({ isActive }); // Save the new state to storage
    updateStatus(); // Update the status text
});
