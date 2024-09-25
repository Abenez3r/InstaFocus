// Define redirection rules for specific sites
const redirectRules = {
    'www.instagram.com': ['/direct/', '/direct/inbox'], // Redirect to these paths for Instagram
};

let isActive; // Variable to track if the extension is active

// Retrieve the current state of 'isActive' from Chrome's storage
chrome.storage.sync.get('isActive', (data) => {
    // Set isActive to the stored value or default to true if undefined
    isActive = data.isActive !== undefined ? data.isActive : true;
    // Save the state back to storage
    chrome.storage.sync.set({ isActive });
});

// Listener for when a tab is updated (e.g., navigated)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the URL has changed
    if (changeInfo.url) {
        const url = new URL(changeInfo.url); // Parse the new URL
        const pathname = url.pathname; // Get the pathname of the URL

        // Iterate over the defined redirect rules
        Object.keys(redirectRules).forEach(site => {
            // Check if the current site matches and if not already on the redirect path
            if (url.host === site && !pathname.startsWith(redirectRules[site][0]) && isActive) {
                // Redirect to the specified path for that site
                chrome.tabs.update(tabId, { url: `https://${site}${redirectRules[site][1]}` });
            }
        });
    }
});

// Listener for changes in the storage
chrome.storage.onChanged.addListener((changes) => {
    // Update the isActive variable if it changes in storage
    if (changes.isActive) {
        isActive = changes.isActive.newValue;
    }
});
