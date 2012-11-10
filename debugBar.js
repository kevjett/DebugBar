/*jshint browser:true, eqnull:true */
/*global jQuery:false */
window.debugBar = (function() {
	'use strict';

	debugger;

	var modules = {};
	var initd = {};

	var bar = function(moduleName) {
		return getModule(moduleName);
	};

	bar.list = listModules;
	bar.register = registerModule;

	function getModule(name) {
		return initModule(name);
	}

	function listModules() {
		var list = [];
		for (var name in modules) {
			if (modules.hasOwnProperty(name)) {
				list.push(name);
			}
		}
		return list;
	}

	function initModule(name) {
		var mod = modules[name];
		if (typeof(mod) == 'function' && !initd[name]) {
			modules[name] = mod = mod(bar);
			initd[name] = true;
		}
		return mod;
	}

	function registerModule(name, definition) {
		modules[name] = definition;
	}

	return bar;

}());