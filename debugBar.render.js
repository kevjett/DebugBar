/*jshint browser:true, eqnull:true */
/*global jQuery:false */
(function(debugBar) {
	'use strict';

	debugBar.register('render', function() {
		var t = performance.timing;
        var start = t.redirectStart === 0 ? t.fetchStart : t.redirectStart;
        var end = t.loadEventEnd;
        var totalTime = (end - start);

		var list = [];
		list.push('Redirect: ' + String(t.redirectEnd - t.redirectStart) + "ms");
		list.push('DNS: ' + String(t.domainLookupEnd - t.domainLookupStart) + "ms");
		list.push('Connect: ' + String(t.connectEnd - t.connectStart) + "ms");
		list.push('Request: ' + String(t.responseStart - t.requestStart) + "ms");
		list.push('Response: ' + String(t.responseEnd - t.responseStart) + "ms");
		list.push('DOM: ' + String(t.domComplete - t.domLoading) + "ms");
		list.push('Load: ' + String(t.loadEventEnd - t.loadEventStart) + "ms");

		//debugger;
		return {
			getName : function () {
				return 'render';
			},
			getData : function() {
				return String(totalTime) + "ms";
			},
			getList : function() {
				return loadList;
			}
		};
	});


}(window.debugBar));