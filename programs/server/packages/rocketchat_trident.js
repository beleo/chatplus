(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var CustomOAuth = Package['rocketchat:custom-oauth'].CustomOAuth;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var __coffeescriptShare, translations;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/rocketchat_trident/common.coffee.js                                                                 //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Trident, TridentOnCreateUser, config;                                                                       // 3
config = {                                                                                                      // 3
  serverURL: '',                                                                                                // 4
  authorizePath: '/m/oauth2/auth/',                                                                             // 5
  tokenPath: '/m/oauth2/token/',                                                                                // 6
  identityPath: '/m/oauth2/api/me/',                                                                            // 7
  scope: 'basic',                                                                                               // 8
  addAutopublishFields: {                                                                                       // 9
    forLoggedInUser: ['services.trident'],                                                                      // 10
    forOtherUsers: ['services.trident.name']                                                                    // 11
  }                                                                                                             // 10
};                                                                                                              // 4
Trident = new CustomOAuth('trident', config);                                                                   // 13
                                                                                                                //
TridentOnCreateUser = function () {                                                                             // 15
  function TridentOnCreateUser(options, user) {                                                                 // 16
    var ref, ref1;                                                                                              // 17
                                                                                                                //
    if (((ref = user.services) != null ? (ref1 = ref.trident) != null ? ref1.name : void 0 : void 0) != null) {
      user.username = user.services.trident.name;                                                               // 18
    }                                                                                                           // 22
                                                                                                                //
    return user;                                                                                                // 19
  }                                                                                                             // 16
                                                                                                                //
  return TridentOnCreateUser;                                                                                   // 26
}();                                                                                                            // 28
                                                                                                                //
if (Meteor.isServer) {                                                                                          // 21
  Meteor.startup(function () {                                                                                  // 22
    var data;                                                                                                   // 23
    RocketChat.models.Settings.find({                                                                           // 23
      _id: 'API_Trident_URL'                                                                                    // 23
    }).observe({                                                                                                // 23
      added: function (record) {                                                                                // 24
        config.serverURL = RocketChat.settings.get('API_Trident_URL');                                          // 25
        return Trident.configure(config);                                                                       // 38
      },                                                                                                        // 24
      changed: function (record) {                                                                              // 27
        config.serverURL = RocketChat.settings.get('API_Trident_URL');                                          // 28
        return Trident.configure(config);                                                                       // 42
      }                                                                                                         // 24
    });                                                                                                         // 24
                                                                                                                //
    if (RocketChat.settings.get('API_Trident_URL')) {                                                           // 31
      data = {                                                                                                  // 32
        buttonLabelText: RocketChat.settings.get('Accounts_OAuth_Trident_button_label_text'),                   // 33
        buttonColor: RocketChat.settings.get('Accounts_OAuth_Trident_button_color'),                            // 34
        buttonLabelColor: RocketChat.settings.get('Accounts_OAuth_Trident_button_label_color'),                 // 35
        clientId: RocketChat.settings.get('Accounts_OAuth_Trident_id'),                                         // 36
        secret: RocketChat.settings.get('Accounts_OAuth_Trident_secret'),                                       // 37
        loginStyle: RocketChat.settings.get('Accounts_OAuth_Trident_login_style')                               // 38
      };                                                                                                        // 33
      return ServiceConfiguration.configurations.upsert({                                                       // 54
        service: 'trident'                                                                                      // 40
      }, {                                                                                                      // 40
        $set: data                                                                                              // 40
      });                                                                                                       // 40
    }                                                                                                           // 59
  });                                                                                                           // 22
  RocketChat.callbacks.add('beforeCreateUser', TridentOnCreateUser, RocketChat.callbacks.priority.HIGH);        // 42
} else {                                                                                                        // 21
  Meteor.startup(function () {                                                                                  // 44
    return Tracker.autorun(function () {                                                                        // 64
      if (RocketChat.settings.get('API_Trident_URL')) {                                                         // 47
        config.serverURL = RocketChat.settings.get('API_Trident_URL');                                          // 48
        return Trident.configure(config);                                                                       // 67
      }                                                                                                         // 68
    });                                                                                                         // 45
  });                                                                                                           // 44
}                                                                                                               // 71
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/rocketchat_trident/startup.coffee.js                                                                //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.settings.add('API_Trident_URL', '', {                                                                // 1
  type: 'string',                                                                                               // 1
  group: 'OAuth',                                                                                               // 1
  "public": true,                                                                                               // 1
  section: 'Trident'                                                                                            // 1
});                                                                                                             // 1
RocketChat.settings.add('Accounts_OAuth_Trident', false, {                                                      // 2
  type: 'boolean',                                                                                              // 2
  group: 'OAuth',                                                                                               // 2
  section: 'Trident'                                                                                            // 2
});                                                                                                             // 2
RocketChat.settings.add('Accounts_OAuth_Trident_id', '', {                                                      // 3
  type: 'string',                                                                                               // 3
  group: 'OAuth',                                                                                               // 3
  section: 'Trident'                                                                                            // 3
});                                                                                                             // 3
RocketChat.settings.add('Accounts_OAuth_Trident_secret', '', {                                                  // 4
  type: 'string',                                                                                               // 4
  group: 'OAuth',                                                                                               // 4
  section: 'Trident'                                                                                            // 4
});                                                                                                             // 4
RocketChat.settings.add('Accounts_OAuth_Trident_login_style', 'redirect', {                                     // 5
  type: 'select',                                                                                               // 5
  group: 'OAuth',                                                                                               // 5
  section: "Trident",                                                                                           // 5
  i18nLabel: 'Accounts_OAuth_Custom_Login_Style',                                                               // 5
  persistent: true,                                                                                             // 5
  values: [{                                                                                                    // 5
    key: 'redirect',                                                                                            // 5
    i18nLabel: 'Redirect'                                                                                       // 5
  }, {                                                                                                          // 5
    key: 'popup',                                                                                               // 5
    i18nLabel: 'Popup'                                                                                          // 5
  }, {                                                                                                          // 5
    key: '',                                                                                                    // 5
    i18nLabel: 'Default'                                                                                        // 5
  }]                                                                                                            // 5
});                                                                                                             // 5
RocketChat.settings.add('Accounts_OAuth_Trident_button_label_text', '', {                                       // 6
  type: 'string',                                                                                               // 6
  group: 'OAuth',                                                                                               // 6
  section: "Trident",                                                                                           // 6
  i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Text',                                                         // 6
  persistent: true                                                                                              // 6
});                                                                                                             // 6
RocketChat.settings.add('Accounts_OAuth_Trident_button_label_color', '#FFFFFF', {                               // 7
  type: 'string',                                                                                               // 7
  group: 'OAuth',                                                                                               // 7
  section: "Trident",                                                                                           // 7
  i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Color',                                                        // 7
  persistent: true                                                                                              // 7
});                                                                                                             // 7
RocketChat.settings.add('Accounts_OAuth_Trident_button_color', '#13679A', {                                     // 8
  type: 'string',                                                                                               // 8
  group: 'OAuth',                                                                                               // 8
  section: 'Trident',                                                                                           // 8
  i18nLabel: 'Accounts_OAuth_Custom_Button_Color',                                                              // 8
  persistent: true                                                                                              // 8
});                                                                                                             // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/rocketchat_trident/packages/rocketchat_tridenti18n/de.i18n.json                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n.languages_names["de"] = ["German","Deutsch"];
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];
if(_.isUndefined(TAPi18n.translations["de"])) {
  TAPi18n.translations["de"] = {};
}

if(_.isUndefined(TAPi18n.translations["de"][namespace])) {
  TAPi18n.translations["de"][namespace] = {};
}

_.extend(TAPi18n.translations["de"][namespace], {"API_Trident_URL":"Trident URL","Accounts_OAuth_Trident":"Trident Login","Accounts_OAuth_Trident_id":"Trident Key","Accounts_OAuth_Trident_secret":"Trident Secret"});
TAPi18n._registerServerTranslator("de", namespace);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/rocketchat_trident/packages/rocketchat_tridenti18n/en.i18n.json                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
// integrate the fallback language translations 
translations = {};
translations[namespace] = {"API_Trident_URL":"Trident URL","Accounts_OAuth_Trident":"Trident Login","Accounts_OAuth_Trident_id":"Trident Key","Accounts_OAuth_Trident_secret":"Trident Secret"};
TAPi18n._loadLangFileObject("en", translations);
TAPi18n._registerServerTranslator("en", namespace);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/rocketchat_trident/packages/rocketchat_tridenti18n/fi.i18n.json                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n.languages_names["fi"] = ["Finnish","Suomi"];
if(_.isUndefined(TAPi18n.translations["fi"])) {
  TAPi18n.translations["fi"] = {};
}

if(_.isUndefined(TAPi18n.translations["fi"][namespace])) {
  TAPi18n.translations["fi"][namespace] = {};
}

_.extend(TAPi18n.translations["fi"][namespace], {"API_Trident_URL":"Trident URL","Accounts_OAuth_Trident":"Trident-kirjautuminen","Accounts_OAuth_Trident_id":"Trident Key","Accounts_OAuth_Trident_secret":"Trident Secret"});
TAPi18n._registerServerTranslator("fi", namespace);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/rocketchat_trident/packages/rocketchat_tridenti18n/ko.i18n.json                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n.languages_names["ko"] = ["Korean","한국어"];
if(_.isUndefined(TAPi18n.translations["ko"])) {
  TAPi18n.translations["ko"] = {};
}

if(_.isUndefined(TAPi18n.translations["ko"][namespace])) {
  TAPi18n.translations["ko"][namespace] = {};
}

_.extend(TAPi18n.translations["ko"][namespace], {"API_Trident_URL":"Trident URL","Accounts_OAuth_Trident":"Trident 로그인","Accounts_OAuth_Trident_id":"Trident Key","Accounts_OAuth_Trident_secret":"Trident 암호"});
TAPi18n._registerServerTranslator("ko", namespace);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/rocketchat_trident/packages/rocketchat_tridenti18n/ro.i18n.json                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n.languages_names["ro"] = ["Romanian","Română"];
if(_.isUndefined(TAPi18n.translations["ro"])) {
  TAPi18n.translations["ro"] = {};
}

if(_.isUndefined(TAPi18n.translations["ro"][namespace])) {
  TAPi18n.translations["ro"][namespace] = {};
}

_.extend(TAPi18n.translations["ro"][namespace], {"API_Trident_URL":"URL Trident","Accounts_OAuth_Trident":"Autentificare Trident","Accounts_OAuth_Trident_id":" Key Trident","Accounts_OAuth_Trident_secret":"Secret Trident"});
TAPi18n._registerServerTranslator("ro", namespace);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/rocketchat_trident/packages/rocketchat_tridenti18n/ru.i18n.json                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n.languages_names["ru"] = ["Russian","Русский"];
if(_.isUndefined(TAPi18n.translations["ru"])) {
  TAPi18n.translations["ru"] = {};
}

if(_.isUndefined(TAPi18n.translations["ru"][namespace])) {
  TAPi18n.translations["ru"][namespace] = {};
}

_.extend(TAPi18n.translations["ru"][namespace], {"API_Trident_URL":"Адрес Trident сайта","Accounts_OAuth_Trident":"Trident Соединение","Accounts_OAuth_Trident_id":"Trident Key","Accounts_OAuth_Trident_secret":"Trident Secret"});
TAPi18n._registerServerTranslator("ru", namespace);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:trident'] = {};

})();

//# sourceMappingURL=rocketchat_trident.js.map
