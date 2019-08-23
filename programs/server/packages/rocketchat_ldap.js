(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Logger = Package['rocketchat:logger'].Logger;
var SystemLogger = Package['rocketchat:logger'].SystemLogger;
var LoggerManager = Package['rocketchat:logger'].LoggerManager;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var slugify = Package['yasaricli:slugify'].slugify;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var SHA256 = Package.sha.SHA256;
var Accounts = Package['accounts-base'].Accounts;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:ldap":{"server":{"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_ldap/server/index.js                                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
module.watch(require("./loginHandler"));                                                                      // 1
module.watch(require("./settings"));                                                                          // 1
module.watch(require("./testConnection"));                                                                    // 1
module.watch(require("./syncUsers"));                                                                         // 1
module.watch(require("./sync"));                                                                              // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ldap.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_ldap/server/ldap.js                                                                    //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                       //
                                                                                                              //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                              //
                                                                                                              //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }             //
                                                                                                              //
module.export({                                                                                               // 1
	"default": function () {                                                                                     // 1
		return LDAP;                                                                                                // 1
	}                                                                                                            // 1
});                                                                                                           // 1
var ldapjs = void 0;                                                                                          // 1
module.watch(require("ldapjs"), {                                                                             // 1
	"default": function (v) {                                                                                    // 1
		ldapjs = v;                                                                                                 // 1
	}                                                                                                            // 1
}, 0);                                                                                                        // 1
var Bunyan = void 0;                                                                                          // 1
module.watch(require("bunyan"), {                                                                             // 1
	"default": function (v) {                                                                                    // 1
		Bunyan = v;                                                                                                 // 1
	}                                                                                                            // 1
}, 1);                                                                                                        // 1
var logger = new Logger('LDAP', {                                                                             // 4
	sections: {                                                                                                  // 5
		connection: 'Connection',                                                                                   // 6
		bind: 'Bind',                                                                                               // 7
		search: 'Search',                                                                                           // 8
		auth: 'Auth'                                                                                                // 9
	}                                                                                                            // 5
});                                                                                                           // 4
                                                                                                              //
var LDAP = function () {                                                                                      //
	function LDAP() {                                                                                            // 14
		(0, _classCallCheck3.default)(this, LDAP);                                                                  // 14
		this.ldapjs = ldapjs;                                                                                       // 15
		this.connected = false;                                                                                     // 17
		this.options = {                                                                                            // 19
			host: RocketChat.settings.get('LDAP_Host'),                                                                // 20
			port: RocketChat.settings.get('LDAP_Port'),                                                                // 21
			Reconnect: RocketChat.settings.get('LDAP_Reconnect'),                                                      // 22
			Internal_Log_Level: RocketChat.settings.get('LDAP_Internal_Log_Level'),                                    // 23
			timeout: RocketChat.settings.get('LDAP_Timeout'),                                                          // 24
			connect_timeout: RocketChat.settings.get('LDAP_Connect_Timeout'),                                          // 25
			idle_timeout: RocketChat.settings.get('LDAP_Idle_Timeout'),                                                // 26
			encryption: RocketChat.settings.get('LDAP_Encryption'),                                                    // 27
			ca_cert: RocketChat.settings.get('LDAP_CA_Cert'),                                                          // 28
			reject_unauthorized: RocketChat.settings.get('LDAP_Reject_Unauthorized') || false,                         // 29
			Authentication: RocketChat.settings.get('LDAP_Authentication'),                                            // 30
			Authentication_UserDN: RocketChat.settings.get('LDAP_Authentication_UserDN'),                              // 31
			Authentication_Password: RocketChat.settings.get('LDAP_Authentication_Password'),                          // 32
			BaseDN: RocketChat.settings.get('LDAP_BaseDN'),                                                            // 33
			User_Search_Filter: RocketChat.settings.get('LDAP_User_Search_Filter'),                                    // 34
			User_Search_Scope: RocketChat.settings.get('LDAP_User_Search_Scope'),                                      // 35
			User_Search_Field: RocketChat.settings.get('LDAP_User_Search_Field'),                                      // 36
			Search_Page_Size: RocketChat.settings.get('LDAP_Search_Page_Size'),                                        // 37
			Search_Size_Limit: RocketChat.settings.get('LDAP_Search_Size_Limit'),                                      // 38
			group_filter_enabled: RocketChat.settings.get('LDAP_Group_Filter_Enable'),                                 // 39
			group_filter_object_class: RocketChat.settings.get('LDAP_Group_Filter_ObjectClass'),                       // 40
			group_filter_group_id_attribute: RocketChat.settings.get('LDAP_Group_Filter_Group_Id_Attribute'),          // 41
			group_filter_group_member_attribute: RocketChat.settings.get('LDAP_Group_Filter_Group_Member_Attribute'),  // 42
			group_filter_group_member_format: RocketChat.settings.get('LDAP_Group_Filter_Group_Member_Format'),        // 43
			group_filter_group_name: RocketChat.settings.get('LDAP_Group_Filter_Group_Name')                           // 44
		};                                                                                                          // 19
	}                                                                                                            // 46
                                                                                                              //
	LDAP.prototype.connectSync = function () {                                                                   //
		function connectSync() {                                                                                    //
			if (!this._connectSync) {                                                                                  // 49
				this._connectSync = Meteor.wrapAsync(this.connectAsync, this);                                            // 50
			}                                                                                                          // 51
                                                                                                              //
			return this._connectSync.apply(this, arguments);                                                           // 52
		}                                                                                                           // 53
                                                                                                              //
		return connectSync;                                                                                         //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.searchAllSync = function () {                                                                 //
		function searchAllSync() {                                                                                  //
			if (!this._searchAllSync) {                                                                                // 56
				this._searchAllSync = Meteor.wrapAsync(this.searchAllAsync, this);                                        // 57
			}                                                                                                          // 58
                                                                                                              //
			return this._searchAllSync.apply(this, arguments);                                                         // 59
		}                                                                                                           // 60
                                                                                                              //
		return searchAllSync;                                                                                       //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.connectAsync = function () {                                                                  //
		function connectAsync(callback) {                                                                           //
			var _this = this;                                                                                          // 62
                                                                                                              //
			logger.connection.info('Init setup');                                                                      // 63
			var replied = false;                                                                                       // 65
			var connectionOptions = {                                                                                  // 67
				url: this.options.host + ":" + this.options.port,                                                         // 68
				timeout: this.options.timeout,                                                                            // 69
				connectTimeout: this.options.connect_timeout,                                                             // 70
				idleTimeout: this.options.idle_timeout,                                                                   // 71
				reconnect: this.options.Reconnect                                                                         // 72
			};                                                                                                         // 67
                                                                                                              //
			if (this.options.Internal_Log_Level !== 'disabled') {                                                      // 75
				connectionOptions.log = new Bunyan({                                                                      // 76
					name: 'ldapjs',                                                                                          // 77
					component: 'client',                                                                                     // 78
					stream: process.stderr,                                                                                  // 79
					level: this.options.Internal_Log_Level                                                                   // 80
				});                                                                                                       // 76
			}                                                                                                          // 82
                                                                                                              //
			var tlsOptions = {                                                                                         // 84
				rejectUnauthorized: this.options.reject_unauthorized                                                      // 85
			};                                                                                                         // 84
                                                                                                              //
			if (this.options.ca_cert && this.options.ca_cert !== '') {                                                 // 88
				// Split CA cert into array of strings                                                                    // 89
				var chainLines = RocketChat.settings.get('LDAP_CA_Cert').split('\n');                                     // 90
				var cert = [];                                                                                            // 91
				var ca = [];                                                                                              // 92
				chainLines.forEach(function (line) {                                                                      // 93
					cert.push(line);                                                                                         // 94
                                                                                                              //
					if (line.match(/-END CERTIFICATE-/)) {                                                                   // 95
						ca.push(cert.join('\n'));                                                                               // 96
						cert = [];                                                                                              // 97
					}                                                                                                        // 98
				});                                                                                                       // 99
				tlsOptions.ca = ca;                                                                                       // 100
			}                                                                                                          // 101
                                                                                                              //
			if (this.options.encryption === 'ssl') {                                                                   // 103
				connectionOptions.url = "ldaps://" + connectionOptions.url;                                               // 104
				connectionOptions.tlsOptions = tlsOptions;                                                                // 105
			} else {                                                                                                   // 106
				connectionOptions.url = "ldap://" + connectionOptions.url;                                                // 107
			}                                                                                                          // 108
                                                                                                              //
			logger.connection.info('Connecting', connectionOptions.url);                                               // 110
			logger.connection.debug('connectionOptions', connectionOptions);                                           // 111
			this.client = ldapjs.createClient(connectionOptions);                                                      // 113
			this.bindSync = Meteor.wrapAsync(this.client.bind, this.client);                                           // 115
			this.client.on('error', function (error) {                                                                 // 117
				logger.connection.error('connection', error);                                                             // 118
                                                                                                              //
				if (replied === false) {                                                                                  // 119
					replied = true;                                                                                          // 120
					callback(error, null);                                                                                   // 121
				}                                                                                                         // 122
			});                                                                                                        // 123
			this.client.on('idle', function () {                                                                       // 125
				logger.search.info('Idle');                                                                               // 126
                                                                                                              //
				_this.disconnect();                                                                                       // 127
			});                                                                                                        // 128
			this.client.on('close', function () {                                                                      // 130
				logger.search.info('Closed');                                                                             // 131
			});                                                                                                        // 132
                                                                                                              //
			if (this.options.encryption === 'tls') {                                                                   // 134
				// Set host parameter for tls.connect which is used by ldapjs starttls. This shouldn't be needed in newer nodejs versions (e.g v5.6.0).
				// https://github.com/RocketChat/Rocket.Chat/issues/2035                                                  // 136
				// https://github.com/mcavage/node-ldapjs/issues/349                                                      // 137
				tlsOptions.host = this.options.host;                                                                      // 138
				logger.connection.info('Starting TLS');                                                                   // 140
				logger.connection.debug('tlsOptions', tlsOptions);                                                        // 141
				this.client.starttls(tlsOptions, null, function (error, response) {                                       // 143
					if (error) {                                                                                             // 144
						logger.connection.error('TLS connection', error);                                                       // 145
                                                                                                              //
						if (replied === false) {                                                                                // 146
							replied = true;                                                                                        // 147
							callback(error, null);                                                                                 // 148
						}                                                                                                       // 149
                                                                                                              //
						return;                                                                                                 // 150
					}                                                                                                        // 151
                                                                                                              //
					logger.connection.info('TLS connected');                                                                 // 153
					_this.connected = true;                                                                                  // 154
                                                                                                              //
					if (replied === false) {                                                                                 // 155
						replied = true;                                                                                         // 156
						callback(null, response);                                                                               // 157
					}                                                                                                        // 158
				});                                                                                                       // 159
			} else {                                                                                                   // 160
				this.client.on('connect', function (response) {                                                           // 161
					logger.connection.info('LDAP connected');                                                                // 162
					_this.connected = true;                                                                                  // 163
                                                                                                              //
					if (replied === false) {                                                                                 // 164
						replied = true;                                                                                         // 165
						callback(null, response);                                                                               // 166
					}                                                                                                        // 167
				});                                                                                                       // 168
			}                                                                                                          // 169
                                                                                                              //
			setTimeout(function () {                                                                                   // 171
				if (replied === false) {                                                                                  // 172
					logger.connection.error('connection time out', connectionOptions.connectTimeout);                        // 173
					replied = true;                                                                                          // 174
					callback(new Error('Timeout'));                                                                          // 175
				}                                                                                                         // 176
			}, connectionOptions.connectTimeout);                                                                      // 177
		}                                                                                                           // 178
                                                                                                              //
		return connectAsync;                                                                                        //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.getUserFilter = function () {                                                                 //
		function getUserFilter(username) {                                                                          //
			var filter = [];                                                                                           // 181
                                                                                                              //
			if (this.options.User_Search_Filter !== '') {                                                              // 183
				if (this.options.User_Search_Filter[0] === '(') {                                                         // 184
					filter.push("" + this.options.User_Search_Filter);                                                       // 185
				} else {                                                                                                  // 186
					filter.push("(" + this.options.User_Search_Filter + ")");                                                // 187
				}                                                                                                         // 188
			}                                                                                                          // 189
                                                                                                              //
			var usernameFilter = this.options.User_Search_Field.split(',').map(function (item) {                       // 191
				return "(" + item + "=" + username + ")";                                                                 // 191
			});                                                                                                        // 191
                                                                                                              //
			if (usernameFilter.length === 0) {                                                                         // 193
				logger.error('LDAP_LDAP_User_Search_Field not defined');                                                  // 194
			} else if (usernameFilter.length === 1) {                                                                  // 195
				filter.push("" + usernameFilter[0]);                                                                      // 196
			} else {                                                                                                   // 197
				filter.push("(|" + usernameFilter.join('') + ")");                                                        // 198
			}                                                                                                          // 199
                                                                                                              //
			return "(&" + filter.join('') + ")";                                                                       // 201
		}                                                                                                           // 202
                                                                                                              //
		return getUserFilter;                                                                                       //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.bindIfNecessary = function () {                                                               //
		function bindIfNecessary() {                                                                                //
			if (this.domainBinded === true) {                                                                          // 205
				return;                                                                                                   // 206
			}                                                                                                          // 207
                                                                                                              //
			if (this.options.Authentication !== true) {                                                                // 209
				return;                                                                                                   // 210
			}                                                                                                          // 211
                                                                                                              //
			logger.bind.info('Binding UserDN', this.options.Authentication_UserDN);                                    // 213
			this.bindSync(this.options.Authentication_UserDN, this.options.Authentication_Password);                   // 214
			this.domainBinded = true;                                                                                  // 215
		}                                                                                                           // 216
                                                                                                              //
		return bindIfNecessary;                                                                                     //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.searchUsersSync = function () {                                                               //
		function searchUsersSync(username, page) {                                                                  //
			this.bindIfNecessary();                                                                                    // 219
			var searchOptions = {                                                                                      // 221
				filter: this.getUserFilter(username),                                                                     // 222
				scope: this.options.User_Search_Scope || 'sub',                                                           // 223
				sizeLimit: this.options.Search_Size_Limit                                                                 // 224
			};                                                                                                         // 221
                                                                                                              //
			if (this.options.Search_Page_Size > 0) {                                                                   // 227
				searchOptions.paged = {                                                                                   // 228
					pageSize: this.options.Search_Page_Size,                                                                 // 229
					pagePause: !!page                                                                                        // 230
				};                                                                                                        // 228
			}                                                                                                          // 232
                                                                                                              //
			logger.search.info('Searching user', username);                                                            // 234
			logger.search.debug('searchOptions', searchOptions);                                                       // 235
			logger.search.debug('BaseDN', this.options.BaseDN);                                                        // 236
                                                                                                              //
			if (page) {                                                                                                // 238
				return this.searchAllPaged(this.options.BaseDN, searchOptions, page);                                     // 239
			}                                                                                                          // 240
                                                                                                              //
			return this.searchAllSync(this.options.BaseDN, searchOptions);                                             // 242
		}                                                                                                           // 243
                                                                                                              //
		return searchUsersSync;                                                                                     //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.getUserByIdSync = function () {                                                               //
		function getUserByIdSync(id, attribute) {                                                                   //
			var _this2 = this;                                                                                         // 245
                                                                                                              //
			this.bindIfNecessary();                                                                                    // 246
			var Unique_Identifier_Field = RocketChat.settings.get('LDAP_Unique_Identifier_Field').split(',');          // 248
			var filter = void 0;                                                                                       // 250
                                                                                                              //
			if (attribute) {                                                                                           // 252
				filter = new this.ldapjs.filters.EqualityFilter({                                                         // 253
					attribute: attribute,                                                                                    // 254
					value: new Buffer(id, 'hex')                                                                             // 255
				});                                                                                                       // 253
			} else {                                                                                                   // 257
				var filters = [];                                                                                         // 258
				Unique_Identifier_Field.forEach(function (item) {                                                         // 259
					filters.push(new _this2.ldapjs.filters.EqualityFilter({                                                  // 260
						attribute: item,                                                                                        // 261
						value: new Buffer(id, 'hex')                                                                            // 262
					}));                                                                                                     // 260
				});                                                                                                       // 264
				filter = new this.ldapjs.filters.OrFilter({                                                               // 266
					filters: filters                                                                                         // 266
				});                                                                                                       // 266
			}                                                                                                          // 267
                                                                                                              //
			var searchOptions = {                                                                                      // 269
				filter: filter,                                                                                           // 270
				scope: 'sub'                                                                                              // 271
			};                                                                                                         // 269
			logger.search.info('Searching by id', id);                                                                 // 274
			logger.search.debug('search filter', searchOptions.filter.toString());                                     // 275
			logger.search.debug('BaseDN', this.options.BaseDN);                                                        // 276
			var result = this.searchAllSync(this.options.BaseDN, searchOptions);                                       // 278
                                                                                                              //
			if (!Array.isArray(result) || result.length === 0) {                                                       // 280
				return;                                                                                                   // 281
			}                                                                                                          // 282
                                                                                                              //
			if (result.length > 1) {                                                                                   // 284
				logger.search.error('Search by id', id, 'returned', result.length, 'records');                            // 285
			}                                                                                                          // 286
                                                                                                              //
			return result[0];                                                                                          // 288
		}                                                                                                           // 289
                                                                                                              //
		return getUserByIdSync;                                                                                     //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.getUserByUsernameSync = function () {                                                         //
		function getUserByUsernameSync(username) {                                                                  //
			this.bindIfNecessary();                                                                                    // 292
			var searchOptions = {                                                                                      // 294
				filter: this.getUserFilter(username),                                                                     // 295
				scope: this.options.User_Search_Scope || 'sub'                                                            // 296
			};                                                                                                         // 294
			logger.search.info('Searching user', username);                                                            // 299
			logger.search.debug('searchOptions', searchOptions);                                                       // 300
			logger.search.debug('BaseDN', this.options.BaseDN);                                                        // 301
			var result = this.searchAllSync(this.options.BaseDN, searchOptions);                                       // 303
                                                                                                              //
			if (!Array.isArray(result) || result.length === 0) {                                                       // 305
				return;                                                                                                   // 306
			}                                                                                                          // 307
                                                                                                              //
			if (result.length > 1) {                                                                                   // 309
				logger.search.error('Search by username', username, 'returned', result.length, 'records');                // 310
			}                                                                                                          // 311
                                                                                                              //
			return result[0];                                                                                          // 313
		}                                                                                                           // 314
                                                                                                              //
		return getUserByUsernameSync;                                                                               //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.isUserInGroup = function () {                                                                 //
		function isUserInGroup(username) {                                                                          //
			if (!this.options.group_filter_enabled) {                                                                  // 317
				return true;                                                                                              // 318
			}                                                                                                          // 319
                                                                                                              //
			var filter = ['(&'];                                                                                       // 321
                                                                                                              //
			if (this.options.group_filter_object_class !== '') {                                                       // 323
				filter.push("(objectclass=" + this.options.group_filter_object_class + ")");                              // 324
			}                                                                                                          // 325
                                                                                                              //
			if (this.options.group_filter_group_member_attribute !== '') {                                             // 327
				filter.push("(" + this.options.group_filter_group_member_attribute + "=" + this.options.group_filter_group_member_format + ")");
			}                                                                                                          // 329
                                                                                                              //
			if (this.options.group_filter_group_id_attribute !== '') {                                                 // 331
				filter.push("(" + this.options.group_filter_group_id_attribute + "=" + this.options.group_filter_group_name + ")");
			}                                                                                                          // 333
                                                                                                              //
			filter.push(')');                                                                                          // 334
			var searchOptions = {                                                                                      // 336
				filter: filter.join('').replace(/#{username}/g, username),                                                // 337
				scope: 'sub'                                                                                              // 338
			};                                                                                                         // 336
			logger.search.debug('Group filter LDAP:', searchOptions.filter);                                           // 341
			var result = this.searchAllSync(this.options.BaseDN, searchOptions);                                       // 343
                                                                                                              //
			if (!Array.isArray(result) || result.length === 0) {                                                       // 345
				return false;                                                                                             // 346
			}                                                                                                          // 347
                                                                                                              //
			return true;                                                                                               // 348
		}                                                                                                           // 349
                                                                                                              //
		return isUserInGroup;                                                                                       //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.extractLdapEntryData = function () {                                                          //
		function extractLdapEntryData(entry) {                                                                      //
			var values = entry.raw;                                                                                    // 352
			Object.keys(values).forEach(function (key) {                                                               // 353
				var value = values[key];                                                                                  // 354
                                                                                                              //
				if (!['thumbnailPhoto', 'jpegPhoto'].includes(key) && value instanceof Buffer) {                          // 355
					values[key] = value.toString();                                                                          // 356
				}                                                                                                         // 357
			});                                                                                                        // 358
			return values;                                                                                             // 360
		}                                                                                                           // 361
                                                                                                              //
		return extractLdapEntryData;                                                                                //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.searchAllPaged = function () {                                                                //
		function searchAllPaged(BaseDN, options, page) {                                                            //
			var _this3 = this;                                                                                         // 363
                                                                                                              //
			this.bindIfNecessary();                                                                                    // 364
			this.client.search(BaseDN, options, function (error, res) {                                                // 366
				if (error) {                                                                                              // 367
					logger.search.error(error);                                                                              // 368
					page(error);                                                                                             // 369
					return;                                                                                                  // 370
				}                                                                                                         // 371
                                                                                                              //
				res.on('error', function (error) {                                                                        // 373
					logger.search.error(error);                                                                              // 374
					page(error);                                                                                             // 375
					return;                                                                                                  // 376
				});                                                                                                       // 377
				var entries = [];                                                                                         // 379
				var internalPageSize = options.paged && options.paged.pageSize > 0 ? options.paged.pageSize * 2 : 500;    // 381
				res.on('searchEntry', function (entry) {                                                                  // 383
					entries.push(_this3.extractLdapEntryData(entry));                                                        // 384
                                                                                                              //
					if (entries.length >= internalPageSize) {                                                                // 386
						logger.search.info('Internal Page');                                                                    // 387
                                                                                                              //
						_this3.client._updateIdle(true);                                                                        // 388
                                                                                                              //
						page(null, entries, {                                                                                   // 389
							end: false,                                                                                            // 389
							next: function () {                                                                                    // 389
								// Reset idle timer                                                                                   // 390
								_this3.client._updateIdle();                                                                          // 391
							}                                                                                                      // 392
						});                                                                                                     // 389
						entries = [];                                                                                           // 393
					}                                                                                                        // 394
				});                                                                                                       // 395
				res.on('page', function (result, next) {                                                                  // 397
					if (!next) {                                                                                             // 398
						logger.search.debug('Final Page');                                                                      // 399
                                                                                                              //
						_this3.client._updateIdle(true);                                                                        // 400
                                                                                                              //
						page(null, entries, {                                                                                   // 401
							end: true,                                                                                             // 401
							next: function () {                                                                                    // 401
								// Reset idle timer                                                                                   // 402
								_this3.client._updateIdle();                                                                          // 403
							}                                                                                                      // 404
						});                                                                                                     // 401
					} else if (entries.length) {                                                                             // 405
						logger.search.info('Page'); // Force LDAP idle to wait the record processing                            // 406
                                                                                                              //
						_this3.client._updateIdle(true);                                                                        // 408
                                                                                                              //
						page(null, entries, {                                                                                   // 409
							end: !next,                                                                                            // 409
							next: function () {                                                                                    // 409
								// Reset idle timer                                                                                   // 410
								_this3.client._updateIdle();                                                                          // 411
                                                                                                              //
								next();                                                                                               // 412
							}                                                                                                      // 413
						});                                                                                                     // 409
						entries = [];                                                                                           // 414
					}                                                                                                        // 415
				});                                                                                                       // 416
			});                                                                                                        // 417
		}                                                                                                           // 418
                                                                                                              //
		return searchAllPaged;                                                                                      //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.searchAllAsync = function () {                                                                //
		function searchAllAsync(BaseDN, options, callback) {                                                        //
			var _this4 = this;                                                                                         // 420
                                                                                                              //
			this.bindIfNecessary();                                                                                    // 421
			this.client.search(BaseDN, options, function (error, res) {                                                // 423
				if (error) {                                                                                              // 424
					logger.search.error(error);                                                                              // 425
					callback(error);                                                                                         // 426
					return;                                                                                                  // 427
				}                                                                                                         // 428
                                                                                                              //
				res.on('error', function (error) {                                                                        // 430
					logger.search.error(error);                                                                              // 431
					callback(error);                                                                                         // 432
					return;                                                                                                  // 433
				});                                                                                                       // 434
				var entries = [];                                                                                         // 436
				res.on('searchEntry', function (entry) {                                                                  // 438
					entries.push(_this4.extractLdapEntryData(entry));                                                        // 439
				});                                                                                                       // 440
				res.on('end', function () {                                                                               // 442
					logger.search.info('Search result count', entries.length);                                               // 443
					callback(null, entries);                                                                                 // 444
				});                                                                                                       // 445
			});                                                                                                        // 446
		}                                                                                                           // 447
                                                                                                              //
		return searchAllAsync;                                                                                      //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.authSync = function () {                                                                      //
		function authSync(dn, password) {                                                                           //
			logger.auth.info('Authenticating', dn);                                                                    // 450
                                                                                                              //
			try {                                                                                                      // 452
				this.bindSync(dn, password);                                                                              // 453
				logger.auth.info('Authenticated', dn);                                                                    // 454
				return true;                                                                                              // 455
			} catch (error) {                                                                                          // 456
				logger.auth.info('Not authenticated', dn);                                                                // 457
				logger.auth.debug('error', error);                                                                        // 458
				return false;                                                                                             // 459
			}                                                                                                          // 460
		}                                                                                                           // 461
                                                                                                              //
		return authSync;                                                                                            //
	}();                                                                                                         //
                                                                                                              //
	LDAP.prototype.disconnect = function () {                                                                    //
		function disconnect() {                                                                                     //
			this.connected = false;                                                                                    // 464
			this.domainBinded = false;                                                                                 // 465
			logger.connection.info('Disconecting');                                                                    // 466
			this.client.unbind();                                                                                      // 467
		}                                                                                                           // 468
                                                                                                              //
		return disconnect;                                                                                          //
	}();                                                                                                         //
                                                                                                              //
	return LDAP;                                                                                                 //
}();                                                                                                          //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"loginHandler.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_ldap/server/loginHandler.js                                                            //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var slug = void 0,                                                                                            // 1
    getLdapUsername = void 0,                                                                                 // 1
    getLdapUserUniqueID = void 0,                                                                             // 1
    syncUserData = void 0,                                                                                    // 1
    addLdapUser = void 0;                                                                                     // 1
module.watch(require("./sync"), {                                                                             // 1
	slug: function (v) {                                                                                         // 1
		slug = v;                                                                                                   // 1
	},                                                                                                           // 1
	getLdapUsername: function (v) {                                                                              // 1
		getLdapUsername = v;                                                                                        // 1
	},                                                                                                           // 1
	getLdapUserUniqueID: function (v) {                                                                          // 1
		getLdapUserUniqueID = v;                                                                                    // 1
	},                                                                                                           // 1
	syncUserData: function (v) {                                                                                 // 1
		syncUserData = v;                                                                                           // 1
	},                                                                                                           // 1
	addLdapUser: function (v) {                                                                                  // 1
		addLdapUser = v;                                                                                            // 1
	}                                                                                                            // 1
}, 0);                                                                                                        // 1
var LDAP = void 0;                                                                                            // 1
module.watch(require("./ldap"), {                                                                             // 1
	"default": function (v) {                                                                                    // 1
		LDAP = v;                                                                                                   // 1
	}                                                                                                            // 1
}, 1);                                                                                                        // 1
var logger = new Logger('LDAPHandler', {});                                                                   // 6
                                                                                                              //
function fallbackDefaultAccountSystem(bind, username, password) {                                             // 8
	if (typeof username === 'string') {                                                                          // 9
		if (username.indexOf('@') === -1) {                                                                         // 10
			username = {                                                                                               // 11
				username: username                                                                                        // 11
			};                                                                                                         // 11
		} else {                                                                                                    // 12
			username = {                                                                                               // 13
				email: username                                                                                           // 13
			};                                                                                                         // 13
		}                                                                                                           // 14
	}                                                                                                            // 15
                                                                                                              //
	logger.info('Fallback to default account system', username);                                                 // 17
	var loginRequest = {                                                                                         // 19
		user: username,                                                                                             // 20
		password: {                                                                                                 // 21
			digest: SHA256(password),                                                                                  // 22
			algorithm: 'sha-256'                                                                                       // 23
		}                                                                                                           // 21
	};                                                                                                           // 19
	return Accounts._runLoginHandlers(bind, loginRequest);                                                       // 27
}                                                                                                             // 28
                                                                                                              //
Accounts.registerLoginHandler('ldap', function (loginRequest) {                                               // 30
	if (!loginRequest.ldap || !loginRequest.ldapOptions) {                                                       // 31
		return undefined;                                                                                           // 32
	}                                                                                                            // 33
                                                                                                              //
	logger.info('Init LDAP login', loginRequest.username);                                                       // 35
                                                                                                              //
	if (RocketChat.settings.get('LDAP_Enable') !== true) {                                                       // 37
		return fallbackDefaultAccountSystem(this, loginRequest.username, loginRequest.ldapPass);                    // 38
	}                                                                                                            // 39
                                                                                                              //
	var self = this;                                                                                             // 41
	var ldap = new LDAP();                                                                                       // 42
	var ldapUser = void 0;                                                                                       // 43
                                                                                                              //
	try {                                                                                                        // 45
		ldap.connectSync();                                                                                         // 46
		var users = ldap.searchUsersSync(loginRequest.username);                                                    // 47
                                                                                                              //
		if (users.length !== 1) {                                                                                   // 49
			logger.info('Search returned', users.length, 'record(s) for', loginRequest.username);                      // 50
			throw new Error('User not Found');                                                                         // 51
		}                                                                                                           // 52
                                                                                                              //
		if (ldap.authSync(users[0].dn, loginRequest.ldapPass) === true) {                                           // 54
			if (ldap.isUserInGroup(loginRequest.username)) {                                                           // 55
				ldapUser = users[0];                                                                                      // 56
			} else {                                                                                                   // 57
				throw new Error('User not in a valid group');                                                             // 58
			}                                                                                                          // 59
		} else {                                                                                                    // 60
			logger.info('Wrong password for', loginRequest.username);                                                  // 61
		}                                                                                                           // 62
	} catch (error) {                                                                                            // 63
		logger.error(error);                                                                                        // 64
	}                                                                                                            // 65
                                                                                                              //
	if (ldapUser === undefined) {                                                                                // 67
		if (RocketChat.settings.get('LDAP_Login_Fallback') === true) {                                              // 68
			return fallbackDefaultAccountSystem(self, loginRequest.username, loginRequest.ldapPass);                   // 69
		}                                                                                                           // 70
                                                                                                              //
		throw new Meteor.Error('LDAP-login-error', "LDAP Authentication failed with provided username [" + loginRequest.username + "]");
	} // Look to see if user already exists                                                                      // 73
                                                                                                              //
                                                                                                              //
	var userQuery = void 0;                                                                                      // 76
	var Unique_Identifier_Field = getLdapUserUniqueID(ldapUser);                                                 // 78
	var user = void 0;                                                                                           // 79
                                                                                                              //
	if (Unique_Identifier_Field) {                                                                               // 81
		userQuery = {                                                                                               // 82
			'services.ldap.id': Unique_Identifier_Field.value                                                          // 83
		};                                                                                                          // 82
		logger.info('Querying user');                                                                               // 86
		logger.debug('userQuery', userQuery);                                                                       // 87
		user = Meteor.users.findOne(userQuery);                                                                     // 89
	}                                                                                                            // 90
                                                                                                              //
	var username = void 0;                                                                                       // 92
                                                                                                              //
	if (RocketChat.settings.get('LDAP_Username_Field') !== '') {                                                 // 94
		username = slug(getLdapUsername(ldapUser));                                                                 // 95
	} else {                                                                                                     // 96
		username = slug(loginRequest.username);                                                                     // 97
	}                                                                                                            // 98
                                                                                                              //
	if (!user) {                                                                                                 // 100
		userQuery = {                                                                                               // 101
			username: username                                                                                         // 102
		};                                                                                                          // 101
		logger.debug('userQuery', userQuery);                                                                       // 105
		user = Meteor.users.findOne(userQuery);                                                                     // 107
	} // Login user if they exist                                                                                // 108
                                                                                                              //
                                                                                                              //
	if (user) {                                                                                                  // 111
		if (user.ldap !== true && RocketChat.settings.get('LDAP_Merge_Existing_Users') !== true) {                  // 112
			logger.info('User exists without "ldap: true"');                                                           // 113
			throw new Meteor.Error('LDAP-login-error', "LDAP Authentication succeded, but there's already an existing user with provided username [" + username + "] in Mongo.");
		}                                                                                                           // 115
                                                                                                              //
		logger.info('Logging user');                                                                                // 117
                                                                                                              //
		var stampedToken = Accounts._generateStampedLoginToken();                                                   // 119
                                                                                                              //
		Meteor.users.update(user._id, {                                                                             // 121
			$push: {                                                                                                   // 122
				'services.resume.loginTokens': Accounts._hashStampedToken(stampedToken)                                   // 123
			}                                                                                                          // 122
		});                                                                                                         // 121
		syncUserData(user, ldapUser);                                                                               // 127
                                                                                                              //
		if (RocketChat.settings.get('LDAP_Login_Fallback') === true) {                                              // 129
			Accounts.setPassword(user._id, loginRequest.ldapPass, {                                                    // 130
				logout: false                                                                                             // 130
			});                                                                                                        // 130
		}                                                                                                           // 131
                                                                                                              //
		return {                                                                                                    // 133
			userId: user._id,                                                                                          // 134
			token: stampedToken.token                                                                                  // 135
		};                                                                                                          // 133
	}                                                                                                            // 137
                                                                                                              //
	logger.info('User does not exist, creating', username);                                                      // 139
                                                                                                              //
	if (RocketChat.settings.get('LDAP_Username_Field') === '') {                                                 // 141
		username = undefined;                                                                                       // 142
	}                                                                                                            // 143
                                                                                                              //
	if (RocketChat.settings.get('LDAP_Login_Fallback') !== true) {                                               // 145
		loginRequest.ldapPass = undefined;                                                                          // 146
	} // Create new user                                                                                         // 147
                                                                                                              //
                                                                                                              //
	return addLdapUser(ldapUser, username, loginRequest.ldapPass);                                               // 150
});                                                                                                           // 151
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"settings.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_ldap/server/settings.js                                                                //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
RocketChat.settings.addGroup('LDAP', function () {                                                            // 1
	var enableQuery = {                                                                                          // 2
		_id: 'LDAP_Enable',                                                                                         // 2
		value: true                                                                                                 // 2
	};                                                                                                           // 2
	var enableAuthentication = [enableQuery, {                                                                   // 3
		_id: 'LDAP_Authentication',                                                                                 // 5
		value: true                                                                                                 // 5
	}];                                                                                                          // 5
	var enableTLSQuery = [enableQuery, {                                                                         // 7
		_id: 'LDAP_Encryption',                                                                                     // 9
		value: {                                                                                                    // 9
			$in: ['tls', 'ssl']                                                                                        // 9
		}                                                                                                           // 9
	}];                                                                                                          // 9
	var syncDataQuery = [enableQuery, {                                                                          // 11
		_id: 'LDAP_Sync_User_Data',                                                                                 // 13
		value: true                                                                                                 // 13
	}];                                                                                                          // 13
	var groupFilterQuery = [enableQuery, {                                                                       // 15
		_id: 'LDAP_Group_Filter_Enable',                                                                            // 17
		value: true                                                                                                 // 17
	}];                                                                                                          // 17
	var backgroundSyncQuery = [enableQuery, {                                                                    // 19
		_id: 'LDAP_Background_Sync',                                                                                // 21
		value: true                                                                                                 // 21
	}];                                                                                                          // 21
	this.add('LDAP_Enable', false, {                                                                             // 24
		type: 'boolean',                                                                                            // 24
		"public": true                                                                                              // 24
	});                                                                                                          // 24
	this.add('LDAP_Login_Fallback', true, {                                                                      // 25
		type: 'boolean',                                                                                            // 25
		enableQuery: enableQuery                                                                                    // 25
	});                                                                                                          // 25
	this.add('LDAP_Host', '', {                                                                                  // 26
		type: 'string',                                                                                             // 26
		enableQuery: enableQuery                                                                                    // 26
	});                                                                                                          // 26
	this.add('LDAP_Port', '389', {                                                                               // 27
		type: 'string',                                                                                             // 27
		enableQuery: enableQuery                                                                                    // 27
	});                                                                                                          // 27
	this.add('LDAP_Reconnect', false, {                                                                          // 28
		type: 'boolean',                                                                                            // 28
		enableQuery: enableQuery                                                                                    // 28
	});                                                                                                          // 28
	this.add('LDAP_Encryption', 'plain', {                                                                       // 29
		type: 'select',                                                                                             // 29
		values: [{                                                                                                  // 29
			key: 'plain',                                                                                              // 29
			i18nLabel: 'No_Encryption'                                                                                 // 29
		}, {                                                                                                        // 29
			key: 'tls',                                                                                                // 29
			i18nLabel: 'StartTLS'                                                                                      // 29
		}, {                                                                                                        // 29
			key: 'ssl',                                                                                                // 29
			i18nLabel: 'SSL/LDAPS'                                                                                     // 29
		}],                                                                                                         // 29
		enableQuery: enableQuery                                                                                    // 29
	});                                                                                                          // 29
	this.add('LDAP_CA_Cert', '', {                                                                               // 30
		type: 'string',                                                                                             // 30
		multiline: true,                                                                                            // 30
		enableQuery: enableTLSQuery                                                                                 // 30
	});                                                                                                          // 30
	this.add('LDAP_Reject_Unauthorized', true, {                                                                 // 31
		type: 'boolean',                                                                                            // 31
		enableQuery: enableTLSQuery                                                                                 // 31
	});                                                                                                          // 31
	this.add('LDAP_BaseDN', '', {                                                                                // 32
		type: 'string',                                                                                             // 32
		enableQuery: enableQuery                                                                                    // 32
	});                                                                                                          // 32
	this.add('LDAP_Internal_Log_Level', 'disabled', {                                                            // 33
		type: 'select',                                                                                             // 34
		values: [{                                                                                                  // 35
			key: 'disabled',                                                                                           // 36
			i18nLabel: 'Disabled'                                                                                      // 36
		}, {                                                                                                        // 36
			key: 'error',                                                                                              // 37
			i18nLabel: 'Error'                                                                                         // 37
		}, {                                                                                                        // 37
			key: 'warn',                                                                                               // 38
			i18nLabel: 'Warn'                                                                                          // 38
		}, {                                                                                                        // 38
			key: 'info',                                                                                               // 39
			i18nLabel: 'Info'                                                                                          // 39
		}, {                                                                                                        // 39
			key: 'debug',                                                                                              // 40
			i18nLabel: 'Debug'                                                                                         // 40
		}, {                                                                                                        // 40
			key: 'trace',                                                                                              // 41
			i18nLabel: 'Trace'                                                                                         // 41
		}],                                                                                                         // 41
		enableQuery: enableQuery                                                                                    // 43
	});                                                                                                          // 33
	this.add('LDAP_Test_Connection', 'ldap_test_connection', {                                                   // 45
		type: 'action',                                                                                             // 45
		actionText: 'Test_Connection'                                                                               // 45
	});                                                                                                          // 45
	this.section('Authentication', function () {                                                                 // 47
		this.add('LDAP_Authentication', false, {                                                                    // 48
			type: 'boolean',                                                                                           // 48
			enableQuery: enableQuery                                                                                   // 48
		});                                                                                                         // 48
		this.add('LDAP_Authentication_UserDN', '', {                                                                // 49
			type: 'string',                                                                                            // 49
			enableQuery: enableAuthentication                                                                          // 49
		});                                                                                                         // 49
		this.add('LDAP_Authentication_Password', '', {                                                              // 50
			type: 'password',                                                                                          // 50
			enableQuery: enableAuthentication                                                                          // 50
		});                                                                                                         // 50
	});                                                                                                          // 51
	this.section('Timeouts', function () {                                                                       // 53
		this.add('LDAP_Timeout', 60000, {                                                                           // 54
			type: 'int',                                                                                               // 54
			enableQuery: enableQuery                                                                                   // 54
		});                                                                                                         // 54
		this.add('LDAP_Connect_Timeout', 1000, {                                                                    // 55
			type: 'int',                                                                                               // 55
			enableQuery: enableQuery                                                                                   // 55
		});                                                                                                         // 55
		this.add('LDAP_Idle_Timeout', 1000, {                                                                       // 56
			type: 'int',                                                                                               // 56
			enableQuery: enableQuery                                                                                   // 56
		});                                                                                                         // 56
	});                                                                                                          // 57
	this.section('User Search', function () {                                                                    // 59
		this.add('LDAP_User_Search_Filter', '(objectclass=*)', {                                                    // 60
			type: 'string',                                                                                            // 60
			enableQuery: enableQuery                                                                                   // 60
		});                                                                                                         // 60
		this.add('LDAP_User_Search_Scope', 'sub', {                                                                 // 61
			type: 'string',                                                                                            // 61
			enableQuery: enableQuery                                                                                   // 61
		});                                                                                                         // 61
		this.add('LDAP_User_Search_Field', 'sAMAccountName', {                                                      // 62
			type: 'string',                                                                                            // 62
			enableQuery: enableQuery                                                                                   // 62
		});                                                                                                         // 62
		this.add('LDAP_Search_Page_Size', 250, {                                                                    // 63
			type: 'int',                                                                                               // 63
			enableQuery: enableQuery                                                                                   // 63
		});                                                                                                         // 63
		this.add('LDAP_Search_Size_Limit', 1000, {                                                                  // 64
			type: 'int',                                                                                               // 64
			enableQuery: enableQuery                                                                                   // 64
		});                                                                                                         // 64
	});                                                                                                          // 65
	this.section('User Search (Group Validation)', function () {                                                 // 67
		this.add('LDAP_Group_Filter_Enable', false, {                                                               // 68
			type: 'boolean',                                                                                           // 68
			enableQuery: enableQuery                                                                                   // 68
		});                                                                                                         // 68
		this.add('LDAP_Group_Filter_ObjectClass', 'groupOfUniqueNames', {                                           // 69
			type: 'string',                                                                                            // 69
			enableQuery: groupFilterQuery                                                                              // 69
		});                                                                                                         // 69
		this.add('LDAP_Group_Filter_Group_Id_Attribute', 'cn', {                                                    // 70
			type: 'string',                                                                                            // 70
			enableQuery: groupFilterQuery                                                                              // 70
		});                                                                                                         // 70
		this.add('LDAP_Group_Filter_Group_Member_Attribute', 'uniqueMember', {                                      // 71
			type: 'string',                                                                                            // 71
			enableQuery: groupFilterQuery                                                                              // 71
		});                                                                                                         // 71
		this.add('LDAP_Group_Filter_Group_Member_Format', 'uniqueMember', {                                         // 72
			type: 'string',                                                                                            // 72
			enableQuery: groupFilterQuery                                                                              // 72
		});                                                                                                         // 72
		this.add('LDAP_Group_Filter_Group_Name', 'ROCKET_CHAT', {                                                   // 73
			type: 'string',                                                                                            // 73
			enableQuery: groupFilterQuery                                                                              // 73
		});                                                                                                         // 73
	});                                                                                                          // 74
	this.section('Sync / Import', function () {                                                                  // 76
		this.add('LDAP_Username_Field', 'sAMAccountName', {                                                         // 77
			type: 'string',                                                                                            // 77
			enableQuery: enableQuery                                                                                   // 77
		});                                                                                                         // 77
		this.add('LDAP_Unique_Identifier_Field', 'objectGUID,ibm-entryUUID,GUID,dominoUNID,nsuniqueId,uidNumber', {
			type: 'string',                                                                                            // 78
			enableQuery: enableQuery                                                                                   // 78
		});                                                                                                         // 78
		this.add('LDAP_Default_Domain', '', {                                                                       // 79
			type: 'string',                                                                                            // 79
			enableQuery: enableQuery                                                                                   // 79
		});                                                                                                         // 79
		this.add('LDAP_Merge_Existing_Users', false, {                                                              // 80
			type: 'boolean',                                                                                           // 80
			enableQuery: enableQuery                                                                                   // 80
		});                                                                                                         // 80
		this.add('LDAP_Sync_User_Data', false, {                                                                    // 82
			type: 'boolean',                                                                                           // 82
			enableQuery: enableQuery                                                                                   // 82
		});                                                                                                         // 82
		this.add('LDAP_Sync_User_Data_FieldMap', '{"cn":"name", "mail":"email"}', {                                 // 83
			type: 'string',                                                                                            // 83
			enableQuery: syncDataQuery                                                                                 // 83
		});                                                                                                         // 83
		this.add('LDAP_Sync_User_Avatar', true, {                                                                   // 84
			type: 'boolean',                                                                                           // 84
			enableQuery: enableQuery                                                                                   // 84
		});                                                                                                         // 84
		this.add('LDAP_Background_Sync', false, {                                                                   // 86
			type: 'boolean',                                                                                           // 86
			enableQuery: enableQuery                                                                                   // 86
		});                                                                                                         // 86
		this.add('LDAP_Background_Sync_Interval', 'Every 24 hours', {                                               // 87
			type: 'string',                                                                                            // 87
			enableQuery: backgroundSyncQuery                                                                           // 87
		});                                                                                                         // 87
		this.add('LDAP_Background_Sync_Import_New_Users', true, {                                                   // 88
			type: 'boolean',                                                                                           // 88
			enableQuery: backgroundSyncQuery                                                                           // 88
		});                                                                                                         // 88
		this.add('LDAP_Background_Sync_Keep_Existant_Users_Updated', true, {                                        // 89
			type: 'boolean',                                                                                           // 89
			enableQuery: backgroundSyncQuery                                                                           // 89
		});                                                                                                         // 89
		this.add('LDAP_Sync_Now', 'ldap_sync_now', {                                                                // 91
			type: 'action',                                                                                            // 91
			actionText: 'Execute_Synchronization_Now'                                                                  // 91
		});                                                                                                         // 91
	});                                                                                                          // 92
});                                                                                                           // 93
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sync.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_ldap/server/sync.js                                                                    //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
module.export({                                                                                               // 1
	slug: function () {                                                                                          // 1
		return slug;                                                                                                // 1
	},                                                                                                           // 1
	getLdapUsername: function () {                                                                               // 1
		return getLdapUsername;                                                                                     // 1
	},                                                                                                           // 1
	getLdapUserUniqueID: function () {                                                                           // 1
		return getLdapUserUniqueID;                                                                                 // 1
	},                                                                                                           // 1
	getDataToSyncUserData: function () {                                                                         // 1
		return getDataToSyncUserData;                                                                               // 1
	},                                                                                                           // 1
	syncUserData: function () {                                                                                  // 1
		return syncUserData;                                                                                        // 1
	},                                                                                                           // 1
	addLdapUser: function () {                                                                                   // 1
		return addLdapUser;                                                                                         // 1
	},                                                                                                           // 1
	importNewUsers: function () {                                                                                // 1
		return importNewUsers;                                                                                      // 1
	}                                                                                                            // 1
});                                                                                                           // 1
var LDAP = void 0;                                                                                            // 1
module.watch(require("./ldap"), {                                                                             // 1
	"default": function (v) {                                                                                    // 1
		LDAP = v;                                                                                                   // 1
	}                                                                                                            // 1
}, 0);                                                                                                        // 1
var logger = new Logger('LDAPSync', {});                                                                      // 5
                                                                                                              //
function slug(text) {                                                                                         // 7
	if (RocketChat.settings.get('UTF8_Names_Slugify') !== true) {                                                // 8
		return text;                                                                                                // 9
	}                                                                                                            // 10
                                                                                                              //
	text = slugify(text, '.');                                                                                   // 11
	return text.replace(/[^0-9a-z-_.]/g, '');                                                                    // 12
}                                                                                                             // 13
                                                                                                              //
function getLdapUsername(ldapUser) {                                                                          // 16
	var usernameField = RocketChat.settings.get('LDAP_Username_Field');                                          // 17
                                                                                                              //
	if (usernameField.indexOf('#{') > -1) {                                                                      // 19
		return usernameField.replace(/#{(.+?)}/g, function (match, field) {                                         // 20
			return ldapUser[field];                                                                                    // 21
		});                                                                                                         // 22
	}                                                                                                            // 23
                                                                                                              //
	return ldapUser[usernameField];                                                                              // 25
}                                                                                                             // 26
                                                                                                              //
function getLdapUserUniqueID(ldapUser) {                                                                      // 29
	var Unique_Identifier_Field = RocketChat.settings.get('LDAP_Unique_Identifier_Field');                       // 30
                                                                                                              //
	if (Unique_Identifier_Field !== '') {                                                                        // 32
		Unique_Identifier_Field = Unique_Identifier_Field.replace(/\s/g, '').split(',');                            // 33
	} else {                                                                                                     // 34
		Unique_Identifier_Field = [];                                                                               // 35
	}                                                                                                            // 36
                                                                                                              //
	var User_Search_Field = RocketChat.settings.get('LDAP_User_Search_Field');                                   // 38
                                                                                                              //
	if (User_Search_Field !== '') {                                                                              // 40
		User_Search_Field = User_Search_Field.replace(/\s/g, '').split(',');                                        // 41
	} else {                                                                                                     // 42
		User_Search_Field = [];                                                                                     // 43
	}                                                                                                            // 44
                                                                                                              //
	Unique_Identifier_Field = Unique_Identifier_Field.concat(User_Search_Field);                                 // 46
                                                                                                              //
	if (Unique_Identifier_Field.length > 0) {                                                                    // 48
		Unique_Identifier_Field = Unique_Identifier_Field.find(function (field) {                                   // 49
			return !_.isEmpty(ldapUser[field]);                                                                        // 50
		});                                                                                                         // 51
                                                                                                              //
		if (Unique_Identifier_Field) {                                                                              // 52
			Unique_Identifier_Field = {                                                                                // 53
				attribute: Unique_Identifier_Field,                                                                       // 54
				value: new Buffer(ldapUser[Unique_Identifier_Field]).toString('hex')                                      // 55
			};                                                                                                         // 53
		}                                                                                                           // 57
                                                                                                              //
		return Unique_Identifier_Field;                                                                             // 58
	}                                                                                                            // 59
}                                                                                                             // 60
                                                                                                              //
function getDataToSyncUserData(ldapUser, user) {                                                              // 62
	var syncUserData = RocketChat.settings.get('LDAP_Sync_User_Data');                                           // 63
	var syncUserDataFieldMap = RocketChat.settings.get('LDAP_Sync_User_Data_FieldMap').trim();                   // 64
	var userData = {};                                                                                           // 66
                                                                                                              //
	if (syncUserData && syncUserDataFieldMap) {                                                                  // 68
		var whitelistedUserFields = ['email', 'name', 'customFields'];                                              // 69
		var fieldMap = JSON.parse(syncUserDataFieldMap);                                                            // 70
		var emailList = [];                                                                                         // 71
                                                                                                              //
		_.map(fieldMap, function (userField, ldapField) {                                                           // 72
			switch (userField) {                                                                                       // 73
				case 'email':                                                                                             // 74
					if (!ldapUser.hasOwnProperty(ldapField)) {                                                               // 75
						logger.debug("user does not have attribute: " + ldapField);                                             // 76
						return;                                                                                                 // 77
					}                                                                                                        // 78
                                                                                                              //
					if (_.isObject(ldapUser[ldapField])) {                                                                   // 80
						_.map(ldapUser[ldapField], function (item) {                                                            // 81
							emailList.push({                                                                                       // 82
								address: item,                                                                                        // 82
								verified: true                                                                                        // 82
							});                                                                                                    // 82
						});                                                                                                     // 83
					} else {                                                                                                 // 84
						emailList.push({                                                                                        // 85
							address: ldapUser[ldapField],                                                                          // 85
							verified: true                                                                                         // 85
						});                                                                                                     // 85
					}                                                                                                        // 86
                                                                                                              //
					break;                                                                                                   // 87
                                                                                                              //
				default:                                                                                                  // 89
					if (!_.find(whitelistedUserFields, function (el) {                                                       // 90
						return el === userField.split('.')[0];                                                                  // 90
					})) {                                                                                                    // 90
						logger.debug("user attribute not whitelisted: " + userField);                                           // 91
						return;                                                                                                 // 92
					}                                                                                                        // 93
                                                                                                              //
					var tmpLdapField = RocketChat.templateVarHandler(ldapField, ldapUser);                                   // 95
                                                                                                              //
					var userFieldValue = _.reduce(userField.split('.'), function (acc, el) {                                 // 96
						return acc[el];                                                                                         // 96
					}, user);                                                                                                // 96
                                                                                                              //
					if (tmpLdapField && userFieldValue !== tmpLdapField) {                                                   // 98
						userData[userField] = tmpLdapField;                                                                     // 99
						logger.debug("user." + userField + " changed to: " + tmpLdapField);                                     // 100
					}                                                                                                        // 101
                                                                                                              //
			}                                                                                                          // 73
		});                                                                                                         // 103
                                                                                                              //
		if (emailList.length > 0) {                                                                                 // 105
			if (JSON.stringify(user.emails) !== JSON.stringify(emailList)) {                                           // 106
				userData.emails = emailList;                                                                              // 107
			}                                                                                                          // 108
		}                                                                                                           // 109
	}                                                                                                            // 110
                                                                                                              //
	var uniqueId = getLdapUserUniqueID(ldapUser);                                                                // 112
                                                                                                              //
	if (uniqueId && (!user.services || !user.services.ldap || user.services.ldap.id !== uniqueId.value || user.services.ldap.idAttribute !== uniqueId.attribute)) {
		userData['services.ldap.id'] = uniqueId.value;                                                              // 115
		userData['services.ldap.idAttribute'] = uniqueId.attribute;                                                 // 116
	}                                                                                                            // 117
                                                                                                              //
	if (user.ldap !== true) {                                                                                    // 119
		userData.ldap = true;                                                                                       // 120
	}                                                                                                            // 121
                                                                                                              //
	if (_.size(userData)) {                                                                                      // 123
		return userData;                                                                                            // 124
	}                                                                                                            // 125
}                                                                                                             // 126
                                                                                                              //
function syncUserData(user, ldapUser) {                                                                       // 129
	logger.info('Syncing user data');                                                                            // 130
	logger.debug('user', {                                                                                       // 131
		'email': user.email,                                                                                        // 131
		'_id': user._id                                                                                             // 131
	});                                                                                                          // 131
	logger.debug('ldapUser', ldapUser);                                                                          // 132
	var userData = getDataToSyncUserData(ldapUser, user);                                                        // 134
                                                                                                              //
	if (user && user._id && userData) {                                                                          // 135
		logger.debug('setting', JSON.stringify(userData, null, 2));                                                 // 136
                                                                                                              //
		if (userData.name) {                                                                                        // 137
			RocketChat._setRealName(user._id, userData.name);                                                          // 138
                                                                                                              //
			delete userData.name;                                                                                      // 139
		}                                                                                                           // 140
                                                                                                              //
		Meteor.users.update(user._id, {                                                                             // 141
			$set: userData                                                                                             // 141
		});                                                                                                         // 141
		user = Meteor.users.findOne({                                                                               // 142
			_id: user._id                                                                                              // 142
		});                                                                                                         // 142
	}                                                                                                            // 143
                                                                                                              //
	if (RocketChat.settings.get('LDAP_Username_Field') !== '') {                                                 // 145
		var username = slug(getLdapUsername(ldapUser));                                                             // 146
                                                                                                              //
		if (user && user._id && username !== user.username) {                                                       // 147
			logger.info('Syncing user username', user.username, '->', username);                                       // 148
                                                                                                              //
			RocketChat._setUsername(user._id, username);                                                               // 149
		}                                                                                                           // 150
	}                                                                                                            // 151
                                                                                                              //
	if (user && user._id && RocketChat.settings.get('LDAP_Sync_User_Avatar') === true) {                         // 153
		var avatar = ldapUser.thumbnailPhoto || ldapUser.jpegPhoto;                                                 // 154
                                                                                                              //
		if (avatar) {                                                                                               // 155
			logger.info('Syncing user avatar');                                                                        // 156
			var rs = RocketChatFile.bufferToStream(avatar);                                                            // 158
			var fileStore = FileUpload.getStore('Avatars');                                                            // 159
			fileStore.deleteByName(user.username);                                                                     // 160
			var file = {                                                                                               // 162
				userId: user._id,                                                                                         // 163
				type: 'image/jpeg'                                                                                        // 164
			};                                                                                                         // 162
			Meteor.runAsUser(user._id, function () {                                                                   // 167
				fileStore.insert(file, rs, function () {                                                                  // 168
					Meteor.setTimeout(function () {                                                                          // 169
						RocketChat.models.Users.setAvatarOrigin(user._id, 'ldap');                                              // 170
						RocketChat.Notifications.notifyLogged('updateAvatar', {                                                 // 171
							username: user.username                                                                                // 171
						});                                                                                                     // 171
					}, 500);                                                                                                 // 172
				});                                                                                                       // 173
			});                                                                                                        // 174
		}                                                                                                           // 175
	}                                                                                                            // 176
}                                                                                                             // 177
                                                                                                              //
function addLdapUser(ldapUser, username, password) {                                                          // 179
	var uniqueId = getLdapUserUniqueID(ldapUser);                                                                // 180
	var userObject = {};                                                                                         // 182
                                                                                                              //
	if (username) {                                                                                              // 184
		userObject.username = username;                                                                             // 185
	}                                                                                                            // 186
                                                                                                              //
	var userData = getDataToSyncUserData(ldapUser, {});                                                          // 188
                                                                                                              //
	if (userData && userData.emails && userData.emails[0] && userData.emails[0].address) {                       // 190
		if (Array.isArray(userData.emails[0].address)) {                                                            // 191
			userObject.email = userData.emails[0].address[0];                                                          // 192
		} else {                                                                                                    // 193
			userObject.email = userData.emails[0].address;                                                             // 194
		}                                                                                                           // 195
	} else if (ldapUser.mail && ldapUser.mail.indexOf('@') > -1) {                                               // 196
		userObject.email = ldapUser.mail;                                                                           // 197
	} else if (RocketChat.settings.get('LDAP_Default_Domain') !== '') {                                          // 198
		userObject.email = (username || uniqueId.value) + "@" + RocketChat.settings.get('LDAP_Default_Domain');     // 199
	} else {                                                                                                     // 200
		var error = new Meteor.Error('LDAP-login-error', 'LDAP Authentication succeded, there is no email to create an account. Have you tried setting your Default Domain in LDAP Settings?');
		logger.error(error);                                                                                        // 202
		throw error;                                                                                                // 203
	}                                                                                                            // 204
                                                                                                              //
	logger.debug('New user data', userObject);                                                                   // 206
                                                                                                              //
	if (password) {                                                                                              // 208
		userObject.password = password;                                                                             // 209
	}                                                                                                            // 210
                                                                                                              //
	try {                                                                                                        // 212
		userObject._id = Accounts.createUser(userObject);                                                           // 213
	} catch (error) {                                                                                            // 214
		logger.error('Error creating user', error);                                                                 // 215
		throw error;                                                                                                // 216
	}                                                                                                            // 217
                                                                                                              //
	syncUserData(userObject, ldapUser);                                                                          // 219
	return {                                                                                                     // 221
		userId: userObject._id                                                                                      // 222
	};                                                                                                           // 221
}                                                                                                             // 224
                                                                                                              //
function importNewUsers(ldap) {                                                                               // 226
	if (RocketChat.settings.get('LDAP_Enable') !== true) {                                                       // 227
		logger.error('Can\'t run LDAP Import, LDAP is disabled');                                                   // 228
		return;                                                                                                     // 229
	}                                                                                                            // 230
                                                                                                              //
	if (!ldap) {                                                                                                 // 232
		ldap = new LDAP();                                                                                          // 233
		ldap.connectSync();                                                                                         // 234
	}                                                                                                            // 235
                                                                                                              //
	var count = 0;                                                                                               // 237
	ldap.searchUsersSync('*', Meteor.bindEnvironment(function (error, ldapUsers) {                               // 238
		var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},                          // 238
		    next = _ref.next,                                                                                       // 238
		    end = _ref.end;                                                                                         // 238
                                                                                                              //
		if (error) {                                                                                                // 239
			throw error;                                                                                               // 240
		}                                                                                                           // 241
                                                                                                              //
		ldapUsers.forEach(function (ldapUser) {                                                                     // 243
			count++;                                                                                                   // 244
			var uniqueId = getLdapUserUniqueID(ldapUser); // Look to see if user already exists                        // 246
                                                                                                              //
			var userQuery = {                                                                                          // 248
				'services.ldap.id': uniqueId.value                                                                        // 249
			};                                                                                                         // 248
			logger.debug('userQuery', userQuery);                                                                      // 252
			var username = void 0;                                                                                     // 254
                                                                                                              //
			if (RocketChat.settings.get('LDAP_Username_Field') !== '') {                                               // 255
				username = slug(getLdapUsername(ldapUser));                                                               // 256
			} // Add user if it was not added before                                                                   // 257
                                                                                                              //
                                                                                                              //
			var user = Meteor.users.findOne(userQuery);                                                                // 260
                                                                                                              //
			if (!user) {                                                                                               // 261
				addLdapUser(ldapUser, username);                                                                          // 262
			}                                                                                                          // 263
                                                                                                              //
			if (!user && username && RocketChat.settings.get('LDAP_Merge_Existing_Users') === true) {                  // 265
				var _userQuery = {                                                                                        // 266
					username: username                                                                                       // 267
				};                                                                                                        // 266
				logger.debug('userQuery merge', _userQuery);                                                              // 270
                                                                                                              //
				var _user = Meteor.users.findOne(_userQuery);                                                             // 272
                                                                                                              //
				if (_user) {                                                                                              // 273
					syncUserData(_user, ldapUser);                                                                           // 274
				}                                                                                                         // 275
			}                                                                                                          // 276
                                                                                                              //
			if (count % 100 === 0) {                                                                                   // 278
				logger.info('Import running. Users imported until now:', count);                                          // 279
			}                                                                                                          // 280
		});                                                                                                         // 281
                                                                                                              //
		if (end) {                                                                                                  // 283
			logger.info('Import finished. Users imported:', count);                                                    // 284
		}                                                                                                           // 285
                                                                                                              //
		next(count);                                                                                                // 287
	}));                                                                                                         // 288
}                                                                                                             // 289
                                                                                                              //
function sync() {                                                                                             // 291
	if (RocketChat.settings.get('LDAP_Enable') !== true) {                                                       // 292
		return;                                                                                                     // 293
	}                                                                                                            // 294
                                                                                                              //
	var ldap = new LDAP();                                                                                       // 296
                                                                                                              //
	try {                                                                                                        // 298
		ldap.connectSync();                                                                                         // 299
		var users = void 0;                                                                                         // 301
                                                                                                              //
		if (RocketChat.settings.get('LDAP_Background_Sync_Keep_Existant_Users_Updated') === true) {                 // 302
			users = RocketChat.models.Users.findLDAPUsers();                                                           // 303
		}                                                                                                           // 304
                                                                                                              //
		if (RocketChat.settings.get('LDAP_Background_Sync_Import_New_Users') === true) {                            // 306
			importNewUsers(ldap);                                                                                      // 307
		}                                                                                                           // 308
                                                                                                              //
		if (RocketChat.settings.get('LDAP_Background_Sync_Keep_Existant_Users_Updated') === true) {                 // 310
			users.forEach(function (user) {                                                                            // 311
				var ldapUser = void 0;                                                                                    // 312
                                                                                                              //
				if (user.services && user.services.ldap && user.services.ldap.id) {                                       // 314
					ldapUser = ldap.getUserByIdSync(user.services.ldap.id, user.services.ldap.idAttribute);                  // 315
				} else {                                                                                                  // 316
					ldapUser = ldap.getUserByUsernameSync(user.username);                                                    // 317
				}                                                                                                         // 318
                                                                                                              //
				if (ldapUser) {                                                                                           // 320
					syncUserData(user, ldapUser);                                                                            // 321
				} else {                                                                                                  // 322
					logger.info('Can\'t sync user', user.username);                                                          // 323
				}                                                                                                         // 324
			});                                                                                                        // 325
		}                                                                                                           // 326
	} catch (error) {                                                                                            // 327
		logger.error(error);                                                                                        // 328
		return error;                                                                                               // 329
	}                                                                                                            // 330
                                                                                                              //
	return true;                                                                                                 // 331
}                                                                                                             // 332
                                                                                                              //
var jobName = 'LDAP_Sync';                                                                                    // 334
                                                                                                              //
var addCronJob = _.debounce(Meteor.bindEnvironment(function () {                                              // 336
	function addCronJobDebounced() {                                                                             // 336
		if (RocketChat.settings.get('LDAP_Background_Sync') !== true) {                                             // 337
			logger.info('Disabling LDAP Background Sync');                                                             // 338
                                                                                                              //
			if (SyncedCron.nextScheduledAtDate(jobName)) {                                                             // 339
				SyncedCron.remove(jobName);                                                                               // 340
			}                                                                                                          // 341
                                                                                                              //
			return;                                                                                                    // 342
		}                                                                                                           // 343
                                                                                                              //
		if (RocketChat.settings.get('LDAP_Sync_Interval')) {                                                        // 345
			logger.info('Enabling LDAP Background Sync');                                                              // 346
			SyncedCron.add({                                                                                           // 347
				name: jobName,                                                                                            // 348
				schedule: function (parser) {                                                                             // 349
					return parser.text(RocketChat.settings.get('LDAP_Sync_Interval'));                                       // 349
				},                                                                                                        // 349
				job: function () {                                                                                        // 350
					sync();                                                                                                  // 351
				}                                                                                                         // 352
			});                                                                                                        // 347
		}                                                                                                           // 354
	}                                                                                                            // 355
                                                                                                              //
	return addCronJobDebounced;                                                                                  // 336
}()), 500);                                                                                                   // 336
                                                                                                              //
Meteor.startup(function () {                                                                                  // 357
	Meteor.defer(function () {                                                                                   // 358
		RocketChat.settings.get('LDAP_Background_Sync', addCronJob);                                                // 359
		RocketChat.settings.get('LDAP_Background_Sync_Interval', addCronJob);                                       // 360
	});                                                                                                          // 361
});                                                                                                           // 362
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"syncUsers.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_ldap/server/syncUsers.js                                                               //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var importNewUsers = void 0;                                                                                  // 1
module.watch(require("./sync"), {                                                                             // 1
	importNewUsers: function (v) {                                                                               // 1
		importNewUsers = v;                                                                                         // 1
	}                                                                                                            // 1
}, 0);                                                                                                        // 1
Meteor.methods({                                                                                              // 3
	ldap_sync_now: function () {                                                                                 // 4
		var user = Meteor.user();                                                                                   // 5
                                                                                                              //
		if (!user) {                                                                                                // 6
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {                                             // 7
				method: 'ldap_sync_users'                                                                                 // 7
			});                                                                                                        // 7
		}                                                                                                           // 8
                                                                                                              //
		if (!RocketChat.authz.hasRole(user._id, 'admin')) {                                                         // 10
			throw new Meteor.Error('error-not-authorized', 'Not authorized', {                                         // 11
				method: 'ldap_sync_users'                                                                                 // 11
			});                                                                                                        // 11
		}                                                                                                           // 12
                                                                                                              //
		if (RocketChat.settings.get('LDAP_Enable') !== true) {                                                      // 14
			throw new Meteor.Error('LDAP_disabled');                                                                   // 15
		}                                                                                                           // 16
                                                                                                              //
		this.unblock();                                                                                             // 18
		importNewUsers();                                                                                           // 20
		return {                                                                                                    // 22
			message: 'Sync_in_progress',                                                                               // 23
			params: []                                                                                                 // 24
		};                                                                                                          // 22
	}                                                                                                            // 26
});                                                                                                           // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"testConnection.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rocketchat_ldap/server/testConnection.js                                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var LDAP = void 0;                                                                                            // 1
module.watch(require("./ldap"), {                                                                             // 1
	"default": function (v) {                                                                                    // 1
		LDAP = v;                                                                                                   // 1
	}                                                                                                            // 1
}, 0);                                                                                                        // 1
Meteor.methods({                                                                                              // 3
	ldap_test_connection: function () {                                                                          // 4
		var user = Meteor.user();                                                                                   // 5
                                                                                                              //
		if (!user) {                                                                                                // 6
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {                                             // 7
				method: 'ldap_test_connection'                                                                            // 7
			});                                                                                                        // 7
		}                                                                                                           // 8
                                                                                                              //
		if (!RocketChat.authz.hasRole(user._id, 'admin')) {                                                         // 10
			throw new Meteor.Error('error-not-authorized', 'Not authorized', {                                         // 11
				method: 'ldap_test_connection'                                                                            // 11
			});                                                                                                        // 11
		}                                                                                                           // 12
                                                                                                              //
		if (RocketChat.settings.get('LDAP_Enable') !== true) {                                                      // 14
			throw new Meteor.Error('LDAP_disabled');                                                                   // 15
		}                                                                                                           // 16
                                                                                                              //
		var ldap = void 0;                                                                                          // 18
                                                                                                              //
		try {                                                                                                       // 19
			ldap = new LDAP();                                                                                         // 20
			ldap.connectSync();                                                                                        // 21
		} catch (error) {                                                                                           // 22
			console.log(error);                                                                                        // 23
			throw new Meteor.Error(error.message);                                                                     // 24
		}                                                                                                           // 25
                                                                                                              //
		try {                                                                                                       // 27
			ldap.bindIfNecessary();                                                                                    // 28
		} catch (error) {                                                                                           // 29
			throw new Meteor.Error(error.name || error.message);                                                       // 30
		}                                                                                                           // 31
                                                                                                              //
		return {                                                                                                    // 33
			message: 'Connection_success',                                                                             // 34
			params: []                                                                                                 // 35
		};                                                                                                          // 33
	}                                                                                                            // 37
});                                                                                                           // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/rocketchat:ldap/server/index.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:ldap'] = exports;

})();

//# sourceMappingURL=rocketchat_ldap.js.map
