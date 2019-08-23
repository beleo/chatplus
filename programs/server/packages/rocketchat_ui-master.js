(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Inject = Package['meteorhacks:inject-initial'].Inject;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var DynamicCss;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:ui-master":{"server":{"inject.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_ui-master/server/inject.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals Inject */var renderDynamicCssList = _.debounce(Meteor.bindEnvironment(function () {                         // 1
	// const variables = RocketChat.models.Settings.findOne({_id:'theme-custom-variables'}, {fields: { value: 1}});       // 3
	var colors = RocketChat.models.Settings.find({                                                                        // 4
		_id: /theme-color-rc/i                                                                                               // 4
	}, {                                                                                                                  // 4
		fields: {                                                                                                            // 4
			value: 1,                                                                                                           // 4
			editor: 1                                                                                                           // 4
		}                                                                                                                    // 4
	}).fetch().filter(function (color) {                                                                                  // 4
		return color && color.value;                                                                                         // 4
	});                                                                                                                   // 4
                                                                                                                       //
	if (!colors) {                                                                                                        // 6
		return;                                                                                                              // 7
	}                                                                                                                     // 8
                                                                                                                       //
	var css = colors.map(function (_ref) {                                                                                // 9
		var _id = _ref._id,                                                                                                  // 9
		    value = _ref.value,                                                                                              // 9
		    editor = _ref.editor;                                                                                            // 9
                                                                                                                       //
		if (editor === 'expression') {                                                                                       // 10
			return "--" + _id.replace('theme-color-', '') + ": var(--" + value + ");";                                          // 11
		}                                                                                                                    // 12
                                                                                                                       //
		return "--" + _id.replace('theme-color-', '') + ": " + value + ";";                                                  // 13
	}).join('\n');                                                                                                        // 14
	Inject.rawBody('dynamic-variables', "<style id='css-variables'> :root {" + css + "}</style>");                        // 15
}), 500);                                                                                                              // 16
                                                                                                                       //
renderDynamicCssList(); // RocketChat.models.Settings.find({_id:'theme-custom-variables'}, {fields: { value: 1}}).observe({
// 	changed: renderDynamicCssList                                                                                      // 21
// });                                                                                                                 // 22
                                                                                                                       //
RocketChat.models.Settings.find({                                                                                      // 24
	_id: /theme-color-rc/i                                                                                                // 24
}, {                                                                                                                   // 24
	fields: {                                                                                                             // 24
		value: 1                                                                                                             // 24
	}                                                                                                                     // 24
}).observe({                                                                                                           // 24
	changed: renderDynamicCssList                                                                                         // 25
});                                                                                                                    // 24
Inject.rawHead('dynamic', "<script>(" + require('./dynamic-css.js').default.toString().replace(/\/\/.*?\n/g, '') + ")()</script>");
Inject.rawHead('page-loading', "<style>" + Assets.getText('public/loading.css') + "</style>");                         // 30
Inject.rawBody('icons', Assets.getText('public/icons.svg'));                                                           // 32
Inject.rawBody('page-loading-div', "\n<div id=\"initial-page-loading\" class=\"page-loading\">\n\t<div class=\"loading-animation\">\n\t\t<div class=\"bounce1\"></div>\n\t\t<div class=\"bounce2\"></div>\n\t\t<div class=\"bounce3\"></div>\n\t</div>\n</div>");
                                                                                                                       //
if (process.env.DISABLE_ANIMATION || process.env.TEST_MODE === 'true') {                                               // 43
	Inject.rawHead('disable-animation', "\n\t<style>\n\t\tbody, body * {\n\t\t\tanimation: none !important;\n\t\t\ttransition: none !important;\n\t\t}\n\t</style>\n\t<script>\n\t\twindow.DISABLE_ANIMATION = true;\n\t</script>\n\t");
}                                                                                                                      // 55
                                                                                                                       //
RocketChat.settings.get('Assets_SvgFavicon_Enable', function (key, value) {                                            // 57
	var standardFavicons = "\n\t\t<link rel=\"icon\" sizes=\"16x16\" type=\"image/png\" href=\"assets/favicon_16.png\" />\n\t\t<link rel=\"icon\" sizes=\"32x32\" type=\"image/png\" href=\"assets/favicon_32.png\" />";
                                                                                                                       //
	if (value) {                                                                                                          // 62
		Inject.rawHead(key, standardFavicons + "\n\t\t\t<link rel=\"icon\" sizes=\"any\" type=\"image/svg+xml\" href=\"assets/favicon.svg\" />");
	} else {                                                                                                              // 66
		Inject.rawHead(key, standardFavicons);                                                                               // 67
	}                                                                                                                     // 68
});                                                                                                                    // 69
RocketChat.settings.get('theme-color-sidebar-background', function (key, value) {                                      // 71
	Inject.rawHead(key, "<style>body { background-color: " + value + ";}</style>" + ("<meta name=\"msapplication-TileColor\" content=\"" + value + "\" />") + ("<meta name=\"theme-color\" content=\"" + value + "\" />"));
});                                                                                                                    // 75
RocketChat.settings.get('Accounts_ForgetUserSessionOnWindowClose', function (key, value) {                             // 77
	if (value) {                                                                                                          // 78
		Inject.rawModHtml(key, function (html) {                                                                             // 79
			var script = "\n\t\t\t\t<script>\n\t\t\t\t\tif (Meteor._localStorage._data === undefined && window.sessionStorage) {\n\t\t\t\t\t\tMeteor._localStorage = window.sessionStorage;\n\t\t\t\t\t}\n\t\t\t\t</script>\n\t\t\t";
			return html.replace(/<\/body>/, script + "\n</body>");                                                              // 87
		});                                                                                                                  // 88
	} else {                                                                                                              // 89
		Inject.rawModHtml(key, function (html) {                                                                             // 90
			return html;                                                                                                        // 91
		});                                                                                                                  // 92
	}                                                                                                                     // 93
});                                                                                                                    // 94
RocketChat.settings.get('Site_Name', function (key) {                                                                  // 96
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Chat';                               // 96
	Inject.rawHead(key, "<title>" + value + "</title>" + ("<meta name=\"application-name\" content=\"" + value + "\">") + ("<meta name=\"apple-mobile-web-app-title\" content=\"" + value + "\">"));
});                                                                                                                    // 101
RocketChat.settings.get('Meta_language', function (key) {                                                              // 103
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 103
	Inject.rawHead(key, "<meta http-equiv=\"content-language\" content=\"" + value + "\">" + ("<meta name=\"language\" content=\"" + value + "\">"));
});                                                                                                                    // 107
RocketChat.settings.get('Meta_robots', function (key) {                                                                // 109
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 109
	Inject.rawHead(key, "<meta name=\"robots\" content=\"" + value + "\">");                                              // 110
});                                                                                                                    // 111
RocketChat.settings.get('Meta_msvalidate01', function (key) {                                                          // 113
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 113
	Inject.rawHead(key, "<meta name=\"msvalidate.01\" content=\"" + value + "\">");                                       // 114
});                                                                                                                    // 115
RocketChat.settings.get('Meta_google-site-verification', function (key) {                                              // 117
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 117
	Inject.rawHead(key, "<meta name=\"google-site-verification\" content=\"" + value + "\" />");                          // 118
});                                                                                                                    // 119
RocketChat.settings.get('Meta_fb_app_id', function (key) {                                                             // 121
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 121
	Inject.rawHead(key, "<meta property=\"fb:app_id\" content=\"" + value + "\">");                                       // 122
});                                                                                                                    // 123
RocketChat.settings.get('Meta_custom', function (key) {                                                                // 125
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 125
	Inject.rawHead(key, value);                                                                                           // 126
});                                                                                                                    // 127
Meteor.defer(function () {                                                                                             // 129
	var baseUrl = void 0;                                                                                                 // 130
                                                                                                                       //
	if (__meteor_runtime_config__.ROOT_URL_PATH_PREFIX && __meteor_runtime_config__.ROOT_URL_PATH_PREFIX.trim() !== '') {
		baseUrl = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX;                                                            // 132
	} else {                                                                                                              // 133
		baseUrl = '/';                                                                                                       // 134
	}                                                                                                                     // 135
                                                                                                                       //
	if (/\/$/.test(baseUrl) === false) {                                                                                  // 136
		baseUrl += '/';                                                                                                      // 137
	}                                                                                                                     // 138
                                                                                                                       //
	Inject.rawHead('base', "<base href=\"" + baseUrl + "\">");                                                            // 139
});                                                                                                                    // 140
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dynamic-css.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_ui-master/server/dynamic-css.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global DynamicCss */'use strict';                                                                                   // 1
                                                                                                                       //
module.exportDefault(function () {                                                                                     // 1
	var debounce = function (func, wait, immediate) {                                                                     // 6
		var timeout = void 0;                                                                                                // 7
		return function () {                                                                                                 // 8
			var _this = this;                                                                                                   // 8
                                                                                                                       //
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {                              // 8
				args[_key] = arguments[_key];                                                                                      // 8
			}                                                                                                                   // 8
                                                                                                                       //
			var later = function () {                                                                                           // 9
				timeout = null;                                                                                                    // 10
				!immediate && func.apply(_this, args);                                                                             // 11
			};                                                                                                                  // 12
                                                                                                                       //
			var callNow = immediate && !timeout;                                                                                // 13
			clearTimeout(timeout);                                                                                              // 14
			timeout = setTimeout(later, wait);                                                                                  // 15
			callNow && func.apply(this, args);                                                                                  // 16
		};                                                                                                                   // 17
	};                                                                                                                    // 18
                                                                                                                       //
	var cssVarPoly = {                                                                                                    // 19
		test: function () {                                                                                                  // 20
			return window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)');                                    // 20
		},                                                                                                                   // 20
		init: function () {                                                                                                  // 21
			if (this.test()) {                                                                                                  // 22
				return;                                                                                                            // 23
			}                                                                                                                   // 24
                                                                                                                       //
			console.time('cssVarPoly');                                                                                         // 25
			cssVarPoly.ratifiedVars = {};                                                                                       // 26
			cssVarPoly.varsByBlock = [];                                                                                        // 27
			cssVarPoly.oldCSS = [];                                                                                             // 28
			cssVarPoly.findCSS();                                                                                               // 30
			cssVarPoly.updateCSS();                                                                                             // 31
			console.timeEnd('cssVarPoly');                                                                                      // 32
		},                                                                                                                   // 33
		findCSS: function () {                                                                                               // 34
			var styleBlocks = Array.prototype.concat.apply([], document.querySelectorAll('#css-variables, link[type="text/css"].__meteor-css__')); // we need to track the order of the style/link elements when we save off the CSS, set a counter
                                                                                                                       //
			var counter = 1; // loop through all CSS blocks looking for CSS variables being set                                 // 38
                                                                                                                       //
			styleBlocks.map(function (block) {                                                                                  // 41
				// console.log(block.nodeName);                                                                                    // 42
				if (block.nodeName === 'STYLE') {                                                                                  // 43
					var theCSS = block.innerHTML;                                                                                     // 44
					cssVarPoly.findSetters(theCSS, counter);                                                                          // 45
					cssVarPoly.oldCSS[counter++] = theCSS;                                                                            // 46
				} else if (block.nodeName === 'LINK') {                                                                            // 47
					var url = block.getAttribute('href');                                                                             // 48
					cssVarPoly.oldCSS[counter] = '';                                                                                  // 49
					cssVarPoly.getLink(url, counter, function (counter, request) {                                                    // 50
						cssVarPoly.findSetters(request.responseText, counter);                                                           // 51
						cssVarPoly.oldCSS[counter++] = request.responseText;                                                             // 52
						cssVarPoly.updateCSS();                                                                                          // 53
					});                                                                                                               // 54
				}                                                                                                                  // 55
			});                                                                                                                 // 56
		},                                                                                                                   // 57
		// find all the "--variable: value" matches in a provided block of CSS and add them to the master list               // 59
		findSetters: function (theCSS, counter) {                                                                            // 60
			// console.log(theCSS);                                                                                             // 61
			cssVarPoly.varsByBlock[counter] = theCSS.match(/(--[^:; ]+:..*?;)/g);                                               // 62
		},                                                                                                                   // 63
		// run through all the CSS blocks to update the variables and then inject on the page                                // 65
		updateCSS: debounce(function () {                                                                                    // 66
			// first lets loop through all the variables to make sure later vars trump earlier vars                             // 67
			cssVarPoly.ratifySetters(cssVarPoly.varsByBlock); // loop through the css blocks (styles and links)                 // 68
                                                                                                                       //
			cssVarPoly.oldCSS.filter(function (e) {                                                                             // 71
				return e;                                                                                                          // 71
			}).forEach(function (css, id) {                                                                                     // 71
				var newCSS = cssVarPoly.replaceGetters(css, cssVarPoly.ratifiedVars);                                              // 72
				var el = document.querySelector("#inserted" + id);                                                                 // 73
                                                                                                                       //
				if (el) {                                                                                                          // 74
					// console.log("updating")                                                                                        // 75
					el.innerHTML = newCSS;                                                                                            // 76
				} else {                                                                                                           // 77
					// console.log("adding");                                                                                         // 78
					var style = document.createElement('style');                                                                      // 79
					style.type = 'text/css';                                                                                          // 80
					style.innerHTML = newCSS;                                                                                         // 81
					style.classList.add('inserted');                                                                                  // 82
					style.id = "inserted" + id;                                                                                       // 83
					document.getElementsByTagName('head')[0].appendChild(style);                                                      // 84
				}                                                                                                                  // 85
			});                                                                                                                 // 86
		}, 100),                                                                                                             // 87
		// parse a provided block of CSS looking for a provided list of variables and replace the --var-name with the correct value
		replaceGetters: function (oldCSS, varList) {                                                                         // 90
			return oldCSS.replace(/var\((--.*?)\)/gm, function (all, variable) {                                                // 91
				return varList[variable];                                                                                          // 91
			});                                                                                                                 // 91
		},                                                                                                                   // 92
		// determine the css variable name value pair and track the latest                                                   // 94
		ratifySetters: function (varList) {                                                                                  // 95
			// loop through each block in order, to maintain order specificity                                                  // 96
			varList.filter(function (curVars) {                                                                                 // 97
				return curVars;                                                                                                    // 97
			}).forEach(function (curVars) {                                                                                     // 97
				// const curVars = varList[curBlock] || [];                                                                        // 98
				curVars.forEach(function (theVar) {                                                                                // 99
					// console.log(theVar);                                                                                           // 100
					// split on the name value pair separator                                                                         // 101
					var matches = theVar.split(/:\s*/); // console.log(matches);                                                      // 102
					// put it in an object based on the varName. Each time we do this it will override a previous use and so will always have the last set be the winner
					// 0 = the name, 1 = the value, strip off the ; if it is there                                                    // 105
                                                                                                                       //
					cssVarPoly.ratifiedVars[matches[0]] = matches[1].replace(/;/, '');                                                // 106
				});                                                                                                                // 107
			});                                                                                                                 // 108
			Object.keys(cssVarPoly.ratifiedVars).filter(function (key) {                                                        // 109
				return cssVarPoly.ratifiedVars[key].indexOf('var') > -1;                                                           // 110
			}).forEach(function (key) {                                                                                         // 111
				cssVarPoly.ratifiedVars[key] = cssVarPoly.ratifiedVars[key].replace(/var\((--.*?)\)/gm, function (all, variable) {
					return cssVarPoly.ratifiedVars[variable];                                                                         // 113
				});                                                                                                                // 114
			});                                                                                                                 // 115
		},                                                                                                                   // 116
		// get the CSS file (same domain for now)                                                                            // 117
		getLink: function (url, counter, success) {                                                                          // 118
			var request = new XMLHttpRequest();                                                                                 // 119
			request.open('GET', url, true);                                                                                     // 120
			request.overrideMimeType('text/css;');                                                                              // 121
                                                                                                                       //
			request.onload = function () {                                                                                      // 122
				if (request.status >= 200 && request.status < 400) {                                                               // 123
					// Success!                                                                                                       // 124
					// console.log(request.responseText);                                                                             // 125
					if (typeof success === 'function') {                                                                              // 126
						success(counter, request);                                                                                       // 127
					}                                                                                                                 // 128
				} else {                                                                                                           // 129
					// We reached our target server, but it returned an error                                                         // 130
					console.warn('an error was returned from:', url);                                                                 // 131
				}                                                                                                                  // 132
			};                                                                                                                  // 133
                                                                                                                       //
			request.onerror = function () {                                                                                     // 135
				// There was a connection error of some sort                                                                       // 136
				console.warn('we could not get anything from:', url);                                                              // 137
			};                                                                                                                  // 138
                                                                                                                       //
			request.send();                                                                                                     // 140
		}                                                                                                                    // 141
	};                                                                                                                    // 19
	var stateCheck = setInterval(function () {                                                                            // 144
		if (document.readyState === 'complete' && typeof Meteor !== 'undefined') {                                           // 145
			clearInterval(stateCheck); // document ready                                                                        // 146
                                                                                                                       //
			cssVarPoly.init();                                                                                                  // 148
		}                                                                                                                    // 149
	}, 100);                                                                                                              // 150
	DynamicCss = typeof DynamicCss !== 'undefined' ? DynamicCss : {};                                                     // 152
                                                                                                                       //
	DynamicCss.test = function () {                                                                                       // 153
		return window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)');                                     // 153
	};                                                                                                                    // 153
                                                                                                                       //
	DynamicCss.run = debounce(function () {                                                                               // 154
		var replace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;                             // 154
                                                                                                                       //
		if (replace) {                                                                                                       // 155
			// const variables = RocketChat.models.Settings.findOne({_id:'theme-custom-variables'}, {fields: { value: 1}});     // 156
			var colors = RocketChat.settings.collection.find({                                                                  // 157
				_id: /theme-color-rc/i                                                                                             // 157
			}, {                                                                                                                // 157
				fields: {                                                                                                          // 157
					value: 1,                                                                                                         // 157
					editor: 1                                                                                                         // 157
				}                                                                                                                  // 157
			}).fetch().filter(function (color) {                                                                                // 157
				return color && color.value;                                                                                       // 157
			});                                                                                                                 // 157
                                                                                                                       //
			if (!colors) {                                                                                                      // 159
				return;                                                                                                            // 160
			}                                                                                                                   // 161
                                                                                                                       //
			var css = colors.map(function (_ref) {                                                                              // 162
				var _id = _ref._id,                                                                                                // 162
				    value = _ref.value,                                                                                            // 162
				    editor = _ref.editor;                                                                                          // 162
                                                                                                                       //
				if (editor === 'expression') {                                                                                     // 163
					return "--" + _id.replace('theme-color-', '') + ": var(--" + value + ");";                                        // 164
				}                                                                                                                  // 165
                                                                                                                       //
				return "--" + _id.replace('theme-color-', '') + ": " + value + ";";                                                // 166
			}).join('\n');                                                                                                      // 167
			document.querySelector('#css-variables').innerHTML = ":root {" + css + "}";                                         // 168
		}                                                                                                                    // 169
                                                                                                                       //
		cssVarPoly.init();                                                                                                   // 170
	}, 1000);                                                                                                             // 171
});                                                                                                                    // 172
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:ui-master/server/inject.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:ui-master'] = {};

})();

//# sourceMappingURL=rocketchat_ui-master.js.map
