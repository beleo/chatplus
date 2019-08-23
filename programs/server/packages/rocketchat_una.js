(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var CustomOAuth = Package['rocketchat:custom-oauth'].CustomOAuth;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_una/common.coffee.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Una, UnaOnCreateUser, config;                                                                                    // 3
config = {                                                                                                           // 3
  serverURL: '',                                                                                                     // 4
  authorizePath: '/m/oauth2/auth/',                                                                                  // 5
  tokenPath: '/m/oauth2/token/',                                                                                     // 6
  identityPath: '/m/oauth2/api/me/',                                                                                 // 7
  scope: 'basic',                                                                                                    // 8
  addAutopublishFields: {                                                                                            // 9
    forLoggedInUser: ['services.una'],                                                                               // 10
    forOtherUsers: ['services.una.name']                                                                             // 11
  }                                                                                                                  // 10
};                                                                                                                   // 4
Una = new CustomOAuth('una', config);                                                                                // 13
                                                                                                                     //
UnaOnCreateUser = function () {                                                                                      // 15
  function UnaOnCreateUser(options, user) {                                                                          // 16
    var ref, ref1, ref2, ref3;                                                                                       // 17
                                                                                                                     //
    if (((ref = user.services) != null ? (ref1 = ref.una) != null ? ref1.profile_display_name : void 0 : void 0) != null) {
      user.username = user.services.una.profile_display_name.replace(/[^A-Za-z0-9]/g, '.').replace(/\.+/g, '.').replace(/(^\.)|(\.$)/g, '');
      user.name = user.services.una.profile_display_name;                                                            // 19
    } else if (((ref2 = user.services) != null ? (ref3 = ref2.una) != null ? ref3.name : void 0 : void 0) != null) {
      user.username = user.services.una.name;                                                                        // 21
    }                                                                                                                // 25
                                                                                                                     //
    return user;                                                                                                     // 22
  }                                                                                                                  // 16
                                                                                                                     //
  return UnaOnCreateUser;                                                                                            // 29
}();                                                                                                                 // 31
                                                                                                                     //
if (Meteor.isServer) {                                                                                               // 24
  Meteor.startup(function () {                                                                                       // 25
    var data;                                                                                                        // 26
    RocketChat.models.Settings.find({                                                                                // 26
      _id: 'Accounts_OAuth_UNA_URL'                                                                                  // 26
    }).observe({                                                                                                     // 26
      added: function (record) {                                                                                     // 27
        config.serverURL = RocketChat.settings.get('Accounts_OAuth_UNA_URL');                                        // 28
        return Una.configure(config);                                                                                // 41
      },                                                                                                             // 27
      changed: function (record) {                                                                                   // 30
        config.serverURL = RocketChat.settings.get('Accounts_OAuth_UNA_URL');                                        // 31
        return Una.configure(config);                                                                                // 45
      }                                                                                                              // 27
    });                                                                                                              // 27
                                                                                                                     //
    if (RocketChat.settings.get('Accounts_OAuth_UNA_URL')) {                                                         // 34
      data = {                                                                                                       // 35
        buttonLabelText: RocketChat.settings.get('Accounts_OAuth_UNA_button_label_text'),                            // 36
        buttonColor: RocketChat.settings.get('Accounts_OAuth_UNA_button_color'),                                     // 37
        buttonLabelColor: RocketChat.settings.get('Accounts_OAuth_UNA_button_label_color'),                          // 38
        clientId: RocketChat.settings.get('Accounts_OAuth_UNA_id'),                                                  // 39
        secret: RocketChat.settings.get('Accounts_OAuth_UNA_secret'),                                                // 40
        loginStyle: RocketChat.settings.get('Accounts_OAuth_UNA_login_style'),                                       // 41
        siteName: RocketChat.settings.get('Accounts_OAuth_UNA_Site_Name')                                            // 42
      };                                                                                                             // 36
      return ServiceConfiguration.configurations.upsert({                                                            // 58
        service: 'una'                                                                                               // 44
      }, {                                                                                                           // 44
        $set: data                                                                                                   // 44
      });                                                                                                            // 44
    }                                                                                                                // 63
  });                                                                                                                // 25
  RocketChat.callbacks.add('beforeCreateUser', UnaOnCreateUser, RocketChat.callbacks.priority.HIGH);                 // 46
} else {                                                                                                             // 24
  Meteor.startup(function () {                                                                                       // 48
    return Tracker.autorun(function () {                                                                             // 68
      if (RocketChat.settings.get('Accounts_OAuth_UNA_URL')) {                                                       // 51
        config.serverURL = RocketChat.settings.get('Accounts_OAuth_UNA_URL');                                        // 52
        return Una.configure(config);                                                                                // 71
      }                                                                                                              // 72
    });                                                                                                              // 49
  });                                                                                                                // 48
}                                                                                                                    // 75
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_una/startup.coffee.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.settings.add('Accounts_OAuth_UNA_URL', '', {                                                              // 1
  type: 'string',                                                                                                    // 1
  group: 'OAuth',                                                                                                    // 1
  "public": true,                                                                                                    // 1
  section: 'UNA',                                                                                                    // 1
  i18nLabel: 'URL'                                                                                                   // 1
});                                                                                                                  // 1
RocketChat.settings.add('Accounts_OAuth_UNA_Site_Name', 'UNA', {                                                     // 2
  type: 'string',                                                                                                    // 2
  group: 'OAuth',                                                                                                    // 2
  "public": true,                                                                                                    // 2
  section: 'UNA',                                                                                                    // 2
  i18nLabel: 'Site_Name'                                                                                             // 2
});                                                                                                                  // 2
RocketChat.settings.add('Accounts_OAuth_UNA', false, {                                                               // 3
  type: 'boolean',                                                                                                   // 3
  group: 'OAuth',                                                                                                    // 3
  section: 'UNA',                                                                                                    // 3
  i18nLabel: 'Accounts_OAuth_Custom_Enable'                                                                          // 3
});                                                                                                                  // 3
RocketChat.settings.add('Accounts_OAuth_UNA_id', '', {                                                               // 4
  type: 'string',                                                                                                    // 4
  group: 'OAuth',                                                                                                    // 4
  section: 'UNA',                                                                                                    // 4
  i18nLabel: 'Accounts_OAuth_Custom_id'                                                                              // 4
});                                                                                                                  // 4
RocketChat.settings.add('Accounts_OAuth_UNA_secret', '', {                                                           // 5
  type: 'string',                                                                                                    // 5
  group: 'OAuth',                                                                                                    // 5
  section: 'UNA',                                                                                                    // 5
  i18nLabel: 'Accounts_OAuth_Custom_Secret'                                                                          // 5
});                                                                                                                  // 5
RocketChat.settings.add('Accounts_OAuth_UNA_login_style', 'redirect', {                                              // 6
  type: 'select',                                                                                                    // 6
  group: 'OAuth',                                                                                                    // 6
  section: "UNA",                                                                                                    // 6
  i18nLabel: 'Accounts_OAuth_Custom_Login_Style',                                                                    // 6
  persistent: true,                                                                                                  // 6
  values: [{                                                                                                         // 6
    key: 'redirect',                                                                                                 // 6
    i18nLabel: 'Redirect'                                                                                            // 6
  }, {                                                                                                               // 6
    key: 'popup',                                                                                                    // 6
    i18nLabel: 'Popup'                                                                                               // 6
  }, {                                                                                                               // 6
    key: '',                                                                                                         // 6
    i18nLabel: 'Default'                                                                                             // 6
  }]                                                                                                                 // 6
});                                                                                                                  // 6
RocketChat.settings.add('Accounts_OAuth_UNA_button_label_text', '', {                                                // 7
  type: 'string',                                                                                                    // 7
  group: 'OAuth',                                                                                                    // 7
  section: "UNA",                                                                                                    // 7
  i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Text',                                                              // 7
  persistent: true                                                                                                   // 7
});                                                                                                                  // 7
RocketChat.settings.add('Accounts_OAuth_UNA_button_label_color', '#FFFFFF', {                                        // 8
  type: 'string',                                                                                                    // 8
  group: 'OAuth',                                                                                                    // 8
  section: "UNA",                                                                                                    // 8
  i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Color',                                                             // 8
  persistent: true                                                                                                   // 8
});                                                                                                                  // 8
RocketChat.settings.add('Accounts_OAuth_UNA_button_color', '#13679A', {                                              // 9
  type: 'string',                                                                                                    // 9
  group: 'OAuth',                                                                                                    // 9
  section: 'UNA',                                                                                                    // 9
  i18nLabel: 'Accounts_OAuth_Custom_Button_Color',                                                                   // 9
  persistent: true                                                                                                   // 9
});                                                                                                                  // 9
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:una'] = {};

})();

//# sourceMappingURL=rocketchat_una.js.map
