/*jshint browser:true, eqnull:true */
/*global jQuery:false */
window.debugBar = (function() {
	'use strict';

	var modules = {};
	var initd = {};

	var bar = function(moduleName) {
		return getModule(moduleName);
	};

	bar.list = listModules;
	bar.register = registerModule;
	bar.update = createDispatcher();

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

	function createDispatcher() {
		var listeners = [];
		var dispatcher = function() {
			for (var i = 0, len = listeners.length; i<len; i++) {
				listeners.call(bar);
			}
		};

		dispatcher.addListener = function(listener) {
			listeners.push(listener);
		};

		dispatcher.removeListener = function(listener) {
			var idx = listeners.indexOf(listener);
			if (idx > -1) {
				listeners.splice(idx, 1);
			}
		};

		return dispatcher;
	}

	return bar;

}());