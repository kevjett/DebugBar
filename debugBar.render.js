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

		//types
		var network = { sectionStart:0, sectionLength:(t.connectEnd-start), fontColor:'#EA8C7A', barColor:'#FCEEEC', borderColor:'#F6CBC4', sectionColor:'#F4C0B7', itemColor:'#E0543F' };
		var server = { sectionStart:(t.requestStart-start), sectionLength:(t.responseEnd-t.requestStart), fontColor:'#FFC933', barColor:'#FFF9E6', borderColor:'#FFEBB2', sectionColor:'#FFE7A1', itemColor:'#FFCB39' };
		var browser = { sectionStart:(t.domLoading-start), sectionLength:(t.loadEventEnd - t.domLoading), fontColor:'#51C2BE', barColor:'#E7F7F7', borderColor:'#83D5D4', sectionColor:'#A6E1E0', itemColor:'#35BAB8' };

		//items
		var redirect = { name: 'redirect', type: network, start:0, value:(t.redirectEnd-t.redirectStart) };
		var dns = { name: 'dns', type: network, start:(t.domainLookupStart - start), value:(t.domainLookupEnd - t.domainLookupStart) };
		var tcp = { name: 'tcp', type: network, start:(t.connectStart - start), value:(t.connectEnd - t.connectStart) };
		
		var request = { name: 'request', type: server, start:(t.requestStart - start), value:(t.responseStart - t.requestStart) };
		var response = { name: 'response', type: server, start:(t.responseStart - start), value:(t.responseEnd - t.responseStart) };

		var dom = { name: 'dom', type: browser, start:(t.domLoading - start), value:(t.domComplete - t.domLoading) };
		var dominteractive = { name: 'domInteractive', type: browser, start:(t.domInteractive - start), value:0 };
		var domcontent = { name: 'contentLoaded', type: browser, start:(t.domContentLoadedEventStart - start), value:(t.domContentLoadedEventEnd - t.domContentLoadedEventStart) };
		var onload = { name: 'onload', type: browser, start:(t.loadEventStart - start), value:(t.loadEventEnd - t.loadEventStart) };

			//debugger;
		var addRow = function(item)
		{
			var row = [];
			var sectionStart = String(toPercent(item.type.sectionStart, totalTime))+"%";
			var sectionLength = String(toPercent(item.type.sectionLength, totalTime))+"%";
			var itemStart = String(toPercent((item.start-item.type.sectionStart), item.type.sectionLength))+"%";
			var itemLength = String(toPercent(item.value, item.type.sectionLength))+"%";
			//debugger;
			if (sectionLength==='0%') {
				sectionLength="2px";
			}
			if (itemLength==='0%') {
				itemLength="2px";
			}

			row.push('<div style="display:table;width:100%;color:' + item.type.fontColor + ';padding:2px;">');
			row.push('	<div style="display:table-cell;background-color:' + item.type.barColor + ';border:1px solid ' + item.type.borderColor + ';">');
			row.push('		<div style="margin-left:' + sectionStart + ';width:' + sectionLength + ';background-color:' + item.type.sectionColor + ';">');
			row.push('			<div style="margin-left:' + itemStart + ';width:' + itemLength + ';background-color:' + item.type.itemColor + ';height:1.8em;"></div>');
			row.push('		</div>');
			row.push('	</div>');
			row.push('	<div style="display:table-cell;width:70px;padding-left:8px;position:relative;">');
			row.push('		<span style="top:50%;margin-top:-0.5em;position:absolute">' + item.value + 'ms</span>');
			row.push('	</div>');
			row.push('	<div style="display:table-cell;width:200px;position:relative;">');
			row.push('		<span style="top:50%;margin-top:-0.5em;position:absolute">' + item.name + '</span>');
			row.push('	</div>');
			row.push('</div>');

			return row.join('');
		};

		var toPercent = function(value, total) {
			return Math.round((value/total)*100);
		};

		var html = [];
		html.push('<div style="font-size: 12px; line-height: 1em;  text-align: left; font-family: Helvetica, Calibri, Arial, sans-serif; text-shadow: none;  display: inline-block; color: rgb(34, 34, 34); font-weight: normal; border: none; margin: 0px auto; padding: 10px; background-color: rgba(255, 253, 242, 0.952941); width: 98%; background-position: initial initial; background-repeat: initial initial;">');
		html.push('	<div>');
		html.push('		<h1 style="font-size: 24px; line-height: 1em; z-index: 999; text-align: left; font-family: Helvetica, Calibri, Arial, sans-serif; text-shadow: none; box-shadow: none; display: inline-block; color: rgb(34, 34, 34); font-weight: normal; border: none; margin: 10px 0px; padding: 0px; background-image: none; width: auto; background-position: initial initial; background-repeat: initial initial;">');
		html.push('			Page Load Time Breakdown / <span style="color:' + network.itemColor + '">network</span> / <span style="color:' + server.itemColor + '">server</span> / <span style="color:' + browser.itemColor + '">browser</span>');
		html.push('		</h1>');
		html.push('	</div>');
		html.push(addRow(redirect));
		html.push(addRow(dns));
		html.push(addRow(tcp));
		html.push(addRow(request));
		html.push(addRow(response));
		html.push(addRow(dom));
		html.push(addRow(dominteractive));
		html.push(addRow(domcontent));
		html.push(addRow(onload));

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