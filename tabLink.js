chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.insertCSS(tab.id, {file: "style.css"});
	chrome.tabs.executeScript(tab.id, {file: "jquery.js"});
	chrome.tabs.executeScript(tab.id, {file: "debugBar.js"});
});