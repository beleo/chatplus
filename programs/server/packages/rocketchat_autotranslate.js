(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var DDPRateLimiter = Package['ddp-rate-limiter'].DDPRateLimiter;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:autotranslate":{"server":{"settings.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_autotranslate/server/settings.js                                                          //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Meteor.startup(function () {                                                                                     // 1
	RocketChat.settings.add('AutoTranslate_Enabled', false, {                                                       // 2
		type: 'boolean',                                                                                               // 2
		group: 'Message',                                                                                              // 2
		section: 'AutoTranslate',                                                                                      // 2
		"public": true                                                                                                 // 2
	});                                                                                                             // 2
	RocketChat.settings.add('AutoTranslate_GoogleAPIKey', '', {                                                     // 3
		type: 'string',                                                                                                // 3
		group: 'Message',                                                                                              // 3
		section: 'AutoTranslate',                                                                                      // 3
		enableQuery: {                                                                                                 // 3
			_id: 'AutoTranslate_Enabled',                                                                                 // 3
			value: true                                                                                                   // 3
		}                                                                                                              // 3
	});                                                                                                             // 3
});                                                                                                              // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"autotranslate.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_autotranslate/server/autotranslate.js                                                     //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                          //
                                                                                                                 //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                 //
                                                                                                                 //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                //
                                                                                                                 //
var AutoTranslate = function () {                                                                                //
	function AutoTranslate() {                                                                                      // 2
		var _this = this;                                                                                              // 2
                                                                                                                 //
		(0, _classCallCheck3.default)(this, AutoTranslate);                                                            // 2
		this.languages = [];                                                                                           // 3
		this.enabled = RocketChat.settings.get('AutoTranslate_Enabled');                                               // 4
		this.apiKey = RocketChat.settings.get('AutoTranslate_GoogleAPIKey');                                           // 5
		this.supportedLanguages = {};                                                                                  // 6
		RocketChat.callbacks.add('afterSaveMessage', this.translateMessage.bind(this), RocketChat.callbacks.priority.MEDIUM, 'AutoTranslate');
		RocketChat.settings.get('AutoTranslate_Enabled', function (key, value) {                                       // 9
			_this.enabled = value;                                                                                        // 10
		});                                                                                                            // 11
		RocketChat.settings.get('AutoTranslate_GoogleAPIKey', function (key, value) {                                  // 12
			_this.apiKey = value;                                                                                         // 13
		});                                                                                                            // 14
	}                                                                                                               // 15
                                                                                                                 //
	AutoTranslate.prototype.tokenize = function () {                                                                //
		function tokenize(message) {                                                                                   //
			if (!message.tokens || !Array.isArray(message.tokens)) {                                                      // 18
				message.tokens = [];                                                                                         // 19
			}                                                                                                             // 20
                                                                                                                 //
			message = this.tokenizeEmojis(message);                                                                       // 21
			message = this.tokenizeCode(message);                                                                         // 22
			message = this.tokenizeURLs(message);                                                                         // 23
			message = this.tokenizeMentions(message);                                                                     // 24
			return message;                                                                                               // 25
		}                                                                                                              // 26
                                                                                                                 //
		return tokenize;                                                                                               //
	}();                                                                                                            //
                                                                                                                 //
	AutoTranslate.prototype.tokenizeEmojis = function () {                                                          //
		function tokenizeEmojis(message) {                                                                             //
			var count = message.tokens.length;                                                                            // 29
			message.msg = message.msg.replace(/:[+\w\d]+:/g, function (match) {                                           // 30
				var token = "<i class=notranslate>{" + count++ + "}</i>";                                                    // 31
				message.tokens.push({                                                                                        // 32
					token: token,                                                                                               // 33
					text: match                                                                                                 // 34
				});                                                                                                          // 32
				return token;                                                                                                // 36
			});                                                                                                           // 37
			return message;                                                                                               // 39
		}                                                                                                              // 40
                                                                                                                 //
		return tokenizeEmojis;                                                                                         //
	}();                                                                                                            //
                                                                                                                 //
	AutoTranslate.prototype.tokenizeURLs = function () {                                                            //
		function tokenizeURLs(message) {                                                                               //
			var count = message.tokens.length;                                                                            // 43
			var schemes = RocketChat.settings.get('Markdown_SupportSchemesForLink').split(',').join('|'); // Support ![alt text](http://image url) and [text](http://link)
                                                                                                                 //
			message.msg = message.msg.replace(new RegExp("(!?\\[)([^\\]]+)(\\]\\((?:" + schemes + "):\\/\\/[^\\)]+\\))", 'gm'), function (match, pre, text, post) {
				var pretoken = "<i class=notranslate>{" + count++ + "}</i>";                                                 // 49
				message.tokens.push({                                                                                        // 50
					token: pretoken,                                                                                            // 51
					text: pre                                                                                                   // 52
				});                                                                                                          // 50
				var posttoken = "<i class=notranslate>{" + count++ + "}</i>";                                                // 55
				message.tokens.push({                                                                                        // 56
					token: posttoken,                                                                                           // 57
					text: post                                                                                                  // 58
				});                                                                                                          // 56
				return pretoken + text + posttoken;                                                                          // 61
			}); // Support <http://link|Text>                                                                             // 62
                                                                                                                 //
			message.msg = message.msg.replace(new RegExp("((?:<|&lt;)(?:" + schemes + "):\\/\\/[^\\|]+\\|)(.+?)(?=>|&gt;)((?:>|&gt;))", 'gm'), function (match, pre, text, post) {
				var pretoken = "<i class=notranslate>{" + count++ + "}</i>";                                                 // 66
				message.tokens.push({                                                                                        // 67
					token: pretoken,                                                                                            // 68
					text: pre                                                                                                   // 69
				});                                                                                                          // 67
				var posttoken = "<i class=notranslate>{" + count++ + "}</i>";                                                // 72
				message.tokens.push({                                                                                        // 73
					token: posttoken,                                                                                           // 74
					text: post                                                                                                  // 75
				});                                                                                                          // 73
				return pretoken + text + posttoken;                                                                          // 78
			});                                                                                                           // 79
			return message;                                                                                               // 81
		}                                                                                                              // 82
                                                                                                                 //
		return tokenizeURLs;                                                                                           //
	}();                                                                                                            //
                                                                                                                 //
	AutoTranslate.prototype.tokenizeCode = function () {                                                            //
		function tokenizeCode(message) {                                                                               //
			var count = message.tokens.length;                                                                            // 85
			message.html = message.msg;                                                                                   // 87
			message = RocketChat.Markdown.parseMessageNotEscaped(message);                                                // 88
			message.msg = message.html;                                                                                   // 89
                                                                                                                 //
			for (var tokenIndex in meteorBabelHelpers.sanitizeForInObject(message.tokens)) {                              // 91
				if (message.tokens.hasOwnProperty(tokenIndex)) {                                                             // 92
					var token = message.tokens[tokenIndex].token;                                                               // 93
                                                                                                                 //
					if (token.indexOf('notranslate') === -1) {                                                                  // 94
						var newToken = "<i class=notranslate>{" + count++ + "}</i>";                                               // 95
						message.msg = message.msg.replace(token, newToken);                                                        // 96
						message.tokens[tokenIndex].token = newToken;                                                               // 97
					}                                                                                                           // 98
				}                                                                                                            // 99
			}                                                                                                             // 100
                                                                                                                 //
			return message;                                                                                               // 102
		}                                                                                                              // 103
                                                                                                                 //
		return tokenizeCode;                                                                                           //
	}();                                                                                                            //
                                                                                                                 //
	AutoTranslate.prototype.tokenizeMentions = function () {                                                        //
		function tokenizeMentions(message) {                                                                           //
			var count = message.tokens.length;                                                                            // 106
                                                                                                                 //
			if (message.mentions && message.mentions.length > 0) {                                                        // 108
				message.mentions.forEach(function (mention) {                                                                // 109
					message.msg = message.msg.replace(new RegExp("(@" + mention.username + ")", 'gm'), function (match) {       // 110
						var token = "<i class=notranslate>{" + count++ + "}</i>";                                                  // 111
						message.tokens.push({                                                                                      // 112
							token: token,                                                                                             // 113
							text: match                                                                                               // 114
						});                                                                                                        // 112
						return token;                                                                                              // 116
					});                                                                                                         // 117
				});                                                                                                          // 118
			}                                                                                                             // 119
                                                                                                                 //
			if (message.channels && message.channels.length > 0) {                                                        // 121
				message.channels.forEach(function (channel) {                                                                // 122
					message.msg = message.msg.replace(new RegExp("(#" + channel.name + ")", 'gm'), function (match) {           // 123
						var token = "<i class=notranslate>{" + count++ + "}</i>";                                                  // 124
						message.tokens.push({                                                                                      // 125
							token: token,                                                                                             // 126
							text: match                                                                                               // 127
						});                                                                                                        // 125
						return token;                                                                                              // 129
					});                                                                                                         // 130
				});                                                                                                          // 131
			}                                                                                                             // 132
                                                                                                                 //
			return message;                                                                                               // 134
		}                                                                                                              // 135
                                                                                                                 //
		return tokenizeMentions;                                                                                       //
	}();                                                                                                            //
                                                                                                                 //
	AutoTranslate.prototype.deTokenize = function () {                                                              //
		function deTokenize(message) {                                                                                 //
			if (message.tokens && message.tokens.length > 0) {                                                            // 138
				var _loop = function (token, text, noHtml) {                                                                 // 138
					message.msg = message.msg.replace(token, function () {                                                      // 140
						return noHtml ? noHtml : text;                                                                             // 140
					});                                                                                                         // 140
				};                                                                                                           // 138
                                                                                                                 //
				for (var _iterator = message.tokens, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
					var _ref2;                                                                                                  // 139
                                                                                                                 //
					if (_isArray) {                                                                                             // 139
						if (_i >= _iterator.length) break;                                                                         // 139
						_ref2 = _iterator[_i++];                                                                                   // 139
					} else {                                                                                                    // 139
						_i = _iterator.next();                                                                                     // 139
						if (_i.done) break;                                                                                        // 139
						_ref2 = _i.value;                                                                                          // 139
					}                                                                                                           // 139
                                                                                                                 //
					var _ref = _ref2;                                                                                           // 139
					var token = _ref.token;                                                                                     // 139
					var text = _ref.text;                                                                                       // 139
					var noHtml = _ref.noHtml;                                                                                   // 139
                                                                                                                 //
					_loop(token, text, noHtml);                                                                                 // 139
				}                                                                                                            // 141
			}                                                                                                             // 142
                                                                                                                 //
			return message.msg;                                                                                           // 143
		}                                                                                                              // 144
                                                                                                                 //
		return deTokenize;                                                                                             //
	}();                                                                                                            //
                                                                                                                 //
	AutoTranslate.prototype.translateMessage = function () {                                                        //
		function translateMessage(message, room, targetLanguage) {                                                     //
			var _this2 = this;                                                                                            // 146
                                                                                                                 //
			if (this.enabled && this.apiKey) {                                                                            // 147
				var targetLanguages = void 0;                                                                                // 148
                                                                                                                 //
				if (targetLanguage) {                                                                                        // 149
					targetLanguages = [targetLanguage];                                                                         // 150
				} else {                                                                                                     // 151
					targetLanguages = RocketChat.models.Subscriptions.getAutoTranslateLanguagesByRoomAndNotUser(room._id, message.u && message.u._id);
				}                                                                                                            // 153
                                                                                                                 //
				if (message.msg) {                                                                                           // 154
					Meteor.defer(function () {                                                                                  // 155
						var translations = {};                                                                                     // 156
						var targetMessage = Object.assign({}, message);                                                            // 157
						targetMessage.html = s.escapeHTML(String(targetMessage.msg));                                              // 159
						targetMessage = _this2.tokenize(targetMessage);                                                            // 160
						var msgs = targetMessage.msg.split('\n');                                                                  // 162
						msgs = msgs.map(function (msg) {                                                                           // 163
							return encodeURIComponent(msg);                                                                           // 163
						});                                                                                                        // 163
						var query = "q=" + msgs.join('&q=');                                                                       // 164
                                                                                                                 //
						var supportedLanguages = _this2.getSupportedLanguages('en');                                               // 166
                                                                                                                 //
						targetLanguages.forEach(function (language) {                                                              // 167
							if (language.indexOf('-') !== -1 && !_.findWhere(supportedLanguages, {                                    // 168
								language: language                                                                                       // 168
							})) {                                                                                                     // 168
								language = language.substr(0, 2);                                                                        // 169
							}                                                                                                         // 170
                                                                                                                 //
							var result = void 0;                                                                                      // 171
                                                                                                                 //
							try {                                                                                                     // 172
								result = HTTP.get('https://translation.googleapis.com/language/translate/v2', {                          // 173
									params: {                                                                                               // 173
										key: _this2.apiKey,                                                                                    // 173
										target: language                                                                                       // 173
									},                                                                                                      // 173
									query: query                                                                                            // 173
								});                                                                                                      // 173
							} catch (e) {                                                                                             // 174
								console.log('Error translating message', e);                                                             // 175
								return message;                                                                                          // 176
							}                                                                                                         // 177
                                                                                                                 //
							if (result.statusCode === 200 && result.data && result.data.data && result.data.data.translations && Array.isArray(result.data.data.translations) && result.data.data.translations.length > 0) {
								var txt = result.data.data.translations.map(function (translation) {                                     // 179
									return translation.translatedText;                                                                      // 179
								}).join('\n');                                                                                           // 179
								translations[language] = _this2.deTokenize(Object.assign({}, targetMessage, {                            // 180
									msg: txt                                                                                                // 180
								}));                                                                                                     // 180
							}                                                                                                         // 181
						});                                                                                                        // 182
                                                                                                                 //
						if (!_.isEmpty(translations)) {                                                                            // 183
							RocketChat.models.Messages.addTranslations(message._id, translations);                                    // 184
						}                                                                                                          // 185
					});                                                                                                         // 186
				}                                                                                                            // 187
                                                                                                                 //
				if (message.attachments && message.attachments.length > 0) {                                                 // 189
					Meteor.defer(function () {                                                                                  // 190
						for (var index in meteorBabelHelpers.sanitizeForInObject(message.attachments)) {                           // 191
							if (message.attachments.hasOwnProperty(index)) {                                                          // 192
								(function () {                                                                                           // 192
									var attachment = message.attachments[index];                                                            // 193
									var translations = {};                                                                                  // 194
                                                                                                                 //
									if (attachment.description || attachment.text) {                                                        // 195
										var query = "q=" + encodeURIComponent(attachment.description || attachment.text);                      // 196
                                                                                                                 //
										var supportedLanguages = _this2.getSupportedLanguages('en');                                           // 197
                                                                                                                 //
										targetLanguages.forEach(function (language) {                                                          // 198
											if (language.indexOf('-') !== -1 && !_.findWhere(supportedLanguages, {                                // 199
												language: language                                                                                   // 199
											})) {                                                                                                 // 199
												language = language.substr(0, 2);                                                                    // 200
											}                                                                                                     // 201
                                                                                                                 //
											var result = HTTP.get('https://translation.googleapis.com/language/translate/v2', {                   // 202
												params: {                                                                                            // 202
													key: _this2.apiKey,                                                                                 // 202
													target: language                                                                                    // 202
												},                                                                                                   // 202
												query: query                                                                                         // 202
											});                                                                                                   // 202
                                                                                                                 //
											if (result.statusCode === 200 && result.data && result.data.data && result.data.data.translations && Array.isArray(result.data.data.translations) && result.data.data.translations.length > 0) {
												var txt = result.data.data.translations.map(function (translation) {                                 // 204
													return translation.translatedText;                                                                  // 204
												}).join('\n');                                                                                       // 204
												translations[language] = txt;                                                                        // 205
											}                                                                                                     // 206
										});                                                                                                    // 207
                                                                                                                 //
										if (!_.isEmpty(translations)) {                                                                        // 208
											RocketChat.models.Messages.addAttachmentTranslations(message._id, index, translations);               // 209
										}                                                                                                      // 210
									}                                                                                                       // 211
								})();                                                                                                    // 192
							}                                                                                                         // 212
						}                                                                                                          // 213
					});                                                                                                         // 214
				}                                                                                                            // 215
			}                                                                                                             // 216
                                                                                                                 //
			return message;                                                                                               // 217
		}                                                                                                              // 218
                                                                                                                 //
		return translateMessage;                                                                                       //
	}();                                                                                                            //
                                                                                                                 //
	AutoTranslate.prototype.getSupportedLanguages = function () {                                                   //
		function getSupportedLanguages(target) {                                                                       //
			if (this.enabled && this.apiKey) {                                                                            // 221
				if (this.supportedLanguages[target]) {                                                                       // 222
					return this.supportedLanguages[target];                                                                     // 223
				}                                                                                                            // 224
                                                                                                                 //
				var result = void 0;                                                                                         // 226
				var params = {                                                                                               // 227
					key: this.apiKey                                                                                            // 227
				};                                                                                                           // 227
                                                                                                                 //
				if (target) {                                                                                                // 228
					params.target = target;                                                                                     // 229
				}                                                                                                            // 230
                                                                                                                 //
				try {                                                                                                        // 232
					result = HTTP.get('https://translation.googleapis.com/language/translate/v2/languages', {                   // 233
						params: params                                                                                             // 233
					});                                                                                                         // 233
				} catch (e) {                                                                                                // 234
					if (e.response && e.response.statusCode === 400 && e.response.data && e.response.data.error && e.response.data.error.status === 'INVALID_ARGUMENT') {
						params.target = 'en';                                                                                      // 236
						target = 'en';                                                                                             // 237
                                                                                                                 //
						if (!this.supportedLanguages[target]) {                                                                    // 238
							result = HTTP.get('https://translation.googleapis.com/language/translate/v2/languages', {                 // 239
								params: params                                                                                           // 239
							});                                                                                                       // 239
						}                                                                                                          // 240
					}                                                                                                           // 241
				} finally {                                                                                                  // 242
					if (this.supportedLanguages[target]) {                                                                      // 243
						return this.supportedLanguages[target];                                                                    // 244
					} else {                                                                                                    // 245
						this.supportedLanguages[target || 'en'] = result && result.data && result.data.data && result.data.data.languages;
						return this.supportedLanguages[target || 'en'];                                                            // 247
					}                                                                                                           // 248
				}                                                                                                            // 249
			}                                                                                                             // 250
		}                                                                                                              // 251
                                                                                                                 //
		return getSupportedLanguages;                                                                                  //
	}();                                                                                                            //
                                                                                                                 //
	return AutoTranslate;                                                                                           //
}();                                                                                                             //
                                                                                                                 //
RocketChat.AutoTranslate = new AutoTranslate();                                                                  // 254
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"permissions.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_autotranslate/server/permissions.js                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Meteor.startup(function () {                                                                                     // 1
	if (RocketChat.models && RocketChat.models.Permissions) {                                                       // 2
		if (!RocketChat.models.Permissions.findOne({                                                                   // 3
			_id: 'auto-translate'                                                                                         // 3
		})) {                                                                                                          // 3
			RocketChat.models.Permissions.insert({                                                                        // 4
				_id: 'auto-translate',                                                                                       // 4
				roles: ['admin']                                                                                             // 4
			});                                                                                                           // 4
		}                                                                                                              // 5
	}                                                                                                               // 6
});                                                                                                              // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"models":{"Messages.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_autotranslate/server/models/Messages.js                                                   //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
RocketChat.models.Messages.addTranslations = function (messageId, translations) {                                // 1
	var updateObj = {};                                                                                             // 2
	Object.keys(translations).forEach(function (key) {                                                              // 3
		var translation = translations[key];                                                                           // 4
		updateObj["translations." + key] = translation;                                                                // 5
	});                                                                                                             // 6
	return this.update({                                                                                            // 7
		_id: messageId                                                                                                 // 7
	}, {                                                                                                            // 7
		$set: updateObj                                                                                                // 7
	});                                                                                                             // 7
};                                                                                                               // 8
                                                                                                                 //
RocketChat.models.Messages.addAttachmentTranslations = function (messageId, attachmentIndex, translations) {     // 10
	var updateObj = {};                                                                                             // 11
	Object.keys(translations).forEach(function (key) {                                                              // 12
		var translation = translations[key];                                                                           // 13
		updateObj["attachments." + attachmentIndex + ".translations." + key] = translation;                            // 14
	});                                                                                                             // 15
	return this.update({                                                                                            // 16
		_id: messageId                                                                                                 // 16
	}, {                                                                                                            // 16
		$set: updateObj                                                                                                // 16
	});                                                                                                             // 16
};                                                                                                               // 17
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Subscriptions.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_autotranslate/server/models/Subscriptions.js                                              //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
RocketChat.models.Subscriptions.updateAutoTranslateById = function (_id, autoTranslate) {                        // 1
	var query = {                                                                                                   // 2
		_id: _id                                                                                                       // 3
	};                                                                                                              // 2
	var update = void 0;                                                                                            // 6
                                                                                                                 //
	if (autoTranslate) {                                                                                            // 7
		update = {                                                                                                     // 8
			$set: {                                                                                                       // 9
				autoTranslate: autoTranslate                                                                                 // 10
			}                                                                                                             // 9
		};                                                                                                             // 8
	} else {                                                                                                        // 13
		update = {                                                                                                     // 14
			$unset: {                                                                                                     // 15
				autoTranslate: 1                                                                                             // 16
			}                                                                                                             // 15
		};                                                                                                             // 14
	}                                                                                                               // 19
                                                                                                                 //
	return this.update(query, update);                                                                              // 21
};                                                                                                               // 22
                                                                                                                 //
RocketChat.models.Subscriptions.updateAutoTranslateLanguageById = function (_id, autoTranslateLanguage) {        // 24
	var query = {                                                                                                   // 25
		_id: _id                                                                                                       // 26
	};                                                                                                              // 25
	var update = {                                                                                                  // 29
		$set: {                                                                                                        // 30
			autoTranslateLanguage: autoTranslateLanguage                                                                  // 31
		}                                                                                                              // 30
	};                                                                                                              // 29
	return this.update(query, update);                                                                              // 35
};                                                                                                               // 36
                                                                                                                 //
RocketChat.models.Subscriptions.getAutoTranslateLanguagesByRoomAndNotUser = function (rid, userId) {             // 38
	var subscriptionsRaw = RocketChat.models.Subscriptions.model.rawCollection();                                   // 39
	var distinct = Meteor.wrapAsync(subscriptionsRaw.distinct, subscriptionsRaw);                                   // 40
	var query = {                                                                                                   // 41
		rid: rid,                                                                                                      // 42
		'u._id': {                                                                                                     // 43
			$ne: userId                                                                                                   // 43
		},                                                                                                             // 43
		autoTranslate: true                                                                                            // 44
	};                                                                                                              // 41
	return distinct('autoTranslateLanguage', query);                                                                // 46
};                                                                                                               // 47
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"saveSettings.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_autotranslate/server/methods/saveSettings.js                                              //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Meteor.methods({                                                                                                 // 1
	'autoTranslate.saveSettings': function (rid, field, value, options) {                                           // 2
		if (!Meteor.userId()) {                                                                                        // 3
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {                                                // 4
				method: 'saveAutoTranslateSettings'                                                                          // 4
			});                                                                                                           // 4
		}                                                                                                              // 5
                                                                                                                 //
		if (!RocketChat.authz.hasPermission(Meteor.userId(), 'auto-translate')) {                                      // 7
			throw new Meteor.Error('error-action-now-allowed', 'Auto-Translate is not allowed', {                         // 8
				method: 'autoTranslate.saveSettings'                                                                         // 8
			});                                                                                                           // 8
		}                                                                                                              // 9
                                                                                                                 //
		check(rid, String);                                                                                            // 11
		check(field, String);                                                                                          // 12
		check(value, String);                                                                                          // 13
                                                                                                                 //
		if (['autoTranslate', 'autoTranslateLanguage'].indexOf(field) === -1) {                                        // 15
			throw new Meteor.Error('error-invalid-settings', 'Invalid settings field', {                                  // 16
				method: 'saveAutoTranslateSettings'                                                                          // 16
			});                                                                                                           // 16
		}                                                                                                              // 17
                                                                                                                 //
		var subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, Meteor.userId());             // 19
                                                                                                                 //
		if (!subscription) {                                                                                           // 20
			throw new Meteor.Error('error-invalid-subscription', 'Invalid subscription', {                                // 21
				method: 'saveAutoTranslateSettings'                                                                          // 21
			});                                                                                                           // 21
		}                                                                                                              // 22
                                                                                                                 //
		switch (field) {                                                                                               // 24
			case 'autoTranslate':                                                                                         // 25
				RocketChat.models.Subscriptions.updateAutoTranslateById(subscription._id, value === '1' ? true : false);     // 26
                                                                                                                 //
				if (!subscription.autoTranslateLanguage && options.defaultLanguage) {                                        // 27
					RocketChat.models.Subscriptions.updateAutoTranslateLanguageById(subscription._id, options.defaultLanguage);
				}                                                                                                            // 29
                                                                                                                 //
				break;                                                                                                       // 30
                                                                                                                 //
			case 'autoTranslateLanguage':                                                                                 // 31
				RocketChat.models.Subscriptions.updateAutoTranslateLanguageById(subscription._id, value);                    // 32
				break;                                                                                                       // 33
		}                                                                                                              // 24
                                                                                                                 //
		return true;                                                                                                   // 36
	}                                                                                                               // 37
});                                                                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"translateMessage.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_autotranslate/server/methods/translateMessage.js                                          //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Meteor.methods({                                                                                                 // 1
	'autoTranslate.translateMessage': function (message, targetLanguage) {                                          // 2
		var room = RocketChat.models.Rooms.findOneById(message && message.rid);                                        // 3
                                                                                                                 //
		if (message && room && RocketChat.AutoTranslate) {                                                             // 4
			return RocketChat.AutoTranslate.translateMessage(message, room, targetLanguage);                              // 5
		}                                                                                                              // 6
	}                                                                                                               // 7
});                                                                                                              // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getSupportedLanguages.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_autotranslate/server/methods/getSupportedLanguages.js                                     //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Meteor.methods({                                                                                                 // 1
	'autoTranslate.getSupportedLanguages': function (targetLanguage) {                                              // 2
		if (!RocketChat.authz.hasPermission(Meteor.userId(), 'auto-translate')) {                                      // 3
			throw new Meteor.Error('error-action-now-allowed', 'Auto-Translate is not allowed', {                         // 4
				method: 'autoTranslate.saveSettings'                                                                         // 4
			});                                                                                                           // 4
		}                                                                                                              // 5
                                                                                                                 //
		return RocketChat.AutoTranslate.getSupportedLanguages(targetLanguage);                                         // 7
	}                                                                                                               // 8
});                                                                                                              // 1
DDPRateLimiter.addRule({                                                                                         // 11
	type: 'method',                                                                                                 // 12
	name: 'autoTranslate.getSupportedLanguages',                                                                    // 13
	userId: function () /*userId*/{                                                                                 // 14
		return true;                                                                                                   // 15
	}                                                                                                               // 16
}, 5, 60000);                                                                                                    // 11
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:autotranslate/server/settings.js");
require("./node_modules/meteor/rocketchat:autotranslate/server/autotranslate.js");
require("./node_modules/meteor/rocketchat:autotranslate/server/permissions.js");
require("./node_modules/meteor/rocketchat:autotranslate/server/models/Messages.js");
require("./node_modules/meteor/rocketchat:autotranslate/server/models/Subscriptions.js");
require("./node_modules/meteor/rocketchat:autotranslate/server/methods/saveSettings.js");
require("./node_modules/meteor/rocketchat:autotranslate/server/methods/translateMessage.js");
require("./node_modules/meteor/rocketchat:autotranslate/server/methods/getSupportedLanguages.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:autotranslate'] = {};

})();

//# sourceMappingURL=rocketchat_autotranslate.js.map
