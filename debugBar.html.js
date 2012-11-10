/*jshint browser:true, eqnull:true */
/*global jQuery:false */
(function(debugBar, $) {
	'use strict';
	var bar;

	debugger;

	//	quiet stop
	if (!$ || $('#debugBar').length) return;

	$(function() {

		var modNames = debugBar.list();

		bar = $('<div id="debugBar"></div>');
		$(document.body).append(bar);

	});

}(window.debugBar, window.jQuery));