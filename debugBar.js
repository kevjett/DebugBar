/*jshint browser:true, eqnull:true */
/*global jQuery:false */
(function(document, $) {
	'use strict';
	var debugBar;

	debugger;

	//	quiet stop
	if (!$ || $('#debugBar').length) return;
	
	$(function() {

		debugBar = $('<div id="debugBar"></div>');
		$(document.body).append(debugBar);

	});


}(document, window.jQuery));