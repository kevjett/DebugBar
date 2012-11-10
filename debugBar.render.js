/*jshint browser:true, eqnull:true */
/*global jQuery:false */
(function(debugBar) {
	'use strict';

	debugBar.register('render', function() {
		var t = performance.timing;
        var start = t.navigationStart;
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

		var network = { sectionStart:0, sectionLength:(t.connectEnd-t.navigationStart), fontColor:'#EA8C7A', barColor:'#FCEEEC', borderColor:'#F6CBC4', sectionColor:'#F4C0B7', itemColor:'#E0543F' };
		var server = { sectionStart:(network.sectionStart+network.sectionLength), sectionLength:(t.responseEnd-t.requestStart), fontColor:'#FFC933', barColor:'#FFF9E6', borderColor:'#FFEBB2', sectionColor:'#FFE7A1', itemColor:'#FFCB39' };
		var browser = { sectionStart:(server.sectionStart+server.sectionLength), sectionLength:(end - (server.sectionStart+server.sectionLength)), fontColor:'#51C2BE', barColor:'#E7F7F7', borderColor:'#83D5D4', sectionColor:'#A6E1E0', itemColor:'#35BAB8' };

		var addRow = function(name, value, type, itemLength)
		{
			var row = [];
			itemLength = 10;

			row.push('<div style="display:table;width:100%;color:' + type.fontColor + ';padding:2px;">');
			row.push('	<div style="display:table-cell;background-color:' + type.barColor + ';border:1px solid ' + type.borderColor + ';">');
			row.push('		<div style="margin-left:' + type.sectionStart + '%;width:' + type.sectionLength + '%;background-color:' + type.sectionColor + ';">');
			row.push('			<div style="width:' + itemLength + '%;background-color:' + type.itemColor + ';height:1.8em;"></div>');
			row.push('		</div>');
			row.push('	</div>');
			row.push('	<div style="display:table-cell;width:70px;padding-left:8px;position:relative;">');
			row.push('		<span style="top:50%;margin-top:-0.5em;position:absolute">' + value + '</span>');
			row.push('	</div>');
			row.push('	<div style="display:table-cell;width:200px;position:relative;">');
			row.push('		<span style="top:50%;margin-top:-0.5em;position:absolute">' + name + '</span>');
			row.push('	</div>');
			row.push('</div>');

			return row.join('');
		};

		var html = [];
		html.push('<div style="font-size: 12px; line-height: 1em;  text-align: left; font-family: Helvetica, Calibri, Arial, sans-serif; text-shadow: none;  display: inline-block; color: rgb(34, 34, 34); font-weight: normal; border: none; margin: 0px auto; padding: 10px; background-color: rgba(255, 253, 242, 0.952941); width: 95%; position: fixed; background-position: initial initial; background-repeat: initial initial;">');
		html.push('	<div>');
		html.push('		<h1 style="font-size: 24px; line-height: 1em; z-index: 999; text-align: left; font-family: Helvetica, Calibri, Arial, sans-serif; text-shadow: none; box-shadow: none; display: inline-block; color: rgb(34, 34, 34); font-weight: normal; border: none; margin: 10px 0px; padding: 0px; background-image: none; width: auto; background-position: initial initial; background-repeat: initial initial;">');
		html.push('			Page Load Time Breakdown / <span style="color:' + network.itemColor + '">network</span> / <span style="color:' + server.itemColor + '">server</span> / <span style="color:' + browser.itemColor + '">browser</span>');
		html.push('		</h1>');
		html.push('	</div>');
		html.push(addRow('Connect', String(t.connectEnd - t.connectStart), network, 0));

		//debugger;
		return {
			getName : function () {
				return 'render';
			},
			getData : function() {
				return String(totalTime) + "ms";
			},
			getList : function() {
				return list;
			},
			getContent : function() {
				return html.join('');
			}
		};
	});


}(window.debugBar));