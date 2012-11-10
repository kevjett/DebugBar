chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {code:"document.body.style.backgroundColor='red'"});
});