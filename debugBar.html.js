/*jshint browser:true, eqnull:true */
/*global jQuery:false, chrome:false */
(function(debugBar, $) {
	'use strict';
	var bar;

	//	quiet stop
	if (!$ || !debugBar || $('.dbar-toolbar').length) return;

	$(function() {
		
		bar = $('<div class="dbar-toolbar"></div>');
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
		var content = getContent(mod);
		return '<div id="bdar' + name + '" class="dbar-mod"><div class="dbar-label"><span class="dbar-value">' + mod.getData() + '</span> <span class="dbar-name">' + mod.getName() + '</span></div>' + content + '</div>';
	}

	function getContent(mod) {
		var html = mod && mod.getContent && mod.getContent();
		if (mod && html == null && mod.getList) {
			var item, items = [],
				list = mod.getList();
			for (var i = 0, len = list && list.length; i<len; i++) {
				item = list[i];
				if (item) {
					items.push(item);
				}
			}
			html = items.length ? '<ul class="dbar-list"><li class="dbar-item">' + items.join('</li><li class="dbar-item">') + '</li></ul>' : '';
		}
		return '<div class="dbar-menu-wrap"><div class="dbar-menu">' + html + '</div></div>';
	}

}(window.debugBar, window.jQuery));