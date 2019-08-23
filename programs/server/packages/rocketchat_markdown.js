(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:markdown":{"settings.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_markdown/settings.js                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var Meteor = void 0;                                                                                               // 1
module.watch(require("meteor/meteor"), {                                                                           // 1
	Meteor: function (v) {                                                                                            // 1
		Meteor = v;                                                                                                      // 1
	}                                                                                                                 // 1
}, 0);                                                                                                             // 1
var RocketChat = void 0;                                                                                           // 1
module.watch(require("meteor/rocketchat:lib"), {                                                                   // 1
	RocketChat: function (v) {                                                                                        // 1
		RocketChat = v;                                                                                                  // 1
	}                                                                                                                 // 1
}, 1);                                                                                                             // 1
Meteor.startup(function () {                                                                                       // 4
	RocketChat.settings.add('Markdown_Parser', 'original', {                                                          // 5
		type: 'select',                                                                                                  // 6
		values: [{                                                                                                       // 7
			key: 'disabled',                                                                                                // 8
			i18nLabel: 'Disabled'                                                                                           // 9
		}, {                                                                                                             // 7
			key: 'original',                                                                                                // 11
			i18nLabel: 'Original'                                                                                           // 12
		}, {                                                                                                             // 10
			key: 'marked',                                                                                                  // 14
			i18nLabel: 'Marked'                                                                                             // 15
		}],                                                                                                              // 13
		group: 'Message',                                                                                                // 17
		section: 'Markdown',                                                                                             // 18
		"public": true                                                                                                   // 19
	});                                                                                                               // 5
	var enableQueryOriginal = {                                                                                       // 22
		_id: 'Markdown_Parser',                                                                                          // 22
		value: 'original'                                                                                                // 22
	};                                                                                                                // 22
	RocketChat.settings.add('Markdown_Headers', false, {                                                              // 23
		type: 'boolean',                                                                                                 // 24
		group: 'Message',                                                                                                // 25
		section: 'Markdown',                                                                                             // 26
		"public": true,                                                                                                  // 27
		enableQuery: enableQueryOriginal                                                                                 // 28
	});                                                                                                               // 23
	RocketChat.settings.add('Markdown_SupportSchemesForLink', 'http,https', {                                         // 30
		type: 'string',                                                                                                  // 31
		group: 'Message',                                                                                                // 32
		section: 'Markdown',                                                                                             // 33
		"public": true,                                                                                                  // 34
		i18nDescription: 'Markdown_SupportSchemesForLink_Description',                                                   // 35
		enableQuery: enableQueryOriginal                                                                                 // 36
	});                                                                                                               // 30
	var enableQueryMarked = {                                                                                         // 39
		_id: 'Markdown_Parser',                                                                                          // 39
		value: 'marked'                                                                                                  // 39
	};                                                                                                                // 39
	RocketChat.settings.add('Markdown_Marked_GFM', true, {                                                            // 40
		type: 'boolean',                                                                                                 // 41
		group: 'Message',                                                                                                // 42
		section: 'Markdown',                                                                                             // 43
		"public": true,                                                                                                  // 44
		enableQuery: enableQueryMarked                                                                                   // 45
	});                                                                                                               // 40
	RocketChat.settings.add('Markdown_Marked_Tables', true, {                                                         // 47
		type: 'boolean',                                                                                                 // 48
		group: 'Message',                                                                                                // 49
		section: 'Markdown',                                                                                             // 50
		"public": true,                                                                                                  // 51
		enableQuery: enableQueryMarked                                                                                   // 52
	});                                                                                                               // 47
	RocketChat.settings.add('Markdown_Marked_Breaks', true, {                                                         // 54
		type: 'boolean',                                                                                                 // 55
		group: 'Message',                                                                                                // 56
		section: 'Markdown',                                                                                             // 57
		"public": true,                                                                                                  // 58
		enableQuery: enableQueryMarked                                                                                   // 59
	});                                                                                                               // 54
	RocketChat.settings.add('Markdown_Marked_Pedantic', false, {                                                      // 61
		type: 'boolean',                                                                                                 // 62
		group: 'Message',                                                                                                // 63
		section: 'Markdown',                                                                                             // 64
		"public": true,                                                                                                  // 65
		enableQuery: [{                                                                                                  // 66
			_id: 'Markdown_Parser',                                                                                         // 67
			value: 'marked'                                                                                                 // 68
		}, {                                                                                                             // 66
			_id: 'Markdown_Marked_GFM',                                                                                     // 70
			value: false                                                                                                    // 71
		}]                                                                                                               // 69
	});                                                                                                               // 61
	RocketChat.settings.add('Markdown_Marked_SmartLists', true, {                                                     // 74
		type: 'boolean',                                                                                                 // 75
		group: 'Message',                                                                                                // 76
		section: 'Markdown',                                                                                             // 77
		"public": true,                                                                                                  // 78
		enableQuery: enableQueryMarked                                                                                   // 79
	});                                                                                                               // 74
	RocketChat.settings.add('Markdown_Marked_Smartypants', true, {                                                    // 81
		type: 'boolean',                                                                                                 // 82
		group: 'Message',                                                                                                // 83
		section: 'Markdown',                                                                                             // 84
		"public": true,                                                                                                  // 85
		enableQuery: enableQueryMarked                                                                                   // 86
	});                                                                                                               // 81
});                                                                                                                // 88
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"markdown.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_markdown/markdown.js                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                            //
                                                                                                                   //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                   //
                                                                                                                   //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                  //
                                                                                                                   //
var Meteor = void 0;                                                                                               // 1
module.watch(require("meteor/meteor"), {                                                                           // 1
	Meteor: function (v) {                                                                                            // 1
		Meteor = v;                                                                                                      // 1
	}                                                                                                                 // 1
}, 0);                                                                                                             // 1
var Blaze = void 0;                                                                                                // 1
module.watch(require("meteor/blaze"), {                                                                            // 1
	Blaze: function (v) {                                                                                             // 1
		Blaze = v;                                                                                                       // 1
	}                                                                                                                 // 1
}, 1);                                                                                                             // 1
var RocketChat = void 0;                                                                                           // 1
module.watch(require("meteor/rocketchat:lib"), {                                                                   // 1
	RocketChat: function (v) {                                                                                        // 1
		RocketChat = v;                                                                                                  // 1
	}                                                                                                                 // 1
}, 2);                                                                                                             // 1
var marked = void 0;                                                                                               // 1
module.watch(require("./parser/marked/marked.js"), {                                                               // 1
	marked: function (v) {                                                                                            // 1
		marked = v;                                                                                                      // 1
	}                                                                                                                 // 1
}, 3);                                                                                                             // 1
var original = void 0;                                                                                             // 1
module.watch(require("./parser/original/original.js"), {                                                           // 1
	original: function (v) {                                                                                          // 1
		original = v;                                                                                                    // 1
	}                                                                                                                 // 1
}, 4);                                                                                                             // 1
var parsers = {                                                                                                    // 12
	original: original,                                                                                               // 13
	marked: marked                                                                                                    // 14
};                                                                                                                 // 12
                                                                                                                   //
var MarkdownClass = function () {                                                                                  //
	function MarkdownClass() {                                                                                        //
		(0, _classCallCheck3.default)(this, MarkdownClass);                                                              //
	}                                                                                                                 //
                                                                                                                   //
	MarkdownClass.prototype.parse = function () {                                                                     //
		function parse(text) {                                                                                           //
			var message = {                                                                                                 // 19
				html: _.escapeHTML(text)                                                                                       // 20
			};                                                                                                              // 19
			return this.mountTokensBack(this.parseMessageNotEscaped(message)).html;                                         // 22
		}                                                                                                                // 23
                                                                                                                   //
		return parse;                                                                                                    //
	}();                                                                                                              //
                                                                                                                   //
	MarkdownClass.prototype.parseNotEscaped = function () {                                                           //
		function parseNotEscaped(text) {                                                                                 //
			var message = {                                                                                                 // 26
				html: text                                                                                                     // 27
			};                                                                                                              // 26
			return this.mountTokensBack(this.parseMessageNotEscaped(message)).html;                                         // 29
		}                                                                                                                // 30
                                                                                                                   //
		return parseNotEscaped;                                                                                          //
	}();                                                                                                              //
                                                                                                                   //
	MarkdownClass.prototype.parseMessageNotEscaped = function () {                                                    //
		function parseMessageNotEscaped(message) {                                                                       //
			var parser = RocketChat.settings.get('Markdown_Parser');                                                        // 33
                                                                                                                   //
			if (parser === 'disabled') {                                                                                    // 35
				return message;                                                                                                // 36
			}                                                                                                               // 37
                                                                                                                   //
			if (typeof parsers[parser] === 'function') {                                                                    // 39
				return parsers[parser](message);                                                                               // 40
			}                                                                                                               // 41
                                                                                                                   //
			return parsers['original'](message);                                                                            // 42
		}                                                                                                                // 43
                                                                                                                   //
		return parseMessageNotEscaped;                                                                                   //
	}();                                                                                                              //
                                                                                                                   //
	MarkdownClass.prototype.mountTokensBack = function () {                                                           //
		function mountTokensBack(message) {                                                                              //
			if (message.tokens && message.tokens.length > 0) {                                                              // 46
				var _loop = function (token, text) {                                                                           // 46
					message.html = message.html.replace(token, function () {                                                      // 48
						return text;                                                                                                 // 48
					}); // Uses lambda so doesn't need to escape $                                                                // 48
				};                                                                                                             // 46
                                                                                                                   //
				for (var _iterator = message.tokens, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
					var _ref2;                                                                                                    // 47
                                                                                                                   //
					if (_isArray) {                                                                                               // 47
						if (_i >= _iterator.length) break;                                                                           // 47
						_ref2 = _iterator[_i++];                                                                                     // 47
					} else {                                                                                                      // 47
						_i = _iterator.next();                                                                                       // 47
						if (_i.done) break;                                                                                          // 47
						_ref2 = _i.value;                                                                                            // 47
					}                                                                                                             // 47
                                                                                                                   //
					var _ref = _ref2;                                                                                             // 47
					var token = _ref.token;                                                                                       // 47
					var text = _ref.text;                                                                                         // 47
                                                                                                                   //
					_loop(token, text);                                                                                           // 47
				}                                                                                                              // 49
			}                                                                                                               // 50
                                                                                                                   //
			return message;                                                                                                 // 52
		}                                                                                                                // 53
                                                                                                                   //
		return mountTokensBack;                                                                                          //
	}();                                                                                                              //
                                                                                                                   //
	return MarkdownClass;                                                                                             //
}();                                                                                                               //
                                                                                                                   //
var Markdown = new MarkdownClass();                                                                                // 56
RocketChat.Markdown = Markdown; // renderMessage already did html escape                                           // 57
                                                                                                                   //
var MarkdownMessage = function (message) {                                                                         // 60
	if (_.trim(message != null ? message.html : undefined)) {                                                         // 61
		message = Markdown.parseMessageNotEscaped(message);                                                              // 62
	}                                                                                                                 // 63
                                                                                                                   //
	return message;                                                                                                   // 65
};                                                                                                                 // 66
                                                                                                                   //
RocketChat.callbacks.add('renderMessage', MarkdownMessage, RocketChat.callbacks.priority.HIGH, 'markdown');        // 68
                                                                                                                   //
if (Meteor.isClient) {                                                                                             // 70
	Blaze.registerHelper('RocketChatMarkdown', function (text) {                                                      // 71
		return Markdown.parse(text);                                                                                     // 71
	});                                                                                                               // 71
	Blaze.registerHelper('RocketChatMarkdownUnescape', function (text) {                                              // 72
		return Markdown.parseNotEscaped(text);                                                                           // 72
	});                                                                                                               // 72
}                                                                                                                  // 73
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"parser":{"marked":{"marked.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_markdown/parser/marked/marked.js                                                            //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.export({                                                                                                    // 1
	marked: function () {                                                                                             // 1
		return marked;                                                                                                   // 1
	}                                                                                                                 // 1
});                                                                                                                // 1
var RocketChat = void 0;                                                                                           // 1
module.watch(require("meteor/rocketchat:lib"), {                                                                   // 1
	RocketChat: function (v) {                                                                                        // 1
		RocketChat = v;                                                                                                  // 1
	}                                                                                                                 // 1
}, 0);                                                                                                             // 1
var Random = void 0;                                                                                               // 1
module.watch(require("meteor/random"), {                                                                           // 1
	Random: function (v) {                                                                                            // 1
		Random = v;                                                                                                      // 1
	}                                                                                                                 // 1
}, 1);                                                                                                             // 1
                                                                                                                   //
var _ = void 0;                                                                                                    // 1
                                                                                                                   //
module.watch(require("meteor/underscore"), {                                                                       // 1
	_: function (v) {                                                                                                 // 1
		_ = v;                                                                                                           // 1
	}                                                                                                                 // 1
}, 2);                                                                                                             // 1
var hljs = void 0;                                                                                                 // 1
module.watch(require("highlight.js"), {                                                                            // 1
	"default": function (v) {                                                                                         // 1
		hljs = v;                                                                                                        // 1
	}                                                                                                                 // 1
}, 3);                                                                                                             // 1
                                                                                                                   //
var _marked = void 0;                                                                                              // 1
                                                                                                                   //
module.watch(require("marked"), {                                                                                  // 1
	"default": function (v) {                                                                                         // 1
		_marked = v;                                                                                                     // 1
	}                                                                                                                 // 1
}, 4);                                                                                                             // 1
var renderer = new _marked.Renderer();                                                                             // 7
var msg = null;                                                                                                    // 9
                                                                                                                   //
renderer.code = function (code, lang, escaped) {                                                                   // 11
	if (this.options.highlight) {                                                                                     // 12
		var out = this.options.highlight(code, lang);                                                                    // 13
                                                                                                                   //
		if (out != null && out !== code) {                                                                               // 14
			escaped = true;                                                                                                 // 15
			code = out;                                                                                                     // 16
		}                                                                                                                // 17
	}                                                                                                                 // 18
                                                                                                                   //
	var text = null;                                                                                                  // 20
                                                                                                                   //
	if (!lang) {                                                                                                      // 22
		text = "<pre><code class=\"code-colors hljs\">" + (escaped ? code : _.escapeHTML(code, true)) + "</code></pre>";
	} else {                                                                                                          // 24
		text = "<pre><code class=\"code-colors hljs " + escape(lang, true) + "\">" + (escaped ? code : _.escapeHTML(code, true)) + "</code></pre>";
	}                                                                                                                 // 26
                                                                                                                   //
	if (_.isString(msg)) {                                                                                            // 28
		return text;                                                                                                     // 29
	}                                                                                                                 // 30
                                                                                                                   //
	var token = "=!=" + Random.id() + "=!=";                                                                          // 32
	msg.tokens.push({                                                                                                 // 33
		highlight: true,                                                                                                 // 34
		token: token,                                                                                                    // 35
		text: text                                                                                                       // 36
	});                                                                                                               // 33
	return token;                                                                                                     // 39
};                                                                                                                 // 40
                                                                                                                   //
renderer.codespan = function (text) {                                                                              // 42
	text = "<code class=\"code-colors inline\">" + text + "</code>";                                                  // 43
                                                                                                                   //
	if (_.isString(msg)) {                                                                                            // 44
		return text;                                                                                                     // 45
	}                                                                                                                 // 46
                                                                                                                   //
	var token = "=!=" + Random.id() + "=!=";                                                                          // 48
	msg.tokens.push({                                                                                                 // 49
		token: token,                                                                                                    // 50
		text: text                                                                                                       // 51
	});                                                                                                               // 49
	return token;                                                                                                     // 54
};                                                                                                                 // 55
                                                                                                                   //
renderer.blockquote = function (quote) {                                                                           // 57
	return "<blockquote class=\"background-transparent-darker-before\">" + quote + "</blockquote>";                   // 58
};                                                                                                                 // 59
                                                                                                                   //
var highlight = function (code, lang) {                                                                            // 61
	if (!lang) {                                                                                                      // 62
		return code;                                                                                                     // 63
	}                                                                                                                 // 64
                                                                                                                   //
	try {                                                                                                             // 65
		return hljs.highlight(lang, code).value;                                                                         // 66
	} catch (e) {                                                                                                     // 67
		// Unknown language                                                                                              // 68
		return code;                                                                                                     // 69
	}                                                                                                                 // 70
};                                                                                                                 // 71
                                                                                                                   //
var gfm = null;                                                                                                    // 73
var tables = null;                                                                                                 // 74
var breaks = null;                                                                                                 // 75
var pedantic = null;                                                                                               // 76
var smartLists = null;                                                                                             // 77
var smartypants = null;                                                                                            // 78
                                                                                                                   //
var marked = function (message) {                                                                                  // 80
	msg = message;                                                                                                    // 81
                                                                                                                   //
	if (!msg.tokens) {                                                                                                // 83
		msg.tokens = [];                                                                                                 // 84
	}                                                                                                                 // 85
                                                                                                                   //
	if (gfm == null) {                                                                                                // 87
		gfm = RocketChat.settings.get('Markdown_Marked_GFM');                                                            // 87
	}                                                                                                                 // 87
                                                                                                                   //
	if (tables == null) {                                                                                             // 88
		tables = RocketChat.settings.get('Markdown_Marked_Tables');                                                      // 88
	}                                                                                                                 // 88
                                                                                                                   //
	if (breaks == null) {                                                                                             // 89
		breaks = RocketChat.settings.get('Markdown_Marked_Breaks');                                                      // 89
	}                                                                                                                 // 89
                                                                                                                   //
	if (pedantic == null) {                                                                                           // 90
		pedantic = RocketChat.settings.get('Markdown_Marked_Pedantic');                                                  // 90
	}                                                                                                                 // 90
                                                                                                                   //
	if (smartLists == null) {                                                                                         // 91
		smartLists = RocketChat.settings.get('Markdown_Marked_SmartLists');                                              // 91
	}                                                                                                                 // 91
                                                                                                                   //
	if (smartypants == null) {                                                                                        // 92
		smartypants = RocketChat.settings.get('Markdown_Marked_Smartypants');                                            // 92
	}                                                                                                                 // 92
                                                                                                                   //
	msg.html = _marked(_.unescapeHTML(msg.html), {                                                                    // 94
		gfm: gfm,                                                                                                        // 95
		tables: tables,                                                                                                  // 96
		breaks: breaks,                                                                                                  // 97
		pedantic: pedantic,                                                                                              // 98
		smartLists: smartLists,                                                                                          // 99
		smartypants: smartypants,                                                                                        // 100
		renderer: renderer,                                                                                              // 101
		sanitize: true,                                                                                                  // 102
		highlight: highlight                                                                                             // 103
	});                                                                                                               // 94
	return msg;                                                                                                       // 106
};                                                                                                                 // 107
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"original":{"code.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_markdown/parser/original/code.js                                                            //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.export({                                                                                                    // 1
	code: function () {                                                                                               // 1
		return code;                                                                                                     // 1
	}                                                                                                                 // 1
});                                                                                                                // 1
var Random = void 0;                                                                                               // 1
module.watch(require("meteor/random"), {                                                                           // 1
	Random: function (v) {                                                                                            // 1
		Random = v;                                                                                                      // 1
	}                                                                                                                 // 1
}, 0);                                                                                                             // 1
                                                                                                                   //
var _ = void 0;                                                                                                    // 1
                                                                                                                   //
module.watch(require("meteor/underscore"), {                                                                       // 1
	_: function (v) {                                                                                                 // 1
		_ = v;                                                                                                           // 1
	}                                                                                                                 // 1
}, 1);                                                                                                             // 1
var hljs = void 0;                                                                                                 // 1
module.watch(require("highlight.js"), {                                                                            // 1
	"default": function (v) {                                                                                         // 1
		hljs = v;                                                                                                        // 1
	}                                                                                                                 // 1
}, 2);                                                                                                             // 1
                                                                                                                   //
var inlinecode = function (message) {                                                                              // 9
	// Support `text`                                                                                                 // 10
	return message.html = message.html.replace(/(^|&gt;|[ >_*~])\`([^`\r\n]+)\`([<_*~]|\B|\b|$)/gm, function (match, p1, p2, p3) {
		var token = "=!=" + Random.id() + "=!=";                                                                         // 12
		message.tokens.push({                                                                                            // 14
			token: token,                                                                                                   // 15
			text: p1 + "<span class=\"copyonly\">`</span><span><code class=\"code-colors inline\">" + p2 + "</code></span><span class=\"copyonly\">`</span>" + p3,
			noHtml: match                                                                                                   // 17
		});                                                                                                              // 14
		return token;                                                                                                    // 20
	});                                                                                                               // 21
};                                                                                                                 // 22
                                                                                                                   //
var codeblocks = function (message) {                                                                              // 24
	// Count occurencies of ```                                                                                       // 25
	var count = (message.html.match(/```/g) || []).length;                                                            // 26
                                                                                                                   //
	if (count) {                                                                                                      // 28
		// Check if we need to add a final ```                                                                           // 30
		if (count % 2 > 0) {                                                                                             // 31
			message.html = message.html + "\n```";                                                                          // 32
			message.msg = message.msg + "\n```";                                                                            // 33
		} // Separate text in code blocks and non code blocks                                                            // 34
                                                                                                                   //
                                                                                                                   //
		var msgParts = message.html.split(/(^.*)(```(?:[a-zA-Z]+)?(?:(?:.|\r|\n)*?)```)(.*\n?)$/gm);                     // 37
                                                                                                                   //
		for (var index = 0; index < msgParts.length; index++) {                                                          // 39
			// Verify if this part is code                                                                                  // 40
			var part = msgParts[index];                                                                                     // 41
			var codeMatch = part.match(/^```(.*[\r\n\ ]?)([\s\S]*?)```+?$/);                                                // 42
                                                                                                                   //
			if (codeMatch != null) {                                                                                        // 44
				// Process highlight if this part is code                                                                      // 45
				var singleLine = codeMatch[0].indexOf('\n') === -1;                                                            // 46
				var lang = !singleLine && Array.from(hljs.listLanguages()).includes(s.trim(codeMatch[1])) ? s.trim(codeMatch[1]) : '';
                                                                                                                   //
				var _code = singleLine ? _.unescapeHTML(codeMatch[1]) : lang === '' ? _.unescapeHTML(codeMatch[1] + codeMatch[2]) : _.unescapeHTML(codeMatch[2]);
                                                                                                                   //
				var result = lang === '' ? hljs.highlightAuto(lang + _code) : hljs.highlight(lang, _code);                     // 55
				var token = "=!=" + Random.id() + "=!=";                                                                       // 56
				message.tokens.push({                                                                                          // 58
					highlight: true,                                                                                              // 59
					token: token,                                                                                                 // 60
					text: "<pre><code class='code-colors hljs " + result.language + "'><span class='copyonly'>```<br></span>" + result.value + "<span class='copyonly'><br>```</span></code></pre>",
					noHtml: "```\n" + s.stripTags(result.value) + "\n```"                                                         // 62
				});                                                                                                            // 58
				msgParts[index] = token;                                                                                       // 65
			} else {                                                                                                        // 66
				msgParts[index] = part;                                                                                        // 67
			}                                                                                                               // 68
		} // Re-mount message                                                                                            // 69
                                                                                                                   //
                                                                                                                   //
		return message.html = msgParts.join('');                                                                         // 72
	}                                                                                                                 // 73
};                                                                                                                 // 74
                                                                                                                   //
var code = function (message) {                                                                                    // 76
	if (s.trim(message.html)) {                                                                                       // 77
		if (message.tokens == null) {                                                                                    // 78
			message.tokens = [];                                                                                            // 79
		}                                                                                                                // 80
                                                                                                                   //
		codeblocks(message);                                                                                             // 82
		inlinecode(message);                                                                                             // 83
	}                                                                                                                 // 84
                                                                                                                   //
	return message;                                                                                                   // 86
};                                                                                                                 // 87
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"markdown.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_markdown/parser/original/markdown.js                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.export({                                                                                                    // 1
	markdown: function () {                                                                                           // 1
		return markdown;                                                                                                 // 1
	}                                                                                                                 // 1
});                                                                                                                // 1
var Meteor = void 0;                                                                                               // 1
module.watch(require("meteor/meteor"), {                                                                           // 1
	Meteor: function (v) {                                                                                            // 1
		Meteor = v;                                                                                                      // 1
	}                                                                                                                 // 1
}, 0);                                                                                                             // 1
var Random = void 0;                                                                                               // 1
module.watch(require("meteor/random"), {                                                                           // 1
	Random: function (v) {                                                                                            // 1
		Random = v;                                                                                                      // 1
	}                                                                                                                 // 1
}, 1);                                                                                                             // 1
                                                                                                                   //
var _ = void 0;                                                                                                    // 1
                                                                                                                   //
module.watch(require("meteor/underscore"), {                                                                       // 1
	_: function (v) {                                                                                                 // 1
		_ = v;                                                                                                           // 1
	}                                                                                                                 // 1
}, 2);                                                                                                             // 1
var RocketChat = void 0;                                                                                           // 1
module.watch(require("meteor/rocketchat:lib"), {                                                                   // 1
	RocketChat: function (v) {                                                                                        // 1
		RocketChat = v;                                                                                                  // 1
	}                                                                                                                 // 1
}, 3);                                                                                                             // 1
                                                                                                                   //
var parseNotEscaped = function (msg, message) {                                                                    // 10
	if (message && message.tokens == null) {                                                                          // 11
		message.tokens = [];                                                                                             // 12
	}                                                                                                                 // 13
                                                                                                                   //
	var addAsToken = function (html) {                                                                                // 15
		var token = "=!=" + Random.id() + "=!=";                                                                         // 16
		message.tokens.push({                                                                                            // 17
			token: token,                                                                                                   // 18
			text: html                                                                                                      // 19
		});                                                                                                              // 17
		return token;                                                                                                    // 22
	};                                                                                                                // 23
                                                                                                                   //
	var schemes = RocketChat.settings.get('Markdown_SupportSchemesForLink').split(',').join('|');                     // 25
                                                                                                                   //
	if (RocketChat.settings.get('Markdown_Headers')) {                                                                // 27
		// Support # Text for h1                                                                                         // 28
		msg = msg.replace(/^# (([\S\w\d-_\/\*\.,\\][ \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]?)+)/gm, '<h1>$1</h1>'); // Support # Text for h2
                                                                                                                   //
		msg = msg.replace(/^## (([\S\w\d-_\/\*\.,\\][ \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]?)+)/gm, '<h2>$1</h2>'); // Support # Text for h3
                                                                                                                   //
		msg = msg.replace(/^### (([\S\w\d-_\/\*\.,\\][ \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]?)+)/gm, '<h3>$1</h3>'); // Support # Text for h4
                                                                                                                   //
		msg = msg.replace(/^#### (([\S\w\d-_\/\*\.,\\][ \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]?)+)/gm, '<h4>$1</h4>');
	} // Support *text* to make bold                                                                                  // 39
                                                                                                                   //
                                                                                                                   //
	msg = msg.replace(/(^|&gt;|[ >_~`])\*{1,2}([^\*\r\n]+)\*{1,2}([<_~`]|\B|\b|$)/gm, '$1<span class="copyonly">*</span><strong>$2</strong><span class="copyonly">*</span>$3'); // Support _text_ to make italics
                                                                                                                   //
	msg = msg.replace(/(^|&gt;|[ >*~`])\_{1,2}([^\_\r\n]+)\_{1,2}([<*~`]|\B|\b|$)/gm, '$1<span class="copyonly">_</span><em>$2</em><span class="copyonly">_</span>$3'); // Support ~text~ to strike through text
                                                                                                                   //
	msg = msg.replace(/(^|&gt;|[ >_*`])\~{1,2}([^~\r\n]+)\~{1,2}([<_*`]|\B|\b|$)/gm, '$1<span class="copyonly">~</span><strike>$2</strike><span class="copyonly">~</span>$3'); // Support for block quote
	// >>>                                                                                                            // 51
	// Text                                                                                                           // 52
	// <<<                                                                                                            // 53
                                                                                                                   //
	msg = msg.replace(/(?:&gt;){3}\n+([\s\S]*?)\n+(?:&lt;){3}/g, '<blockquote class="background-transparent-darker-before"><span class="copyonly">&gt;&gt;&gt;</span>$1<span class="copyonly">&lt;&lt;&lt;</span></blockquote>'); // Support >Text for quote
                                                                                                                   //
	msg = msg.replace(/^&gt;(.*)$/gm, '<blockquote class="background-transparent-darker-before"><span class="copyonly">&gt;</span>$1</blockquote>'); // Remove white-space around blockquote (prevent <br>). Because blockquote is block element.
                                                                                                                   //
	msg = msg.replace(/\s*<blockquote class="background-transparent-darker-before">/gm, '<blockquote class="background-transparent-darker-before">');
	msg = msg.replace(/<\/blockquote>\s*/gm, '</blockquote>'); // Remove new-line between blockquotes.                // 61
                                                                                                                   //
	msg = msg.replace(/<\/blockquote>\n<blockquote/gm, '</blockquote><blockquote'); // Support ![alt text](http://image url)
                                                                                                                   //
	msg = msg.replace(new RegExp("!\\[([^\\]]+)\\]\\(((?:" + schemes + "):\\/\\/[^\\)]+)\\)", 'gm'), function (match, title, url) {
		var target = url.indexOf(Meteor.absoluteUrl()) === 0 ? '' : '_blank';                                            // 68
		return addAsToken("<a href=\"" + _.escapeHTML(url) + "\" title=\"" + _.escapeHTML(title) + "\" target=\"" + _.escapeHTML(target) + "\" rel=\"noopener noreferrer\"><div class=\"inline-image\" style=\"background-image: url(" + _.escapeHTML(url) + ");\"></div></a>");
	}); // Support [Text](http://link)                                                                                // 70
                                                                                                                   //
	msg = msg.replace(new RegExp("\\[([^\\]]+)\\]\\(((?:" + schemes + "):\\/\\/[^\\)]+)\\)", 'gm'), function (match, title, url) {
		var target = url.indexOf(Meteor.absoluteUrl()) === 0 ? '' : '_blank';                                            // 74
		return addAsToken("<a href=\"" + _.escapeHTML(url) + "\" target=\"" + _.escapeHTML(target) + "\" rel=\"noopener noreferrer\">" + _.escapeHTML(title) + "</a>");
	}); // Support <http://link|Text>                                                                                 // 76
                                                                                                                   //
	msg = msg.replace(new RegExp("(?:<|&lt;)((?:" + schemes + "):\\/\\/[^\\|]+)\\|(.+?)(?=>|&gt;)(?:>|&gt;)", 'gm'), function (match, url, title) {
		var target = url.indexOf(Meteor.absoluteUrl()) === 0 ? '' : '_blank';                                            // 80
		return addAsToken("<a href=\"" + _.escapeHTML(url) + "\" target=\"" + _.escapeHTML(target) + "\" rel=\"noopener noreferrer\">" + _.escapeHTML(title) + "</a>");
	});                                                                                                               // 82
	return msg;                                                                                                       // 84
};                                                                                                                 // 85
                                                                                                                   //
var markdown = function (message) {                                                                                // 87
	message.html = parseNotEscaped(message.html, message);                                                            // 88
	return message;                                                                                                   // 89
};                                                                                                                 // 90
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"original.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rocketchat_markdown/parser/original/original.js                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.export({                                                                                                    // 1
	original: function () {                                                                                           // 1
		return original;                                                                                                 // 1
	}                                                                                                                 // 1
});                                                                                                                // 1
var markdown = void 0;                                                                                             // 1
module.watch(require("./markdown.js"), {                                                                           // 1
	markdown: function (v) {                                                                                          // 1
		markdown = v;                                                                                                    // 1
	}                                                                                                                 // 1
}, 0);                                                                                                             // 1
var code = void 0;                                                                                                 // 1
module.watch(require("./code.js"), {                                                                               // 1
	code: function (v) {                                                                                              // 1
		code = v;                                                                                                        // 1
	}                                                                                                                 // 1
}, 1);                                                                                                             // 1
                                                                                                                   //
var original = function (message) {                                                                                // 8
	// Parse markdown code                                                                                            // 9
	message = code(message); // Parse markdown                                                                        // 10
                                                                                                                   //
	message = markdown(message); // Replace linebreak to br                                                           // 13
                                                                                                                   //
	message.html = message.html.replace(/\n/gm, '<br>');                                                              // 16
	return message;                                                                                                   // 18
};                                                                                                                 // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"node_modules":{"highlight.js":{"package.json":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// .npm/package/node_modules/highlight.js/package.json                                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
exports.name = "highlight.js";
exports.version = "9.9.0";
exports.main = "./lib/index.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// node_modules/meteor/rocketchat_markdown/node_modules/highlight.js/lib/index.js                                  //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var hljs = require('./highlight');

hljs.registerLanguage('1c', require('./languages/1c'));
hljs.registerLanguage('abnf', require('./languages/abnf'));
hljs.registerLanguage('accesslog', require('./languages/accesslog'));
hljs.registerLanguage('actionscript', require('./languages/actionscript'));
hljs.registerLanguage('ada', require('./languages/ada'));
hljs.registerLanguage('apache', require('./languages/apache'));
hljs.registerLanguage('applescript', require('./languages/applescript'));
hljs.registerLanguage('cpp', require('./languages/cpp'));
hljs.registerLanguage('arduino', require('./languages/arduino'));
hljs.registerLanguage('armasm', require('./languages/armasm'));
hljs.registerLanguage('xml', require('./languages/xml'));
hljs.registerLanguage('asciidoc', require('./languages/asciidoc'));
hljs.registerLanguage('aspectj', require('./languages/aspectj'));
hljs.registerLanguage('autohotkey', require('./languages/autohotkey'));
hljs.registerLanguage('autoit', require('./languages/autoit'));
hljs.registerLanguage('avrasm', require('./languages/avrasm'));
hljs.registerLanguage('awk', require('./languages/awk'));
hljs.registerLanguage('axapta', require('./languages/axapta'));
hljs.registerLanguage('bash', require('./languages/bash'));
hljs.registerLanguage('basic', require('./languages/basic'));
hljs.registerLanguage('bnf', require('./languages/bnf'));
hljs.registerLanguage('brainfuck', require('./languages/brainfuck'));
hljs.registerLanguage('cal', require('./languages/cal'));
hljs.registerLanguage('capnproto', require('./languages/capnproto'));
hljs.registerLanguage('ceylon', require('./languages/ceylon'));
hljs.registerLanguage('clean', require('./languages/clean'));
hljs.registerLanguage('clojure', require('./languages/clojure'));
hljs.registerLanguage('clojure-repl', require('./languages/clojure-repl'));
hljs.registerLanguage('cmake', require('./languages/cmake'));
hljs.registerLanguage('coffeescript', require('./languages/coffeescript'));
hljs.registerLanguage('coq', require('./languages/coq'));
hljs.registerLanguage('cos', require('./languages/cos'));
hljs.registerLanguage('crmsh', require('./languages/crmsh'));
hljs.registerLanguage('crystal', require('./languages/crystal'));
hljs.registerLanguage('cs', require('./languages/cs'));
hljs.registerLanguage('csp', require('./languages/csp'));
hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('d', require('./languages/d'));
hljs.registerLanguage('markdown', require('./languages/markdown'));
hljs.registerLanguage('dart', require('./languages/dart'));
hljs.registerLanguage('delphi', require('./languages/delphi'));
hljs.registerLanguage('diff', require('./languages/diff'));
hljs.registerLanguage('django', require('./languages/django'));
hljs.registerLanguage('dns', require('./languages/dns'));
hljs.registerLanguage('dockerfile', require('./languages/dockerfile'));
hljs.registerLanguage('dos', require('./languages/dos'));
hljs.registerLanguage('dsconfig', require('./languages/dsconfig'));
hljs.registerLanguage('dts', require('./languages/dts'));
hljs.registerLanguage('dust', require('./languages/dust'));
hljs.registerLanguage('ebnf', require('./languages/ebnf'));
hljs.registerLanguage('elixir', require('./languages/elixir'));
hljs.registerLanguage('elm', require('./languages/elm'));
hljs.registerLanguage('ruby', require('./languages/ruby'));
hljs.registerLanguage('erb', require('./languages/erb'));
hljs.registerLanguage('erlang-repl', require('./languages/erlang-repl'));
hljs.registerLanguage('erlang', require('./languages/erlang'));
hljs.registerLanguage('excel', require('./languages/excel'));
hljs.registerLanguage('fix', require('./languages/fix'));
hljs.registerLanguage('flix', require('./languages/flix'));
hljs.registerLanguage('fortran', require('./languages/fortran'));
hljs.registerLanguage('fsharp', require('./languages/fsharp'));
hljs.registerLanguage('gams', require('./languages/gams'));
hljs.registerLanguage('gauss', require('./languages/gauss'));
hljs.registerLanguage('gcode', require('./languages/gcode'));
hljs.registerLanguage('gherkin', require('./languages/gherkin'));
hljs.registerLanguage('glsl', require('./languages/glsl'));
hljs.registerLanguage('go', require('./languages/go'));
hljs.registerLanguage('golo', require('./languages/golo'));
hljs.registerLanguage('gradle', require('./languages/gradle'));
hljs.registerLanguage('groovy', require('./languages/groovy'));
hljs.registerLanguage('haml', require('./languages/haml'));
hljs.registerLanguage('handlebars', require('./languages/handlebars'));
hljs.registerLanguage('haskell', require('./languages/haskell'));
hljs.registerLanguage('haxe', require('./languages/haxe'));
hljs.registerLanguage('hsp', require('./languages/hsp'));
hljs.registerLanguage('htmlbars', require('./languages/htmlbars'));
hljs.registerLanguage('http', require('./languages/http'));
hljs.registerLanguage('inform7', require('./languages/inform7'));
hljs.registerLanguage('ini', require('./languages/ini'));
hljs.registerLanguage('irpf90', require('./languages/irpf90'));
hljs.registerLanguage('java', require('./languages/java'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('json', require('./languages/json'));
hljs.registerLanguage('julia', require('./languages/julia'));
hljs.registerLanguage('kotlin', require('./languages/kotlin'));
hljs.registerLanguage('lasso', require('./languages/lasso'));
hljs.registerLanguage('ldif', require('./languages/ldif'));
hljs.registerLanguage('less', require('./languages/less'));
hljs.registerLanguage('lisp', require('./languages/lisp'));
hljs.registerLanguage('livecodeserver', require('./languages/livecodeserver'));
hljs.registerLanguage('livescript', require('./languages/livescript'));
hljs.registerLanguage('llvm', require('./languages/llvm'));
hljs.registerLanguage('lsl', require('./languages/lsl'));
hljs.registerLanguage('lua', require('./languages/lua'));
hljs.registerLanguage('makefile', require('./languages/makefile'));
hljs.registerLanguage('mathematica', require('./languages/mathematica'));
hljs.registerLanguage('matlab', require('./languages/matlab'));
hljs.registerLanguage('maxima', require('./languages/maxima'));
hljs.registerLanguage('mel', require('./languages/mel'));
hljs.registerLanguage('mercury', require('./languages/mercury'));
hljs.registerLanguage('mipsasm', require('./languages/mipsasm'));
hljs.registerLanguage('mizar', require('./languages/mizar'));
hljs.registerLanguage('perl', require('./languages/perl'));
hljs.registerLanguage('mojolicious', require('./languages/mojolicious'));
hljs.registerLanguage('monkey', require('./languages/monkey'));
hljs.registerLanguage('moonscript', require('./languages/moonscript'));
hljs.registerLanguage('nginx', require('./languages/nginx'));
hljs.registerLanguage('nimrod', require('./languages/nimrod'));
hljs.registerLanguage('nix', require('./languages/nix'));
hljs.registerLanguage('nsis', require('./languages/nsis'));
hljs.registerLanguage('objectivec', require('./languages/objectivec'));
hljs.registerLanguage('ocaml', require('./languages/ocaml'));
hljs.registerLanguage('openscad', require('./languages/openscad'));
hljs.registerLanguage('oxygene', require('./languages/oxygene'));
hljs.registerLanguage('parser3', require('./languages/parser3'));
hljs.registerLanguage('pf', require('./languages/pf'));
hljs.registerLanguage('php', require('./languages/php'));
hljs.registerLanguage('pony', require('./languages/pony'));
hljs.registerLanguage('powershell', require('./languages/powershell'));
hljs.registerLanguage('processing', require('./languages/processing'));
hljs.registerLanguage('profile', require('./languages/profile'));
hljs.registerLanguage('prolog', require('./languages/prolog'));
hljs.registerLanguage('protobuf', require('./languages/protobuf'));
hljs.registerLanguage('puppet', require('./languages/puppet'));
hljs.registerLanguage('purebasic', require('./languages/purebasic'));
hljs.registerLanguage('python', require('./languages/python'));
hljs.registerLanguage('q', require('./languages/q'));
hljs.registerLanguage('qml', require('./languages/qml'));
hljs.registerLanguage('r', require('./languages/r'));
hljs.registerLanguage('rib', require('./languages/rib'));
hljs.registerLanguage('roboconf', require('./languages/roboconf'));
hljs.registerLanguage('rsl', require('./languages/rsl'));
hljs.registerLanguage('ruleslanguage', require('./languages/ruleslanguage'));
hljs.registerLanguage('rust', require('./languages/rust'));
hljs.registerLanguage('scala', require('./languages/scala'));
hljs.registerLanguage('scheme', require('./languages/scheme'));
hljs.registerLanguage('scilab', require('./languages/scilab'));
hljs.registerLanguage('scss', require('./languages/scss'));
hljs.registerLanguage('smali', require('./languages/smali'));
hljs.registerLanguage('smalltalk', require('./languages/smalltalk'));
hljs.registerLanguage('sml', require('./languages/sml'));
hljs.registerLanguage('sqf', require('./languages/sqf'));
hljs.registerLanguage('sql', require('./languages/sql'));
hljs.registerLanguage('stan', require('./languages/stan'));
hljs.registerLanguage('stata', require('./languages/stata'));
hljs.registerLanguage('step21', require('./languages/step21'));
hljs.registerLanguage('stylus', require('./languages/stylus'));
hljs.registerLanguage('subunit', require('./languages/subunit'));
hljs.registerLanguage('swift', require('./languages/swift'));
hljs.registerLanguage('taggerscript', require('./languages/taggerscript'));
hljs.registerLanguage('yaml', require('./languages/yaml'));
hljs.registerLanguage('tap', require('./languages/tap'));
hljs.registerLanguage('tcl', require('./languages/tcl'));
hljs.registerLanguage('tex', require('./languages/tex'));
hljs.registerLanguage('thrift', require('./languages/thrift'));
hljs.registerLanguage('tp', require('./languages/tp'));
hljs.registerLanguage('twig', require('./languages/twig'));
hljs.registerLanguage('typescript', require('./languages/typescript'));
hljs.registerLanguage('vala', require('./languages/vala'));
hljs.registerLanguage('vbnet', require('./languages/vbnet'));
hljs.registerLanguage('vbscript', require('./languages/vbscript'));
hljs.registerLanguage('vbscript-html', require('./languages/vbscript-html'));
hljs.registerLanguage('verilog', require('./languages/verilog'));
hljs.registerLanguage('vhdl', require('./languages/vhdl'));
hljs.registerLanguage('vim', require('./languages/vim'));
hljs.registerLanguage('x86asm', require('./languages/x86asm'));
hljs.registerLanguage('xl', require('./languages/xl'));
hljs.registerLanguage('xquery', require('./languages/xquery'));
hljs.registerLanguage('zephir', require('./languages/zephir'));

module.exports = hljs;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"marked":{"package.json":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// .npm/package/node_modules/marked/package.json                                                                   //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
exports.name = "marked";
exports.version = "0.3.6";
exports.main = "./lib/marked.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"marked.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// node_modules/meteor/rocketchat_markdown/node_modules/marked/lib/marked.js                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
	// explicitly match decimal, hex, and named HTML entities 
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:markdown/settings.js");
var exports = require("./node_modules/meteor/rocketchat:markdown/markdown.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:markdown'] = exports;

})();

//# sourceMappingURL=rocketchat_markdown.js.map
