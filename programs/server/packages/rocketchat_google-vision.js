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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:google-vision":{"server":{"settings.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rocketchat_google-vision/server/settings.js                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Meteor.startup(function () {                                                                                      // 1
	RocketChat.settings.add('GoogleVision_Enable', false, {                                                          // 2
		type: 'boolean',                                                                                                // 3
		group: 'FileUpload',                                                                                            // 4
		section: 'Google Vision',                                                                                       // 5
		"public": true,                                                                                                 // 6
		enableQuery: {                                                                                                  // 7
			_id: 'FileUpload_Storage_Type',                                                                                // 7
			value: 'GoogleCloudStorage'                                                                                    // 7
		}                                                                                                               // 7
	});                                                                                                              // 2
	RocketChat.settings.add('GoogleVision_ServiceAccount', '', {                                                     // 9
		type: 'string',                                                                                                 // 10
		group: 'FileUpload',                                                                                            // 11
		section: 'Google Vision',                                                                                       // 12
		multiline: true,                                                                                                // 13
		enableQuery: {                                                                                                  // 14
			_id: 'GoogleVision_Enable',                                                                                    // 14
			value: true                                                                                                    // 14
		}                                                                                                               // 14
	});                                                                                                              // 9
	RocketChat.settings.add('GoogleVision_Max_Monthly_Calls', 0, {                                                   // 16
		type: 'int',                                                                                                    // 17
		group: 'FileUpload',                                                                                            // 18
		section: 'Google Vision',                                                                                       // 19
		enableQuery: {                                                                                                  // 20
			_id: 'GoogleVision_Enable',                                                                                    // 20
			value: true                                                                                                    // 20
		}                                                                                                               // 20
	});                                                                                                              // 16
	RocketChat.settings.add('GoogleVision_Current_Month', 0, {                                                       // 22
		type: 'int',                                                                                                    // 23
		group: 'FileUpload',                                                                                            // 24
		section: 'Google Vision',                                                                                       // 25
		hidden: true                                                                                                    // 26
	});                                                                                                              // 22
	RocketChat.settings.add('GoogleVision_Current_Month_Calls', 0, {                                                 // 28
		type: 'int',                                                                                                    // 29
		group: 'FileUpload',                                                                                            // 30
		section: 'Google Vision',                                                                                       // 31
		blocked: true                                                                                                   // 32
	});                                                                                                              // 28
	RocketChat.settings.add('GoogleVision_Type_Document', false, {                                                   // 34
		type: 'boolean',                                                                                                // 35
		group: 'FileUpload',                                                                                            // 36
		section: 'Google Vision',                                                                                       // 37
		enableQuery: {                                                                                                  // 38
			_id: 'GoogleVision_Enable',                                                                                    // 38
			value: true                                                                                                    // 38
		}                                                                                                               // 38
	});                                                                                                              // 34
	RocketChat.settings.add('GoogleVision_Type_Faces', false, {                                                      // 40
		type: 'boolean',                                                                                                // 41
		group: 'FileUpload',                                                                                            // 42
		section: 'Google Vision',                                                                                       // 43
		enableQuery: {                                                                                                  // 44
			_id: 'GoogleVision_Enable',                                                                                    // 44
			value: true                                                                                                    // 44
		}                                                                                                               // 44
	});                                                                                                              // 40
	RocketChat.settings.add('GoogleVision_Type_Landmarks', false, {                                                  // 46
		type: 'boolean',                                                                                                // 47
		group: 'FileUpload',                                                                                            // 48
		section: 'Google Vision',                                                                                       // 49
		enableQuery: {                                                                                                  // 50
			_id: 'GoogleVision_Enable',                                                                                    // 50
			value: true                                                                                                    // 50
		}                                                                                                               // 50
	});                                                                                                              // 46
	RocketChat.settings.add('GoogleVision_Type_Labels', false, {                                                     // 52
		type: 'boolean',                                                                                                // 53
		group: 'FileUpload',                                                                                            // 54
		section: 'Google Vision',                                                                                       // 55
		enableQuery: {                                                                                                  // 56
			_id: 'GoogleVision_Enable',                                                                                    // 56
			value: true                                                                                                    // 56
		}                                                                                                               // 56
	});                                                                                                              // 52
	RocketChat.settings.add('GoogleVision_Type_Logos', false, {                                                      // 58
		type: 'boolean',                                                                                                // 59
		group: 'FileUpload',                                                                                            // 60
		section: 'Google Vision',                                                                                       // 61
		enableQuery: {                                                                                                  // 62
			_id: 'GoogleVision_Enable',                                                                                    // 62
			value: true                                                                                                    // 62
		}                                                                                                               // 62
	});                                                                                                              // 58
	RocketChat.settings.add('GoogleVision_Type_Properties', false, {                                                 // 64
		type: 'boolean',                                                                                                // 65
		group: 'FileUpload',                                                                                            // 66
		section: 'Google Vision',                                                                                       // 67
		enableQuery: {                                                                                                  // 68
			_id: 'GoogleVision_Enable',                                                                                    // 68
			value: true                                                                                                    // 68
		}                                                                                                               // 68
	});                                                                                                              // 64
	RocketChat.settings.add('GoogleVision_Type_SafeSearch', false, {                                                 // 70
		type: 'boolean',                                                                                                // 71
		group: 'FileUpload',                                                                                            // 72
		section: 'Google Vision',                                                                                       // 73
		enableQuery: {                                                                                                  // 74
			_id: 'GoogleVision_Enable',                                                                                    // 74
			value: true                                                                                                    // 74
		}                                                                                                               // 74
	});                                                                                                              // 70
	RocketChat.settings.add('GoogleVision_Block_Adult_Images', false, {                                              // 76
		type: 'boolean',                                                                                                // 77
		group: 'FileUpload',                                                                                            // 78
		section: 'Google Vision',                                                                                       // 79
		enableQuery: [{                                                                                                 // 80
			_id: 'GoogleVision_Enable',                                                                                    // 80
			value: true                                                                                                    // 80
		}, {                                                                                                            // 80
			_id: 'GoogleVision_Type_SafeSearch',                                                                           // 80
			value: true                                                                                                    // 80
		}]                                                                                                              // 80
	});                                                                                                              // 76
	RocketChat.settings.add('GoogleVision_Type_Similar', false, {                                                    // 82
		type: 'boolean',                                                                                                // 83
		group: 'FileUpload',                                                                                            // 84
		section: 'Google Vision',                                                                                       // 85
		enableQuery: {                                                                                                  // 86
			_id: 'GoogleVision_Enable',                                                                                    // 86
			value: true                                                                                                    // 86
		}                                                                                                               // 86
	});                                                                                                              // 82
});                                                                                                               // 88
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"googlevision.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rocketchat_google-vision/server/googlevision.js                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                           //
                                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                  //
                                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                 //
                                                                                                                  //
var GoogleVision = function () {                                                                                  //
	function GoogleVision() {                                                                                        // 2
		var _this = this;                                                                                               // 2
                                                                                                                  //
		(0, _classCallCheck3.default)(this, GoogleVision);                                                              // 2
		this.storage = Npm.require('@google-cloud/storage');                                                            // 3
		this.vision = Npm.require('@google-cloud/vision');                                                              // 4
		this.storageClient = {};                                                                                        // 5
		this.visionClient = {};                                                                                         // 6
		this.enabled = RocketChat.settings.get('GoogleVision_Enable');                                                  // 7
		this.serviceAccount = {};                                                                                       // 8
		RocketChat.settings.get('GoogleVision_Enable', function (key, value) {                                          // 9
			_this.enabled = value;                                                                                         // 10
		});                                                                                                             // 11
		RocketChat.settings.get('GoogleVision_ServiceAccount', function (key, value) {                                  // 12
			try {                                                                                                          // 13
				_this.serviceAccount = JSON.parse(value);                                                                     // 14
				_this.storageClient = _this.storage({                                                                         // 15
					credentials: _this.serviceAccount                                                                            // 15
				});                                                                                                           // 15
				_this.visionClient = _this.vision({                                                                           // 16
					credentials: _this.serviceAccount                                                                            // 16
				});                                                                                                           // 16
			} catch (e) {                                                                                                  // 17
				_this.serviceAccount = {};                                                                                    // 18
			}                                                                                                              // 19
		});                                                                                                             // 20
		RocketChat.settings.get('GoogleVision_Block_Adult_Images', function (key, value) {                              // 21
			if (value) {                                                                                                   // 22
				RocketChat.callbacks.add('beforeSaveMessage', _this.blockUnsafeImages.bind(_this), RocketChat.callbacks.priority.MEDIUM, 'googlevision-blockunsafe');
			} else {                                                                                                       // 24
				RocketChat.callbacks.remove('beforeSaveMessage', 'googlevision-blockunsafe');                                 // 25
			}                                                                                                              // 26
		});                                                                                                             // 27
		RocketChat.callbacks.add('afterFileUpload', this.annotate.bind(this));                                          // 28
	}                                                                                                                // 29
                                                                                                                  //
	GoogleVision.prototype.incCallCount = function () {                                                              //
		function incCallCount(count) {                                                                                  //
			var currentMonth = new Date().getMonth();                                                                      // 32
			var maxMonthlyCalls = RocketChat.settings.get('GoogleVision_Max_Monthly_Calls') || 0;                          // 33
                                                                                                                  //
			if (maxMonthlyCalls > 0) {                                                                                     // 34
				if (RocketChat.settings.get('GoogleVision_Current_Month') !== currentMonth) {                                 // 35
					RocketChat.settings.set('GoogleVision_Current_Month', currentMonth);                                         // 36
                                                                                                                  //
					if (count > maxMonthlyCalls) {                                                                               // 37
						return false;                                                                                               // 38
					}                                                                                                            // 39
				} else if (count + (RocketChat.settings.get('GoogleVision_Current_Month_Calls') || 0) > maxMonthlyCalls) {    // 40
					return false;                                                                                                // 41
				}                                                                                                             // 42
			}                                                                                                              // 43
                                                                                                                  //
			RocketChat.models.Settings.update({                                                                            // 44
				_id: 'GoogleVision_Current_Month_Calls'                                                                       // 44
			}, {                                                                                                           // 44
				$inc: {                                                                                                       // 44
					value: count                                                                                                 // 44
				}                                                                                                             // 44
			});                                                                                                            // 44
			return true;                                                                                                   // 45
		}                                                                                                               // 46
                                                                                                                  //
		return incCallCount;                                                                                            //
	}();                                                                                                             //
                                                                                                                  //
	GoogleVision.prototype.blockUnsafeImages = function () {                                                         //
		function blockUnsafeImages(message) {                                                                           //
			if (this.enabled && this.serviceAccount && message && message.file && message.file._id) {                      // 49
				var file = RocketChat.models.Uploads.findOne({                                                                // 50
					_id: message.file._id                                                                                        // 50
				});                                                                                                           // 50
                                                                                                                  //
				if (file && file.type && file.type.indexOf('image') !== -1 && file.store === 'GoogleCloudStorage:Uploads' && file.GoogleStorage) {
					if (this.incCallCount(1)) {                                                                                  // 52
						var bucket = this.storageClient.bucket(RocketChat.settings.get('FileUpload_GoogleStorage_Bucket'));         // 53
						var bucketFile = bucket.file(file.GoogleStorage.path);                                                      // 54
						var results = Meteor.wrapAsync(this.visionClient.detectSafeSearch, this.visionClient)(bucketFile);          // 55
                                                                                                                  //
						if (results && results.adult === true) {                                                                    // 56
							FileUpload.getStore('Uploads').deleteById(file._id);                                                       // 57
							var user = RocketChat.models.Users.findOneById(message.u && message.u._id);                                // 58
                                                                                                                  //
							if (user) {                                                                                                // 59
								RocketChat.Notifications.notifyUser(user._id, 'message', {                                                // 60
									_id: Random.id(),                                                                                        // 61
									rid: message.rid,                                                                                        // 62
									ts: new Date(),                                                                                          // 63
									msg: TAPi18n.__('Adult_images_are_not_allowed', {}, user.language)                                       // 64
								});                                                                                                       // 60
							}                                                                                                          // 66
                                                                                                                  //
							throw new Meteor.Error('GoogleVisionError: Image blocked');                                                // 67
						}                                                                                                           // 68
					} else {                                                                                                     // 69
						console.error('Google Vision: Usage limit exceeded');                                                       // 70
					}                                                                                                            // 71
                                                                                                                  //
					return message;                                                                                              // 72
				}                                                                                                             // 73
			}                                                                                                              // 74
		}                                                                                                               // 75
                                                                                                                  //
		return blockUnsafeImages;                                                                                       //
	}();                                                                                                             //
                                                                                                                  //
	GoogleVision.prototype.annotate = function () {                                                                  //
		function annotate(_ref) {                                                                                       //
			var _this2 = this;                                                                                             // 77
                                                                                                                  //
			var message = _ref.message;                                                                                    // 77
			var visionTypes = [];                                                                                          // 78
                                                                                                                  //
			if (RocketChat.settings.get('GoogleVision_Type_Document')) {                                                   // 79
				visionTypes.push('document');                                                                                 // 80
			}                                                                                                              // 81
                                                                                                                  //
			if (RocketChat.settings.get('GoogleVision_Type_Faces')) {                                                      // 82
				visionTypes.push('faces');                                                                                    // 83
			}                                                                                                              // 84
                                                                                                                  //
			if (RocketChat.settings.get('GoogleVision_Type_Landmarks')) {                                                  // 85
				visionTypes.push('landmarks');                                                                                // 86
			}                                                                                                              // 87
                                                                                                                  //
			if (RocketChat.settings.get('GoogleVision_Type_Labels')) {                                                     // 88
				visionTypes.push('labels');                                                                                   // 89
			}                                                                                                              // 90
                                                                                                                  //
			if (RocketChat.settings.get('GoogleVision_Type_Logos')) {                                                      // 91
				visionTypes.push('logos');                                                                                    // 92
			}                                                                                                              // 93
                                                                                                                  //
			if (RocketChat.settings.get('GoogleVision_Type_Properties')) {                                                 // 94
				visionTypes.push('properties');                                                                               // 95
			}                                                                                                              // 96
                                                                                                                  //
			if (RocketChat.settings.get('GoogleVision_Type_SafeSearch')) {                                                 // 97
				visionTypes.push('safeSearch');                                                                               // 98
			}                                                                                                              // 99
                                                                                                                  //
			if (RocketChat.settings.get('GoogleVision_Type_Similar')) {                                                    // 100
				visionTypes.push('similar');                                                                                  // 101
			}                                                                                                              // 102
                                                                                                                  //
			if (this.enabled && this.serviceAccount && visionTypes.length > 0 && message.file && message.file._id) {       // 103
				var file = RocketChat.models.Uploads.findOne({                                                                // 104
					_id: message.file._id                                                                                        // 104
				});                                                                                                           // 104
                                                                                                                  //
				if (file && file.type && file.type.indexOf('image') !== -1 && file.store === 'GoogleCloudStorage:Uploads' && file.GoogleStorage) {
					if (this.incCallCount(visionTypes.length)) {                                                                 // 106
						var bucket = this.storageClient.bucket(RocketChat.settings.get('FileUpload_GoogleStorage_Bucket'));         // 107
						var bucketFile = bucket.file(file.GoogleStorage.path);                                                      // 108
						this.visionClient.detect(bucketFile, visionTypes, Meteor.bindEnvironment(function (error, results) {        // 109
							if (!error) {                                                                                              // 110
								RocketChat.models.Messages.setGoogleVisionData(message._id, _this2.getAnnotations(visionTypes, results));
							} else {                                                                                                   // 112
								console.trace('GoogleVision error: ', error.stack);                                                       // 113
							}                                                                                                          // 114
						}));                                                                                                        // 115
					} else {                                                                                                     // 116
						console.error('Google Vision: Usage limit exceeded');                                                       // 117
					}                                                                                                            // 118
				}                                                                                                             // 119
			}                                                                                                              // 120
		}                                                                                                               // 121
                                                                                                                  //
		return annotate;                                                                                                //
	}();                                                                                                             //
                                                                                                                  //
	GoogleVision.prototype.getAnnotations = function () {                                                            //
		function getAnnotations(visionTypes, visionData) {                                                              //
			if (visionTypes.length === 1) {                                                                                // 124
				var _visionData = {};                                                                                         // 125
				_visionData["" + visionTypes[0]] = visionData;                                                                // 126
				visionData = _visionData;                                                                                     // 127
			}                                                                                                              // 128
                                                                                                                  //
			var results = {};                                                                                              // 129
                                                                                                                  //
			for (var index in meteorBabelHelpers.sanitizeForInObject(visionData)) {                                        // 130
				if (visionData.hasOwnProperty(index)) {                                                                       // 131
					switch (index) {                                                                                             // 132
						case 'faces':                                                                                               // 133
						case 'landmarks':                                                                                           // 134
						case 'labels':                                                                                              // 135
						case 'similar':                                                                                             // 136
						case 'logos':                                                                                               // 137
							results[index] = (results[index] || []).concat(visionData[index] || []);                                   // 138
							break;                                                                                                     // 139
                                                                                                                  //
						case 'safeSearch':                                                                                          // 140
							results['safeSearch'] = visionData['safeSearch'];                                                          // 141
							break;                                                                                                     // 142
                                                                                                                  //
						case 'properties':                                                                                          // 143
							results['colors'] = visionData[index]['colors'];                                                           // 144
							break;                                                                                                     // 145
					}                                                                                                            // 132
				}                                                                                                             // 147
			}                                                                                                              // 148
                                                                                                                  //
			return results;                                                                                                // 149
		}                                                                                                               // 150
                                                                                                                  //
		return getAnnotations;                                                                                          //
	}();                                                                                                             //
                                                                                                                  //
	return GoogleVision;                                                                                             //
}();                                                                                                              //
                                                                                                                  //
RocketChat.GoogleVision = new GoogleVision();                                                                     // 153
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"models":{"Messages.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rocketchat_google-vision/server/models/Messages.js                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
RocketChat.models.Messages.setGoogleVisionData = function (messageId, visionData) {                               // 1
	var updateObj = {};                                                                                              // 2
                                                                                                                  //
	for (var index in meteorBabelHelpers.sanitizeForInObject(visionData)) {                                          // 3
		if (visionData.hasOwnProperty(index)) {                                                                         // 4
			updateObj["attachments.0." + index] = visionData[index];                                                       // 5
		}                                                                                                               // 6
	}                                                                                                                // 7
                                                                                                                  //
	return this.update({                                                                                             // 9
		_id: messageId                                                                                                  // 9
	}, {                                                                                                             // 9
		$set: updateObj                                                                                                 // 9
	});                                                                                                              // 9
};                                                                                                                // 10
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:google-vision/server/settings.js");
require("./node_modules/meteor/rocketchat:google-vision/server/googlevision.js");
require("./node_modules/meteor/rocketchat:google-vision/server/models/Messages.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:google-vision'] = {};

})();

//# sourceMappingURL=rocketchat_google-vision.js.map
