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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:push-notifications":{"server":{"methods":{"saveNotificationSettings.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_push-notifications/server/methods/saveNotificationSettings.js                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Meteor.methods({                                                                                                    // 1
	saveNotificationSettings: function (rid, field, value) {                                                           // 2
		if (!Meteor.userId()) {                                                                                           // 3
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {                                                   // 4
				method: 'saveNotificationSettings'                                                                              // 4
			});                                                                                                              // 4
		}                                                                                                                 // 5
                                                                                                                    //
		check(rid, String);                                                                                               // 7
		check(field, String);                                                                                             // 8
		check(value, String);                                                                                             // 9
                                                                                                                    //
		if (['audioNotifications', 'desktopNotifications', 'mobilePushNotifications', 'emailNotifications', 'unreadAlert', 'disableNotifications', 'hideUnreadStatus'].indexOf(field) === -1) {
			throw new Meteor.Error('error-invalid-settings', 'Invalid settings field', {                                     // 12
				method: 'saveNotificationSettings'                                                                              // 12
			});                                                                                                              // 12
		}                                                                                                                 // 13
                                                                                                                    //
		if (field !== 'hideUnreadStatus' && field !== 'disableNotifications' && ['all', 'mentions', 'nothing', 'default'].indexOf(value) === -1) {
			throw new Meteor.Error('error-invalid-settings', 'Invalid settings value', {                                     // 16
				method: 'saveNotificationSettings'                                                                              // 16
			});                                                                                                              // 16
		}                                                                                                                 // 17
                                                                                                                    //
		var subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, Meteor.userId());                // 19
                                                                                                                    //
		if (!subscription) {                                                                                              // 20
			throw new Meteor.Error('error-invalid-subscription', 'Invalid subscription', {                                   // 21
				method: 'saveNotificationSettings'                                                                              // 21
			});                                                                                                              // 21
		}                                                                                                                 // 22
                                                                                                                    //
		switch (field) {                                                                                                  // 24
			case 'audioNotifications':                                                                                       // 25
				RocketChat.models.Subscriptions.updateAudioNotificationsById(subscription._id, value);                          // 26
				break;                                                                                                          // 27
                                                                                                                    //
			case 'desktopNotifications':                                                                                     // 28
				RocketChat.models.Subscriptions.updateDesktopNotificationsById(subscription._id, value);                        // 29
				break;                                                                                                          // 30
                                                                                                                    //
			case 'mobilePushNotifications':                                                                                  // 31
				RocketChat.models.Subscriptions.updateMobilePushNotificationsById(subscription._id, value);                     // 32
				break;                                                                                                          // 33
                                                                                                                    //
			case 'emailNotifications':                                                                                       // 34
				RocketChat.models.Subscriptions.updateEmailNotificationsById(subscription._id, value);                          // 35
				break;                                                                                                          // 36
                                                                                                                    //
			case 'unreadAlert':                                                                                              // 37
				RocketChat.models.Subscriptions.updateUnreadAlertById(subscription._id, value);                                 // 38
				break;                                                                                                          // 39
                                                                                                                    //
			case 'disableNotifications':                                                                                     // 40
				RocketChat.models.Subscriptions.updateDisableNotificationsById(subscription._id, value === '1' ? true : false);
				break;                                                                                                          // 42
                                                                                                                    //
			case 'hideUnreadStatus':                                                                                         // 43
				RocketChat.models.Subscriptions.updateHideUnreadStatusById(subscription._id, value === '1' ? true : false);     // 44
				break;                                                                                                          // 45
		}                                                                                                                 // 24
                                                                                                                    //
		return true;                                                                                                      // 48
	},                                                                                                                 // 49
	saveAudioNotificationValue: function (rid, value) {                                                                // 51
		var subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, Meteor.userId());                // 52
                                                                                                                    //
		if (!subscription) {                                                                                              // 53
			throw new Meteor.Error('error-invalid-subscription', 'Invalid subscription', {                                   // 54
				method: 'saveAudioNotificationValue'                                                                            // 54
			});                                                                                                              // 54
		}                                                                                                                 // 55
                                                                                                                    //
		RocketChat.models.Subscriptions.updateAudioNotificationValueById(subscription._id, value);                        // 56
		return true;                                                                                                      // 57
	},                                                                                                                 // 58
	saveDesktopNotificationDuration: function (rid, value) {                                                           // 60
		var subscription = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(rid, Meteor.userId());                // 61
                                                                                                                    //
		if (!subscription) {                                                                                              // 62
			throw new Meteor.Error('error-invalid-subscription', 'Invalid subscription', {                                   // 63
				method: 'saveDesktopNotificationDuration'                                                                       // 63
			});                                                                                                              // 63
		}                                                                                                                 // 64
                                                                                                                    //
		RocketChat.models.Subscriptions.updateDesktopNotificationDurationById(subscription._id, value);                   // 65
		return true;                                                                                                      // 66
	}                                                                                                                  // 67
});                                                                                                                 // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"models":{"Subscriptions.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_push-notifications/server/models/Subscriptions.js                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
RocketChat.models.Subscriptions.updateAudioNotificationsById = function (_id, audioNotifications) {                 // 1
	var query = {                                                                                                      // 2
		_id: _id                                                                                                          // 3
	};                                                                                                                 // 2
	var update = {};                                                                                                   // 6
                                                                                                                    //
	if (audioNotifications === 'default') {                                                                            // 8
		update.$unset = {                                                                                                 // 9
			audioNotifications: 1                                                                                            // 9
		};                                                                                                                // 9
	} else {                                                                                                           // 10
		update.$set = {                                                                                                   // 11
			audioNotifications: audioNotifications                                                                           // 11
		};                                                                                                                // 11
	}                                                                                                                  // 12
                                                                                                                    //
	return this.update(query, update);                                                                                 // 14
};                                                                                                                  // 15
                                                                                                                    //
RocketChat.models.Subscriptions.updateAudioNotificationValueById = function (_id, audioNotificationValue) {         // 17
	var query = {                                                                                                      // 18
		_id: _id                                                                                                          // 19
	};                                                                                                                 // 18
	var update = {                                                                                                     // 22
		$set: {                                                                                                           // 23
			audioNotificationValue: audioNotificationValue                                                                   // 24
		}                                                                                                                 // 23
	};                                                                                                                 // 22
	return this.update(query, update);                                                                                 // 28
};                                                                                                                  // 29
                                                                                                                    //
RocketChat.models.Subscriptions.updateDesktopNotificationsById = function (_id, desktopNotifications) {             // 31
	var query = {                                                                                                      // 32
		_id: _id                                                                                                          // 33
	};                                                                                                                 // 32
	var update = {};                                                                                                   // 36
                                                                                                                    //
	if (desktopNotifications === 'default') {                                                                          // 38
		update.$unset = {                                                                                                 // 39
			desktopNotifications: 1                                                                                          // 39
		};                                                                                                                // 39
	} else {                                                                                                           // 40
		update.$set = {                                                                                                   // 41
			desktopNotifications: desktopNotifications                                                                       // 41
		};                                                                                                                // 41
	}                                                                                                                  // 42
                                                                                                                    //
	return this.update(query, update);                                                                                 // 44
};                                                                                                                  // 45
                                                                                                                    //
RocketChat.models.Subscriptions.updateDesktopNotificationDurationById = function (_id, value) {                     // 47
	var query = {                                                                                                      // 48
		_id: _id                                                                                                          // 49
	};                                                                                                                 // 48
	var update = {                                                                                                     // 52
		$set: {                                                                                                           // 53
			desktopNotificationDuration: value - 0                                                                           // 54
		}                                                                                                                 // 53
	};                                                                                                                 // 52
	return this.update(query, update);                                                                                 // 58
};                                                                                                                  // 59
                                                                                                                    //
RocketChat.models.Subscriptions.updateMobilePushNotificationsById = function (_id, mobilePushNotifications) {       // 61
	var query = {                                                                                                      // 62
		_id: _id                                                                                                          // 63
	};                                                                                                                 // 62
	var update = {};                                                                                                   // 66
                                                                                                                    //
	if (mobilePushNotifications === 'default') {                                                                       // 68
		update.$unset = {                                                                                                 // 69
			mobilePushNotifications: 1                                                                                       // 69
		};                                                                                                                // 69
	} else {                                                                                                           // 70
		update.$set = {                                                                                                   // 71
			mobilePushNotifications: mobilePushNotifications                                                                 // 71
		};                                                                                                                // 71
	}                                                                                                                  // 72
                                                                                                                    //
	return this.update(query, update);                                                                                 // 74
};                                                                                                                  // 75
                                                                                                                    //
RocketChat.models.Subscriptions.updateEmailNotificationsById = function (_id, emailNotifications) {                 // 77
	var query = {                                                                                                      // 78
		_id: _id                                                                                                          // 79
	};                                                                                                                 // 78
	var update = {                                                                                                     // 82
		$set: {                                                                                                           // 83
			emailNotifications: emailNotifications                                                                           // 84
		}                                                                                                                 // 83
	};                                                                                                                 // 82
	return this.update(query, update);                                                                                 // 88
};                                                                                                                  // 89
                                                                                                                    //
RocketChat.models.Subscriptions.updateUnreadAlertById = function (_id, unreadAlert) {                               // 91
	var query = {                                                                                                      // 92
		_id: _id                                                                                                          // 93
	};                                                                                                                 // 92
	var update = {                                                                                                     // 96
		$set: {                                                                                                           // 97
			unreadAlert: unreadAlert                                                                                         // 98
		}                                                                                                                 // 97
	};                                                                                                                 // 96
	return this.update(query, update);                                                                                 // 102
};                                                                                                                  // 103
                                                                                                                    //
RocketChat.models.Subscriptions.updateDisableNotificationsById = function (_id, disableNotifications) {             // 105
	var query = {                                                                                                      // 106
		_id: _id                                                                                                          // 107
	};                                                                                                                 // 106
	var update = {                                                                                                     // 110
		$set: {                                                                                                           // 111
			disableNotifications: disableNotifications                                                                       // 112
		}                                                                                                                 // 111
	};                                                                                                                 // 110
	return this.update(query, update);                                                                                 // 116
};                                                                                                                  // 117
                                                                                                                    //
RocketChat.models.Subscriptions.updateHideUnreadStatusById = function (_id, hideUnreadStatus) {                     // 119
	var query = {                                                                                                      // 120
		_id: _id                                                                                                          // 121
	};                                                                                                                 // 120
	var update = {                                                                                                     // 124
		$set: {                                                                                                           // 125
			hideUnreadStatus: hideUnreadStatus                                                                               // 126
		}                                                                                                                 // 125
	};                                                                                                                 // 124
	return this.update(query, update);                                                                                 // 130
};                                                                                                                  // 131
                                                                                                                    //
RocketChat.models.Subscriptions.findAlwaysNotifyAudioUsersByRoomId = function (roomId) {                            // 133
	var query = {                                                                                                      // 134
		rid: roomId,                                                                                                      // 135
		audioNotifications: 'all'                                                                                         // 136
	};                                                                                                                 // 134
	return this.find(query);                                                                                           // 139
};                                                                                                                  // 140
                                                                                                                    //
RocketChat.models.Subscriptions.findAlwaysNotifyDesktopUsersByRoomId = function (roomId) {                          // 142
	var query = {                                                                                                      // 143
		rid: roomId,                                                                                                      // 144
		desktopNotifications: 'all'                                                                                       // 145
	};                                                                                                                 // 143
	return this.find(query);                                                                                           // 148
};                                                                                                                  // 149
                                                                                                                    //
RocketChat.models.Subscriptions.findDontNotifyDesktopUsersByRoomId = function (roomId) {                            // 151
	var query = {                                                                                                      // 152
		rid: roomId,                                                                                                      // 153
		desktopNotifications: 'nothing'                                                                                   // 154
	};                                                                                                                 // 152
	return this.find(query);                                                                                           // 157
};                                                                                                                  // 158
                                                                                                                    //
RocketChat.models.Subscriptions.findAlwaysNotifyMobileUsersByRoomId = function (roomId) {                           // 160
	var query = {                                                                                                      // 161
		rid: roomId,                                                                                                      // 162
		mobilePushNotifications: 'all'                                                                                    // 163
	};                                                                                                                 // 161
	return this.find(query);                                                                                           // 166
};                                                                                                                  // 167
                                                                                                                    //
RocketChat.models.Subscriptions.findDontNotifyMobileUsersByRoomId = function (roomId) {                             // 169
	var query = {                                                                                                      // 170
		rid: roomId,                                                                                                      // 171
		mobilePushNotifications: 'nothing'                                                                                // 172
	};                                                                                                                 // 170
	return this.find(query);                                                                                           // 175
};                                                                                                                  // 176
                                                                                                                    //
RocketChat.models.Subscriptions.findNotificationPreferencesByRoom = function (roomId, explicit) {                   // 178
	var query = {                                                                                                      // 179
		rid: roomId,                                                                                                      // 180
		'u._id': {                                                                                                        // 181
			$exists: true                                                                                                    // 181
		}                                                                                                                 // 181
	};                                                                                                                 // 179
                                                                                                                    //
	if (explicit) {                                                                                                    // 184
		query.$or = [{                                                                                                    // 185
			audioNotifications: {                                                                                            // 186
				$exists: true                                                                                                   // 186
			}                                                                                                                // 186
		}, {                                                                                                              // 186
			audioNotificationValue: {                                                                                        // 187
				$exists: true                                                                                                   // 187
			}                                                                                                                // 187
		}, {                                                                                                              // 187
			desktopNotifications: {                                                                                          // 188
				$exists: true                                                                                                   // 188
			}                                                                                                                // 188
		}, {                                                                                                              // 188
			desktopNotificationDuration: {                                                                                   // 189
				$exists: true                                                                                                   // 189
			}                                                                                                                // 189
		}, {                                                                                                              // 189
			mobilePushNotifications: {                                                                                       // 190
				$exists: true                                                                                                   // 190
			}                                                                                                                // 190
		}, {                                                                                                              // 190
			disableNotifications: {                                                                                          // 191
				$exists: true                                                                                                   // 191
			}                                                                                                                // 191
		}];                                                                                                               // 191
	}                                                                                                                  // 193
                                                                                                                    //
	return this.find(query, {                                                                                          // 195
		fields: {                                                                                                         // 195
			'u._id': 1,                                                                                                      // 195
			audioNotifications: 1,                                                                                           // 195
			audioNotificationValue: 1,                                                                                       // 195
			desktopNotificationDuration: 1,                                                                                  // 195
			desktopNotifications: 1,                                                                                         // 195
			mobilePushNotifications: 1,                                                                                      // 195
			disableNotifications: 1                                                                                          // 195
		}                                                                                                                 // 195
	});                                                                                                                // 195
};                                                                                                                  // 196
                                                                                                                    //
RocketChat.models.Subscriptions.findWithSendEmailByRoomId = function (roomId) {                                     // 198
	var query = {                                                                                                      // 199
		rid: roomId,                                                                                                      // 200
		emailNotifications: {                                                                                             // 201
			$exists: true                                                                                                    // 202
		}                                                                                                                 // 201
	};                                                                                                                 // 199
	return this.find(query, {                                                                                          // 206
		fields: {                                                                                                         // 206
			emailNotifications: 1,                                                                                           // 206
			u: 1                                                                                                             // 206
		}                                                                                                                 // 206
	});                                                                                                                // 206
};                                                                                                                  // 207
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:push-notifications/server/methods/saveNotificationSettings.js");
require("./node_modules/meteor/rocketchat:push-notifications/server/models/Subscriptions.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:push-notifications'] = {};

})();

//# sourceMappingURL=rocketchat_push-notifications.js.map
