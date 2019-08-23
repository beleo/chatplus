(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var CustomOAuth = Package['rocketchat:custom-oauth'].CustomOAuth;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:dolphin":{"common.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/rocketchat_dolphin/common.js                                                                //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
// Dolphin OAuth2                                                                                       // 1
/* globals CustomOAuth */var config = {                                                                 // 2
	serverURL: '',                                                                                         // 5
	authorizePath: '/m/oauth2/auth/',                                                                      // 6
	tokenPath: '/m/oauth2/token/',                                                                         // 7
	identityPath: '/m/oauth2/api/me/',                                                                     // 8
	scope: 'basic',                                                                                        // 9
	addAutopublishFields: {                                                                                // 10
		forLoggedInUser: ['services.dolphin'],                                                                // 11
		forOtherUsers: ['services.dolphin.name']                                                              // 12
	}                                                                                                      // 10
};                                                                                                      // 4
var Dolphin = new CustomOAuth('dolphin', config);                                                       // 16
                                                                                                        //
function DolphinOnCreateUser(options, user) {                                                           // 18
	if (user && user.services && user.services.dolphin && user.services.dolphin.NickName) {                // 19
		user.username = user.services.dolphin.NickName.replace(/[^A-Za-z0-9]/g, '.').replace(/\.+/g, '.').replace(/(^\.)|(\.$)/g, '');
	}                                                                                                      // 21
                                                                                                        //
	return user;                                                                                           // 22
}                                                                                                       // 23
                                                                                                        //
if (Meteor.isServer) {                                                                                  // 25
	Meteor.startup(function () {                                                                           // 26
		return RocketChat.models.Settings.find({                                                              // 26
			_id: 'Accounts_OAuth_Dolphin_URL'                                                                    // 27
		}).observe({                                                                                          // 27
			added: function () {                                                                                 // 28
				config.serverURL = RocketChat.settings.get('Accounts_OAuth_Dolphin_URL');                           // 29
				return Dolphin.configure(config);                                                                   // 30
			},                                                                                                   // 31
			changed: function () {                                                                               // 32
				config.serverURL = RocketChat.settings.get('Accounts_OAuth_Dolphin_URL');                           // 33
				return Dolphin.configure(config);                                                                   // 34
			}                                                                                                    // 35
		});                                                                                                   // 27
	});                                                                                                    // 26
                                                                                                        //
	if (RocketChat.settings.get('Accounts_OAuth_Dolphin_URL')) {                                           // 39
		var data = {                                                                                          // 40
			buttonLabelText: RocketChat.settings.get('Accounts_OAuth_Dolphin_button_label_text'),                // 41
			buttonColor: RocketChat.settings.get('Accounts_OAuth_Dolphin_button_color'),                         // 42
			buttonLabelColor: RocketChat.settings.get('Accounts_OAuth_Dolphin_button_label_color'),              // 43
			clientId: RocketChat.settings.get('Accounts_OAuth_Dolphin_id'),                                      // 44
			secret: RocketChat.settings.get('Accounts_OAuth_Dolphin_secret'),                                    // 45
			serverURL: RocketChat.settings.get('Accounts_OAuth_Dolphin_URL'),                                    // 46
			loginStyle: RocketChat.settings.get('Accounts_OAuth_Dolphin_login_style'),                           // 47
			siteName: RocketChat.settings.get('Accounts_OAuth_Dolphin_Site_Name')                                // 48
		};                                                                                                    // 40
		ServiceConfiguration.configurations.upsert({                                                          // 51
			service: 'dolphin'                                                                                   // 51
		}, {                                                                                                  // 51
			$set: data                                                                                           // 51
		});                                                                                                   // 51
	}                                                                                                      // 52
                                                                                                        //
	RocketChat.callbacks.add('beforeCreateUser', DolphinOnCreateUser, RocketChat.callbacks.priority.HIGH);
} else {                                                                                                // 55
	Meteor.startup(function () {                                                                           // 56
		return Tracker.autorun(function () {                                                                  // 56
			if (RocketChat.settings.get('Accounts_OAuth_Dolphin_URL')) {                                         // 58
				config.serverURL = RocketChat.settings.get('Accounts_OAuth_Dolphin_URL');                           // 59
				return Dolphin.configure(config);                                                                   // 60
			}                                                                                                    // 61
		});                                                                                                   // 62
	});                                                                                                    // 56
}                                                                                                       // 64
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"startup.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/rocketchat_dolphin/startup.js                                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
RocketChat.settings.add('Accounts_OAuth_Dolphin_URL', '', {                                             // 1
  type: 'string',                                                                                       // 1
  group: 'OAuth',                                                                                       // 1
  "public": true,                                                                                       // 1
  section: 'Dolphin',                                                                                   // 1
  i18nLabel: 'URL'                                                                                      // 1
});                                                                                                     // 1
RocketChat.settings.add('Accounts_OAuth_Dolphin_Site_Name', 'Dolphin', {                                // 2
  type: 'string',                                                                                       // 2
  group: 'OAuth',                                                                                       // 2
  "public": true,                                                                                       // 2
  section: 'Dolphin',                                                                                   // 2
  i18nLabel: 'Site_Name'                                                                                // 2
});                                                                                                     // 2
RocketChat.settings.add('Accounts_OAuth_Dolphin', false, {                                              // 3
  type: 'boolean',                                                                                      // 3
  group: 'OAuth',                                                                                       // 3
  section: 'Dolphin',                                                                                   // 3
  i18nLabel: 'Accounts_OAuth_Custom_Enable'                                                             // 3
});                                                                                                     // 3
RocketChat.settings.add('Accounts_OAuth_Dolphin_id', '', {                                              // 4
  type: 'string',                                                                                       // 4
  group: 'OAuth',                                                                                       // 4
  section: 'Dolphin',                                                                                   // 4
  i18nLabel: 'Accounts_OAuth_Custom_id'                                                                 // 4
});                                                                                                     // 4
RocketChat.settings.add('Accounts_OAuth_Dolphin_secret', '', {                                          // 5
  type: 'string',                                                                                       // 5
  group: 'OAuth',                                                                                       // 5
  section: 'Dolphin',                                                                                   // 5
  i18nLabel: 'Accounts_OAuth_Custom_Secret'                                                             // 5
});                                                                                                     // 5
RocketChat.settings.add('Accounts_OAuth_Dolphin_login_style', 'redirect', {                             // 6
  type: 'select',                                                                                       // 6
  group: 'OAuth',                                                                                       // 6
  section: 'Dolphin',                                                                                   // 6
  i18nLabel: 'Accounts_OAuth_Custom_Login_Style',                                                       // 6
  persistent: true,                                                                                     // 6
  values: [{                                                                                            // 6
    key: 'redirect',                                                                                    // 6
    i18nLabel: 'Redirect'                                                                               // 6
  }, {                                                                                                  // 6
    key: 'popup',                                                                                       // 6
    i18nLabel: 'Popup'                                                                                  // 6
  }, {                                                                                                  // 6
    key: '',                                                                                            // 6
    i18nLabel: 'Default'                                                                                // 6
  }]                                                                                                    // 6
});                                                                                                     // 6
RocketChat.settings.add('Accounts_OAuth_Dolphin_button_label_text', '', {                               // 7
  type: 'string',                                                                                       // 7
  group: 'OAuth',                                                                                       // 7
  section: 'Dolphin',                                                                                   // 7
  i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Text',                                                 // 7
  persistent: true                                                                                      // 7
});                                                                                                     // 7
RocketChat.settings.add('Accounts_OAuth_Dolphin_button_label_color', '#FFFFFF', {                       // 8
  type: 'string',                                                                                       // 8
  group: 'OAuth',                                                                                       // 8
  section: 'Dolphin',                                                                                   // 8
  i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Color',                                                // 8
  persistent: true                                                                                      // 8
});                                                                                                     // 8
RocketChat.settings.add('Accounts_OAuth_Dolphin_button_color', '#13679A', {                             // 9
  type: 'string',                                                                                       // 9
  group: 'OAuth',                                                                                       // 9
  section: 'Dolphin',                                                                                   // 9
  i18nLabel: 'Accounts_OAuth_Custom_Button_Color',                                                      // 9
  persistent: true                                                                                      // 9
});                                                                                                     // 9
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:dolphin/common.js");
require("./node_modules/meteor/rocketchat:dolphin/startup.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:dolphin'] = {};

})();

//# sourceMappingURL=rocketchat_dolphin.js.map
