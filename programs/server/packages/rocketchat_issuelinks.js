(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var ECMAScript = Package.ecmascript.ECMAScript;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:issuelinks":{"settings.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rocketchat_issuelinks/settings.js                        //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
RocketChat.settings.add('IssueLinks_Enabled', false, {               // 1
	type: 'boolean',                                                    // 2
	i18nLabel: 'Enabled',                                               // 3
	i18nDescription: 'IssueLinks_Incompatible',                         // 4
	group: 'Message',                                                   // 5
	section: 'Issue_Links',                                             // 6
	"public": true                                                      // 7
});                                                                  // 1
RocketChat.settings.add('IssueLinks_Template', '', {                 // 10
	type: 'string',                                                     // 11
	i18nLabel: 'IssueLinks_LinkTemplate',                               // 12
	i18nDescription: 'IssueLinks_LinkTemplate_Description',             // 13
	group: 'Message',                                                   // 14
	section: 'Issue_Links',                                             // 15
	"public": true                                                      // 16
});                                                                  // 10
///////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:issuelinks/settings.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:issuelinks'] = {};

})();

//# sourceMappingURL=rocketchat_issuelinks.js.map
