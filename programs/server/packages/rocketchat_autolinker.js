(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:autolinker":{"server":{"settings.js":function(){

////////////////////////////////////////////////////////////////////////
//                                                                    //
// packages/rocketchat_autolinker/server/settings.js                  //
//                                                                    //
////////////////////////////////////////////////////////////////////////
                                                                      //
Meteor.startup(function () {                                          // 1
	var enableQuery = {                                                  // 2
		_id: 'AutoLinker',                                                  // 3
		value: true                                                         // 4
	};                                                                   // 2
	RocketChat.settings.add('AutoLinker', true, {                        // 7
		type: 'boolean',                                                    // 7
		group: 'Message',                                                   // 7
		section: 'AutoLinker',                                              // 7
		"public": true,                                                     // 7
		i18nLabel: 'Enabled'                                                // 7
	});                                                                  // 7
	RocketChat.settings.add('AutoLinker_StripPrefix', false, {           // 9
		type: 'boolean',                                                    // 9
		group: 'Message',                                                   // 9
		section: 'AutoLinker',                                              // 9
		"public": true,                                                     // 9
		i18nDescription: 'AutoLinker_StripPrefix_Description',              // 9
		enableQuery: enableQuery                                            // 9
	});                                                                  // 9
	RocketChat.settings.add('AutoLinker_Urls_Scheme', true, {            // 10
		type: 'boolean',                                                    // 10
		group: 'Message',                                                   // 10
		section: 'AutoLinker',                                              // 10
		"public": true,                                                     // 10
		enableQuery: enableQuery                                            // 10
	});                                                                  // 10
	RocketChat.settings.add('AutoLinker_Urls_www', true, {               // 11
		type: 'boolean',                                                    // 11
		group: 'Message',                                                   // 11
		section: 'AutoLinker',                                              // 11
		"public": true,                                                     // 11
		enableQuery: enableQuery                                            // 11
	});                                                                  // 11
	RocketChat.settings.add('AutoLinker_Urls_TLD', true, {               // 12
		type: 'boolean',                                                    // 12
		group: 'Message',                                                   // 12
		section: 'AutoLinker',                                              // 12
		"public": true,                                                     // 12
		enableQuery: enableQuery                                            // 12
	});                                                                  // 12
	RocketChat.settings.add('AutoLinker_UrlsRegExp', '(://|www\\.).+', {
		type: 'string',                                                     // 13
		group: 'Message',                                                   // 13
		section: 'AutoLinker',                                              // 13
		"public": true,                                                     // 13
		enableQuery: enableQuery                                            // 13
	});                                                                  // 13
	RocketChat.settings.add('AutoLinker_Email', true, {                  // 14
		type: 'boolean',                                                    // 14
		group: 'Message',                                                   // 14
		section: 'AutoLinker',                                              // 14
		"public": true,                                                     // 14
		enableQuery: enableQuery                                            // 14
	});                                                                  // 14
	RocketChat.settings.add('AutoLinker_Phone', true, {                  // 15
		type: 'boolean',                                                    // 15
		group: 'Message',                                                   // 15
		section: 'AutoLinker',                                              // 15
		"public": true,                                                     // 15
		i18nDescription: 'AutoLinker_Phone_Description',                    // 15
		enableQuery: enableQuery                                            // 15
	});                                                                  // 15
});                                                                   // 16
////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:autolinker/server/settings.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:autolinker'] = {};

})();

//# sourceMappingURL=rocketchat_autolinker.js.map
