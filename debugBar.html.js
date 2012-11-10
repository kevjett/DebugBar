/*jshint browser:true, eqnull:true */
/*global jQuery:false */
(function(debugBar, $) {
	'use strict';
	var bar;

	//	quiet stop
	if (!$ || !debugBar || $('.dbar-toolbar').length) return;

	$(function() {
		
		bar = $('<div id="debugBar" class="dbar-toolbar"></div>');
		$(document.body).append(bar);
		var imgURL = chrome.extension.getURL("bg.png");
		bar.css('background-image', 'url(' + imgURL + ')');

		debugBar.update.addListener(onModUpdate);
		//	load modules
		updateAll();

	});

	function onModUpdate() {
		updateAll();
	}

	function updateAll() {
		var names = debugBar.list(),
			item, items = [];
		for (var i = 0, len=names.length; i<len; i++) {
			item = getModHtml(names[i]);
			if (item) items.push(item);
		}
		bar.html(items.join(''));
	}

	function getModHtml(name) {
		var mod = debugBar(name);
		return '<div id="bdar' + name + '" class="dbar-mod"><span class="dbar-value">' + mod.getData() + '</span><span class="dbar-label">' + mod.getName() + '</span></div>';
	}

}(window.debugBar, window.jQuery));