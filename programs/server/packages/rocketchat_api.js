(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var ECMAScript = Package.ecmascript.ECMAScript;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Restivus = Package['nimble:restivus'].Restivus;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:api":{"server":{"api.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/api.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");                                                  //
                                                                                                                       //
var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);                                                         //
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                          //
                                                                                                                       //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                                 //
                                                                                                                       //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                            //
                                                                                                                       //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                   //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
/* global Restivus */var API = function (_Restivus) {                                                                  // 1
	(0, _inherits3.default)(API, _Restivus);                                                                              //
                                                                                                                       //
	function API(properties) {                                                                                            // 3
		(0, _classCallCheck3.default)(this, API);                                                                            // 3
                                                                                                                       //
		var _this = (0, _possibleConstructorReturn3.default)(this, _Restivus.call(this, properties));                        // 3
                                                                                                                       //
		_this.logger = new Logger("API " + (properties.version ? properties.version : 'default') + " Logger", {});           // 5
		_this.authMethods = [];                                                                                              // 6
		_this.helperMethods = new Map();                                                                                     // 7
		_this.fieldSeparator = '.';                                                                                          // 8
		_this.defaultFieldsToExclude = {                                                                                     // 9
			joinCode: 0,                                                                                                        // 10
			$loki: 0,                                                                                                           // 11
			meta: 0,                                                                                                            // 12
			members: 0,                                                                                                         // 13
			importIds: 0                                                                                                        // 14
		};                                                                                                                   // 9
		_this.limitedUserFieldsToExclude = {                                                                                 // 16
			avatarOrigin: 0,                                                                                                    // 17
			emails: 0,                                                                                                          // 18
			phone: 0,                                                                                                           // 19
			statusConnection: 0,                                                                                                // 20
			createdAt: 0,                                                                                                       // 21
			lastLogin: 0,                                                                                                       // 22
			services: 0,                                                                                                        // 23
			requirePasswordChange: 0,                                                                                           // 24
			requirePasswordChangeReason: 0,                                                                                     // 25
			roles: 0,                                                                                                           // 26
			statusDefault: 0,                                                                                                   // 27
			_updatedAt: 0,                                                                                                      // 28
			customFields: 0                                                                                                     // 29
		};                                                                                                                   // 16
                                                                                                                       //
		_this._config.defaultOptionsEndpoint = function () {                                                                 // 32
			if (this.request.method === 'OPTIONS' && this.request.headers['access-control-request-method']) {                   // 33
				if (RocketChat.settings.get('API_Enable_CORS') === true) {                                                         // 34
					this.response.writeHead(200, {                                                                                    // 35
						'Access-Control-Allow-Origin': RocketChat.settings.get('API_CORS_Origin'),                                       // 36
						'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, X-User-Id, X-Auth-Token'        // 37
					});                                                                                                               // 35
				} else {                                                                                                           // 39
					this.response.writeHead(405);                                                                                     // 40
					this.response.write('CORS not enabled. Go to "Admin > General > REST Api" to enable it.');                        // 41
				}                                                                                                                  // 42
			} else {                                                                                                            // 43
				this.response.writeHead(404);                                                                                      // 44
			}                                                                                                                   // 45
                                                                                                                       //
			this.done();                                                                                                        // 47
		};                                                                                                                   // 48
                                                                                                                       //
		return _this;                                                                                                        // 3
	}                                                                                                                     // 49
                                                                                                                       //
	API.prototype.addAuthMethod = function () {                                                                           //
		function addAuthMethod(method) {                                                                                     //
			this.authMethods.push(method);                                                                                      // 52
		}                                                                                                                    // 53
                                                                                                                       //
		return addAuthMethod;                                                                                                //
	}();                                                                                                                  //
                                                                                                                       //
	API.prototype.success = function () {                                                                                 //
		function success() {                                                                                                 //
			var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};                                // 55
                                                                                                                       //
			if (_.isObject(result)) {                                                                                           // 56
				result.success = true;                                                                                             // 57
			}                                                                                                                   // 58
                                                                                                                       //
			return {                                                                                                            // 60
				statusCode: 200,                                                                                                   // 61
				body: result                                                                                                       // 62
			};                                                                                                                  // 60
		}                                                                                                                    // 64
                                                                                                                       //
		return success;                                                                                                      //
	}();                                                                                                                  //
                                                                                                                       //
	API.prototype.failure = function () {                                                                                 //
		function failure(result, errorType) {                                                                                //
			if (_.isObject(result)) {                                                                                           // 67
				result.success = false;                                                                                            // 68
			} else {                                                                                                            // 69
				result = {                                                                                                         // 70
					success: false,                                                                                                   // 71
					error: result                                                                                                     // 72
				};                                                                                                                 // 70
                                                                                                                       //
				if (errorType) {                                                                                                   // 75
					result.errorType = errorType;                                                                                     // 76
				}                                                                                                                  // 77
			}                                                                                                                   // 78
                                                                                                                       //
			return {                                                                                                            // 80
				statusCode: 400,                                                                                                   // 81
				body: result                                                                                                       // 82
			};                                                                                                                  // 80
		}                                                                                                                    // 84
                                                                                                                       //
		return failure;                                                                                                      //
	}();                                                                                                                  //
                                                                                                                       //
	API.prototype.unauthorized = function () {                                                                            //
		function unauthorized(msg) {                                                                                         //
			return {                                                                                                            // 88
				statusCode: 403,                                                                                                   // 89
				body: {                                                                                                            // 90
					success: false,                                                                                                   // 91
					error: msg ? msg : 'unauthorized'                                                                                 // 92
				}                                                                                                                  // 90
			};                                                                                                                  // 88
		}                                                                                                                    // 95
                                                                                                                       //
		return unauthorized;                                                                                                 //
	}();                                                                                                                  //
                                                                                                                       //
	API.prototype.addRoute = function () {                                                                                //
		function addRoute(routes, options, endpoints) {                                                                      //
			var _this2 = this;                                                                                                  // 97
                                                                                                                       //
			//Note: required if the developer didn't provide options                                                            // 98
			if (typeof endpoints === 'undefined') {                                                                             // 99
				endpoints = options;                                                                                               // 100
				options = {};                                                                                                      // 101
			} //Allow for more than one route using the same option and endpoints                                               // 102
                                                                                                                       //
                                                                                                                       //
			if (!_.isArray(routes)) {                                                                                           // 105
				routes = [routes];                                                                                                 // 106
			}                                                                                                                   // 107
                                                                                                                       //
			routes.forEach(function (route) {                                                                                   // 109
				//Note: This is required due to Restivus calling `addRoute` in the constructor of itself                           // 110
				if (_this2.helperMethods) {                                                                                        // 111
					Object.keys(endpoints).forEach(function (method) {                                                                // 112
						if (typeof endpoints[method] === 'function') {                                                                   // 113
							endpoints[method] = {                                                                                           // 114
								action: endpoints[method]                                                                                      // 114
							};                                                                                                              // 114
						} //Add a try/catch for each endpoint                                                                            // 115
                                                                                                                       //
                                                                                                                       //
						var originalAction = endpoints[method].action;                                                                   // 118
                                                                                                                       //
						endpoints[method].action = function () {                                                                         // 119
							this.logger.debug(this.request.method.toUpperCase() + ": " + this.request.url);                                 // 120
							var result = void 0;                                                                                            // 121
                                                                                                                       //
							try {                                                                                                           // 122
								result = originalAction.apply(this);                                                                           // 123
							} catch (e) {                                                                                                   // 124
								this.logger.debug(method + " " + route + " threw an error:", e.stack);                                         // 125
								return RocketChat.API.v1.failure(e.message, e.error);                                                          // 126
							}                                                                                                               // 127
                                                                                                                       //
							return result ? result : RocketChat.API.v1.success();                                                           // 129
						};                                                                                                               // 130
                                                                                                                       //
						for (var _iterator = _this2.helperMethods, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
							var _ref3;                                                                                                      // 132
                                                                                                                       //
							if (_isArray) {                                                                                                 // 132
								if (_i >= _iterator.length) break;                                                                             // 132
								_ref3 = _iterator[_i++];                                                                                       // 132
							} else {                                                                                                        // 132
								_i = _iterator.next();                                                                                         // 132
								if (_i.done) break;                                                                                            // 132
								_ref3 = _i.value;                                                                                              // 132
							}                                                                                                               // 132
                                                                                                                       //
							var _ref = _ref3;                                                                                               // 132
                                                                                                                       //
							var _ref2 = (0, _slicedToArray3.default)(_ref, 2);                                                              // 132
                                                                                                                       //
							var name = _ref2[0];                                                                                            // 132
							var helperMethod = _ref2[1];                                                                                    // 132
							endpoints[method][name] = helperMethod;                                                                         // 133
						} //Allow the endpoints to make usage of the logger which respects the user's settings                           // 134
                                                                                                                       //
                                                                                                                       //
						endpoints[method].logger = _this2.logger;                                                                        // 137
					});                                                                                                               // 138
				}                                                                                                                  // 139
                                                                                                                       //
				_Restivus.prototype.addRoute.call(_this2, route, options, endpoints);                                              // 141
			});                                                                                                                 // 142
		}                                                                                                                    // 143
                                                                                                                       //
		return addRoute;                                                                                                     //
	}();                                                                                                                  //
                                                                                                                       //
	return API;                                                                                                           //
}(Restivus);                                                                                                           //
                                                                                                                       //
RocketChat.API = {};                                                                                                   // 146
                                                                                                                       //
var getUserAuth = function () {                                                                                        // 148
	function _getUserAuth() {                                                                                             // 148
		var invalidResults = [undefined, null, false];                                                                       // 149
		return {                                                                                                             // 150
			token: 'services.resume.loginTokens.hashedToken',                                                                   // 151
			user: function () {                                                                                                 // 152
				if (this.bodyParams && this.bodyParams.payload) {                                                                  // 153
					this.bodyParams = JSON.parse(this.bodyParams.payload);                                                            // 154
				}                                                                                                                  // 155
                                                                                                                       //
				for (var i = 0; i < RocketChat.API.v1.authMethods.length; i++) {                                                   // 157
					var method = RocketChat.API.v1.authMethods[i];                                                                    // 158
                                                                                                                       //
					if (typeof method === 'function') {                                                                               // 160
						var result = method.apply(this, arguments);                                                                      // 161
                                                                                                                       //
						if (!invalidResults.includes(result)) {                                                                          // 162
							return result;                                                                                                  // 163
						}                                                                                                                // 164
					}                                                                                                                 // 165
				}                                                                                                                  // 166
                                                                                                                       //
				var token = void 0;                                                                                                // 168
                                                                                                                       //
				if (this.request.headers['x-auth-token']) {                                                                        // 169
					token = Accounts._hashLoginToken(this.request.headers['x-auth-token']);                                           // 170
				}                                                                                                                  // 171
                                                                                                                       //
				return {                                                                                                           // 173
					userId: this.request.headers['x-user-id'],                                                                        // 174
					token: token                                                                                                      // 175
				};                                                                                                                 // 173
			}                                                                                                                   // 177
		};                                                                                                                   // 150
	}                                                                                                                     // 179
                                                                                                                       //
	return _getUserAuth;                                                                                                  // 148
}();                                                                                                                   // 148
                                                                                                                       //
RocketChat.API.v1 = new API({                                                                                          // 181
	version: 'v1',                                                                                                        // 182
	useDefaultAuth: true,                                                                                                 // 183
	prettyJson: true,                                                                                                     // 184
	enableCors: false,                                                                                                    // 185
	auth: getUserAuth()                                                                                                   // 186
});                                                                                                                    // 181
RocketChat.API.default = new API({                                                                                     // 189
	useDefaultAuth: true,                                                                                                 // 190
	prettyJson: true,                                                                                                     // 191
	enableCors: false,                                                                                                    // 192
	auth: getUserAuth()                                                                                                   // 193
});                                                                                                                    // 189
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"settings.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/settings.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.settings.addGroup('General', function () {                                                                  // 1
	this.section('REST API', function () {                                                                                // 2
		this.add('API_Upper_Count_Limit', 100, {                                                                             // 3
			type: 'int',                                                                                                        // 3
			"public": false                                                                                                     // 3
		});                                                                                                                  // 3
		this.add('API_Default_Count', 50, {                                                                                  // 4
			type: 'int',                                                                                                        // 4
			"public": false                                                                                                     // 4
		});                                                                                                                  // 4
		this.add('API_Allow_Infinite_Count', true, {                                                                         // 5
			type: 'boolean',                                                                                                    // 5
			"public": false                                                                                                     // 5
		});                                                                                                                  // 5
		this.add('API_Enable_Direct_Message_History_EndPoint', false, {                                                      // 6
			type: 'boolean',                                                                                                    // 6
			"public": false                                                                                                     // 6
		});                                                                                                                  // 6
		this.add('API_Enable_Shields', true, {                                                                               // 7
			type: 'boolean',                                                                                                    // 7
			"public": false                                                                                                     // 7
		});                                                                                                                  // 7
		this.add('API_Shield_Types', '*', {                                                                                  // 8
			type: 'string',                                                                                                     // 8
			"public": false,                                                                                                    // 8
			enableQuery: {                                                                                                      // 8
				_id: 'API_Enable_Shields',                                                                                         // 8
				value: true                                                                                                        // 8
			}                                                                                                                   // 8
		});                                                                                                                  // 8
		this.add('API_Enable_CORS', false, {                                                                                 // 9
			type: 'boolean',                                                                                                    // 9
			"public": false                                                                                                     // 9
		});                                                                                                                  // 9
		this.add('API_CORS_Origin', '*', {                                                                                   // 10
			type: 'string',                                                                                                     // 10
			"public": false,                                                                                                    // 10
			enableQuery: {                                                                                                      // 10
				_id: 'API_Enable_CORS',                                                                                            // 10
				value: true                                                                                                        // 10
			}                                                                                                                   // 10
		});                                                                                                                  // 10
	});                                                                                                                   // 11
});                                                                                                                    // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"v1":{"helpers":{"requestParams.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/helpers/requestParams.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.v1.helperMethods.set('requestParams', function () {                                                     // 1
	function _requestParams() {                                                                                           // 1
		return ['POST', 'PUT'].includes(this.request.method) ? this.bodyParams : this.queryParams;                           // 2
	}                                                                                                                     // 3
                                                                                                                       //
	return _requestParams;                                                                                                // 1
}());                                                                                                                  // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getPaginationItems.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/helpers/getPaginationItems.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// If the count query param is higher than the "API_Upper_Count_Limit" setting, then we limit that                     // 1
// If the count query param isn't defined, then we set it to the "API_Default_Count" setting                           // 2
// If the count is zero, then that means unlimited and is only allowed if the setting "API_Allow_Infinite_Count" is true
RocketChat.API.v1.helperMethods.set('getPaginationItems', function () {                                                // 5
	function _getPaginationItems() {                                                                                      // 5
		var hardUpperLimit = RocketChat.settings.get('API_Upper_Count_Limit') <= 0 ? 100 : RocketChat.settings.get('API_Upper_Count_Limit');
		var defaultCount = RocketChat.settings.get('API_Default_Count') <= 0 ? 50 : RocketChat.settings.get('API_Default_Count');
		var offset = this.queryParams.offset ? parseInt(this.queryParams.offset) : 0;                                        // 8
		var count = defaultCount; // Ensure count is an appropiate amount                                                    // 9
                                                                                                                       //
		if (typeof this.queryParams.count !== 'undefined') {                                                                 // 12
			count = parseInt(this.queryParams.count);                                                                           // 13
		} else {                                                                                                             // 14
			count = defaultCount;                                                                                               // 15
		}                                                                                                                    // 16
                                                                                                                       //
		if (count > hardUpperLimit) {                                                                                        // 18
			count = hardUpperLimit;                                                                                             // 19
		}                                                                                                                    // 20
                                                                                                                       //
		if (count === 0 && !RocketChat.settings.get('API_Allow_Infinite_Count')) {                                           // 22
			count = defaultCount;                                                                                               // 23
		}                                                                                                                    // 24
                                                                                                                       //
		return {                                                                                                             // 26
			offset: offset,                                                                                                     // 27
			count: count                                                                                                        // 28
		};                                                                                                                   // 26
	}                                                                                                                     // 30
                                                                                                                       //
	return _getPaginationItems;                                                                                           // 5
}());                                                                                                                  // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getUserFromParams.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/helpers/getUserFromParams.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//Convenience method, almost need to turn it into a middleware of sorts                                                // 1
RocketChat.API.v1.helperMethods.set('getUserFromParams', function () {                                                 // 2
	function _getUserFromParams() {                                                                                       // 2
		var doesntExist = {                                                                                                  // 3
			_doesntExist: true                                                                                                  // 3
		};                                                                                                                   // 3
		var user = void 0;                                                                                                   // 4
		var params = this.requestParams();                                                                                   // 5
                                                                                                                       //
		if (params.userId && params.userId.trim()) {                                                                         // 7
			user = RocketChat.models.Users.findOneById(params.userId) || doesntExist;                                           // 8
		} else if (params.username && params.username.trim()) {                                                              // 9
			user = RocketChat.models.Users.findOneByUsername(params.username) || doesntExist;                                   // 10
		} else if (params.user && params.user.trim()) {                                                                      // 11
			user = RocketChat.models.Users.findOneByUsername(params.user) || doesntExist;                                       // 12
		} else {                                                                                                             // 13
			throw new Meteor.Error('error-user-param-not-provided', 'The required "userId" or "username" param was not provided');
		}                                                                                                                    // 15
                                                                                                                       //
		if (user._doesntExist) {                                                                                             // 17
			throw new Meteor.Error('error-invalid-user', 'The required "userId" or "username" param provided does not match any users');
		}                                                                                                                    // 19
                                                                                                                       //
		return user;                                                                                                         // 21
	}                                                                                                                     // 22
                                                                                                                       //
	return _getUserFromParams;                                                                                            // 2
}());                                                                                                                  // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"isUserFromParams.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/helpers/isUserFromParams.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.v1.helperMethods.set('isUserFromParams', function () {                                                  // 1
	function _isUserFromParams() {                                                                                        // 1
		var params = this.requestParams();                                                                                   // 2
		return !params.userId && !params.username && !params.user || params.userId && this.userId === params.userId || params.username && this.user.username === params.username || params.user && this.user.username === params.user;
	}                                                                                                                     // 8
                                                                                                                       //
	return _isUserFromParams;                                                                                             // 1
}());                                                                                                                  // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"parseJsonQuery.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/helpers/parseJsonQuery.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                                //
                                                                                                                       //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
RocketChat.API.v1.helperMethods.set('parseJsonQuery', function () {                                                    // 1
	function _parseJsonQuery() {                                                                                          // 1
		var sort = void 0;                                                                                                   // 2
                                                                                                                       //
		if (this.queryParams.sort) {                                                                                         // 3
			try {                                                                                                               // 4
				sort = JSON.parse(this.queryParams.sort);                                                                          // 5
			} catch (e) {                                                                                                       // 6
				this.logger.warn("Invalid sort parameter provided \"" + this.queryParams.sort + "\":", e);                         // 7
				throw new Meteor.Error('error-invalid-sort', "Invalid sort parameter provided: \"" + this.queryParams.sort + "\"", {
					helperMethod: 'parseJsonQuery'                                                                                    // 8
				});                                                                                                                // 8
			}                                                                                                                   // 9
		}                                                                                                                    // 10
                                                                                                                       //
		var fields = void 0;                                                                                                 // 12
                                                                                                                       //
		if (this.queryParams.fields) {                                                                                       // 13
			try {                                                                                                               // 14
				fields = JSON.parse(this.queryParams.fields);                                                                      // 15
			} catch (e) {                                                                                                       // 16
				this.logger.warn("Invalid fields parameter provided \"" + this.queryParams.fields + "\":", e);                     // 17
				throw new Meteor.Error('error-invalid-fields', "Invalid fields parameter provided: \"" + this.queryParams.fields + "\"", {
					helperMethod: 'parseJsonQuery'                                                                                    // 18
				});                                                                                                                // 18
			}                                                                                                                   // 19
		} // Verify the user's selected fields only contains ones which their role allows                                    // 20
                                                                                                                       //
                                                                                                                       //
		if ((typeof fields === "undefined" ? "undefined" : (0, _typeof3.default)(fields)) === 'object') {                    // 23
			var nonSelectableFields = Object.keys(RocketChat.API.v1.defaultFieldsToExclude);                                    // 24
                                                                                                                       //
			if (!RocketChat.authz.hasPermission(this.userId, 'view-full-other-user-info') && this.request.route.includes('/v1/users.')) {
				nonSelectableFields = nonSelectableFields.concat(Object.keys(RocketChat.API.v1.limitedUserFieldsToExclude));       // 26
			}                                                                                                                   // 27
                                                                                                                       //
			Object.keys(fields).forEach(function (k) {                                                                          // 29
				if (nonSelectableFields.includes(k) || nonSelectableFields.includes(k.split(RocketChat.API.v1.fieldSeparator)[0])) {
					delete fields[k];                                                                                                 // 31
				}                                                                                                                  // 32
			});                                                                                                                 // 33
		} // Limit the fields by default                                                                                     // 34
                                                                                                                       //
                                                                                                                       //
		fields = Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude);                                        // 37
                                                                                                                       //
		if (!RocketChat.authz.hasPermission(this.userId, 'view-full-other-user-info') && this.request.route.includes('/v1/users.')) {
			fields = Object.assign(fields, RocketChat.API.v1.limitedUserFieldsToExclude);                                       // 39
		}                                                                                                                    // 40
                                                                                                                       //
		var query = void 0;                                                                                                  // 42
                                                                                                                       //
		if (this.queryParams.query) {                                                                                        // 43
			try {                                                                                                               // 44
				query = JSON.parse(this.queryParams.query);                                                                        // 45
			} catch (e) {                                                                                                       // 46
				this.logger.warn("Invalid query parameter provided \"" + this.queryParams.query + "\":", e);                       // 47
				throw new Meteor.Error('error-invalid-query', "Invalid query parameter provided: \"" + this.queryParams.query + "\"", {
					helperMethod: 'parseJsonQuery'                                                                                    // 48
				});                                                                                                                // 48
			}                                                                                                                   // 49
		} // Verify the user has permission to query the fields they are                                                     // 50
                                                                                                                       //
                                                                                                                       //
		if ((typeof query === "undefined" ? "undefined" : (0, _typeof3.default)(query)) === 'object') {                      // 53
			var nonQuerableFields = Object.keys(RocketChat.API.v1.defaultFieldsToExclude);                                      // 54
                                                                                                                       //
			if (!RocketChat.authz.hasPermission(this.userId, 'view-full-other-user-info') && this.request.route.includes('/v1/users.')) {
				nonQuerableFields = nonQuerableFields.concat(Object.keys(RocketChat.API.v1.limitedUserFieldsToExclude));           // 56
			}                                                                                                                   // 57
                                                                                                                       //
			Object.keys(query).forEach(function (k) {                                                                           // 59
				if (nonQuerableFields.includes(k) || nonQuerableFields.includes(k.split(RocketChat.API.v1.fieldSeparator)[0])) {   // 60
					delete query[k];                                                                                                  // 61
				}                                                                                                                  // 62
			});                                                                                                                 // 63
		}                                                                                                                    // 64
                                                                                                                       //
		return {                                                                                                             // 66
			sort: sort,                                                                                                         // 67
			fields: fields,                                                                                                     // 68
			query: query                                                                                                        // 69
		};                                                                                                                   // 66
	}                                                                                                                     // 71
                                                                                                                       //
	return _parseJsonQuery;                                                                                               // 1
}());                                                                                                                  // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getLoggedInUser.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/helpers/getLoggedInUser.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.v1.helperMethods.set('getLoggedInUser', function () {                                                   // 1
	function _getLoggedInUser() {                                                                                         // 1
		var user = void 0;                                                                                                   // 2
                                                                                                                       //
		if (this.request.headers['x-auth-token'] && this.request.headers['x-user-id']) {                                     // 4
			user = RocketChat.models.Users.findOne({                                                                            // 5
				'_id': this.request.headers['x-user-id'],                                                                          // 6
				'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(this.request.headers['x-auth-token'])          // 7
			});                                                                                                                 // 5
		}                                                                                                                    // 9
                                                                                                                       //
		return user;                                                                                                         // 11
	}                                                                                                                     // 12
                                                                                                                       //
	return _getLoggedInUser;                                                                                              // 1
}());                                                                                                                  // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"channels.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/channels.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                                //
                                                                                                                       //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
//Returns the channel IF found otherwise it will return the failure of why it didn't. Check the `statusCode` property  // 1
function findChannelByIdOrName(_ref) {                                                                                 // 2
	var params = _ref.params,                                                                                             // 2
	    _ref$checkedArchived = _ref.checkedArchived,                                                                      // 2
	    checkedArchived = _ref$checkedArchived === undefined ? true : _ref$checkedArchived;                               // 2
                                                                                                                       //
	if ((!params.roomId || !params.roomId.trim()) && (!params.roomName || !params.roomName.trim())) {                     // 3
		throw new Meteor.Error('error-roomid-param-not-provided', 'The parameter "roomId" or "roomName" is required');       // 4
	}                                                                                                                     // 5
                                                                                                                       //
	var room = void 0;                                                                                                    // 7
                                                                                                                       //
	if (params.roomId) {                                                                                                  // 8
		room = RocketChat.models.Rooms.findOneById(params.roomId, {                                                          // 9
			fields: RocketChat.API.v1.defaultFieldsToExclude                                                                    // 9
		});                                                                                                                  // 9
	} else if (params.roomName) {                                                                                         // 10
		room = RocketChat.models.Rooms.findOneByName(params.roomName, {                                                      // 11
			fields: RocketChat.API.v1.defaultFieldsToExclude                                                                    // 11
		});                                                                                                                  // 11
	}                                                                                                                     // 12
                                                                                                                       //
	if (!room || room.t !== 'c') {                                                                                        // 14
		throw new Meteor.Error('error-room-not-found', 'The required "roomId" or "roomName" param provided does not match any channel');
	}                                                                                                                     // 16
                                                                                                                       //
	if (checkedArchived && room.archived) {                                                                               // 18
		throw new Meteor.Error('error-room-archived', "The channel, " + room.name + ", is archived");                        // 19
	}                                                                                                                     // 20
                                                                                                                       //
	return room;                                                                                                          // 22
}                                                                                                                      // 23
                                                                                                                       //
RocketChat.API.v1.addRoute('channels.addAll', {                                                                        // 25
	authRequired: true                                                                                                    // 25
}, {                                                                                                                   // 25
	post: function () {                                                                                                   // 26
		var _this = this;                                                                                                    // 26
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 27
			params: this.requestParams()                                                                                        // 27
		});                                                                                                                  // 27
		Meteor.runAsUser(this.userId, function () {                                                                          // 29
			Meteor.call('addAllUserToRoom', findResult._id, _this.bodyParams.activeUsersOnly);                                  // 30
		});                                                                                                                  // 31
		return RocketChat.API.v1.success({                                                                                   // 33
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 34
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 34
			})                                                                                                                  // 34
		});                                                                                                                  // 33
	}                                                                                                                     // 36
});                                                                                                                    // 25
RocketChat.API.v1.addRoute('channels.addModerator', {                                                                  // 39
	authRequired: true                                                                                                    // 39
}, {                                                                                                                   // 39
	post: function () {                                                                                                   // 40
		var findResult = findChannelByIdOrName({                                                                             // 41
			params: this.requestParams()                                                                                        // 41
		});                                                                                                                  // 41
		var user = this.getUserFromParams();                                                                                 // 43
		Meteor.runAsUser(this.userId, function () {                                                                          // 45
			Meteor.call('addRoomModerator', findResult._id, user._id);                                                          // 46
		});                                                                                                                  // 47
		return RocketChat.API.v1.success();                                                                                  // 49
	}                                                                                                                     // 50
});                                                                                                                    // 39
RocketChat.API.v1.addRoute('channels.addOwner', {                                                                      // 53
	authRequired: true                                                                                                    // 53
}, {                                                                                                                   // 53
	post: function () {                                                                                                   // 54
		var findResult = findChannelByIdOrName({                                                                             // 55
			params: this.requestParams()                                                                                        // 55
		});                                                                                                                  // 55
		var user = this.getUserFromParams();                                                                                 // 57
		Meteor.runAsUser(this.userId, function () {                                                                          // 59
			Meteor.call('addRoomOwner', findResult._id, user._id);                                                              // 60
		});                                                                                                                  // 61
		return RocketChat.API.v1.success();                                                                                  // 63
	}                                                                                                                     // 64
});                                                                                                                    // 53
RocketChat.API.v1.addRoute('channels.archive', {                                                                       // 67
	authRequired: true                                                                                                    // 67
}, {                                                                                                                   // 67
	post: function () {                                                                                                   // 68
		var findResult = findChannelByIdOrName({                                                                             // 69
			params: this.requestParams()                                                                                        // 69
		});                                                                                                                  // 69
		Meteor.runAsUser(this.userId, function () {                                                                          // 71
			Meteor.call('archiveRoom', findResult._id);                                                                         // 72
		});                                                                                                                  // 73
		return RocketChat.API.v1.success();                                                                                  // 75
	}                                                                                                                     // 76
});                                                                                                                    // 67
RocketChat.API.v1.addRoute('channels.cleanHistory', {                                                                  // 79
	authRequired: true                                                                                                    // 79
}, {                                                                                                                   // 79
	post: function () {                                                                                                   // 80
		var findResult = findChannelByIdOrName({                                                                             // 81
			params: this.requestParams()                                                                                        // 81
		});                                                                                                                  // 81
                                                                                                                       //
		if (!this.bodyParams.latest) {                                                                                       // 83
			return RocketChat.API.v1.failure('Body parameter "latest" is required.');                                           // 84
		}                                                                                                                    // 85
                                                                                                                       //
		if (!this.bodyParams.oldest) {                                                                                       // 87
			return RocketChat.API.v1.failure('Body parameter "oldest" is required.');                                           // 88
		}                                                                                                                    // 89
                                                                                                                       //
		var latest = new Date(this.bodyParams.latest);                                                                       // 91
		var oldest = new Date(this.bodyParams.oldest);                                                                       // 92
		var inclusive = false;                                                                                               // 94
                                                                                                                       //
		if (typeof this.bodyParams.inclusive !== 'undefined') {                                                              // 95
			inclusive = this.bodyParams.inclusive;                                                                              // 96
		}                                                                                                                    // 97
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 99
			Meteor.call('cleanChannelHistory', {                                                                                // 100
				roomId: findResult._id,                                                                                            // 100
				latest: latest,                                                                                                    // 100
				oldest: oldest,                                                                                                    // 100
				inclusive: inclusive                                                                                               // 100
			});                                                                                                                 // 100
		});                                                                                                                  // 101
		return RocketChat.API.v1.success();                                                                                  // 103
	}                                                                                                                     // 104
});                                                                                                                    // 79
RocketChat.API.v1.addRoute('channels.close', {                                                                         // 107
	authRequired: true                                                                                                    // 107
}, {                                                                                                                   // 107
	post: function () {                                                                                                   // 108
		var findResult = findChannelByIdOrName({                                                                             // 109
			params: this.requestParams(),                                                                                       // 109
			checkedArchived: false                                                                                              // 109
		});                                                                                                                  // 109
		var sub = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(findResult._id, this.userId);                     // 111
                                                                                                                       //
		if (!sub) {                                                                                                          // 113
			return RocketChat.API.v1.failure("The user/callee is not in the channel \"" + findResult.name + ".");               // 114
		}                                                                                                                    // 115
                                                                                                                       //
		if (!sub.open) {                                                                                                     // 117
			return RocketChat.API.v1.failure("The channel, " + findResult.name + ", is already closed to the sender");          // 118
		}                                                                                                                    // 119
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 121
			Meteor.call('hideRoom', findResult._id);                                                                            // 122
		});                                                                                                                  // 123
		return RocketChat.API.v1.success();                                                                                  // 125
	}                                                                                                                     // 126
});                                                                                                                    // 107
RocketChat.API.v1.addRoute('channels.create', {                                                                        // 129
	authRequired: true                                                                                                    // 129
}, {                                                                                                                   // 129
	post: function () {                                                                                                   // 130
		var _this2 = this;                                                                                                   // 130
                                                                                                                       //
		if (!RocketChat.authz.hasPermission(this.userId, 'create-c')) {                                                      // 131
			return RocketChat.API.v1.unauthorized();                                                                            // 132
		}                                                                                                                    // 133
                                                                                                                       //
		if (!this.bodyParams.name) {                                                                                         // 135
			return RocketChat.API.v1.failure('Body param "name" is required');                                                  // 136
		}                                                                                                                    // 137
                                                                                                                       //
		if (this.bodyParams.members && !_.isArray(this.bodyParams.members)) {                                                // 139
			return RocketChat.API.v1.failure('Body param "members" must be an array if provided');                              // 140
		}                                                                                                                    // 141
                                                                                                                       //
		if (this.bodyParams.customFields && !((0, _typeof3.default)(this.bodyParams.customFields) === 'object')) {           // 143
			return RocketChat.API.v1.failure('Body param "customFields" must be an object if provided');                        // 144
		}                                                                                                                    // 145
                                                                                                                       //
		var readOnly = false;                                                                                                // 147
                                                                                                                       //
		if (typeof this.bodyParams.readOnly !== 'undefined') {                                                               // 148
			readOnly = this.bodyParams.readOnly;                                                                                // 149
		}                                                                                                                    // 150
                                                                                                                       //
		var id = void 0;                                                                                                     // 152
		Meteor.runAsUser(this.userId, function () {                                                                          // 153
			id = Meteor.call('createChannel', _this2.bodyParams.name, _this2.bodyParams.members ? _this2.bodyParams.members : [], readOnly, _this2.bodyParams.customFields);
		});                                                                                                                  // 155
		return RocketChat.API.v1.success({                                                                                   // 157
			channel: RocketChat.models.Rooms.findOneById(id.rid, {                                                              // 158
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 158
			})                                                                                                                  // 158
		});                                                                                                                  // 157
	}                                                                                                                     // 160
});                                                                                                                    // 129
RocketChat.API.v1.addRoute('channels.delete', {                                                                        // 163
	authRequired: true                                                                                                    // 163
}, {                                                                                                                   // 163
	post: function () {                                                                                                   // 164
		var findResult = findChannelByIdOrName({                                                                             // 165
			params: this.requestParams(),                                                                                       // 165
			checkedArchived: false                                                                                              // 165
		});                                                                                                                  // 165
		Meteor.runAsUser(this.userId, function () {                                                                          // 167
			Meteor.call('eraseRoom', findResult._id);                                                                           // 168
		});                                                                                                                  // 169
		return RocketChat.API.v1.success({                                                                                   // 171
			channel: findResult                                                                                                 // 172
		});                                                                                                                  // 171
	}                                                                                                                     // 174
});                                                                                                                    // 163
RocketChat.API.v1.addRoute('channels.files', {                                                                         // 177
	authRequired: true                                                                                                    // 177
}, {                                                                                                                   // 177
	get: function () {                                                                                                    // 178
		var _this3 = this;                                                                                                   // 178
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 179
			params: this.requestParams(),                                                                                       // 179
			checkedArchived: false                                                                                              // 179
		});                                                                                                                  // 179
		Meteor.runAsUser(this.userId, function () {                                                                          // 181
			Meteor.call('canAccessRoom', findResult._id, _this3.userId);                                                        // 182
		});                                                                                                                  // 183
                                                                                                                       //
		var _getPaginationItems = this.getPaginationItems(),                                                                 // 178
		    offset = _getPaginationItems.offset,                                                                             // 178
		    count = _getPaginationItems.count;                                                                               // 178
                                                                                                                       //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                         // 178
		    sort = _parseJsonQuery.sort,                                                                                     // 178
		    fields = _parseJsonQuery.fields,                                                                                 // 178
		    query = _parseJsonQuery.query;                                                                                   // 178
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 188
			rid: findResult._id                                                                                                 // 188
		});                                                                                                                  // 188
		var files = RocketChat.models.Uploads.find(ourQuery, {                                                               // 190
			sort: sort ? sort : {                                                                                               // 191
				name: 1                                                                                                            // 191
			},                                                                                                                  // 191
			skip: offset,                                                                                                       // 192
			limit: count,                                                                                                       // 193
			fields: fields                                                                                                      // 194
		}).fetch();                                                                                                          // 190
		return RocketChat.API.v1.success({                                                                                   // 197
			files: files,                                                                                                       // 198
			count: files.length,                                                                                                // 199
			offset: offset,                                                                                                     // 200
			total: RocketChat.models.Uploads.find(ourQuery).count()                                                             // 201
		});                                                                                                                  // 197
	}                                                                                                                     // 203
});                                                                                                                    // 177
RocketChat.API.v1.addRoute('channels.getIntegrations', {                                                               // 206
	authRequired: true                                                                                                    // 206
}, {                                                                                                                   // 206
	get: function () {                                                                                                    // 207
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                           // 208
			return RocketChat.API.v1.unauthorized();                                                                            // 209
		}                                                                                                                    // 210
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 212
			params: this.requestParams(),                                                                                       // 212
			checkedArchived: false                                                                                              // 212
		});                                                                                                                  // 212
		var includeAllPublicChannels = true;                                                                                 // 214
                                                                                                                       //
		if (typeof this.queryParams.includeAllPublicChannels !== 'undefined') {                                              // 215
			includeAllPublicChannels = this.queryParams.includeAllPublicChannels === 'true';                                    // 216
		}                                                                                                                    // 217
                                                                                                                       //
		var ourQuery = {                                                                                                     // 219
			channel: "#" + findResult.name                                                                                      // 220
		};                                                                                                                   // 219
                                                                                                                       //
		if (includeAllPublicChannels) {                                                                                      // 223
			ourQuery.channel = {                                                                                                // 224
				$in: [ourQuery.channel, 'all_public_channels']                                                                     // 225
			};                                                                                                                  // 224
		}                                                                                                                    // 227
                                                                                                                       //
		var _getPaginationItems2 = this.getPaginationItems(),                                                                // 207
		    offset = _getPaginationItems2.offset,                                                                            // 207
		    count = _getPaginationItems2.count;                                                                              // 207
                                                                                                                       //
		var _parseJsonQuery2 = this.parseJsonQuery(),                                                                        // 207
		    sort = _parseJsonQuery2.sort,                                                                                    // 207
		    fields = _parseJsonQuery2.fields,                                                                                // 207
		    query = _parseJsonQuery2.query;                                                                                  // 207
                                                                                                                       //
		ourQuery = Object.assign({}, query, ourQuery);                                                                       // 232
		var integrations = RocketChat.models.Integrations.find(ourQuery, {                                                   // 234
			sort: sort ? sort : {                                                                                               // 235
				_createdAt: 1                                                                                                      // 235
			},                                                                                                                  // 235
			skip: offset,                                                                                                       // 236
			limit: count,                                                                                                       // 237
			fields: fields                                                                                                      // 238
		}).fetch();                                                                                                          // 234
		return RocketChat.API.v1.success({                                                                                   // 241
			integrations: integrations,                                                                                         // 242
			count: integrations.length,                                                                                         // 243
			offset: offset,                                                                                                     // 244
			total: RocketChat.models.Integrations.find(ourQuery).count()                                                        // 245
		});                                                                                                                  // 241
	}                                                                                                                     // 247
});                                                                                                                    // 206
RocketChat.API.v1.addRoute('channels.history', {                                                                       // 250
	authRequired: true                                                                                                    // 250
}, {                                                                                                                   // 250
	get: function () {                                                                                                    // 251
		var findResult = findChannelByIdOrName({                                                                             // 252
			params: this.requestParams(),                                                                                       // 252
			checkedArchived: false                                                                                              // 252
		});                                                                                                                  // 252
		var latestDate = new Date();                                                                                         // 254
                                                                                                                       //
		if (this.queryParams.latest) {                                                                                       // 255
			latestDate = new Date(this.queryParams.latest);                                                                     // 256
		}                                                                                                                    // 257
                                                                                                                       //
		var oldestDate = undefined;                                                                                          // 259
                                                                                                                       //
		if (this.queryParams.oldest) {                                                                                       // 260
			oldestDate = new Date(this.queryParams.oldest);                                                                     // 261
		}                                                                                                                    // 262
                                                                                                                       //
		var inclusive = false;                                                                                               // 264
                                                                                                                       //
		if (this.queryParams.inclusive) {                                                                                    // 265
			inclusive = this.queryParams.inclusive;                                                                             // 266
		}                                                                                                                    // 267
                                                                                                                       //
		var count = 20;                                                                                                      // 269
                                                                                                                       //
		if (this.queryParams.count) {                                                                                        // 270
			count = parseInt(this.queryParams.count);                                                                           // 271
		}                                                                                                                    // 272
                                                                                                                       //
		var unreads = false;                                                                                                 // 274
                                                                                                                       //
		if (this.queryParams.unreads) {                                                                                      // 275
			unreads = this.queryParams.unreads;                                                                                 // 276
		}                                                                                                                    // 277
                                                                                                                       //
		var result = void 0;                                                                                                 // 279
		Meteor.runAsUser(this.userId, function () {                                                                          // 280
			result = Meteor.call('getChannelHistory', {                                                                         // 281
				rid: findResult._id,                                                                                               // 281
				latest: latestDate,                                                                                                // 281
				oldest: oldestDate,                                                                                                // 281
				inclusive: inclusive,                                                                                              // 281
				count: count,                                                                                                      // 281
				unreads: unreads                                                                                                   // 281
			});                                                                                                                 // 281
		});                                                                                                                  // 282
                                                                                                                       //
		if (!result) {                                                                                                       // 284
			return RocketChat.API.v1.unauthorized();                                                                            // 285
		}                                                                                                                    // 286
                                                                                                                       //
		return RocketChat.API.v1.success(result);                                                                            // 288
	}                                                                                                                     // 289
});                                                                                                                    // 250
RocketChat.API.v1.addRoute('channels.info', {                                                                          // 292
	authRequired: true                                                                                                    // 292
}, {                                                                                                                   // 292
	get: function () {                                                                                                    // 293
		var findResult = findChannelByIdOrName({                                                                             // 294
			params: this.requestParams(),                                                                                       // 294
			checkedArchived: false                                                                                              // 294
		});                                                                                                                  // 294
		return RocketChat.API.v1.success({                                                                                   // 296
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 297
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 297
			})                                                                                                                  // 297
		});                                                                                                                  // 296
	}                                                                                                                     // 299
});                                                                                                                    // 292
RocketChat.API.v1.addRoute('channels.invite', {                                                                        // 302
	authRequired: true                                                                                                    // 302
}, {                                                                                                                   // 302
	post: function () {                                                                                                   // 303
		var findResult = findChannelByIdOrName({                                                                             // 304
			params: this.requestParams()                                                                                        // 304
		});                                                                                                                  // 304
		var user = this.getUserFromParams();                                                                                 // 306
		Meteor.runAsUser(this.userId, function () {                                                                          // 308
			Meteor.call('addUserToRoom', {                                                                                      // 309
				rid: findResult._id,                                                                                               // 309
				username: user.username                                                                                            // 309
			});                                                                                                                 // 309
		});                                                                                                                  // 310
		return RocketChat.API.v1.success({                                                                                   // 312
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 313
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 313
			})                                                                                                                  // 313
		});                                                                                                                  // 312
	}                                                                                                                     // 315
});                                                                                                                    // 302
RocketChat.API.v1.addRoute('channels.join', {                                                                          // 318
	authRequired: true                                                                                                    // 318
}, {                                                                                                                   // 318
	post: function () {                                                                                                   // 319
		var _this4 = this;                                                                                                   // 319
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 320
			params: this.requestParams()                                                                                        // 320
		});                                                                                                                  // 320
		Meteor.runAsUser(this.userId, function () {                                                                          // 322
			Meteor.call('joinRoom', findResult._id, _this4.bodyParams.joinCode);                                                // 323
		});                                                                                                                  // 324
		return RocketChat.API.v1.success({                                                                                   // 326
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 327
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 327
			})                                                                                                                  // 327
		});                                                                                                                  // 326
	}                                                                                                                     // 329
});                                                                                                                    // 318
RocketChat.API.v1.addRoute('channels.kick', {                                                                          // 332
	authRequired: true                                                                                                    // 332
}, {                                                                                                                   // 332
	post: function () {                                                                                                   // 333
		var findResult = findChannelByIdOrName({                                                                             // 334
			params: this.requestParams()                                                                                        // 334
		});                                                                                                                  // 334
		var user = this.getUserFromParams();                                                                                 // 336
		Meteor.runAsUser(this.userId, function () {                                                                          // 338
			Meteor.call('removeUserFromRoom', {                                                                                 // 339
				rid: findResult._id,                                                                                               // 339
				username: user.username                                                                                            // 339
			});                                                                                                                 // 339
		});                                                                                                                  // 340
		return RocketChat.API.v1.success({                                                                                   // 342
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 343
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 343
			})                                                                                                                  // 343
		});                                                                                                                  // 342
	}                                                                                                                     // 345
});                                                                                                                    // 332
RocketChat.API.v1.addRoute('channels.leave', {                                                                         // 348
	authRequired: true                                                                                                    // 348
}, {                                                                                                                   // 348
	post: function () {                                                                                                   // 349
		var findResult = findChannelByIdOrName({                                                                             // 350
			params: this.requestParams()                                                                                        // 350
		});                                                                                                                  // 350
		Meteor.runAsUser(this.userId, function () {                                                                          // 352
			Meteor.call('leaveRoom', findResult._id);                                                                           // 353
		});                                                                                                                  // 354
		return RocketChat.API.v1.success({                                                                                   // 356
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 357
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 357
			})                                                                                                                  // 357
		});                                                                                                                  // 356
	}                                                                                                                     // 359
});                                                                                                                    // 348
RocketChat.API.v1.addRoute('channels.list', {                                                                          // 362
	authRequired: true                                                                                                    // 362
}, {                                                                                                                   // 362
	get: {                                                                                                                // 363
		//This is defined as such only to provide an example of how the routes can be defined :X                             // 364
		action: function () {                                                                                                // 365
			var _getPaginationItems3 = this.getPaginationItems(),                                                               // 365
			    offset = _getPaginationItems3.offset,                                                                           // 365
			    count = _getPaginationItems3.count;                                                                             // 365
                                                                                                                       //
			var _parseJsonQuery3 = this.parseJsonQuery(),                                                                       // 365
			    sort = _parseJsonQuery3.sort,                                                                                   // 365
			    fields = _parseJsonQuery3.fields,                                                                               // 365
			    query = _parseJsonQuery3.query;                                                                                 // 365
                                                                                                                       //
			var ourQuery = Object.assign({}, query, {                                                                           // 369
				t: 'c'                                                                                                             // 369
			}); //Special check for the permissions                                                                             // 369
                                                                                                                       //
			if (RocketChat.authz.hasPermission(this.userId, 'view-joined-room')) {                                              // 372
				ourQuery.usernames = {                                                                                             // 373
					$in: [this.user.username]                                                                                         // 374
				};                                                                                                                 // 373
			} else if (!RocketChat.authz.hasPermission(this.userId, 'view-c-room')) {                                           // 376
				return RocketChat.API.v1.unauthorized();                                                                           // 377
			}                                                                                                                   // 378
                                                                                                                       //
			var rooms = RocketChat.models.Rooms.find(ourQuery, {                                                                // 380
				sort: sort ? sort : {                                                                                              // 381
					name: 1                                                                                                           // 381
				},                                                                                                                 // 381
				skip: offset,                                                                                                      // 382
				limit: count,                                                                                                      // 383
				fields: fields                                                                                                     // 384
			}).fetch();                                                                                                         // 380
			return RocketChat.API.v1.success({                                                                                  // 387
				channels: rooms,                                                                                                   // 388
				count: rooms.length,                                                                                               // 389
				offset: offset,                                                                                                    // 390
				total: RocketChat.models.Rooms.find(ourQuery).count()                                                              // 391
			});                                                                                                                 // 387
		}                                                                                                                    // 393
	}                                                                                                                     // 363
});                                                                                                                    // 362
RocketChat.API.v1.addRoute('channels.list.joined', {                                                                   // 397
	authRequired: true                                                                                                    // 397
}, {                                                                                                                   // 397
	get: function () {                                                                                                    // 398
		var _getPaginationItems4 = this.getPaginationItems(),                                                                // 398
		    offset = _getPaginationItems4.offset,                                                                            // 398
		    count = _getPaginationItems4.count;                                                                              // 398
                                                                                                                       //
		var _parseJsonQuery4 = this.parseJsonQuery(),                                                                        // 398
		    sort = _parseJsonQuery4.sort,                                                                                    // 398
		    fields = _parseJsonQuery4.fields;                                                                                // 398
                                                                                                                       //
		var rooms = _.pluck(RocketChat.models.Subscriptions.findByTypeAndUserId('c', this.userId).fetch(), '_room');         // 401
                                                                                                                       //
		var totalCount = rooms.length;                                                                                       // 402
		rooms = RocketChat.models.Rooms.processQueryOptionsOnResult(rooms, {                                                 // 404
			sort: sort ? sort : {                                                                                               // 405
				name: 1                                                                                                            // 405
			},                                                                                                                  // 405
			skip: offset,                                                                                                       // 406
			limit: count,                                                                                                       // 407
			fields: fields                                                                                                      // 408
		});                                                                                                                  // 404
		return RocketChat.API.v1.success({                                                                                   // 411
			channels: rooms,                                                                                                    // 412
			offset: offset,                                                                                                     // 413
			count: rooms.length,                                                                                                // 414
			total: totalCount                                                                                                   // 415
		});                                                                                                                  // 411
	}                                                                                                                     // 417
});                                                                                                                    // 397
RocketChat.API.v1.addRoute('channels.members', {                                                                       // 420
	authRequired: true                                                                                                    // 420
}, {                                                                                                                   // 420
	get: function () {                                                                                                    // 421
		var findResult = findChannelByIdOrName({                                                                             // 422
			params: this.requestParams(),                                                                                       // 422
			checkedArchived: false                                                                                              // 422
		});                                                                                                                  // 422
                                                                                                                       //
		var _getPaginationItems5 = this.getPaginationItems(),                                                                // 421
		    offset = _getPaginationItems5.offset,                                                                            // 421
		    count = _getPaginationItems5.count;                                                                              // 421
                                                                                                                       //
		var _parseJsonQuery5 = this.parseJsonQuery(),                                                                        // 421
		    sort = _parseJsonQuery5.sort;                                                                                    // 421
                                                                                                                       //
		var members = RocketChat.models.Rooms.processQueryOptionsOnResult(Array.from(findResult.usernames), {                // 427
			sort: sort ? sort : -1,                                                                                             // 428
			skip: offset,                                                                                                       // 429
			limit: count                                                                                                        // 430
		});                                                                                                                  // 427
		var users = RocketChat.models.Users.find({                                                                           // 433
			username: {                                                                                                         // 433
				$in: members                                                                                                       // 433
			}                                                                                                                   // 433
		}, {                                                                                                                 // 433
			fields: {                                                                                                           // 434
				_id: 1,                                                                                                            // 434
				username: 1,                                                                                                       // 434
				name: 1,                                                                                                           // 434
				status: 1,                                                                                                         // 434
				utcOffset: 1                                                                                                       // 434
			}                                                                                                                   // 434
		}).fetch();                                                                                                          // 434
		return RocketChat.API.v1.success({                                                                                   // 436
			members: users,                                                                                                     // 437
			count: members.length,                                                                                              // 438
			offset: offset,                                                                                                     // 439
			total: findResult.usernames.length                                                                                  // 440
		});                                                                                                                  // 436
	}                                                                                                                     // 442
});                                                                                                                    // 420
RocketChat.API.v1.addRoute('channels.messages', {                                                                      // 445
	authRequired: true                                                                                                    // 445
}, {                                                                                                                   // 445
	get: function () {                                                                                                    // 446
		var findResult = findChannelByIdOrName({                                                                             // 447
			params: this.requestParams(),                                                                                       // 447
			checkedArchived: false                                                                                              // 447
		});                                                                                                                  // 447
                                                                                                                       //
		var _getPaginationItems6 = this.getPaginationItems(),                                                                // 446
		    offset = _getPaginationItems6.offset,                                                                            // 446
		    count = _getPaginationItems6.count;                                                                              // 446
                                                                                                                       //
		var _parseJsonQuery6 = this.parseJsonQuery(),                                                                        // 446
		    sort = _parseJsonQuery6.sort,                                                                                    // 446
		    fields = _parseJsonQuery6.fields,                                                                                // 446
		    query = _parseJsonQuery6.query;                                                                                  // 446
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 451
			rid: findResult._id                                                                                                 // 451
		}); //Special check for the permissions                                                                              // 451
                                                                                                                       //
		if (RocketChat.authz.hasPermission(this.userId, 'view-joined-room') && !findResult.usernames.includes(this.user.username)) {
			return RocketChat.API.v1.unauthorized();                                                                            // 455
		} else if (!RocketChat.authz.hasPermission(this.userId, 'view-c-room')) {                                            // 456
			return RocketChat.API.v1.unauthorized();                                                                            // 457
		}                                                                                                                    // 458
                                                                                                                       //
		var messages = RocketChat.models.Messages.find(ourQuery, {                                                           // 460
			sort: sort ? sort : {                                                                                               // 461
				ts: -1                                                                                                             // 461
			},                                                                                                                  // 461
			skip: offset,                                                                                                       // 462
			limit: count,                                                                                                       // 463
			fields: fields                                                                                                      // 464
		}).fetch();                                                                                                          // 460
		return RocketChat.API.v1.success({                                                                                   // 467
			messages: messages,                                                                                                 // 468
			count: messages.length,                                                                                             // 469
			offset: offset,                                                                                                     // 470
			total: RocketChat.models.Messages.find(ourQuery).count()                                                            // 471
		});                                                                                                                  // 467
	}                                                                                                                     // 473
});                                                                                                                    // 445
RocketChat.API.v1.addRoute('channels.online', {                                                                        // 476
	authRequired: true                                                                                                    // 476
}, {                                                                                                                   // 476
	get: function () {                                                                                                    // 477
		var _parseJsonQuery7 = this.parseJsonQuery(),                                                                        // 477
		    query = _parseJsonQuery7.query;                                                                                  // 477
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 479
			t: 'c'                                                                                                              // 479
		});                                                                                                                  // 479
		var room = RocketChat.models.Rooms.findOne(ourQuery);                                                                // 481
                                                                                                                       //
		if (room == null) {                                                                                                  // 483
			return RocketChat.API.v1.failure('Channel does not exists');                                                        // 484
		}                                                                                                                    // 485
                                                                                                                       //
		var online = RocketChat.models.Users.findUsersNotOffline({                                                           // 487
			fields: {                                                                                                           // 488
				username: 1                                                                                                        // 489
			}                                                                                                                   // 488
		}).fetch();                                                                                                          // 487
		var onlineInRoom = [];                                                                                               // 493
		online.forEach(function (user) {                                                                                     // 494
			if (room.usernames.indexOf(user.username) !== -1) {                                                                 // 495
				onlineInRoom.push({                                                                                                // 496
					_id: user._id,                                                                                                    // 497
					username: user.username                                                                                           // 498
				});                                                                                                                // 496
			}                                                                                                                   // 500
		});                                                                                                                  // 501
		return RocketChat.API.v1.success({                                                                                   // 503
			online: onlineInRoom                                                                                                // 504
		});                                                                                                                  // 503
	}                                                                                                                     // 506
});                                                                                                                    // 476
RocketChat.API.v1.addRoute('channels.open', {                                                                          // 509
	authRequired: true                                                                                                    // 509
}, {                                                                                                                   // 509
	post: function () {                                                                                                   // 510
		var findResult = findChannelByIdOrName({                                                                             // 511
			params: this.requestParams(),                                                                                       // 511
			checkedArchived: false                                                                                              // 511
		});                                                                                                                  // 511
		var sub = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(findResult._id, this.userId);                     // 513
                                                                                                                       //
		if (!sub) {                                                                                                          // 515
			return RocketChat.API.v1.failure("The user/callee is not in the channel \"" + findResult.name + "\".");             // 516
		}                                                                                                                    // 517
                                                                                                                       //
		if (sub.open) {                                                                                                      // 519
			return RocketChat.API.v1.failure("The channel, " + findResult.name + ", is already open to the sender");            // 520
		}                                                                                                                    // 521
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 523
			Meteor.call('openRoom', findResult._id);                                                                            // 524
		});                                                                                                                  // 525
		return RocketChat.API.v1.success();                                                                                  // 527
	}                                                                                                                     // 528
});                                                                                                                    // 509
RocketChat.API.v1.addRoute('channels.removeModerator', {                                                               // 531
	authRequired: true                                                                                                    // 531
}, {                                                                                                                   // 531
	post: function () {                                                                                                   // 532
		var findResult = findChannelByIdOrName({                                                                             // 533
			params: this.requestParams()                                                                                        // 533
		});                                                                                                                  // 533
		var user = this.getUserFromParams();                                                                                 // 535
		Meteor.runAsUser(this.userId, function () {                                                                          // 537
			Meteor.call('removeRoomModerator', findResult._id, user._id);                                                       // 538
		});                                                                                                                  // 539
		return RocketChat.API.v1.success();                                                                                  // 541
	}                                                                                                                     // 542
});                                                                                                                    // 531
RocketChat.API.v1.addRoute('channels.removeOwner', {                                                                   // 545
	authRequired: true                                                                                                    // 545
}, {                                                                                                                   // 545
	post: function () {                                                                                                   // 546
		var findResult = findChannelByIdOrName({                                                                             // 547
			params: this.requestParams()                                                                                        // 547
		});                                                                                                                  // 547
		var user = this.getUserFromParams();                                                                                 // 549
		Meteor.runAsUser(this.userId, function () {                                                                          // 551
			Meteor.call('removeRoomOwner', findResult._id, user._id);                                                           // 552
		});                                                                                                                  // 553
		return RocketChat.API.v1.success();                                                                                  // 555
	}                                                                                                                     // 556
});                                                                                                                    // 545
RocketChat.API.v1.addRoute('channels.rename', {                                                                        // 559
	authRequired: true                                                                                                    // 559
}, {                                                                                                                   // 559
	post: function () {                                                                                                   // 560
		var _this5 = this;                                                                                                   // 560
                                                                                                                       //
		if (!this.bodyParams.name || !this.bodyParams.name.trim()) {                                                         // 561
			return RocketChat.API.v1.failure('The bodyParam "name" is required');                                               // 562
		}                                                                                                                    // 563
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 565
			params: {                                                                                                           // 565
				roomId: this.bodyParams.roomId                                                                                     // 565
			}                                                                                                                   // 565
		});                                                                                                                  // 565
                                                                                                                       //
		if (findResult.name === this.bodyParams.name) {                                                                      // 567
			return RocketChat.API.v1.failure('The channel name is the same as what it would be renamed to.');                   // 568
		}                                                                                                                    // 569
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 571
			Meteor.call('saveRoomSettings', findResult._id, 'roomName', _this5.bodyParams.name);                                // 572
		});                                                                                                                  // 573
		return RocketChat.API.v1.success({                                                                                   // 575
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 576
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 576
			})                                                                                                                  // 576
		});                                                                                                                  // 575
	}                                                                                                                     // 578
});                                                                                                                    // 559
RocketChat.API.v1.addRoute('channels.setDescription', {                                                                // 581
	authRequired: true                                                                                                    // 581
}, {                                                                                                                   // 581
	post: function () {                                                                                                   // 582
		var _this6 = this;                                                                                                   // 582
                                                                                                                       //
		if (!this.bodyParams.description || !this.bodyParams.description.trim()) {                                           // 583
			return RocketChat.API.v1.failure('The bodyParam "description" is required');                                        // 584
		}                                                                                                                    // 585
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 587
			params: this.requestParams()                                                                                        // 587
		});                                                                                                                  // 587
                                                                                                                       //
		if (findResult.description === this.bodyParams.description) {                                                        // 589
			return RocketChat.API.v1.failure('The channel description is the same as what it would be changed to.');            // 590
		}                                                                                                                    // 591
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 593
			Meteor.call('saveRoomSettings', findResult._id, 'roomDescription', _this6.bodyParams.description);                  // 594
		});                                                                                                                  // 595
		return RocketChat.API.v1.success({                                                                                   // 597
			description: this.bodyParams.description                                                                            // 598
		});                                                                                                                  // 597
	}                                                                                                                     // 600
});                                                                                                                    // 581
RocketChat.API.v1.addRoute('channels.setJoinCode', {                                                                   // 603
	authRequired: true                                                                                                    // 603
}, {                                                                                                                   // 603
	post: function () {                                                                                                   // 604
		var _this7 = this;                                                                                                   // 604
                                                                                                                       //
		if (!this.bodyParams.joinCode || !this.bodyParams.joinCode.trim()) {                                                 // 605
			return RocketChat.API.v1.failure('The bodyParam "joinCode" is required');                                           // 606
		}                                                                                                                    // 607
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 609
			params: this.requestParams()                                                                                        // 609
		});                                                                                                                  // 609
		Meteor.runAsUser(this.userId, function () {                                                                          // 611
			Meteor.call('saveRoomSettings', findResult._id, 'joinCode', _this7.bodyParams.joinCode);                            // 612
		});                                                                                                                  // 613
		return RocketChat.API.v1.success({                                                                                   // 615
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 616
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 616
			})                                                                                                                  // 616
		});                                                                                                                  // 615
	}                                                                                                                     // 618
});                                                                                                                    // 603
RocketChat.API.v1.addRoute('channels.setPurpose', {                                                                    // 621
	authRequired: true                                                                                                    // 621
}, {                                                                                                                   // 621
	post: function () {                                                                                                   // 622
		var _this8 = this;                                                                                                   // 622
                                                                                                                       //
		if (!this.bodyParams.purpose || !this.bodyParams.purpose.trim()) {                                                   // 623
			return RocketChat.API.v1.failure('The bodyParam "purpose" is required');                                            // 624
		}                                                                                                                    // 625
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 627
			params: this.requestParams()                                                                                        // 627
		});                                                                                                                  // 627
                                                                                                                       //
		if (findResult.description === this.bodyParams.purpose) {                                                            // 629
			return RocketChat.API.v1.failure('The channel purpose (description) is the same as what it would be changed to.');  // 630
		}                                                                                                                    // 631
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 633
			Meteor.call('saveRoomSettings', findResult._id, 'roomDescription', _this8.bodyParams.purpose);                      // 634
		});                                                                                                                  // 635
		return RocketChat.API.v1.success({                                                                                   // 637
			purpose: this.bodyParams.purpose                                                                                    // 638
		});                                                                                                                  // 637
	}                                                                                                                     // 640
});                                                                                                                    // 621
RocketChat.API.v1.addRoute('channels.setReadOnly', {                                                                   // 643
	authRequired: true                                                                                                    // 643
}, {                                                                                                                   // 643
	post: function () {                                                                                                   // 644
		var _this9 = this;                                                                                                   // 644
                                                                                                                       //
		if (typeof this.bodyParams.readOnly === 'undefined') {                                                               // 645
			return RocketChat.API.v1.failure('The bodyParam "readOnly" is required');                                           // 646
		}                                                                                                                    // 647
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 649
			params: this.requestParams()                                                                                        // 649
		});                                                                                                                  // 649
                                                                                                                       //
		if (findResult.ro === this.bodyParams.readOnly) {                                                                    // 651
			return RocketChat.API.v1.failure('The channel read only setting is the same as what it would be changed to.');      // 652
		}                                                                                                                    // 653
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 655
			Meteor.call('saveRoomSettings', findResult._id, 'readOnly', _this9.bodyParams.readOnly);                            // 656
		});                                                                                                                  // 657
		return RocketChat.API.v1.success({                                                                                   // 659
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 660
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 660
			})                                                                                                                  // 660
		});                                                                                                                  // 659
	}                                                                                                                     // 662
});                                                                                                                    // 643
RocketChat.API.v1.addRoute('channels.setTopic', {                                                                      // 665
	authRequired: true                                                                                                    // 665
}, {                                                                                                                   // 665
	post: function () {                                                                                                   // 666
		var _this10 = this;                                                                                                  // 666
                                                                                                                       //
		if (!this.bodyParams.topic || !this.bodyParams.topic.trim()) {                                                       // 667
			return RocketChat.API.v1.failure('The bodyParam "topic" is required');                                              // 668
		}                                                                                                                    // 669
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 671
			params: this.requestParams()                                                                                        // 671
		});                                                                                                                  // 671
                                                                                                                       //
		if (findResult.topic === this.bodyParams.topic) {                                                                    // 673
			return RocketChat.API.v1.failure('The channel topic is the same as what it would be changed to.');                  // 674
		}                                                                                                                    // 675
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 677
			Meteor.call('saveRoomSettings', findResult._id, 'roomTopic', _this10.bodyParams.topic);                             // 678
		});                                                                                                                  // 679
		return RocketChat.API.v1.success({                                                                                   // 681
			topic: this.bodyParams.topic                                                                                        // 682
		});                                                                                                                  // 681
	}                                                                                                                     // 684
});                                                                                                                    // 665
RocketChat.API.v1.addRoute('channels.setType', {                                                                       // 687
	authRequired: true                                                                                                    // 687
}, {                                                                                                                   // 687
	post: function () {                                                                                                   // 688
		var _this11 = this;                                                                                                  // 688
                                                                                                                       //
		if (!this.bodyParams.type || !this.bodyParams.type.trim()) {                                                         // 689
			return RocketChat.API.v1.failure('The bodyParam "type" is required');                                               // 690
		}                                                                                                                    // 691
                                                                                                                       //
		var findResult = findChannelByIdOrName({                                                                             // 693
			params: this.requestParams()                                                                                        // 693
		});                                                                                                                  // 693
                                                                                                                       //
		if (findResult.t === this.bodyParams.type) {                                                                         // 695
			return RocketChat.API.v1.failure('The channel type is the same as what it would be changed to.');                   // 696
		}                                                                                                                    // 697
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 699
			Meteor.call('saveRoomSettings', findResult._id, 'roomType', _this11.bodyParams.type);                               // 700
		});                                                                                                                  // 701
		return RocketChat.API.v1.success({                                                                                   // 703
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                      // 704
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 704
			})                                                                                                                  // 704
		});                                                                                                                  // 703
	}                                                                                                                     // 706
});                                                                                                                    // 687
RocketChat.API.v1.addRoute('channels.unarchive', {                                                                     // 709
	authRequired: true                                                                                                    // 709
}, {                                                                                                                   // 709
	post: function () {                                                                                                   // 710
		var findResult = findChannelByIdOrName({                                                                             // 711
			params: this.requestParams(),                                                                                       // 711
			checkedArchived: false                                                                                              // 711
		});                                                                                                                  // 711
                                                                                                                       //
		if (!findResult.archived) {                                                                                          // 713
			return RocketChat.API.v1.failure("The channel, " + findResult.name + ", is not archived");                          // 714
		}                                                                                                                    // 715
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 717
			Meteor.call('unarchiveRoom', findResult._id);                                                                       // 718
		});                                                                                                                  // 719
		return RocketChat.API.v1.success();                                                                                  // 721
	}                                                                                                                     // 722
});                                                                                                                    // 709
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chat.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/chat.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global processWebhookMessage */RocketChat.API.v1.addRoute('chat.delete', {                                          // 1
	authRequired: true                                                                                                    // 2
}, {                                                                                                                   // 2
	post: function () {                                                                                                   // 3
		check(this.bodyParams, Match.ObjectIncluding({                                                                       // 4
			msgId: String,                                                                                                      // 5
			roomId: String,                                                                                                     // 6
			asUser: Match.Maybe(Boolean)                                                                                        // 7
		}));                                                                                                                 // 4
		var msg = RocketChat.models.Messages.findOneById(this.bodyParams.msgId, {                                            // 10
			fields: {                                                                                                           // 10
				u: 1,                                                                                                              // 10
				rid: 1                                                                                                             // 10
			}                                                                                                                   // 10
		});                                                                                                                  // 10
                                                                                                                       //
		if (!msg) {                                                                                                          // 12
			return RocketChat.API.v1.failure("No message found with the id of \"" + this.bodyParams.msgId + "\".");             // 13
		}                                                                                                                    // 14
                                                                                                                       //
		if (this.bodyParams.roomId !== msg.rid) {                                                                            // 16
			return RocketChat.API.v1.failure('The room id provided does not match where the message is from.');                 // 17
		}                                                                                                                    // 18
                                                                                                                       //
		Meteor.runAsUser(this.bodyParams.asUser ? msg.u._id : this.userId, function () {                                     // 20
			Meteor.call('deleteMessage', {                                                                                      // 21
				_id: msg._id                                                                                                       // 21
			});                                                                                                                 // 21
		});                                                                                                                  // 22
		return RocketChat.API.v1.success({                                                                                   // 24
			_id: msg._id,                                                                                                       // 25
			ts: Date.now()                                                                                                      // 26
		});                                                                                                                  // 24
	}                                                                                                                     // 28
});                                                                                                                    // 2
RocketChat.API.v1.addRoute('chat.getMessage', {                                                                        // 31
	authRequired: true                                                                                                    // 31
}, {                                                                                                                   // 31
	get: function () {                                                                                                    // 32
		var _this = this;                                                                                                    // 32
                                                                                                                       //
		if (!this.queryParams.msgId) {                                                                                       // 33
			return RocketChat.API.v1.failure('The "msgId" query parameter must be provided.');                                  // 34
		}                                                                                                                    // 35
                                                                                                                       //
		var msg = void 0;                                                                                                    // 38
		Meteor.runAsUser(this.userId, function () {                                                                          // 39
			msg = Meteor.call('getSingleMessage', _this.queryParams.msgId);                                                     // 40
		});                                                                                                                  // 41
                                                                                                                       //
		if (!msg) {                                                                                                          // 43
			return RocketChat.API.v1.failure();                                                                                 // 44
		}                                                                                                                    // 45
                                                                                                                       //
		return RocketChat.API.v1.success({                                                                                   // 47
			message: msg                                                                                                        // 48
		});                                                                                                                  // 47
	}                                                                                                                     // 50
});                                                                                                                    // 31
RocketChat.API.v1.addRoute('chat.pinMessage', {                                                                        // 53
	authRequired: true                                                                                                    // 53
}, {                                                                                                                   // 53
	post: function () {                                                                                                   // 54
		if (!this.bodyParams.messageId || !this.bodyParams.messageId.trim()) {                                               // 55
			throw new Meteor.Error('error-messageid-param-not-provided', 'The required "messageId" param is required.');        // 56
		}                                                                                                                    // 57
                                                                                                                       //
		var msg = RocketChat.models.Messages.findOneById(this.bodyParams.messageId);                                         // 59
                                                                                                                       //
		if (!msg) {                                                                                                          // 61
			throw new Meteor.Error('error-message-not-found', 'The provided "messageId" does not match any existing message.');
		}                                                                                                                    // 63
                                                                                                                       //
		var pinnedMessage = void 0;                                                                                          // 65
		Meteor.runAsUser(this.userId, function () {                                                                          // 66
			return pinnedMessage = Meteor.call('pinMessage', msg);                                                              // 66
		});                                                                                                                  // 66
		return RocketChat.API.v1.success({                                                                                   // 68
			message: pinnedMessage                                                                                              // 69
		});                                                                                                                  // 68
	}                                                                                                                     // 71
});                                                                                                                    // 53
RocketChat.API.v1.addRoute('chat.postMessage', {                                                                       // 74
	authRequired: true                                                                                                    // 74
}, {                                                                                                                   // 74
	post: function () {                                                                                                   // 75
		var messageReturn = processWebhookMessage(this.bodyParams, this.user, undefined, true)[0];                           // 76
                                                                                                                       //
		if (!messageReturn) {                                                                                                // 78
			return RocketChat.API.v1.failure('unknown-error');                                                                  // 79
		}                                                                                                                    // 80
                                                                                                                       //
		return RocketChat.API.v1.success({                                                                                   // 82
			ts: Date.now(),                                                                                                     // 83
			channel: messageReturn.channel,                                                                                     // 84
			message: messageReturn.message                                                                                      // 85
		});                                                                                                                  // 82
	}                                                                                                                     // 87
});                                                                                                                    // 74
RocketChat.API.v1.addRoute('chat.starMessage', {                                                                       // 90
	authRequired: true                                                                                                    // 90
}, {                                                                                                                   // 90
	post: function () {                                                                                                   // 91
		if (!this.bodyParams.messageId || !this.bodyParams.messageId.trim()) {                                               // 92
			throw new Meteor.Error('error-messageid-param-not-provided', 'The required "messageId" param is required.');        // 93
		}                                                                                                                    // 94
                                                                                                                       //
		var msg = RocketChat.models.Messages.findOneById(this.bodyParams.messageId);                                         // 96
                                                                                                                       //
		if (!msg) {                                                                                                          // 98
			throw new Meteor.Error('error-message-not-found', 'The provided "messageId" does not match any existing message.');
		}                                                                                                                    // 100
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 102
			return Meteor.call('starMessage', {                                                                                 // 102
				_id: msg._id,                                                                                                      // 103
				rid: msg.rid,                                                                                                      // 104
				starred: true                                                                                                      // 105
			});                                                                                                                 // 102
		});                                                                                                                  // 102
		return RocketChat.API.v1.success();                                                                                  // 108
	}                                                                                                                     // 109
});                                                                                                                    // 90
RocketChat.API.v1.addRoute('chat.unPinMessage', {                                                                      // 112
	authRequired: true                                                                                                    // 112
}, {                                                                                                                   // 112
	post: function () {                                                                                                   // 113
		if (!this.bodyParams.messageId || !this.bodyParams.messageId.trim()) {                                               // 114
			throw new Meteor.Error('error-messageid-param-not-provided', 'The required "messageId" param is required.');        // 115
		}                                                                                                                    // 116
                                                                                                                       //
		var msg = RocketChat.models.Messages.findOneById(this.bodyParams.messageId);                                         // 118
                                                                                                                       //
		if (!msg) {                                                                                                          // 120
			throw new Meteor.Error('error-message-not-found', 'The provided "messageId" does not match any existing message.');
		}                                                                                                                    // 122
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 124
			return Meteor.call('unpinMessage', msg);                                                                            // 124
		});                                                                                                                  // 124
		return RocketChat.API.v1.success();                                                                                  // 126
	}                                                                                                                     // 127
});                                                                                                                    // 112
RocketChat.API.v1.addRoute('chat.unStarMessage', {                                                                     // 130
	authRequired: true                                                                                                    // 130
}, {                                                                                                                   // 130
	post: function () {                                                                                                   // 131
		if (!this.bodyParams.messageId || !this.bodyParams.messageId.trim()) {                                               // 132
			throw new Meteor.Error('error-messageid-param-not-provided', 'The required "messageId" param is required.');        // 133
		}                                                                                                                    // 134
                                                                                                                       //
		var msg = RocketChat.models.Messages.findOneById(this.bodyParams.messageId);                                         // 136
                                                                                                                       //
		if (!msg) {                                                                                                          // 138
			throw new Meteor.Error('error-message-not-found', 'The provided "messageId" does not match any existing message.');
		}                                                                                                                    // 140
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 142
			return Meteor.call('starMessage', {                                                                                 // 142
				_id: msg._id,                                                                                                      // 143
				rid: msg.rid,                                                                                                      // 144
				starred: false                                                                                                     // 145
			});                                                                                                                 // 142
		});                                                                                                                  // 142
		return RocketChat.API.v1.success();                                                                                  // 148
	}                                                                                                                     // 149
});                                                                                                                    // 130
RocketChat.API.v1.addRoute('chat.update', {                                                                            // 152
	authRequired: true                                                                                                    // 152
}, {                                                                                                                   // 152
	post: function () {                                                                                                   // 153
		var _this2 = this;                                                                                                   // 153
                                                                                                                       //
		check(this.bodyParams, Match.ObjectIncluding({                                                                       // 154
			roomId: String,                                                                                                     // 155
			msgId: String,                                                                                                      // 156
			text: String //Using text to be consistant with chat.postMessage                                                    // 157
                                                                                                                       //
		}));                                                                                                                 // 154
		var msg = RocketChat.models.Messages.findOneById(this.bodyParams.msgId); //Ensure the message exists                 // 160
                                                                                                                       //
		if (!msg) {                                                                                                          // 163
			return RocketChat.API.v1.failure("No message found with the id of \"" + this.bodyParams.msgId + "\".");             // 164
		}                                                                                                                    // 165
                                                                                                                       //
		if (this.bodyParams.roomId !== msg.rid) {                                                                            // 167
			return RocketChat.API.v1.failure('The room id provided does not match where the message is from.');                 // 168
		} //Permission checks are already done in the updateMessage method, so no need to duplicate them                     // 169
                                                                                                                       //
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 172
			Meteor.call('updateMessage', {                                                                                      // 173
				_id: msg._id,                                                                                                      // 173
				msg: _this2.bodyParams.text,                                                                                       // 173
				rid: msg.rid                                                                                                       // 173
			});                                                                                                                 // 173
		});                                                                                                                  // 175
		return RocketChat.API.v1.success({                                                                                   // 177
			message: RocketChat.models.Messages.findOneById(msg._id)                                                            // 178
		});                                                                                                                  // 177
	}                                                                                                                     // 180
});                                                                                                                    // 152
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"groups.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/groups.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                                //
                                                                                                                       //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
//Returns the private group subscription IF found otherwise it will return the failure of why it didn't. Check the `statusCode` property
function findPrivateGroupByIdOrName(_ref) {                                                                            // 2
	var params = _ref.params,                                                                                             // 2
	    userId = _ref.userId,                                                                                             // 2
	    _ref$checkedArchived = _ref.checkedArchived,                                                                      // 2
	    checkedArchived = _ref$checkedArchived === undefined ? true : _ref$checkedArchived;                               // 2
                                                                                                                       //
	if ((!params.roomId || !params.roomId.trim()) && (!params.roomName || !params.roomName.trim())) {                     // 3
		throw new Meteor.Error('error-room-param-not-provided', 'The parameter "roomId" or "roomName" is required');         // 4
	}                                                                                                                     // 5
                                                                                                                       //
	var roomSub = void 0;                                                                                                 // 7
                                                                                                                       //
	if (params.roomId) {                                                                                                  // 8
		roomSub = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(params.roomId, userId);                           // 9
	} else if (params.roomName) {                                                                                         // 10
		roomSub = RocketChat.models.Subscriptions.findOneByRoomNameAndUserId(params.roomName, userId);                       // 11
	}                                                                                                                     // 12
                                                                                                                       //
	if (!roomSub || roomSub.t !== 'p') {                                                                                  // 14
		throw new Meteor.Error('error-room-not-found', 'The required "roomId" or "roomName" param provided does not match any group');
	}                                                                                                                     // 16
                                                                                                                       //
	if (checkedArchived && roomSub.archived) {                                                                            // 18
		throw new Meteor.Error('error-room-archived', "The private group, " + roomSub.name + ", is archived");               // 19
	}                                                                                                                     // 20
                                                                                                                       //
	return roomSub;                                                                                                       // 22
}                                                                                                                      // 23
                                                                                                                       //
RocketChat.API.v1.addRoute('groups.addAll', {                                                                          // 25
	authRequired: true                                                                                                    // 25
}, {                                                                                                                   // 25
	post: function () {                                                                                                   // 26
		var _this = this;                                                                                                    // 26
                                                                                                                       //
		var findResult = findPrivateGroupByIdOrName({                                                                        // 27
			params: this.requestParams(),                                                                                       // 27
			userId: this.userId                                                                                                 // 27
		});                                                                                                                  // 27
		Meteor.runAsUser(this.userId, function () {                                                                          // 29
			Meteor.call('addAllUserToRoom', findResult.rid, _this.bodyParams.activeUsersOnly);                                  // 30
		});                                                                                                                  // 31
		return RocketChat.API.v1.success({                                                                                   // 33
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                        // 34
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 34
			})                                                                                                                  // 34
		});                                                                                                                  // 33
	}                                                                                                                     // 36
});                                                                                                                    // 25
RocketChat.API.v1.addRoute('groups.addModerator', {                                                                    // 39
	authRequired: true                                                                                                    // 39
}, {                                                                                                                   // 39
	post: function () {                                                                                                   // 40
		var findResult = findPrivateGroupByIdOrName({                                                                        // 41
			params: this.requestParams(),                                                                                       // 41
			userId: this.userId                                                                                                 // 41
		});                                                                                                                  // 41
		var user = this.getUserFromParams();                                                                                 // 43
		Meteor.runAsUser(this.userId, function () {                                                                          // 45
			Meteor.call('addRoomModerator', findResult.rid, user._id);                                                          // 46
		});                                                                                                                  // 47
		return RocketChat.API.v1.success();                                                                                  // 49
	}                                                                                                                     // 50
});                                                                                                                    // 39
RocketChat.API.v1.addRoute('groups.addOwner', {                                                                        // 53
	authRequired: true                                                                                                    // 53
}, {                                                                                                                   // 53
	post: function () {                                                                                                   // 54
		var findResult = findPrivateGroupByIdOrName({                                                                        // 55
			params: this.requestParams(),                                                                                       // 55
			userId: this.userId                                                                                                 // 55
		});                                                                                                                  // 55
		var user = this.getUserFromParams();                                                                                 // 57
		Meteor.runAsUser(this.userId, function () {                                                                          // 59
			Meteor.call('addRoomOwner', findResult.rid, user._id);                                                              // 60
		});                                                                                                                  // 61
		return RocketChat.API.v1.success();                                                                                  // 63
	}                                                                                                                     // 64
});                                                                                                                    // 53
RocketChat.API.v1.addRoute('groups.addLeader', {                                                                       // 67
	authRequired: true                                                                                                    // 67
}, {                                                                                                                   // 67
	post: function () {                                                                                                   // 68
		var findResult = findPrivateGroupByIdOrName({                                                                        // 69
			params: this.requestParams(),                                                                                       // 69
			userId: this.userId                                                                                                 // 69
		});                                                                                                                  // 69
		var user = this.getUserFromParams();                                                                                 // 70
		Meteor.runAsUser(this.userId, function () {                                                                          // 71
			Meteor.call('addRoomLeader', findResult.rid, user._id);                                                             // 72
		});                                                                                                                  // 73
		return RocketChat.API.v1.success();                                                                                  // 75
	}                                                                                                                     // 76
}); //Archives a private group only if it wasn't                                                                       // 67
                                                                                                                       //
RocketChat.API.v1.addRoute('groups.archive', {                                                                         // 80
	authRequired: true                                                                                                    // 80
}, {                                                                                                                   // 80
	post: function () {                                                                                                   // 81
		var findResult = findPrivateGroupByIdOrName({                                                                        // 82
			params: this.requestParams(),                                                                                       // 82
			userId: this.userId                                                                                                 // 82
		});                                                                                                                  // 82
		Meteor.runAsUser(this.userId, function () {                                                                          // 84
			Meteor.call('archiveRoom', findResult.rid);                                                                         // 85
		});                                                                                                                  // 86
		return RocketChat.API.v1.success();                                                                                  // 88
	}                                                                                                                     // 89
});                                                                                                                    // 80
RocketChat.API.v1.addRoute('groups.close', {                                                                           // 92
	authRequired: true                                                                                                    // 92
}, {                                                                                                                   // 92
	post: function () {                                                                                                   // 93
		var findResult = findPrivateGroupByIdOrName({                                                                        // 94
			params: this.requestParams(),                                                                                       // 94
			userId: this.userId,                                                                                                // 94
			checkedArchived: false                                                                                              // 94
		});                                                                                                                  // 94
                                                                                                                       //
		if (!findResult.open) {                                                                                              // 96
			return RocketChat.API.v1.failure("The private group, " + findResult.name + ", is already closed to the sender");    // 97
		}                                                                                                                    // 98
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 100
			Meteor.call('hideRoom', findResult.rid);                                                                            // 101
		});                                                                                                                  // 102
		return RocketChat.API.v1.success();                                                                                  // 104
	}                                                                                                                     // 105
}); //Create Private Group                                                                                             // 92
                                                                                                                       //
RocketChat.API.v1.addRoute('groups.create', {                                                                          // 109
	authRequired: true                                                                                                    // 109
}, {                                                                                                                   // 109
	post: function () {                                                                                                   // 110
		var _this2 = this;                                                                                                   // 110
                                                                                                                       //
		if (!RocketChat.authz.hasPermission(this.userId, 'create-p')) {                                                      // 111
			return RocketChat.API.v1.unauthorized();                                                                            // 112
		}                                                                                                                    // 113
                                                                                                                       //
		if (!this.bodyParams.name) {                                                                                         // 115
			return RocketChat.API.v1.failure('Body param "name" is required');                                                  // 116
		}                                                                                                                    // 117
                                                                                                                       //
		if (this.bodyParams.members && !_.isArray(this.bodyParams.members)) {                                                // 119
			return RocketChat.API.v1.failure('Body param "members" must be an array if provided');                              // 120
		}                                                                                                                    // 121
                                                                                                                       //
		if (this.bodyParams.customFields && !((0, _typeof3.default)(this.bodyParams.customFields) === 'object')) {           // 123
			return RocketChat.API.v1.failure('Body param "customFields" must be an object if provided');                        // 124
		}                                                                                                                    // 125
                                                                                                                       //
		var readOnly = false;                                                                                                // 127
                                                                                                                       //
		if (typeof this.bodyParams.readOnly !== 'undefined') {                                                               // 128
			readOnly = this.bodyParams.readOnly;                                                                                // 129
		}                                                                                                                    // 130
                                                                                                                       //
		var id = void 0;                                                                                                     // 132
		Meteor.runAsUser(this.userId, function () {                                                                          // 133
			id = Meteor.call('createPrivateGroup', _this2.bodyParams.name, _this2.bodyParams.members ? _this2.bodyParams.members : [], readOnly, _this2.bodyParams.customFields);
		});                                                                                                                  // 135
		return RocketChat.API.v1.success({                                                                                   // 137
			group: RocketChat.models.Rooms.findOneById(id.rid, {                                                                // 138
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 138
			})                                                                                                                  // 138
		});                                                                                                                  // 137
	}                                                                                                                     // 140
});                                                                                                                    // 109
RocketChat.API.v1.addRoute('groups.delete', {                                                                          // 143
	authRequired: true                                                                                                    // 143
}, {                                                                                                                   // 143
	post: function () {                                                                                                   // 144
		var findResult = findPrivateGroupByIdOrName({                                                                        // 145
			params: this.requestParams(),                                                                                       // 145
			userId: this.userId,                                                                                                // 145
			checkedArchived: false                                                                                              // 145
		});                                                                                                                  // 145
		Meteor.runAsUser(this.userId, function () {                                                                          // 147
			Meteor.call('eraseRoom', findResult.rid);                                                                           // 148
		});                                                                                                                  // 149
		return RocketChat.API.v1.success({                                                                                   // 151
			group: RocketChat.models.Rooms.processQueryOptionsOnResult([findResult._room], {                                    // 152
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 152
			})[0]                                                                                                               // 152
		});                                                                                                                  // 151
	}                                                                                                                     // 154
});                                                                                                                    // 143
RocketChat.API.v1.addRoute('groups.files', {                                                                           // 157
	authRequired: true                                                                                                    // 157
}, {                                                                                                                   // 157
	get: function () {                                                                                                    // 158
		var findResult = findPrivateGroupByIdOrName({                                                                        // 159
			params: this.requestParams(),                                                                                       // 159
			userId: this.userId,                                                                                                // 159
			checkedArchived: false                                                                                              // 159
		});                                                                                                                  // 159
                                                                                                                       //
		var _getPaginationItems = this.getPaginationItems(),                                                                 // 158
		    offset = _getPaginationItems.offset,                                                                             // 158
		    count = _getPaginationItems.count;                                                                               // 158
                                                                                                                       //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                         // 158
		    sort = _parseJsonQuery.sort,                                                                                     // 158
		    fields = _parseJsonQuery.fields,                                                                                 // 158
		    query = _parseJsonQuery.query;                                                                                   // 158
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 164
			rid: findResult.rid                                                                                                 // 164
		});                                                                                                                  // 164
		var files = RocketChat.models.Uploads.find(ourQuery, {                                                               // 166
			sort: sort ? sort : {                                                                                               // 167
				name: 1                                                                                                            // 167
			},                                                                                                                  // 167
			skip: offset,                                                                                                       // 168
			limit: count,                                                                                                       // 169
			fields: fields                                                                                                      // 170
		}).fetch();                                                                                                          // 166
		return RocketChat.API.v1.success({                                                                                   // 173
			files: files,                                                                                                       // 174
			count: files.length,                                                                                                // 175
			offset: offset,                                                                                                     // 176
			total: RocketChat.models.Uploads.find(ourQuery).count()                                                             // 177
		});                                                                                                                  // 173
	}                                                                                                                     // 179
});                                                                                                                    // 157
RocketChat.API.v1.addRoute('groups.getIntegrations', {                                                                 // 182
	authRequired: true                                                                                                    // 182
}, {                                                                                                                   // 182
	get: function () {                                                                                                    // 183
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                           // 184
			return RocketChat.API.v1.unauthorized();                                                                            // 185
		}                                                                                                                    // 186
                                                                                                                       //
		var findResult = findPrivateGroupByIdOrName({                                                                        // 188
			params: this.requestParams(),                                                                                       // 188
			userId: this.userId,                                                                                                // 188
			checkedArchived: false                                                                                              // 188
		});                                                                                                                  // 188
		var includeAllPrivateGroups = true;                                                                                  // 190
                                                                                                                       //
		if (typeof this.queryParams.includeAllPrivateGroups !== 'undefined') {                                               // 191
			includeAllPrivateGroups = this.queryParams.includeAllPrivateGroups === 'true';                                      // 192
		}                                                                                                                    // 193
                                                                                                                       //
		var channelsToSearch = ["#" + findResult.name];                                                                      // 195
                                                                                                                       //
		if (includeAllPrivateGroups) {                                                                                       // 196
			channelsToSearch.push('all_private_groups');                                                                        // 197
		}                                                                                                                    // 198
                                                                                                                       //
		var _getPaginationItems2 = this.getPaginationItems(),                                                                // 183
		    offset = _getPaginationItems2.offset,                                                                            // 183
		    count = _getPaginationItems2.count;                                                                              // 183
                                                                                                                       //
		var _parseJsonQuery2 = this.parseJsonQuery(),                                                                        // 183
		    sort = _parseJsonQuery2.sort,                                                                                    // 183
		    fields = _parseJsonQuery2.fields,                                                                                // 183
		    query = _parseJsonQuery2.query;                                                                                  // 183
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 203
			channel: {                                                                                                          // 203
				$in: channelsToSearch                                                                                              // 203
			}                                                                                                                   // 203
		});                                                                                                                  // 203
		var integrations = RocketChat.models.Integrations.find(ourQuery, {                                                   // 204
			sort: sort ? sort : {                                                                                               // 205
				_createdAt: 1                                                                                                      // 205
			},                                                                                                                  // 205
			skip: offset,                                                                                                       // 206
			limit: count,                                                                                                       // 207
			fields: fields                                                                                                      // 208
		}).fetch();                                                                                                          // 204
		return RocketChat.API.v1.success({                                                                                   // 211
			integrations: integrations,                                                                                         // 212
			count: integrations.length,                                                                                         // 213
			offset: offset,                                                                                                     // 214
			total: RocketChat.models.Integrations.find(ourQuery).count()                                                        // 215
		});                                                                                                                  // 211
	}                                                                                                                     // 217
});                                                                                                                    // 182
RocketChat.API.v1.addRoute('groups.history', {                                                                         // 220
	authRequired: true                                                                                                    // 220
}, {                                                                                                                   // 220
	get: function () {                                                                                                    // 221
		var findResult = findPrivateGroupByIdOrName({                                                                        // 222
			params: this.requestParams(),                                                                                       // 222
			userId: this.userId,                                                                                                // 222
			checkedArchived: false                                                                                              // 222
		});                                                                                                                  // 222
		var latestDate = new Date();                                                                                         // 224
                                                                                                                       //
		if (this.queryParams.latest) {                                                                                       // 225
			latestDate = new Date(this.queryParams.latest);                                                                     // 226
		}                                                                                                                    // 227
                                                                                                                       //
		var oldestDate = undefined;                                                                                          // 229
                                                                                                                       //
		if (this.queryParams.oldest) {                                                                                       // 230
			oldestDate = new Date(this.queryParams.oldest);                                                                     // 231
		}                                                                                                                    // 232
                                                                                                                       //
		var inclusive = false;                                                                                               // 234
                                                                                                                       //
		if (this.queryParams.inclusive) {                                                                                    // 235
			inclusive = this.queryParams.inclusive;                                                                             // 236
		}                                                                                                                    // 237
                                                                                                                       //
		var count = 20;                                                                                                      // 239
                                                                                                                       //
		if (this.queryParams.count) {                                                                                        // 240
			count = parseInt(this.queryParams.count);                                                                           // 241
		}                                                                                                                    // 242
                                                                                                                       //
		var unreads = false;                                                                                                 // 244
                                                                                                                       //
		if (this.queryParams.unreads) {                                                                                      // 245
			unreads = this.queryParams.unreads;                                                                                 // 246
		}                                                                                                                    // 247
                                                                                                                       //
		var result = void 0;                                                                                                 // 249
		Meteor.runAsUser(this.userId, function () {                                                                          // 250
			result = Meteor.call('getChannelHistory', {                                                                         // 251
				rid: findResult.rid,                                                                                               // 251
				latest: latestDate,                                                                                                // 251
				oldest: oldestDate,                                                                                                // 251
				inclusive: inclusive,                                                                                              // 251
				count: count,                                                                                                      // 251
				unreads: unreads                                                                                                   // 251
			});                                                                                                                 // 251
		});                                                                                                                  // 252
                                                                                                                       //
		if (!result) {                                                                                                       // 254
			return RocketChat.API.v1.unauthorized();                                                                            // 255
		}                                                                                                                    // 256
                                                                                                                       //
		return RocketChat.API.v1.success(result);                                                                            // 258
	}                                                                                                                     // 259
});                                                                                                                    // 220
RocketChat.API.v1.addRoute('groups.info', {                                                                            // 262
	authRequired: true                                                                                                    // 262
}, {                                                                                                                   // 262
	get: function () {                                                                                                    // 263
		var findResult = findPrivateGroupByIdOrName({                                                                        // 264
			params: this.requestParams(),                                                                                       // 264
			userId: this.userId,                                                                                                // 264
			checkedArchived: false                                                                                              // 264
		});                                                                                                                  // 264
		return RocketChat.API.v1.success({                                                                                   // 266
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                        // 267
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 267
			})                                                                                                                  // 267
		});                                                                                                                  // 266
	}                                                                                                                     // 269
});                                                                                                                    // 262
RocketChat.API.v1.addRoute('groups.invite', {                                                                          // 272
	authRequired: true                                                                                                    // 272
}, {                                                                                                                   // 272
	post: function () {                                                                                                   // 273
		var findResult = findPrivateGroupByIdOrName({                                                                        // 274
			params: this.requestParams(),                                                                                       // 274
			userId: this.userId                                                                                                 // 274
		});                                                                                                                  // 274
		var user = this.getUserFromParams();                                                                                 // 276
		Meteor.runAsUser(this.userId, function () {                                                                          // 278
			Meteor.call('addUserToRoom', {                                                                                      // 279
				rid: findResult.rid,                                                                                               // 279
				username: user.username                                                                                            // 279
			});                                                                                                                 // 279
		});                                                                                                                  // 280
		return RocketChat.API.v1.success({                                                                                   // 282
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                        // 283
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 283
			})                                                                                                                  // 283
		});                                                                                                                  // 282
	}                                                                                                                     // 285
});                                                                                                                    // 272
RocketChat.API.v1.addRoute('groups.kick', {                                                                            // 288
	authRequired: true                                                                                                    // 288
}, {                                                                                                                   // 288
	post: function () {                                                                                                   // 289
		var findResult = findPrivateGroupByIdOrName({                                                                        // 290
			params: this.requestParams(),                                                                                       // 290
			userId: this.userId                                                                                                 // 290
		});                                                                                                                  // 290
		var user = this.getUserFromParams();                                                                                 // 292
		Meteor.runAsUser(this.userId, function () {                                                                          // 294
			Meteor.call('removeUserFromRoom', {                                                                                 // 295
				rid: findResult.rid,                                                                                               // 295
				username: user.username                                                                                            // 295
			});                                                                                                                 // 295
		});                                                                                                                  // 296
		return RocketChat.API.v1.success();                                                                                  // 298
	}                                                                                                                     // 299
});                                                                                                                    // 288
RocketChat.API.v1.addRoute('groups.leave', {                                                                           // 302
	authRequired: true                                                                                                    // 302
}, {                                                                                                                   // 302
	post: function () {                                                                                                   // 303
		var findResult = findPrivateGroupByIdOrName({                                                                        // 304
			params: this.requestParams(),                                                                                       // 304
			userId: this.userId                                                                                                 // 304
		});                                                                                                                  // 304
		Meteor.runAsUser(this.userId, function () {                                                                          // 306
			Meteor.call('leaveRoom', findResult.rid);                                                                           // 307
		});                                                                                                                  // 308
		return RocketChat.API.v1.success();                                                                                  // 310
	}                                                                                                                     // 311
}); //List Private Groups a user has access to                                                                         // 302
                                                                                                                       //
RocketChat.API.v1.addRoute('groups.list', {                                                                            // 315
	authRequired: true                                                                                                    // 315
}, {                                                                                                                   // 315
	get: function () {                                                                                                    // 316
		var _getPaginationItems3 = this.getPaginationItems(),                                                                // 316
		    offset = _getPaginationItems3.offset,                                                                            // 316
		    count = _getPaginationItems3.count;                                                                              // 316
                                                                                                                       //
		var _parseJsonQuery3 = this.parseJsonQuery(),                                                                        // 316
		    sort = _parseJsonQuery3.sort,                                                                                    // 316
		    fields = _parseJsonQuery3.fields;                                                                                // 316
                                                                                                                       //
		var rooms = _.pluck(RocketChat.models.Subscriptions.findByTypeAndUserId('p', this.userId).fetch(), '_room');         // 319
                                                                                                                       //
		var totalCount = rooms.length;                                                                                       // 320
		rooms = RocketChat.models.Rooms.processQueryOptionsOnResult(rooms, {                                                 // 322
			sort: sort ? sort : {                                                                                               // 323
				name: 1                                                                                                            // 323
			},                                                                                                                  // 323
			skip: offset,                                                                                                       // 324
			limit: count,                                                                                                       // 325
			fields: fields                                                                                                      // 326
		});                                                                                                                  // 322
		return RocketChat.API.v1.success({                                                                                   // 329
			groups: rooms,                                                                                                      // 330
			offset: offset,                                                                                                     // 331
			count: rooms.length,                                                                                                // 332
			total: totalCount                                                                                                   // 333
		});                                                                                                                  // 329
	}                                                                                                                     // 335
});                                                                                                                    // 315
RocketChat.API.v1.addRoute('groups.listAll', {                                                                         // 339
	authRequired: true                                                                                                    // 339
}, {                                                                                                                   // 339
	get: function () {                                                                                                    // 340
		if (!RocketChat.authz.hasPermission(this.userId, 'view-room-administration')) {                                      // 341
			return RocketChat.API.v1.unauthorized();                                                                            // 342
		}                                                                                                                    // 343
                                                                                                                       //
		var _getPaginationItems4 = this.getPaginationItems(),                                                                // 340
		    offset = _getPaginationItems4.offset,                                                                            // 340
		    count = _getPaginationItems4.count;                                                                              // 340
                                                                                                                       //
		var _parseJsonQuery4 = this.parseJsonQuery(),                                                                        // 340
		    sort = _parseJsonQuery4.sort,                                                                                    // 340
		    fields = _parseJsonQuery4.fields;                                                                                // 340
                                                                                                                       //
		var rooms = RocketChat.models.Rooms.findByType('p').fetch();                                                         // 346
		var totalCount = rooms.length;                                                                                       // 347
		rooms = RocketChat.models.Rooms.processQueryOptionsOnResult(rooms, {                                                 // 349
			sort: sort ? sort : {                                                                                               // 350
				name: 1                                                                                                            // 350
			},                                                                                                                  // 350
			skip: offset,                                                                                                       // 351
			limit: count,                                                                                                       // 352
			fields: fields                                                                                                      // 353
		});                                                                                                                  // 349
		return RocketChat.API.v1.success({                                                                                   // 356
			groups: rooms,                                                                                                      // 357
			offset: offset,                                                                                                     // 358
			count: rooms.length,                                                                                                // 359
			total: totalCount                                                                                                   // 360
		});                                                                                                                  // 356
	}                                                                                                                     // 362
});                                                                                                                    // 339
RocketChat.API.v1.addRoute('groups.members', {                                                                         // 365
	authRequired: true                                                                                                    // 365
}, {                                                                                                                   // 365
	get: function () {                                                                                                    // 366
		var findResult = findPrivateGroupByIdOrName({                                                                        // 367
			params: this.requestParams(),                                                                                       // 367
			userId: this.userId                                                                                                 // 367
		});                                                                                                                  // 367
                                                                                                                       //
		var _getPaginationItems5 = this.getPaginationItems(),                                                                // 366
		    offset = _getPaginationItems5.offset,                                                                            // 366
		    count = _getPaginationItems5.count;                                                                              // 366
                                                                                                                       //
		var _parseJsonQuery5 = this.parseJsonQuery(),                                                                        // 366
		    sort = _parseJsonQuery5.sort;                                                                                    // 366
                                                                                                                       //
		var members = RocketChat.models.Rooms.processQueryOptionsOnResult(Array.from(findResult._room.usernames), {          // 371
			sort: sort ? sort : -1,                                                                                             // 372
			skip: offset,                                                                                                       // 373
			limit: count                                                                                                        // 374
		});                                                                                                                  // 371
		var users = RocketChat.models.Users.find({                                                                           // 377
			username: {                                                                                                         // 377
				$in: members                                                                                                       // 377
			}                                                                                                                   // 377
		}, {                                                                                                                 // 377
			fields: {                                                                                                           // 378
				_id: 1,                                                                                                            // 378
				username: 1,                                                                                                       // 378
				name: 1,                                                                                                           // 378
				status: 1,                                                                                                         // 378
				utcOffset: 1                                                                                                       // 378
			}                                                                                                                   // 378
		}).fetch();                                                                                                          // 378
		return RocketChat.API.v1.success({                                                                                   // 380
			members: users,                                                                                                     // 381
			count: members.length,                                                                                              // 382
			offset: offset,                                                                                                     // 383
			total: findResult._room.usernames.length                                                                            // 384
		});                                                                                                                  // 380
	}                                                                                                                     // 386
});                                                                                                                    // 365
RocketChat.API.v1.addRoute('groups.messages', {                                                                        // 389
	authRequired: true                                                                                                    // 389
}, {                                                                                                                   // 389
	get: function () {                                                                                                    // 390
		var findResult = findPrivateGroupByIdOrName({                                                                        // 391
			params: this.requestParams(),                                                                                       // 391
			userId: this.userId                                                                                                 // 391
		});                                                                                                                  // 391
                                                                                                                       //
		var _getPaginationItems6 = this.getPaginationItems(),                                                                // 390
		    offset = _getPaginationItems6.offset,                                                                            // 390
		    count = _getPaginationItems6.count;                                                                              // 390
                                                                                                                       //
		var _parseJsonQuery6 = this.parseJsonQuery(),                                                                        // 390
		    sort = _parseJsonQuery6.sort,                                                                                    // 390
		    fields = _parseJsonQuery6.fields,                                                                                // 390
		    query = _parseJsonQuery6.query;                                                                                  // 390
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 395
			rid: findResult.rid                                                                                                 // 395
		});                                                                                                                  // 395
		var messages = RocketChat.models.Messages.find(ourQuery, {                                                           // 397
			sort: sort ? sort : {                                                                                               // 398
				ts: -1                                                                                                             // 398
			},                                                                                                                  // 398
			skip: offset,                                                                                                       // 399
			limit: count,                                                                                                       // 400
			fields: fields                                                                                                      // 401
		}).fetch();                                                                                                          // 397
		return RocketChat.API.v1.success({                                                                                   // 404
			messages: messages,                                                                                                 // 405
			count: messages.length,                                                                                             // 406
			offset: offset,                                                                                                     // 407
			total: RocketChat.models.Messages.find(ourQuery).count()                                                            // 408
		});                                                                                                                  // 404
	}                                                                                                                     // 410
});                                                                                                                    // 389
RocketChat.API.v1.addRoute('groups.online', {                                                                          // 413
	authRequired: true                                                                                                    // 413
}, {                                                                                                                   // 413
	get: function () {                                                                                                    // 414
		var _parseJsonQuery7 = this.parseJsonQuery(),                                                                        // 414
		    query = _parseJsonQuery7.query;                                                                                  // 414
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 416
			t: 'p'                                                                                                              // 416
		});                                                                                                                  // 416
		var room = RocketChat.models.Rooms.findOne(ourQuery);                                                                // 418
                                                                                                                       //
		if (room == null) {                                                                                                  // 420
			return RocketChat.API.v1.failure('Group does not exists');                                                          // 421
		}                                                                                                                    // 422
                                                                                                                       //
		var online = RocketChat.models.Users.findUsersNotOffline({                                                           // 424
			fields: {                                                                                                           // 425
				username: 1                                                                                                        // 426
			}                                                                                                                   // 425
		}).fetch();                                                                                                          // 424
		var onlineInRoom = [];                                                                                               // 430
		online.forEach(function (user) {                                                                                     // 431
			if (room.usernames.indexOf(user.username) !== -1) {                                                                 // 432
				onlineInRoom.push({                                                                                                // 433
					_id: user._id,                                                                                                    // 434
					username: user.username                                                                                           // 435
				});                                                                                                                // 433
			}                                                                                                                   // 437
		});                                                                                                                  // 438
		return RocketChat.API.v1.success({                                                                                   // 440
			online: onlineInRoom                                                                                                // 441
		});                                                                                                                  // 440
	}                                                                                                                     // 443
});                                                                                                                    // 413
RocketChat.API.v1.addRoute('groups.open', {                                                                            // 446
	authRequired: true                                                                                                    // 446
}, {                                                                                                                   // 446
	post: function () {                                                                                                   // 447
		var findResult = findPrivateGroupByIdOrName({                                                                        // 448
			params: this.requestParams(),                                                                                       // 448
			userId: this.userId,                                                                                                // 448
			checkedArchived: false                                                                                              // 448
		});                                                                                                                  // 448
                                                                                                                       //
		if (findResult.open) {                                                                                               // 450
			return RocketChat.API.v1.failure("The private group, " + findResult.name + ", is already open for the sender");     // 451
		}                                                                                                                    // 452
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 454
			Meteor.call('openRoom', findResult.rid);                                                                            // 455
		});                                                                                                                  // 456
		return RocketChat.API.v1.success();                                                                                  // 458
	}                                                                                                                     // 459
});                                                                                                                    // 446
RocketChat.API.v1.addRoute('groups.removeModerator', {                                                                 // 462
	authRequired: true                                                                                                    // 462
}, {                                                                                                                   // 462
	post: function () {                                                                                                   // 463
		var findResult = findPrivateGroupByIdOrName({                                                                        // 464
			params: this.requestParams(),                                                                                       // 464
			userId: this.userId                                                                                                 // 464
		});                                                                                                                  // 464
		var user = this.getUserFromParams();                                                                                 // 466
		Meteor.runAsUser(this.userId, function () {                                                                          // 468
			Meteor.call('removeRoomModerator', findResult.rid, user._id);                                                       // 469
		});                                                                                                                  // 470
		return RocketChat.API.v1.success();                                                                                  // 472
	}                                                                                                                     // 473
});                                                                                                                    // 462
RocketChat.API.v1.addRoute('groups.removeOwner', {                                                                     // 476
	authRequired: true                                                                                                    // 476
}, {                                                                                                                   // 476
	post: function () {                                                                                                   // 477
		var findResult = findPrivateGroupByIdOrName({                                                                        // 478
			params: this.requestParams(),                                                                                       // 478
			userId: this.userId                                                                                                 // 478
		});                                                                                                                  // 478
		var user = this.getUserFromParams();                                                                                 // 480
		Meteor.runAsUser(this.userId, function () {                                                                          // 482
			Meteor.call('removeRoomOwner', findResult.rid, user._id);                                                           // 483
		});                                                                                                                  // 484
		return RocketChat.API.v1.success();                                                                                  // 486
	}                                                                                                                     // 487
});                                                                                                                    // 476
RocketChat.API.v1.addRoute('groups.removeLeader', {                                                                    // 490
	authRequired: true                                                                                                    // 490
}, {                                                                                                                   // 490
	post: function () {                                                                                                   // 491
		var findResult = findPrivateGroupByIdOrName({                                                                        // 492
			params: this.requestParams(),                                                                                       // 492
			userId: this.userId                                                                                                 // 492
		});                                                                                                                  // 492
		var user = this.getUserFromParams();                                                                                 // 494
		Meteor.runAsUser(this.userId, function () {                                                                          // 496
			Meteor.call('removeRoomLeader', findResult.rid, user._id);                                                          // 497
		});                                                                                                                  // 498
		return RocketChat.API.v1.success();                                                                                  // 500
	}                                                                                                                     // 501
});                                                                                                                    // 490
RocketChat.API.v1.addRoute('groups.rename', {                                                                          // 504
	authRequired: true                                                                                                    // 504
}, {                                                                                                                   // 504
	post: function () {                                                                                                   // 505
		var _this3 = this;                                                                                                   // 505
                                                                                                                       //
		if (!this.bodyParams.name || !this.bodyParams.name.trim()) {                                                         // 506
			return RocketChat.API.v1.failure('The bodyParam "name" is required');                                               // 507
		}                                                                                                                    // 508
                                                                                                                       //
		var findResult = findPrivateGroupByIdOrName({                                                                        // 510
			params: {                                                                                                           // 510
				roomId: this.bodyParams.roomId                                                                                     // 510
			},                                                                                                                  // 510
			userId: this.userId                                                                                                 // 510
		});                                                                                                                  // 510
		Meteor.runAsUser(this.userId, function () {                                                                          // 512
			Meteor.call('saveRoomSettings', findResult.rid, 'roomName', _this3.bodyParams.name);                                // 513
		});                                                                                                                  // 514
		return RocketChat.API.v1.success({                                                                                   // 516
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                        // 517
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 517
			})                                                                                                                  // 517
		});                                                                                                                  // 516
	}                                                                                                                     // 519
});                                                                                                                    // 504
RocketChat.API.v1.addRoute('groups.setDescription', {                                                                  // 522
	authRequired: true                                                                                                    // 522
}, {                                                                                                                   // 522
	post: function () {                                                                                                   // 523
		var _this4 = this;                                                                                                   // 523
                                                                                                                       //
		if (!this.bodyParams.description || !this.bodyParams.description.trim()) {                                           // 524
			return RocketChat.API.v1.failure('The bodyParam "description" is required');                                        // 525
		}                                                                                                                    // 526
                                                                                                                       //
		var findResult = findPrivateGroupByIdOrName({                                                                        // 528
			params: this.requestParams(),                                                                                       // 528
			userId: this.userId                                                                                                 // 528
		});                                                                                                                  // 528
		Meteor.runAsUser(this.userId, function () {                                                                          // 530
			Meteor.call('saveRoomSettings', findResult.rid, 'roomDescription', _this4.bodyParams.description);                  // 531
		});                                                                                                                  // 532
		return RocketChat.API.v1.success({                                                                                   // 534
			description: this.bodyParams.description                                                                            // 535
		});                                                                                                                  // 534
	}                                                                                                                     // 537
});                                                                                                                    // 522
RocketChat.API.v1.addRoute('groups.setPurpose', {                                                                      // 540
	authRequired: true                                                                                                    // 540
}, {                                                                                                                   // 540
	post: function () {                                                                                                   // 541
		var _this5 = this;                                                                                                   // 541
                                                                                                                       //
		if (!this.bodyParams.purpose || !this.bodyParams.purpose.trim()) {                                                   // 542
			return RocketChat.API.v1.failure('The bodyParam "purpose" is required');                                            // 543
		}                                                                                                                    // 544
                                                                                                                       //
		var findResult = findPrivateGroupByIdOrName({                                                                        // 546
			params: this.requestParams(),                                                                                       // 546
			userId: this.userId                                                                                                 // 546
		});                                                                                                                  // 546
		Meteor.runAsUser(this.userId, function () {                                                                          // 548
			Meteor.call('saveRoomSettings', findResult.rid, 'roomDescription', _this5.bodyParams.purpose);                      // 549
		});                                                                                                                  // 550
		return RocketChat.API.v1.success({                                                                                   // 552
			purpose: this.bodyParams.purpose                                                                                    // 553
		});                                                                                                                  // 552
	}                                                                                                                     // 555
});                                                                                                                    // 540
RocketChat.API.v1.addRoute('groups.setReadOnly', {                                                                     // 558
	authRequired: true                                                                                                    // 558
}, {                                                                                                                   // 558
	post: function () {                                                                                                   // 559
		var _this6 = this;                                                                                                   // 559
                                                                                                                       //
		if (typeof this.bodyParams.readOnly === 'undefined') {                                                               // 560
			return RocketChat.API.v1.failure('The bodyParam "readOnly" is required');                                           // 561
		}                                                                                                                    // 562
                                                                                                                       //
		var findResult = findPrivateGroupByIdOrName({                                                                        // 564
			params: this.requestParams(),                                                                                       // 564
			userId: this.userId                                                                                                 // 564
		});                                                                                                                  // 564
                                                                                                                       //
		if (findResult.ro === this.bodyParams.readOnly) {                                                                    // 566
			return RocketChat.API.v1.failure('The private group read only setting is the same as what it would be changed to.');
		}                                                                                                                    // 568
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 570
			Meteor.call('saveRoomSettings', findResult.rid, 'readOnly', _this6.bodyParams.readOnly);                            // 571
		});                                                                                                                  // 572
		return RocketChat.API.v1.success({                                                                                   // 574
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                        // 575
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 575
			})                                                                                                                  // 575
		});                                                                                                                  // 574
	}                                                                                                                     // 577
});                                                                                                                    // 558
RocketChat.API.v1.addRoute('groups.setTopic', {                                                                        // 580
	authRequired: true                                                                                                    // 580
}, {                                                                                                                   // 580
	post: function () {                                                                                                   // 581
		var _this7 = this;                                                                                                   // 581
                                                                                                                       //
		if (!this.bodyParams.topic || !this.bodyParams.topic.trim()) {                                                       // 582
			return RocketChat.API.v1.failure('The bodyParam "topic" is required');                                              // 583
		}                                                                                                                    // 584
                                                                                                                       //
		var findResult = findPrivateGroupByIdOrName({                                                                        // 586
			params: this.requestParams(),                                                                                       // 586
			userId: this.userId                                                                                                 // 586
		});                                                                                                                  // 586
		Meteor.runAsUser(this.userId, function () {                                                                          // 588
			Meteor.call('saveRoomSettings', findResult.rid, 'roomTopic', _this7.bodyParams.topic);                              // 589
		});                                                                                                                  // 590
		return RocketChat.API.v1.success({                                                                                   // 592
			topic: this.bodyParams.topic                                                                                        // 593
		});                                                                                                                  // 592
	}                                                                                                                     // 595
});                                                                                                                    // 580
RocketChat.API.v1.addRoute('groups.setType', {                                                                         // 598
	authRequired: true                                                                                                    // 598
}, {                                                                                                                   // 598
	post: function () {                                                                                                   // 599
		var _this8 = this;                                                                                                   // 599
                                                                                                                       //
		if (!this.bodyParams.type || !this.bodyParams.type.trim()) {                                                         // 600
			return RocketChat.API.v1.failure('The bodyParam "type" is required');                                               // 601
		}                                                                                                                    // 602
                                                                                                                       //
		var findResult = findPrivateGroupByIdOrName({                                                                        // 604
			params: this.requestParams(),                                                                                       // 604
			userId: this.userId                                                                                                 // 604
		});                                                                                                                  // 604
                                                                                                                       //
		if (findResult.t === this.bodyParams.type) {                                                                         // 606
			return RocketChat.API.v1.failure('The private group type is the same as what it would be changed to.');             // 607
		}                                                                                                                    // 608
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 610
			Meteor.call('saveRoomSettings', findResult.rid, 'roomType', _this8.bodyParams.type);                                // 611
		});                                                                                                                  // 612
		return RocketChat.API.v1.success({                                                                                   // 614
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                        // 615
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 615
			})                                                                                                                  // 615
		});                                                                                                                  // 614
	}                                                                                                                     // 617
});                                                                                                                    // 598
RocketChat.API.v1.addRoute('groups.unarchive', {                                                                       // 620
	authRequired: true                                                                                                    // 620
}, {                                                                                                                   // 620
	post: function () {                                                                                                   // 621
		var findResult = findPrivateGroupByIdOrName({                                                                        // 622
			params: this.requestParams(),                                                                                       // 622
			userId: this.userId,                                                                                                // 622
			checkedArchived: false                                                                                              // 622
		});                                                                                                                  // 622
		Meteor.runAsUser(this.userId, function () {                                                                          // 624
			Meteor.call('unarchiveRoom', findResult.rid);                                                                       // 625
		});                                                                                                                  // 626
		return RocketChat.API.v1.success();                                                                                  // 628
	}                                                                                                                     // 629
});                                                                                                                    // 620
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"im.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/im.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function findDirectMessageRoom(params, user) {                                                                         // 1
	if ((!params.roomId || !params.roomId.trim()) && (!params.username || !params.username.trim())) {                     // 2
		throw new Meteor.Error('error-room-param-not-provided', 'Body param "roomId" or "username" is required');            // 3
	}                                                                                                                     // 4
                                                                                                                       //
	var room = RocketChat.getRoomByNameOrIdWithOptionToJoin({                                                             // 6
		currentUserId: user._id,                                                                                             // 7
		nameOrId: params.username || params.roomId,                                                                          // 8
		type: 'd'                                                                                                            // 9
	});                                                                                                                   // 6
                                                                                                                       //
	if (!room || room.t !== 'd') {                                                                                        // 12
		throw new Meteor.Error('error-room-not-found', 'The required "roomId" or "username" param provided does not match any dirct message');
	}                                                                                                                     // 14
                                                                                                                       //
	var subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(room._id, user._id);                      // 16
	return {                                                                                                              // 18
		room: room,                                                                                                          // 19
		subscription: subscription                                                                                           // 20
	};                                                                                                                    // 18
}                                                                                                                      // 22
                                                                                                                       //
RocketChat.API.v1.addRoute(['dm.create', 'im.create'], {                                                               // 24
	authRequired: true                                                                                                    // 24
}, {                                                                                                                   // 24
	post: function () {                                                                                                   // 25
		var findResult = findDirectMessageRoom(this.requestParams(), this.user);                                             // 26
		return RocketChat.API.v1.success({                                                                                   // 28
			room: findResult.room                                                                                               // 29
		});                                                                                                                  // 28
	}                                                                                                                     // 31
});                                                                                                                    // 24
RocketChat.API.v1.addRoute(['dm.close', 'im.close'], {                                                                 // 34
	authRequired: true                                                                                                    // 34
}, {                                                                                                                   // 34
	post: function () {                                                                                                   // 35
		var findResult = findDirectMessageRoom(this.requestParams(), this.user);                                             // 36
                                                                                                                       //
		if (!findResult.subscription.open) {                                                                                 // 38
			return RocketChat.API.v1.failure("The direct message room, " + this.bodyParams.name + ", is already closed to the sender");
		}                                                                                                                    // 40
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 42
			Meteor.call('hideRoom', findResult.room._id);                                                                       // 43
		});                                                                                                                  // 44
		return RocketChat.API.v1.success();                                                                                  // 46
	}                                                                                                                     // 47
});                                                                                                                    // 34
RocketChat.API.v1.addRoute(['dm.files', 'im.files'], {                                                                 // 50
	authRequired: true                                                                                                    // 50
}, {                                                                                                                   // 50
	get: function () {                                                                                                    // 51
		var findResult = findDirectMessageRoom(this.requestParams(), this.user);                                             // 52
                                                                                                                       //
		var _getPaginationItems = this.getPaginationItems(),                                                                 // 51
		    offset = _getPaginationItems.offset,                                                                             // 51
		    count = _getPaginationItems.count;                                                                               // 51
                                                                                                                       //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                         // 51
		    sort = _parseJsonQuery.sort,                                                                                     // 51
		    fields = _parseJsonQuery.fields,                                                                                 // 51
		    query = _parseJsonQuery.query;                                                                                   // 51
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 57
			rid: findResult.room._id                                                                                            // 57
		});                                                                                                                  // 57
		var files = RocketChat.models.Uploads.find(ourQuery, {                                                               // 59
			sort: sort ? sort : {                                                                                               // 60
				name: 1                                                                                                            // 60
			},                                                                                                                  // 60
			skip: offset,                                                                                                       // 61
			limit: count,                                                                                                       // 62
			fields: fields                                                                                                      // 63
		}).fetch();                                                                                                          // 59
		return RocketChat.API.v1.success({                                                                                   // 66
			files: files,                                                                                                       // 67
			count: files.length,                                                                                                // 68
			offset: offset,                                                                                                     // 69
			total: RocketChat.models.Uploads.find(ourQuery).count()                                                             // 70
		});                                                                                                                  // 66
	}                                                                                                                     // 72
});                                                                                                                    // 50
RocketChat.API.v1.addRoute(['dm.history', 'im.history'], {                                                             // 75
	authRequired: true                                                                                                    // 75
}, {                                                                                                                   // 75
	get: function () {                                                                                                    // 76
		var findResult = findDirectMessageRoom(this.requestParams(), this.user);                                             // 77
		var latestDate = new Date();                                                                                         // 79
                                                                                                                       //
		if (this.queryParams.latest) {                                                                                       // 80
			latestDate = new Date(this.queryParams.latest);                                                                     // 81
		}                                                                                                                    // 82
                                                                                                                       //
		var oldestDate = undefined;                                                                                          // 84
                                                                                                                       //
		if (this.queryParams.oldest) {                                                                                       // 85
			oldestDate = new Date(this.queryParams.oldest);                                                                     // 86
		}                                                                                                                    // 87
                                                                                                                       //
		var inclusive = false;                                                                                               // 89
                                                                                                                       //
		if (this.queryParams.inclusive) {                                                                                    // 90
			inclusive = this.queryParams.inclusive;                                                                             // 91
		}                                                                                                                    // 92
                                                                                                                       //
		var count = 20;                                                                                                      // 94
                                                                                                                       //
		if (this.queryParams.count) {                                                                                        // 95
			count = parseInt(this.queryParams.count);                                                                           // 96
		}                                                                                                                    // 97
                                                                                                                       //
		var unreads = false;                                                                                                 // 99
                                                                                                                       //
		if (this.queryParams.unreads) {                                                                                      // 100
			unreads = this.queryParams.unreads;                                                                                 // 101
		}                                                                                                                    // 102
                                                                                                                       //
		var result = void 0;                                                                                                 // 104
		Meteor.runAsUser(this.userId, function () {                                                                          // 105
			result = Meteor.call('getChannelHistory', {                                                                         // 106
				rid: findResult.room._id,                                                                                          // 107
				latest: latestDate,                                                                                                // 108
				oldest: oldestDate,                                                                                                // 109
				inclusive: inclusive,                                                                                              // 110
				count: count,                                                                                                      // 111
				unreads: unreads                                                                                                   // 112
			});                                                                                                                 // 106
		});                                                                                                                  // 114
                                                                                                                       //
		if (!result) {                                                                                                       // 116
			return RocketChat.API.v1.unauthorized();                                                                            // 117
		}                                                                                                                    // 118
                                                                                                                       //
		return RocketChat.API.v1.success(result);                                                                            // 120
	}                                                                                                                     // 121
});                                                                                                                    // 75
RocketChat.API.v1.addRoute(['dm.members', 'im.members'], {                                                             // 124
	authRequired: true                                                                                                    // 124
}, {                                                                                                                   // 124
	get: function () {                                                                                                    // 125
		var findResult = findDirectMessageRoom(this.requestParams(), this.user);                                             // 126
                                                                                                                       //
		var _getPaginationItems2 = this.getPaginationItems(),                                                                // 125
		    offset = _getPaginationItems2.offset,                                                                            // 125
		    count = _getPaginationItems2.count;                                                                              // 125
                                                                                                                       //
		var _parseJsonQuery2 = this.parseJsonQuery(),                                                                        // 125
		    sort = _parseJsonQuery2.sort;                                                                                    // 125
                                                                                                                       //
		var members = RocketChat.models.Rooms.processQueryOptionsOnResult(Array.from(findResult.room.usernames), {           // 131
			sort: sort ? sort : -1,                                                                                             // 132
			skip: offset,                                                                                                       // 133
			limit: count                                                                                                        // 134
		});                                                                                                                  // 131
		var users = RocketChat.models.Users.find({                                                                           // 137
			username: {                                                                                                         // 137
				$in: members                                                                                                       // 137
			}                                                                                                                   // 137
		}, {                                                                                                                 // 137
			fields: {                                                                                                           // 138
				_id: 1,                                                                                                            // 138
				username: 1,                                                                                                       // 138
				name: 1,                                                                                                           // 138
				status: 1,                                                                                                         // 138
				utcOffset: 1                                                                                                       // 138
			}                                                                                                                   // 138
		}).fetch();                                                                                                          // 138
		return RocketChat.API.v1.success({                                                                                   // 140
			members: users,                                                                                                     // 141
			count: members.length,                                                                                              // 142
			offset: offset,                                                                                                     // 143
			total: findResult.room.usernames.length                                                                             // 144
		});                                                                                                                  // 140
	}                                                                                                                     // 146
});                                                                                                                    // 124
RocketChat.API.v1.addRoute(['dm.messages', 'im.messages'], {                                                           // 149
	authRequired: true                                                                                                    // 149
}, {                                                                                                                   // 149
	get: function () {                                                                                                    // 150
		var findResult = findDirectMessageRoom(this.requestParams(), this.user);                                             // 151
                                                                                                                       //
		var _getPaginationItems3 = this.getPaginationItems(),                                                                // 150
		    offset = _getPaginationItems3.offset,                                                                            // 150
		    count = _getPaginationItems3.count;                                                                              // 150
                                                                                                                       //
		var _parseJsonQuery3 = this.parseJsonQuery(),                                                                        // 150
		    sort = _parseJsonQuery3.sort,                                                                                    // 150
		    fields = _parseJsonQuery3.fields,                                                                                // 150
		    query = _parseJsonQuery3.query;                                                                                  // 150
                                                                                                                       //
		console.log(findResult);                                                                                             // 156
		var ourQuery = Object.assign({}, query, {                                                                            // 157
			rid: findResult.room._id                                                                                            // 157
		});                                                                                                                  // 157
		var messages = RocketChat.models.Messages.find(ourQuery, {                                                           // 159
			sort: sort ? sort : {                                                                                               // 160
				ts: -1                                                                                                             // 160
			},                                                                                                                  // 160
			skip: offset,                                                                                                       // 161
			limit: count,                                                                                                       // 162
			fields: fields                                                                                                      // 163
		}).fetch();                                                                                                          // 159
		return RocketChat.API.v1.success({                                                                                   // 166
			messages: messages,                                                                                                 // 167
			count: messages.length,                                                                                             // 168
			offset: offset,                                                                                                     // 169
			total: RocketChat.models.Messages.find(ourQuery).count()                                                            // 170
		});                                                                                                                  // 166
	}                                                                                                                     // 172
});                                                                                                                    // 149
RocketChat.API.v1.addRoute(['dm.messages.others', 'im.messages.others'], {                                             // 175
	authRequired: true                                                                                                    // 175
}, {                                                                                                                   // 175
	get: function () {                                                                                                    // 176
		if (RocketChat.settings.get('API_Enable_Direct_Message_History_EndPoint') !== true) {                                // 177
			throw new Meteor.Error('error-endpoint-disabled', 'This endpoint is disabled', {                                    // 178
				route: '/api/v1/im.messages.others'                                                                                // 178
			});                                                                                                                 // 178
		}                                                                                                                    // 179
                                                                                                                       //
		if (!RocketChat.authz.hasPermission(this.userId, 'view-room-administration')) {                                      // 181
			return RocketChat.API.v1.unauthorized();                                                                            // 182
		}                                                                                                                    // 183
                                                                                                                       //
		var roomId = this.queryParams.roomId;                                                                                // 185
                                                                                                                       //
		if (!roomId || !roomId.trim()) {                                                                                     // 186
			throw new Meteor.Error('error-roomid-param-not-provided', 'The parameter "roomId" is required');                    // 187
		}                                                                                                                    // 188
                                                                                                                       //
		var room = RocketChat.models.Rooms.findOneById(roomId);                                                              // 190
                                                                                                                       //
		if (!room || room.t !== 'd') {                                                                                       // 191
			throw new Meteor.Error('error-room-not-found', "No direct message room found by the id of: " + roomId);             // 192
		}                                                                                                                    // 193
                                                                                                                       //
		var _getPaginationItems4 = this.getPaginationItems(),                                                                // 176
		    offset = _getPaginationItems4.offset,                                                                            // 176
		    count = _getPaginationItems4.count;                                                                              // 176
                                                                                                                       //
		var _parseJsonQuery4 = this.parseJsonQuery(),                                                                        // 176
		    sort = _parseJsonQuery4.sort,                                                                                    // 176
		    fields = _parseJsonQuery4.fields,                                                                                // 176
		    query = _parseJsonQuery4.query;                                                                                  // 176
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 197
			rid: room._id                                                                                                       // 197
		});                                                                                                                  // 197
		var msgs = RocketChat.models.Messages.find(ourQuery, {                                                               // 199
			sort: sort ? sort : {                                                                                               // 200
				ts: -1                                                                                                             // 200
			},                                                                                                                  // 200
			skip: offset,                                                                                                       // 201
			limit: count,                                                                                                       // 202
			fields: fields                                                                                                      // 203
		}).fetch();                                                                                                          // 199
		return RocketChat.API.v1.success({                                                                                   // 206
			messages: msgs,                                                                                                     // 207
			offset: offset,                                                                                                     // 208
			count: msgs.length,                                                                                                 // 209
			total: RocketChat.models.Messages.find(ourQuery).count()                                                            // 210
		});                                                                                                                  // 206
	}                                                                                                                     // 212
});                                                                                                                    // 175
RocketChat.API.v1.addRoute(['dm.list', 'im.list'], {                                                                   // 215
	authRequired: true                                                                                                    // 215
}, {                                                                                                                   // 215
	get: function () {                                                                                                    // 216
		var _getPaginationItems5 = this.getPaginationItems(),                                                                // 216
		    offset = _getPaginationItems5.offset,                                                                            // 216
		    count = _getPaginationItems5.count;                                                                              // 216
                                                                                                                       //
		var _parseJsonQuery5 = this.parseJsonQuery(),                                                                        // 216
		    sort = _parseJsonQuery5.sort,                                                                                    // 216
		    fields = _parseJsonQuery5.fields;                                                                                // 216
                                                                                                                       //
		var rooms = _.pluck(RocketChat.models.Subscriptions.findByTypeAndUserId('d', this.userId).fetch(), '_room');         // 219
                                                                                                                       //
		var totalCount = rooms.length;                                                                                       // 220
		rooms = RocketChat.models.Rooms.processQueryOptionsOnResult(rooms, {                                                 // 222
			sort: sort ? sort : {                                                                                               // 223
				name: 1                                                                                                            // 223
			},                                                                                                                  // 223
			skip: offset,                                                                                                       // 224
			limit: count,                                                                                                       // 225
			fields: fields                                                                                                      // 226
		});                                                                                                                  // 222
		return RocketChat.API.v1.success({                                                                                   // 229
			ims: rooms,                                                                                                         // 230
			offset: offset,                                                                                                     // 231
			count: rooms.length,                                                                                                // 232
			total: totalCount                                                                                                   // 233
		});                                                                                                                  // 229
	}                                                                                                                     // 235
});                                                                                                                    // 215
RocketChat.API.v1.addRoute(['dm.list.everyone', 'im.list.everyone'], {                                                 // 238
	authRequired: true                                                                                                    // 238
}, {                                                                                                                   // 238
	get: function () {                                                                                                    // 239
		if (!RocketChat.authz.hasPermission(this.userId, 'view-room-administration')) {                                      // 240
			return RocketChat.API.v1.unauthorized();                                                                            // 241
		}                                                                                                                    // 242
                                                                                                                       //
		var _getPaginationItems6 = this.getPaginationItems(),                                                                // 239
		    offset = _getPaginationItems6.offset,                                                                            // 239
		    count = _getPaginationItems6.count;                                                                              // 239
                                                                                                                       //
		var _parseJsonQuery6 = this.parseJsonQuery(),                                                                        // 239
		    sort = _parseJsonQuery6.sort,                                                                                    // 239
		    fields = _parseJsonQuery6.fields,                                                                                // 239
		    query = _parseJsonQuery6.query;                                                                                  // 239
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 247
			t: 'd'                                                                                                              // 247
		});                                                                                                                  // 247
		var rooms = RocketChat.models.Rooms.find(ourQuery, {                                                                 // 249
			sort: sort ? sort : {                                                                                               // 250
				name: 1                                                                                                            // 250
			},                                                                                                                  // 250
			skip: offset,                                                                                                       // 251
			limit: count,                                                                                                       // 252
			fields: fields                                                                                                      // 253
		}).fetch();                                                                                                          // 249
		return RocketChat.API.v1.success({                                                                                   // 256
			ims: rooms,                                                                                                         // 257
			offset: offset,                                                                                                     // 258
			count: rooms.length,                                                                                                // 259
			total: RocketChat.models.Rooms.find(ourQuery).count()                                                               // 260
		});                                                                                                                  // 256
	}                                                                                                                     // 262
});                                                                                                                    // 238
RocketChat.API.v1.addRoute(['dm.open', 'im.open'], {                                                                   // 265
	authRequired: true                                                                                                    // 265
}, {                                                                                                                   // 265
	post: function () {                                                                                                   // 266
		var findResult = findDirectMessageRoom(this.requestParams(), this.user);                                             // 267
                                                                                                                       //
		if (findResult.subscription.open) {                                                                                  // 269
			return RocketChat.API.v1.failure("The direct message room, " + this.bodyParams.name + ", is already open for the sender");
		}                                                                                                                    // 271
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 273
			Meteor.call('openRoom', findResult.room._id);                                                                       // 274
		});                                                                                                                  // 275
		return RocketChat.API.v1.success();                                                                                  // 277
	}                                                                                                                     // 278
});                                                                                                                    // 265
RocketChat.API.v1.addRoute(['dm.setTopic', 'im.setTopic'], {                                                           // 281
	authRequired: true                                                                                                    // 281
}, {                                                                                                                   // 281
	post: function () {                                                                                                   // 282
		var _this = this;                                                                                                    // 282
                                                                                                                       //
		if (!this.bodyParams.topic || !this.bodyParams.topic.trim()) {                                                       // 283
			return RocketChat.API.v1.failure('The bodyParam "topic" is required');                                              // 284
		}                                                                                                                    // 285
                                                                                                                       //
		var findResult = findDirectMessageRoom(this.requestParams(), this.user);                                             // 287
		Meteor.runAsUser(this.userId, function () {                                                                          // 289
			Meteor.call('saveRoomSettings', findResult.room._id, 'roomTopic', _this.bodyParams.topic);                          // 290
		});                                                                                                                  // 291
		return RocketChat.API.v1.success({                                                                                   // 293
			topic: this.bodyParams.topic                                                                                        // 294
		});                                                                                                                  // 293
	}                                                                                                                     // 296
});                                                                                                                    // 281
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"integrations.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/integrations.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.v1.addRoute('integrations.create', {                                                                    // 1
	authRequired: true                                                                                                    // 1
}, {                                                                                                                   // 1
	post: function () {                                                                                                   // 2
		var _this = this;                                                                                                    // 2
                                                                                                                       //
		check(this.bodyParams, Match.ObjectIncluding({                                                                       // 3
			type: String,                                                                                                       // 4
			name: String,                                                                                                       // 5
			enabled: Boolean,                                                                                                   // 6
			username: String,                                                                                                   // 7
			urls: Match.Maybe([String]),                                                                                        // 8
			channel: String,                                                                                                    // 9
			event: Match.Maybe(String),                                                                                         // 10
			triggerWords: Match.Maybe([String]),                                                                                // 11
			alias: Match.Maybe(String),                                                                                         // 12
			avatar: Match.Maybe(String),                                                                                        // 13
			emoji: Match.Maybe(String),                                                                                         // 14
			token: Match.Maybe(String),                                                                                         // 15
			scriptEnabled: Boolean,                                                                                             // 16
			script: Match.Maybe(String),                                                                                        // 17
			targetChannel: Match.Maybe(String)                                                                                  // 18
		}));                                                                                                                 // 3
		var integration = void 0;                                                                                            // 21
                                                                                                                       //
		switch (this.bodyParams.type) {                                                                                      // 23
			case 'webhook-outgoing':                                                                                            // 24
				Meteor.runAsUser(this.userId, function () {                                                                        // 25
					integration = Meteor.call('addOutgoingIntegration', _this.bodyParams);                                            // 26
				});                                                                                                                // 27
				break;                                                                                                             // 28
                                                                                                                       //
			case 'webhook-incoming':                                                                                            // 29
				Meteor.runAsUser(this.userId, function () {                                                                        // 30
					integration = Meteor.call('addIncomingIntegration', _this.bodyParams);                                            // 31
				});                                                                                                                // 32
				break;                                                                                                             // 33
                                                                                                                       //
			default:                                                                                                            // 34
				return RocketChat.API.v1.failure('Invalid integration type.');                                                     // 35
		}                                                                                                                    // 23
                                                                                                                       //
		return RocketChat.API.v1.success({                                                                                   // 38
			integration: integration                                                                                            // 38
		});                                                                                                                  // 38
	}                                                                                                                     // 39
});                                                                                                                    // 1
RocketChat.API.v1.addRoute('integrations.history', {                                                                   // 42
	authRequired: true                                                                                                    // 42
}, {                                                                                                                   // 42
	get: function () {                                                                                                    // 43
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                           // 44
			return RocketChat.API.v1.unauthorized();                                                                            // 45
		}                                                                                                                    // 46
                                                                                                                       //
		if (!this.queryParams.id || this.queryParams.id.trim() === '') {                                                     // 48
			return RocketChat.API.v1.failure('Invalid integration id.');                                                        // 49
		}                                                                                                                    // 50
                                                                                                                       //
		var id = this.queryParams.id;                                                                                        // 52
                                                                                                                       //
		var _getPaginationItems = this.getPaginationItems(),                                                                 // 43
		    offset = _getPaginationItems.offset,                                                                             // 43
		    count = _getPaginationItems.count;                                                                               // 43
                                                                                                                       //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                         // 43
		    sort = _parseJsonQuery.sort,                                                                                     // 43
		    fields = _parseJsonQuery.fields,                                                                                 // 43
		    query = _parseJsonQuery.query;                                                                                   // 43
                                                                                                                       //
		var ourQuery = Object.assign({}, query, {                                                                            // 56
			'integration._id': id                                                                                               // 56
		});                                                                                                                  // 56
		var history = RocketChat.models.IntegrationHistory.find(ourQuery, {                                                  // 57
			sort: sort ? sort : {                                                                                               // 58
				_updatedAt: -1                                                                                                     // 58
			},                                                                                                                  // 58
			skip: offset,                                                                                                       // 59
			limit: count,                                                                                                       // 60
			fields: fields                                                                                                      // 61
		}).fetch();                                                                                                          // 57
		return RocketChat.API.v1.success({                                                                                   // 64
			history: history,                                                                                                   // 65
			offset: offset,                                                                                                     // 66
			items: history.length,                                                                                              // 67
			total: RocketChat.models.IntegrationHistory.find(ourQuery).count()                                                  // 68
		});                                                                                                                  // 64
	}                                                                                                                     // 70
});                                                                                                                    // 42
RocketChat.API.v1.addRoute('integrations.list', {                                                                      // 73
	authRequired: true                                                                                                    // 73
}, {                                                                                                                   // 73
	get: function () {                                                                                                    // 74
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                           // 75
			return RocketChat.API.v1.unauthorized();                                                                            // 76
		}                                                                                                                    // 77
                                                                                                                       //
		var _getPaginationItems2 = this.getPaginationItems(),                                                                // 74
		    offset = _getPaginationItems2.offset,                                                                            // 74
		    count = _getPaginationItems2.count;                                                                              // 74
                                                                                                                       //
		var _parseJsonQuery2 = this.parseJsonQuery(),                                                                        // 74
		    sort = _parseJsonQuery2.sort,                                                                                    // 74
		    fields = _parseJsonQuery2.fields,                                                                                // 74
		    query = _parseJsonQuery2.query;                                                                                  // 74
                                                                                                                       //
		var ourQuery = Object.assign({}, query);                                                                             // 82
		var integrations = RocketChat.models.Integrations.find(ourQuery, {                                                   // 83
			sort: sort ? sort : {                                                                                               // 84
				ts: -1                                                                                                             // 84
			},                                                                                                                  // 84
			skip: offset,                                                                                                       // 85
			limit: count,                                                                                                       // 86
			fields: fields                                                                                                      // 87
		}).fetch();                                                                                                          // 83
		return RocketChat.API.v1.success({                                                                                   // 90
			integrations: integrations,                                                                                         // 91
			offset: offset,                                                                                                     // 92
			items: integrations.length,                                                                                         // 93
			total: RocketChat.models.Integrations.find(ourQuery).count()                                                        // 94
		});                                                                                                                  // 90
	}                                                                                                                     // 96
});                                                                                                                    // 73
RocketChat.API.v1.addRoute('integrations.remove', {                                                                    // 99
	authRequired: true                                                                                                    // 99
}, {                                                                                                                   // 99
	post: function () {                                                                                                   // 100
		check(this.bodyParams, Match.ObjectIncluding({                                                                       // 101
			type: String,                                                                                                       // 102
			target_url: Match.Maybe(String),                                                                                    // 103
			integrationId: Match.Maybe(String)                                                                                  // 104
		}));                                                                                                                 // 101
                                                                                                                       //
		if (!this.bodyParams.target_url && !this.bodyParams.integrationId) {                                                 // 107
			return RocketChat.API.v1.failure('An integrationId or target_url needs to be provided.');                           // 108
		}                                                                                                                    // 109
                                                                                                                       //
		switch (this.bodyParams.type) {                                                                                      // 111
			case 'webhook-outgoing':                                                                                            // 112
				var integration = void 0;                                                                                          // 113
                                                                                                                       //
				if (this.bodyParams.target_url) {                                                                                  // 115
					integration = RocketChat.models.Integrations.findOne({                                                            // 116
						urls: this.bodyParams.target_url                                                                                 // 116
					});                                                                                                               // 116
				} else if (this.bodyParams.integrationId) {                                                                        // 117
					integration = RocketChat.models.Integrations.findOne({                                                            // 118
						_id: this.bodyParams.integrationId                                                                               // 118
					});                                                                                                               // 118
				}                                                                                                                  // 119
                                                                                                                       //
				if (!integration) {                                                                                                // 121
					return RocketChat.API.v1.failure('No integration found.');                                                        // 122
				}                                                                                                                  // 123
                                                                                                                       //
				Meteor.runAsUser(this.userId, function () {                                                                        // 125
					Meteor.call('deleteOutgoingIntegration', integration._id);                                                        // 126
				});                                                                                                                // 127
				return RocketChat.API.v1.success({                                                                                 // 129
					integration: integration                                                                                          // 130
				});                                                                                                                // 129
                                                                                                                       //
			case 'webhook-incoming':                                                                                            // 132
				integration = RocketChat.models.Integrations.findOne({                                                             // 133
					_id: this.bodyParams.integrationId                                                                                // 133
				});                                                                                                                // 133
                                                                                                                       //
				if (!integration) {                                                                                                // 135
					return RocketChat.API.v1.failure('No integration found.');                                                        // 136
				}                                                                                                                  // 137
                                                                                                                       //
				Meteor.runAsUser(this.userId, function () {                                                                        // 139
					Meteor.call('deleteIncomingIntegration', integration._id);                                                        // 140
				});                                                                                                                // 141
				return RocketChat.API.v1.success({                                                                                 // 143
					integration: integration                                                                                          // 144
				});                                                                                                                // 143
                                                                                                                       //
			default:                                                                                                            // 146
				return RocketChat.API.v1.failure('Invalid integration type.');                                                     // 147
		}                                                                                                                    // 111
	}                                                                                                                     // 149
});                                                                                                                    // 99
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"misc.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/misc.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.v1.addRoute('info', {                                                                                   // 1
	authRequired: false                                                                                                   // 1
}, {                                                                                                                   // 1
	get: function () {                                                                                                    // 2
		var user = this.getLoggedInUser();                                                                                   // 3
                                                                                                                       //
		if (user && RocketChat.authz.hasRole(user._id, 'admin')) {                                                           // 5
			return RocketChat.API.v1.success({                                                                                  // 6
				info: RocketChat.Info                                                                                              // 7
			});                                                                                                                 // 6
		}                                                                                                                    // 9
                                                                                                                       //
		return RocketChat.API.v1.success({                                                                                   // 11
			info: {                                                                                                             // 12
				'version': RocketChat.Info.version                                                                                 // 13
			}                                                                                                                   // 12
		});                                                                                                                  // 11
	}                                                                                                                     // 16
});                                                                                                                    // 1
RocketChat.API.v1.addRoute('me', {                                                                                     // 19
	authRequired: true                                                                                                    // 19
}, {                                                                                                                   // 19
	get: function () {                                                                                                    // 20
		return RocketChat.API.v1.success(_.pick(this.user, ['_id', 'name', 'emails', 'status', 'statusConnection', 'username', 'utcOffset', 'active', 'language']));
	}                                                                                                                     // 32
});                                                                                                                    // 19
var onlineCache = 0;                                                                                                   // 35
var onlineCacheDate = 0;                                                                                               // 36
var cacheInvalid = 60000; // 1 minute                                                                                  // 37
                                                                                                                       //
RocketChat.API.v1.addRoute('shield.svg', {                                                                             // 38
	authRequired: false                                                                                                   // 38
}, {                                                                                                                   // 38
	get: function () {                                                                                                    // 39
		var _queryParams = this.queryParams,                                                                                 // 39
		    type = _queryParams.type,                                                                                        // 39
		    channel = _queryParams.channel,                                                                                  // 39
		    name = _queryParams.name,                                                                                        // 39
		    icon = _queryParams.icon;                                                                                        // 39
                                                                                                                       //
		if (!RocketChat.settings.get('API_Enable_Shields')) {                                                                // 41
			throw new Meteor.Error('error-endpoint-disabled', 'This endpoint is disabled', {                                    // 42
				route: '/api/v1/shields.svg'                                                                                       // 42
			});                                                                                                                 // 42
		}                                                                                                                    // 43
                                                                                                                       //
		var types = RocketChat.settings.get('API_Shield_Types');                                                             // 44
                                                                                                                       //
		if (type && types !== '*' && !types.split(',').map(function (t) {                                                    // 45
			return t.trim();                                                                                                    // 45
		}).includes(type)) {                                                                                                 // 45
			throw new Meteor.Error('error-shield-disabled', 'This shield type is disabled', {                                   // 46
				route: '/api/v1/shields.svg'                                                                                       // 46
			});                                                                                                                 // 46
		}                                                                                                                    // 47
                                                                                                                       //
		var hideIcon = icon === 'false';                                                                                     // 48
                                                                                                                       //
		if (hideIcon && (!name || !name.trim())) {                                                                           // 49
			return RocketChat.API.v1.failure('Name cannot be empty when icon is hidden');                                       // 50
		}                                                                                                                    // 51
                                                                                                                       //
		var text = void 0;                                                                                                   // 52
                                                                                                                       //
		switch (type) {                                                                                                      // 53
			case 'online':                                                                                                      // 54
				if (Date.now() - onlineCacheDate > cacheInvalid) {                                                                 // 55
					onlineCache = RocketChat.models.Users.findUsersNotOffline().count();                                              // 56
					onlineCacheDate = Date.now();                                                                                     // 57
				}                                                                                                                  // 58
                                                                                                                       //
				text = onlineCache + " " + TAPi18n.__('Online');                                                                   // 59
				break;                                                                                                             // 60
                                                                                                                       //
			case 'channel':                                                                                                     // 61
				if (!channel) {                                                                                                    // 62
					return RocketChat.API.v1.failure('Shield channel is required for type "channel"');                                // 63
				}                                                                                                                  // 64
                                                                                                                       //
				text = "#" + channel;                                                                                              // 65
				break;                                                                                                             // 66
                                                                                                                       //
			default:                                                                                                            // 67
				text = TAPi18n.__('Join_Chat').toUpperCase();                                                                      // 68
		}                                                                                                                    // 53
                                                                                                                       //
		var iconSize = hideIcon ? 7 : 24;                                                                                    // 70
		var leftSize = name ? name.length * 6 + 7 + iconSize : iconSize;                                                     // 71
		var rightSize = text.length * 6 + 20;                                                                                // 72
		var width = leftSize + rightSize;                                                                                    // 73
		var height = 20;                                                                                                     // 74
		return {                                                                                                             // 75
			headers: {                                                                                                          // 76
				'Content-Type': 'image/svg+xml;charset=utf-8'                                                                      // 76
			},                                                                                                                  // 76
			body: ("\n\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"" + width + "\" height=\"" + height + "\">\n\t\t\t\t  <linearGradient id=\"b\" x2=\"0\" y2=\"100%\">\n\t\t\t\t    <stop offset=\"0\" stop-color=\"#bbb\" stop-opacity=\".1\"/>\n\t\t\t\t    <stop offset=\"1\" stop-opacity=\".1\"/>\n\t\t\t\t  </linearGradient>\n\t\t\t\t  <mask id=\"a\">\n\t\t\t\t    <rect width=\"" + width + "\" height=\"" + height + "\" rx=\"3\" fill=\"#fff\"/>\n\t\t\t\t  </mask>\n\t\t\t\t  <g mask=\"url(#a)\">\n\t\t\t\t    <path fill=\"#555\" d=\"M0 0h" + leftSize + "v" + height + "H0z\"/>\n\t\t\t\t    <path fill=\"#4c1\" d=\"M" + leftSize + " 0h" + rightSize + "v" + height + "H" + leftSize + "z\"/>\n\t\t\t\t    <path fill=\"url(#b)\" d=\"M0 0h" + width + "v" + height + "H0z\"/>\n\t\t\t\t  </g>\n\t\t\t\t    " + (hideIcon ? '' : '<image x="5" y="3" width="14" height="14" xlink:href="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiNDMTI3MkQiIGQ9Ik01MDIuNTg2LDI1NS4zMjJjMC0yNS4yMzYtNy41NS00OS40MzYtMjIuNDQ1LTcxLjkzMmMtMTMuMzczLTIwLjE5NS0zMi4xMDktMzguMDcyLTU1LjY4Ny01My4xMzJDMzc4LjkzNywxMDEuMTgyLDMxOS4xMDgsODUuMTY4LDI1Niw4NS4xNjhjLTIxLjA3OSwwLTQxLjg1NSwxLjc4MS02Mi4wMDksNS4zMWMtMTIuNTA0LTExLjcwMi0yNy4xMzktMjIuMjMyLTQyLjYyNy0zMC41NkM2OC42MTgsMTkuODE4LDAsNTguOTc1LDAsNTguOTc1czYzLjc5OCw1Mi40MDksNTMuNDI0LDk4LjM1Yy0yOC41NDIsMjguMzEzLTQ0LjAxLDYyLjQ1My00NC4wMSw5Ny45OThjMCwwLjExMywwLjAwNiwwLjIyNiwwLjAwNiwwLjM0YzAsMC4xMTMtMC4wMDYsMC4yMjYtMC4wMDYsMC4zMzljMCwzNS41NDUsMTUuNDY5LDY5LjY4NSw0NC4wMSw5Ny45OTlDNjMuNzk4LDM5OS45NCwwLDQ1Mi4zNSwwLDQ1Mi4zNXM2OC42MTgsMzkuMTU2LDE1MS4zNjMtMC45NDNjMTUuNDg4LTguMzI3LDMwLjEyNC0xOC44NTcsNDIuNjI3LTMwLjU2YzIwLjE1NCwzLjUyOCw0MC45MzEsNS4zMSw2Mi4wMDksNS4zMWM2My4xMDgsMCwxMjIuOTM3LTE2LjAxNCwxNjguNDU0LTQ1LjA5MWMyMy41NzctMTUuMDYsNDIuMzEzLTMyLjkzNyw1NS42ODctNTMuMTMyYzE0Ljg5Ni0yMi40OTYsMjIuNDQ1LTQ2LjY5NSwyMi40NDUtNzEuOTMyYzAtMC4xMTMtMC4wMDYtMC4yMjYtMC4wMDYtMC4zMzlDNTAyLjU4LDI1NS41NDgsNTAyLjU4NiwyNTUuNDM2LDUwMi41ODYsMjU1LjMyMnoiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjU2LDEyMC44NDdjMTE2Ljg1NCwwLDIxMS41ODYsNjAuNTA5LDIxMS41ODYsMTM1LjE1NGMwLDc0LjY0MS05NC43MzEsMTM1LjE1NS0yMTEuNTg2LDEzNS4xNTVjLTI2LjAxOSwwLTUwLjkzNy0zLjAwOS03My45NTktOC40OTVjLTIzLjM5NiwyOC4xNDctNzQuODY4LDY3LjI4LTEyNC44NjksNTQuNjI5YzE2LjI2NS0xNy40Nyw0MC4zNjEtNDYuOTg4LDM1LjIwMS05NS42MDNjLTI5Ljk2OC0yMy4zMjItNDcuOTU5LTUzLjE2My00Ny45NTktODUuNjg2QzQ0LjQxNCwxODEuMzU2LDEzOS4xNDUsMTIwLjg0NywyNTYsMTIwLjg0NyIvPjxnPjxnPjxjaXJjbGUgZmlsbD0iI0MxMjcyRCIgY3g9IjI1NiIgY3k9IjI2MC4zNTIiIHI9IjI4LjEwNSIvPjwvZz48Zz48Y2lyY2xlIGZpbGw9IiNDMTI3MkQiIGN4PSIzNTMuNzI4IiBjeT0iMjYwLjM1MiIgcj0iMjguMTA0Ii8+PC9nPjxnPjxjaXJjbGUgZmlsbD0iI0MxMjcyRCIgY3g9IjE1OC4yNzIiIGN5PSIyNjAuMzUyIiByPSIyOC4xMDUiLz48L2c+PC9nPjxnPjxwYXRoIGZpbGw9IiNDQ0NDQ0MiIGQ9Ik0yNTYsMzczLjM3M2MtMjYuMDE5LDAtNTAuOTM3LTIuNjA3LTczLjk1OS03LjM2MmMtMjAuNjU5LDIxLjU0LTYzLjIwOSw1MC40OTYtMTA3LjMwNyw0OS40M2MtNS44MDYsOC44MDUtMTIuMTIxLDE2LjAwNi0xNy41NjIsMjEuODVjNTAsMTIuNjUxLDEwMS40NzMtMjYuNDgxLDEyNC44NjktNTQuNjI5YzIzLjAyMyw1LjQ4Niw0Ny45NDEsOC40OTUsNzMuOTU5LDguNDk1YzExNS45MTcsMCwyMTAuMDQ4LTU5LjU1LDIxMS41NTEtMTMzLjM2NEM0NjYuMDQ4LDMyMS43NjUsMzcxLjkxNywzNzMuMzczLDI1NiwzNzMuMzczeiIvPjwvZz48L3N2Zz4="/>') + "\n\t\t\t\t  <g fill=\"#fff\" font-family=\"DejaVu Sans,Verdana,Geneva,sans-serif\" font-size=\"11\">\n\t\t\t\t\t\t" + (name ? "<text x=\"" + iconSize + "\" y=\"15\" fill=\"#010101\" fill-opacity=\".3\">" + name + "</text>\n\t\t\t\t    <text x=\"" + iconSize + "\" y=\"14\">" + name + "</text>" : '') + "\n\t\t\t\t    <text x=\"" + (leftSize + 7) + "\" y=\"15\" fill=\"#010101\" fill-opacity=\".3\">" + text + "</text>\n\t\t\t\t    <text x=\"" + (leftSize + 7) + "\" y=\"14\">" + text + "</text>\n\t\t\t\t  </g>\n\t\t\t\t</svg>\n\t\t\t").trim().replace(/\>[\s]+\</gm, '><')
		};                                                                                                                   // 75
	}                                                                                                                     // 101
});                                                                                                                    // 38
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"settings.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/settings.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// settings endpoints                                                                                                  // 1
RocketChat.API.v1.addRoute('settings', {                                                                               // 2
	authRequired: true                                                                                                    // 2
}, {                                                                                                                   // 2
	get: function () {                                                                                                    // 3
		var _getPaginationItems = this.getPaginationItems(),                                                                 // 3
		    offset = _getPaginationItems.offset,                                                                             // 3
		    count = _getPaginationItems.count;                                                                               // 3
                                                                                                                       //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                         // 3
		    sort = _parseJsonQuery.sort,                                                                                     // 3
		    fields = _parseJsonQuery.fields,                                                                                 // 3
		    query = _parseJsonQuery.query;                                                                                   // 3
                                                                                                                       //
		var ourQuery = {                                                                                                     // 7
			hidden: {                                                                                                           // 8
				$ne: true                                                                                                          // 8
			}                                                                                                                   // 8
		};                                                                                                                   // 7
                                                                                                                       //
		if (!RocketChat.authz.hasPermission(this.userId, 'view-privileged-setting')) {                                       // 11
			ourQuery.public = true;                                                                                             // 12
		}                                                                                                                    // 13
                                                                                                                       //
		ourQuery = Object.assign({}, query, ourQuery);                                                                       // 15
		var settings = RocketChat.models.Settings.find(ourQuery, {                                                           // 17
			sort: sort ? sort : {                                                                                               // 18
				_id: 1                                                                                                             // 18
			},                                                                                                                  // 18
			skip: offset,                                                                                                       // 19
			limit: count,                                                                                                       // 20
			fields: Object.assign({                                                                                             // 21
				_id: 1,                                                                                                            // 21
				value: 1                                                                                                           // 21
			}, fields)                                                                                                          // 21
		}).fetch();                                                                                                          // 17
		return RocketChat.API.v1.success({                                                                                   // 24
			settings: settings,                                                                                                 // 25
			count: settings.length,                                                                                             // 26
			offset: offset,                                                                                                     // 27
			total: RocketChat.models.Settings.find(ourQuery).count()                                                            // 28
		});                                                                                                                  // 24
	}                                                                                                                     // 30
});                                                                                                                    // 2
RocketChat.API.v1.addRoute('settings/:_id', {                                                                          // 33
	authRequired: true                                                                                                    // 33
}, {                                                                                                                   // 33
	get: function () {                                                                                                    // 34
		if (!RocketChat.authz.hasPermission(this.userId, 'view-privileged-setting')) {                                       // 35
			return RocketChat.API.v1.unauthorized();                                                                            // 36
		}                                                                                                                    // 37
                                                                                                                       //
		return RocketChat.API.v1.success(_.pick(RocketChat.models.Settings.findOneNotHiddenById(this.urlParams._id), '_id', 'value'));
	},                                                                                                                    // 40
	post: function () {                                                                                                   // 41
		if (!RocketChat.authz.hasPermission(this.userId, 'edit-privileged-setting')) {                                       // 42
			return RocketChat.API.v1.unauthorized();                                                                            // 43
		}                                                                                                                    // 44
                                                                                                                       //
		check(this.bodyParams, {                                                                                             // 46
			value: Match.Any                                                                                                    // 47
		});                                                                                                                  // 46
                                                                                                                       //
		if (RocketChat.models.Settings.updateValueNotHiddenById(this.urlParams._id, this.bodyParams.value)) {                // 50
			return RocketChat.API.v1.success();                                                                                 // 51
		}                                                                                                                    // 52
                                                                                                                       //
		return RocketChat.API.v1.failure();                                                                                  // 54
	}                                                                                                                     // 55
});                                                                                                                    // 33
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stats.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/stats.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.v1.addRoute('statistics', {                                                                             // 1
	authRequired: true                                                                                                    // 1
}, {                                                                                                                   // 1
	get: function () {                                                                                                    // 2
		var refresh = false;                                                                                                 // 3
                                                                                                                       //
		if (typeof this.queryParams.refresh !== 'undefined' && this.queryParams.refresh === 'true') {                        // 4
			refresh = true;                                                                                                     // 5
		}                                                                                                                    // 6
                                                                                                                       //
		var stats = void 0;                                                                                                  // 8
		Meteor.runAsUser(this.userId, function () {                                                                          // 9
			stats = Meteor.call('getStatistics', refresh);                                                                      // 10
		});                                                                                                                  // 11
		return RocketChat.API.v1.success({                                                                                   // 13
			statistics: stats                                                                                                   // 14
		});                                                                                                                  // 13
	}                                                                                                                     // 16
});                                                                                                                    // 1
RocketChat.API.v1.addRoute('statistics.list', {                                                                        // 19
	authRequired: true                                                                                                    // 19
}, {                                                                                                                   // 19
	get: function () {                                                                                                    // 20
		if (!RocketChat.authz.hasPermission(this.userId, 'view-statistics')) {                                               // 21
			return RocketChat.API.v1.unauthorized();                                                                            // 22
		}                                                                                                                    // 23
                                                                                                                       //
		var _getPaginationItems = this.getPaginationItems(),                                                                 // 20
		    offset = _getPaginationItems.offset,                                                                             // 20
		    count = _getPaginationItems.count;                                                                               // 20
                                                                                                                       //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                         // 20
		    sort = _parseJsonQuery.sort,                                                                                     // 20
		    fields = _parseJsonQuery.fields,                                                                                 // 20
		    query = _parseJsonQuery.query;                                                                                   // 20
                                                                                                                       //
		var statistics = RocketChat.models.Statistics.find(query, {                                                          // 28
			sort: sort ? sort : {                                                                                               // 29
				name: 1                                                                                                            // 29
			},                                                                                                                  // 29
			skip: offset,                                                                                                       // 30
			limit: count,                                                                                                       // 31
			fields: fields                                                                                                      // 32
		}).fetch();                                                                                                          // 28
		return RocketChat.API.v1.success({                                                                                   // 35
			statistics: statistics,                                                                                             // 36
			count: statistics.length,                                                                                           // 37
			offset: offset,                                                                                                     // 38
			total: RocketChat.models.Statistics.find(query).count()                                                             // 39
		});                                                                                                                  // 35
	}                                                                                                                     // 41
});                                                                                                                    // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"users.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/v1/users.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.v1.addRoute('users.create', {                                                                           // 1
	authRequired: true                                                                                                    // 1
}, {                                                                                                                   // 1
	post: function () {                                                                                                   // 2
		var _this = this;                                                                                                    // 2
                                                                                                                       //
		check(this.bodyParams, {                                                                                             // 3
			email: String,                                                                                                      // 4
			name: String,                                                                                                       // 5
			password: String,                                                                                                   // 6
			username: String,                                                                                                   // 7
			active: Match.Maybe(Boolean),                                                                                       // 8
			roles: Match.Maybe(Array),                                                                                          // 9
			joinDefaultChannels: Match.Maybe(Boolean),                                                                          // 10
			requirePasswordChange: Match.Maybe(Boolean),                                                                        // 11
			sendWelcomeEmail: Match.Maybe(Boolean),                                                                             // 12
			verified: Match.Maybe(Boolean),                                                                                     // 13
			customFields: Match.Maybe(Object)                                                                                   // 14
		}); //New change made by pull request #5152                                                                          // 3
                                                                                                                       //
		if (typeof this.bodyParams.joinDefaultChannels === 'undefined') {                                                    // 18
			this.bodyParams.joinDefaultChannels = true;                                                                         // 19
		}                                                                                                                    // 20
                                                                                                                       //
		if (this.bodyParams.customFields) {                                                                                  // 22
			RocketChat.validateCustomFields(this.bodyParams.customFields);                                                      // 23
		}                                                                                                                    // 24
                                                                                                                       //
		var newUserId = RocketChat.saveUser(this.userId, this.bodyParams);                                                   // 26
                                                                                                                       //
		if (this.bodyParams.customFields) {                                                                                  // 28
			RocketChat.saveCustomFieldsWithoutValidation(newUserId, this.bodyParams.customFields);                              // 29
		}                                                                                                                    // 30
                                                                                                                       //
		if (typeof this.bodyParams.active !== 'undefined') {                                                                 // 33
			Meteor.runAsUser(this.userId, function () {                                                                         // 34
				Meteor.call('setUserActiveStatus', newUserId, _this.bodyParams.active);                                            // 35
			});                                                                                                                 // 36
		}                                                                                                                    // 37
                                                                                                                       //
		return RocketChat.API.v1.success({                                                                                   // 39
			user: RocketChat.models.Users.findOneById(newUserId, {                                                              // 39
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 39
			})                                                                                                                  // 39
		});                                                                                                                  // 39
	}                                                                                                                     // 40
});                                                                                                                    // 1
RocketChat.API.v1.addRoute('users.delete', {                                                                           // 43
	authRequired: true                                                                                                    // 43
}, {                                                                                                                   // 43
	post: function () {                                                                                                   // 44
		if (!RocketChat.authz.hasPermission(this.userId, 'delete-user')) {                                                   // 45
			return RocketChat.API.v1.unauthorized();                                                                            // 46
		}                                                                                                                    // 47
                                                                                                                       //
		var user = this.getUserFromParams();                                                                                 // 49
		Meteor.runAsUser(this.userId, function () {                                                                          // 51
			Meteor.call('deleteUser', user._id);                                                                                // 52
		});                                                                                                                  // 53
		return RocketChat.API.v1.success();                                                                                  // 55
	}                                                                                                                     // 56
});                                                                                                                    // 43
RocketChat.API.v1.addRoute('users.getAvatar', {                                                                        // 59
	authRequired: false                                                                                                   // 59
}, {                                                                                                                   // 59
	get: function () {                                                                                                    // 60
		var user = this.getUserFromParams();                                                                                 // 61
		var url = RocketChat.getURL("/avatar/" + user.username, {                                                            // 63
			cdn: false,                                                                                                         // 63
			full: true                                                                                                          // 63
		});                                                                                                                  // 63
		this.response.setHeader('Location', url);                                                                            // 64
		return {                                                                                                             // 66
			statusCode: 307,                                                                                                    // 67
			body: url                                                                                                           // 68
		};                                                                                                                   // 66
	}                                                                                                                     // 70
});                                                                                                                    // 59
RocketChat.API.v1.addRoute('users.getPresence', {                                                                      // 73
	authRequired: true                                                                                                    // 73
}, {                                                                                                                   // 73
	get: function () {                                                                                                    // 74
		if (this.isUserFromParams()) {                                                                                       // 75
			var _user = RocketChat.models.Users.findOneById(this.userId);                                                       // 76
                                                                                                                       //
			return RocketChat.API.v1.success({                                                                                  // 77
				presence: _user.status,                                                                                            // 78
				connectionStatus: _user.statusConnection,                                                                          // 79
				lastLogin: _user.lastLogin                                                                                         // 80
			});                                                                                                                 // 77
		}                                                                                                                    // 82
                                                                                                                       //
		var user = this.getUserFromParams();                                                                                 // 84
		return RocketChat.API.v1.success({                                                                                   // 86
			presence: user.status                                                                                               // 87
		});                                                                                                                  // 86
	}                                                                                                                     // 89
});                                                                                                                    // 73
RocketChat.API.v1.addRoute('users.info', {                                                                             // 92
	authRequired: true                                                                                                    // 92
}, {                                                                                                                   // 92
	get: function () {                                                                                                    // 93
		var user = this.getUserFromParams();                                                                                 // 94
		var result = void 0;                                                                                                 // 96
		Meteor.runAsUser(this.userId, function () {                                                                          // 97
			result = Meteor.call('getFullUserData', {                                                                           // 98
				filter: user.username,                                                                                             // 98
				limit: 1                                                                                                           // 98
			});                                                                                                                 // 98
		});                                                                                                                  // 99
                                                                                                                       //
		if (!result || result.length !== 1) {                                                                                // 101
			return RocketChat.API.v1.failure("Failed to get the user data for the userId of \"" + user._id + "\".");            // 102
		}                                                                                                                    // 103
                                                                                                                       //
		return RocketChat.API.v1.success({                                                                                   // 105
			user: result[0]                                                                                                     // 106
		});                                                                                                                  // 105
	}                                                                                                                     // 108
});                                                                                                                    // 92
RocketChat.API.v1.addRoute('users.list', {                                                                             // 111
	authRequired: true                                                                                                    // 111
}, {                                                                                                                   // 111
	get: function () {                                                                                                    // 112
		if (!RocketChat.authz.hasPermission(this.userId, 'view-d-room')) {                                                   // 113
			return RocketChat.API.v1.unauthorized();                                                                            // 114
		}                                                                                                                    // 115
                                                                                                                       //
		var _getPaginationItems = this.getPaginationItems(),                                                                 // 112
		    offset = _getPaginationItems.offset,                                                                             // 112
		    count = _getPaginationItems.count;                                                                               // 112
                                                                                                                       //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                         // 112
		    sort = _parseJsonQuery.sort,                                                                                     // 112
		    fields = _parseJsonQuery.fields,                                                                                 // 112
		    query = _parseJsonQuery.query;                                                                                   // 112
                                                                                                                       //
		var users = RocketChat.models.Users.find(query, {                                                                    // 120
			sort: sort ? sort : {                                                                                               // 121
				username: 1                                                                                                        // 121
			},                                                                                                                  // 121
			skip: offset,                                                                                                       // 122
			limit: count,                                                                                                       // 123
			fields: fields                                                                                                      // 124
		}).fetch();                                                                                                          // 120
		return RocketChat.API.v1.success({                                                                                   // 127
			users: users,                                                                                                       // 128
			count: users.length,                                                                                                // 129
			offset: offset,                                                                                                     // 130
			total: RocketChat.models.Users.find(query).count()                                                                  // 131
		});                                                                                                                  // 127
	}                                                                                                                     // 133
});                                                                                                                    // 111
RocketChat.API.v1.addRoute('users.register', {                                                                         // 136
	authRequired: false                                                                                                   // 136
}, {                                                                                                                   // 136
	post: function () {                                                                                                   // 137
		var _this2 = this;                                                                                                   // 137
                                                                                                                       //
		if (this.userId) {                                                                                                   // 138
			return RocketChat.API.v1.failure('Logged in users can not register again.');                                        // 139
		} //We set their username here, so require it                                                                        // 140
		//The `registerUser` checks for the other requirements                                                               // 143
                                                                                                                       //
                                                                                                                       //
		check(this.bodyParams, Match.ObjectIncluding({                                                                       // 144
			username: String                                                                                                    // 145
		})); //Register the user                                                                                             // 144
                                                                                                                       //
		var userId = Meteor.call('registerUser', this.bodyParams); //Now set their username                                  // 149
                                                                                                                       //
		Meteor.runAsUser(userId, function () {                                                                               // 152
			return Meteor.call('setUsername', _this2.bodyParams.username);                                                      // 152
		});                                                                                                                  // 152
		return RocketChat.API.v1.success({                                                                                   // 154
			user: RocketChat.models.Users.findOneById(userId, {                                                                 // 154
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 154
			})                                                                                                                  // 154
		});                                                                                                                  // 154
	}                                                                                                                     // 155
});                                                                                                                    // 136
RocketChat.API.v1.addRoute('users.resetAvatar', {                                                                      // 158
	authRequired: true                                                                                                    // 158
}, {                                                                                                                   // 158
	post: function () {                                                                                                   // 159
		var user = this.getUserFromParams();                                                                                 // 160
                                                                                                                       //
		if (user._id === this.userId) {                                                                                      // 162
			Meteor.runAsUser(this.userId, function () {                                                                         // 163
				return Meteor.call('resetAvatar');                                                                                 // 163
			});                                                                                                                 // 163
		} else if (RocketChat.authz.hasPermission(this.userId, 'edit-other-user-info')) {                                    // 164
			Meteor.runAsUser(user._id, function () {                                                                            // 165
				return Meteor.call('resetAvatar');                                                                                 // 165
			});                                                                                                                 // 165
		} else {                                                                                                             // 166
			return RocketChat.API.v1.unauthorized();                                                                            // 167
		}                                                                                                                    // 168
                                                                                                                       //
		return RocketChat.API.v1.success();                                                                                  // 170
	}                                                                                                                     // 171
});                                                                                                                    // 158
RocketChat.API.v1.addRoute('users.setAvatar', {                                                                        // 174
	authRequired: true                                                                                                    // 174
}, {                                                                                                                   // 174
	post: function () {                                                                                                   // 175
		var _this3 = this;                                                                                                   // 175
                                                                                                                       //
		check(this.bodyParams, Match.ObjectIncluding({                                                                       // 176
			avatarUrl: Match.Maybe(String),                                                                                     // 177
			userId: Match.Maybe(String),                                                                                        // 178
			username: Match.Maybe(String)                                                                                       // 179
		}));                                                                                                                 // 176
		var user = void 0;                                                                                                   // 182
                                                                                                                       //
		if (this.isUserFromParams()) {                                                                                       // 183
			user = Meteor.users.findOne(this.userId);                                                                           // 184
		} else if (RocketChat.authz.hasPermission(this.userId, 'edit-other-user-info')) {                                    // 185
			user = this.getUserFromParams();                                                                                    // 186
		} else {                                                                                                             // 187
			return RocketChat.API.v1.unauthorized();                                                                            // 188
		}                                                                                                                    // 189
                                                                                                                       //
		Meteor.runAsUser(user._id, function () {                                                                             // 191
			if (_this3.bodyParams.avatarUrl) {                                                                                  // 192
				RocketChat.setUserAvatar(user, _this3.bodyParams.avatarUrl, '', 'url');                                            // 193
			} else {                                                                                                            // 194
				var Busboy = Npm.require('busboy');                                                                                // 195
                                                                                                                       //
				var busboy = new Busboy({                                                                                          // 196
					headers: _this3.request.headers                                                                                   // 196
				});                                                                                                                // 196
				Meteor.wrapAsync(function (callback) {                                                                             // 198
					busboy.on('file', Meteor.bindEnvironment(function (fieldname, file, filename, encoding, mimetype) {               // 199
						if (fieldname !== 'image') {                                                                                     // 200
							return callback(new Meteor.Error('invalid-field'));                                                             // 201
						}                                                                                                                // 202
                                                                                                                       //
						var imageData = [];                                                                                              // 204
						file.on('data', Meteor.bindEnvironment(function (data) {                                                         // 205
							imageData.push(data);                                                                                           // 206
						}));                                                                                                             // 207
						file.on('end', Meteor.bindEnvironment(function () {                                                              // 209
							RocketChat.setUserAvatar(user, Buffer.concat(imageData), mimetype, 'rest');                                     // 210
							callback();                                                                                                     // 211
						}));                                                                                                             // 212
					}));                                                                                                              // 214
                                                                                                                       //
					_this3.request.pipe(busboy);                                                                                      // 215
				})();                                                                                                              // 216
			}                                                                                                                   // 217
		});                                                                                                                  // 218
		return RocketChat.API.v1.success();                                                                                  // 220
	}                                                                                                                     // 221
});                                                                                                                    // 174
RocketChat.API.v1.addRoute('users.update', {                                                                           // 224
	authRequired: true                                                                                                    // 224
}, {                                                                                                                   // 224
	post: function () {                                                                                                   // 225
		var _this4 = this;                                                                                                   // 225
                                                                                                                       //
		check(this.bodyParams, {                                                                                             // 226
			userId: String,                                                                                                     // 227
			data: Match.ObjectIncluding({                                                                                       // 228
				email: Match.Maybe(String),                                                                                        // 229
				name: Match.Maybe(String),                                                                                         // 230
				password: Match.Maybe(String),                                                                                     // 231
				username: Match.Maybe(String),                                                                                     // 232
				active: Match.Maybe(Boolean),                                                                                      // 233
				roles: Match.Maybe(Array),                                                                                         // 234
				joinDefaultChannels: Match.Maybe(Boolean),                                                                         // 235
				requirePasswordChange: Match.Maybe(Boolean),                                                                       // 236
				sendWelcomeEmail: Match.Maybe(Boolean),                                                                            // 237
				verified: Match.Maybe(Boolean),                                                                                    // 238
				customFields: Match.Maybe(Object)                                                                                  // 239
			})                                                                                                                  // 228
		});                                                                                                                  // 226
                                                                                                                       //
		var userData = _.extend({                                                                                            // 243
			_id: this.bodyParams.userId                                                                                         // 243
		}, this.bodyParams.data);                                                                                            // 243
                                                                                                                       //
		Meteor.runAsUser(this.userId, function () {                                                                          // 245
			return RocketChat.saveUser(_this4.userId, userData);                                                                // 245
		});                                                                                                                  // 245
                                                                                                                       //
		if (this.bodyParams.data.customFields) {                                                                             // 247
			RocketChat.saveCustomFields(this.bodyParams.userId, this.bodyParams.data.customFields);                             // 248
		}                                                                                                                    // 249
                                                                                                                       //
		if (typeof this.bodyParams.data.active !== 'undefined') {                                                            // 251
			Meteor.runAsUser(this.userId, function () {                                                                         // 252
				Meteor.call('setUserActiveStatus', _this4.bodyParams.userId, _this4.bodyParams.data.active);                       // 253
			});                                                                                                                 // 254
		}                                                                                                                    // 255
                                                                                                                       //
		return RocketChat.API.v1.success({                                                                                   // 257
			user: RocketChat.models.Users.findOneById(this.bodyParams.userId, {                                                 // 257
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                   // 257
			})                                                                                                                  // 257
		});                                                                                                                  // 257
	}                                                                                                                     // 258
});                                                                                                                    // 224
RocketChat.API.v1.addRoute('users.createToken', {                                                                      // 261
	authRequired: true                                                                                                    // 261
}, {                                                                                                                   // 261
	post: function () {                                                                                                   // 262
		var user = this.getUserFromParams();                                                                                 // 263
		var data = void 0;                                                                                                   // 264
		Meteor.runAsUser(this.userId, function () {                                                                          // 265
			data = Meteor.call('createToken', user._id);                                                                        // 266
		});                                                                                                                  // 267
		return data ? RocketChat.API.v1.success({                                                                            // 268
			data: data                                                                                                          // 268
		}) : RocketChat.API.v1.unauthorized();                                                                               // 268
	}                                                                                                                     // 269
});                                                                                                                    // 261
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"default":{"helpers":{"getLoggedInUser.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/default/helpers/getLoggedInUser.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.default.helperMethods.set('getLoggedInUser', function () {                                              // 1
	function _getLoggedInUser() {                                                                                         // 1
		var user = void 0;                                                                                                   // 2
                                                                                                                       //
		if (this.request.headers['x-auth-token'] && this.request.headers['x-user-id']) {                                     // 4
			user = RocketChat.models.Users.findOne({                                                                            // 5
				'_id': this.request.headers['x-user-id'],                                                                          // 6
				'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(this.request.headers['x-auth-token'])          // 7
			});                                                                                                                 // 5
		}                                                                                                                    // 9
                                                                                                                       //
		return user;                                                                                                         // 11
	}                                                                                                                     // 12
                                                                                                                       //
	return _getLoggedInUser;                                                                                              // 1
}());                                                                                                                  // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"info.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/default/info.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.default.addRoute('info', {                                                                              // 1
	authRequired: false                                                                                                   // 1
}, {                                                                                                                   // 1
	get: function () {                                                                                                    // 2
		var user = this.getLoggedInUser();                                                                                   // 3
                                                                                                                       //
		if (user && RocketChat.authz.hasRole(user._id, 'admin')) {                                                           // 5
			return RocketChat.API.v1.success({                                                                                  // 6
				info: RocketChat.Info                                                                                              // 7
			});                                                                                                                 // 6
		}                                                                                                                    // 9
                                                                                                                       //
		return RocketChat.API.v1.success({                                                                                   // 11
			version: RocketChat.Info.version                                                                                    // 12
		});                                                                                                                  // 11
	}                                                                                                                     // 14
});                                                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"metrics.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_api/server/default/metrics.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RocketChat.API.default.addRoute('metrics', {                                                                           // 1
	authRequired: false                                                                                                   // 1
}, {                                                                                                                   // 1
	get: function () {                                                                                                    // 2
		return {                                                                                                             // 3
			headers: {                                                                                                          // 4
				'Content-Type': 'text/plain'                                                                                       // 4
			},                                                                                                                  // 4
			body: RocketChat.promclient.register.metrics()                                                                      // 5
		};                                                                                                                   // 3
	}                                                                                                                     // 7
});                                                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:api/server/api.js");
require("./node_modules/meteor/rocketchat:api/server/settings.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/requestParams.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/getPaginationItems.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/getUserFromParams.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/isUserFromParams.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/parseJsonQuery.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/getLoggedInUser.js");
require("./node_modules/meteor/rocketchat:api/server/default/helpers/getLoggedInUser.js");
require("./node_modules/meteor/rocketchat:api/server/default/info.js");
require("./node_modules/meteor/rocketchat:api/server/default/metrics.js");
require("./node_modules/meteor/rocketchat:api/server/v1/channels.js");
require("./node_modules/meteor/rocketchat:api/server/v1/chat.js");
require("./node_modules/meteor/rocketchat:api/server/v1/groups.js");
require("./node_modules/meteor/rocketchat:api/server/v1/im.js");
require("./node_modules/meteor/rocketchat:api/server/v1/integrations.js");
require("./node_modules/meteor/rocketchat:api/server/v1/misc.js");
require("./node_modules/meteor/rocketchat:api/server/v1/settings.js");
require("./node_modules/meteor/rocketchat:api/server/v1/stats.js");
require("./node_modules/meteor/rocketchat:api/server/v1/users.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:api'] = {};

})();

//# sourceMappingURL=rocketchat_api.js.map
