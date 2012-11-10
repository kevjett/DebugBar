/*jshint */
/*global chrome:false */
(function() {
	'use strict';

	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.insertCSS(tab.id, {file: "styles.css"});
		chrome.tabs.executeScript(tab.id, {file: "jquery.js"}, function() {
			chrome.tabs.executeScript(tab.id, {file: "debugBar.js"}, function() {
				chrome.tabs.executeScript(tab.id, {file: "debugBar.load.js"}, function() {
					chrome.tabs.executeScript(tab.id, {file: "debugBar.html.js"});
				});
			});
		});
	});

}());