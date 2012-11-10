/*jshint browser:true, eqnull:true */
/*global jQuery:false */
(function(debugBar) {
	'use strict';

	debugger;

	debugBar.register('load', function() {
		
		var loadList = ['1', '2', '3'];
		var loads = 123;
		var label = 'Loads';

		return {
			getName : function () {
				return label;
			},
			getData : function() {
				return loads.toString();
			},
			getList : function() {
				return loadList;
			}
		};
	});


}(window.debugBar));