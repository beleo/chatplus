(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Importer = Package['rocketchat:importer'].Importer;
var Logger = Package['rocketchat:logger'].Logger;
var SystemLogger = Package['rocketchat:logger'].SystemLogger;
var LoggerManager = Package['rocketchat:logger'].LoggerManager;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:importer-slack":{"server.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_importer-slack/server.js                                                                  //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
var _extends2 = require("babel-runtime/helpers/extends");                                                        //
                                                                                                                 //
var _extends3 = _interopRequireDefault(_extends2);                                                               //
                                                                                                                 //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                          //
                                                                                                                 //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                 //
                                                                                                                 //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                    //
                                                                                                                 //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                           //
                                                                                                                 //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                      //
                                                                                                                 //
var _inherits3 = _interopRequireDefault(_inherits2);                                                             //
                                                                                                                 //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                //
                                                                                                                 //
/* globals Importer */Importer.Slack = function (_Importer$Base) {                                               // 1
	(0, _inherits3.default)(_class, _Importer$Base);                                                                // 2
                                                                                                                 //
	function _class(name, descriptionI18N, mimeType) {                                                              // 3
		(0, _classCallCheck3.default)(this, _class);                                                                   // 3
                                                                                                                 //
		var _this = (0, _possibleConstructorReturn3.default)(this, _Importer$Base.call(this, name, descriptionI18N, mimeType));
                                                                                                                 //
		_this.userTags = [];                                                                                           // 5
		_this.bots = {};                                                                                               // 6
                                                                                                                 //
		_this.logger.debug('Constructed a new Slack Importer.');                                                       // 7
                                                                                                                 //
		return _this;                                                                                                  // 3
	}                                                                                                               // 8
                                                                                                                 //
	_class.prototype.prepare = function () {                                                                        // 2
		function prepare(dataURI, sentContentType, fileName) {                                                         // 2
			var _this2 = this;                                                                                            // 10
                                                                                                                 //
			_Importer$Base.prototype.prepare.call(this, dataURI, sentContentType, fileName);                              // 11
                                                                                                                 //
			var _RocketChatFile$dataU = RocketChatFile.dataURIParse(dataURI),                                             // 10
			    image = _RocketChatFile$dataU.image;                                                                      // 10
                                                                                                                 //
			var zip = new this.AdmZip(new Buffer(image, 'base64'));                                                       // 14
			var zipEntries = zip.getEntries();                                                                            // 15
			var tempChannels = [];                                                                                        // 17
			var tempUsers = [];                                                                                           // 18
			var tempMessages = {};                                                                                        // 19
			zipEntries.forEach(function (entry) {                                                                         // 21
				if (entry.entryName.indexOf('__MACOSX') > -1) {                                                              // 22
					return _this2.logger.debug("Ignoring the file: " + entry.entryName);                                        // 23
				}                                                                                                            // 24
                                                                                                                 //
				if (entry.entryName === 'channels.json') {                                                                   // 26
					_this2.updateProgress(Importer.ProgressStep.PREPARING_CHANNELS);                                            // 27
                                                                                                                 //
					tempChannels = JSON.parse(entry.getData().toString()).filter(function (channel) {                           // 28
						return channel.creator != null;                                                                            // 28
					});                                                                                                         // 28
					return;                                                                                                     // 29
				}                                                                                                            // 30
                                                                                                                 //
				if (entry.entryName === 'users.json') {                                                                      // 32
					_this2.updateProgress(Importer.ProgressStep.PREPARING_USERS);                                               // 33
                                                                                                                 //
					tempUsers = JSON.parse(entry.getData().toString());                                                         // 34
					tempUsers.forEach(function (user) {                                                                         // 36
						if (user.is_bot) {                                                                                         // 37
							_this2.bots[user.profile.bot_id] = user;                                                                  // 38
						}                                                                                                          // 39
					});                                                                                                         // 40
					return;                                                                                                     // 42
				}                                                                                                            // 43
                                                                                                                 //
				if (!entry.isDirectory && entry.entryName.indexOf('/') > -1) {                                               // 45
					var item = entry.entryName.split('/');                                                                      // 46
					var channelName = item[0];                                                                                  // 47
					var msgGroupData = item[1].split('.')[0];                                                                   // 48
					tempMessages[channelName] = tempMessages[channelName] || {};                                                // 49
                                                                                                                 //
					try {                                                                                                       // 51
						tempMessages[channelName][msgGroupData] = JSON.parse(entry.getData().toString());                          // 52
					} catch (error) {                                                                                           // 53
						_this2.logger.warn(entry.entryName + " is not a valid JSON file! Unable to import it.");                   // 54
					}                                                                                                           // 55
				}                                                                                                            // 56
			}); // Insert the users record, eventually this might have to be split into several ones as well              // 57
			// if someone tries to import a several thousands users instance                                              // 60
                                                                                                                 //
			var usersId = this.collection.insert({                                                                        // 61
				'import': this.importRecord._id,                                                                             // 61
				'importer': this.name,                                                                                       // 61
				'type': 'users',                                                                                             // 61
				'users': tempUsers                                                                                           // 61
			});                                                                                                           // 61
			this.users = this.collection.findOne(usersId);                                                                // 62
			this.updateRecord({                                                                                           // 63
				'count.users': tempUsers.length                                                                              // 63
			});                                                                                                           // 63
			this.addCountToTotal(tempUsers.length); // Insert the channels records.                                       // 64
                                                                                                                 //
			var channelsId = this.collection.insert({                                                                     // 67
				'import': this.importRecord._id,                                                                             // 67
				'importer': this.name,                                                                                       // 67
				'type': 'channels',                                                                                          // 67
				'channels': tempChannels                                                                                     // 67
			});                                                                                                           // 67
			this.channels = this.collection.findOne(channelsId);                                                          // 68
			this.updateRecord({                                                                                           // 69
				'count.channels': tempChannels.length                                                                        // 69
			});                                                                                                           // 69
			this.addCountToTotal(tempChannels.length); // Insert the messages records                                     // 70
                                                                                                                 //
			this.updateProgress(Importer.ProgressStep.PREPARING_MESSAGES);                                                // 73
			var messagesCount = 0;                                                                                        // 75
			Object.keys(tempMessages).forEach(function (channel) {                                                        // 76
				var messagesObj = tempMessages[channel];                                                                     // 77
				_this2.messages[channel] = _this2.messages[channel] || {};                                                   // 78
				Object.keys(messagesObj).forEach(function (date) {                                                           // 80
					var msgs = messagesObj[date];                                                                               // 81
					messagesCount += msgs.length;                                                                               // 82
                                                                                                                 //
					_this2.updateRecord({                                                                                       // 83
						'messagesstatus': channel + "/" + date                                                                     // 83
					});                                                                                                         // 83
                                                                                                                 //
					if (Importer.Base.getBSONSize(msgs) > Importer.Base.MaxBSONSize) {                                          // 84
						var tmp = Importer.Base.getBSONSafeArraysFromAnArray(msgs);                                                // 85
						Object.keys(tmp).forEach(function (i) {                                                                    // 86
							var splitMsg = tmp[i];                                                                                    // 87
                                                                                                                 //
							var messagesId = _this2.collection.insert({                                                               // 88
								'import': _this2.importRecord._id,                                                                       // 88
								'importer': _this2.name,                                                                                 // 88
								'type': 'messages',                                                                                      // 88
								'name': channel + "/" + date + "." + i,                                                                  // 88
								'messages': splitMsg                                                                                     // 88
							});                                                                                                       // 88
                                                                                                                 //
							_this2.messages[channel][date + "." + i] = _this2.collection.findOne(messagesId);                         // 89
						});                                                                                                        // 90
					} else {                                                                                                    // 91
						var messagesId = _this2.collection.insert({                                                                // 92
							'import': _this2.importRecord._id,                                                                        // 92
							'importer': _this2.name,                                                                                  // 92
							'type': 'messages',                                                                                       // 92
							'name': channel + "/" + date,                                                                             // 92
							'messages': msgs                                                                                          // 92
						});                                                                                                        // 92
                                                                                                                 //
						_this2.messages[channel][date] = _this2.collection.findOne(messagesId);                                    // 93
					}                                                                                                           // 94
				});                                                                                                          // 95
			});                                                                                                           // 96
			this.updateRecord({                                                                                           // 98
				'count.messages': messagesCount,                                                                             // 98
				'messagesstatus': null                                                                                       // 98
			});                                                                                                           // 98
			this.addCountToTotal(messagesCount);                                                                          // 99
                                                                                                                 //
			if ([tempUsers.length, tempChannels.length, messagesCount].some(function (e) {                                // 100
				return e === 0;                                                                                              // 100
			})) {                                                                                                         // 100
				this.logger.warn("The loaded users count " + tempUsers.length + ", the loaded channels " + tempChannels.length + ", and the loaded messages " + messagesCount);
				console.log("The loaded users count " + tempUsers.length + ", the loaded channels " + tempChannels.length + ", and the loaded messages " + messagesCount);
				this.updateProgress(Importer.ProgressStep.ERROR);                                                            // 103
				return this.getProgress();                                                                                   // 104
			}                                                                                                             // 105
                                                                                                                 //
			var selectionUsers = tempUsers.map(function (user) {                                                          // 106
				return new Importer.SelectionUser(user.id, user.name, user.profile.email, user.deleted, user.is_bot, !user.is_bot);
			});                                                                                                           // 106
			var selectionChannels = tempChannels.map(function (channel) {                                                 // 107
				return new Importer.SelectionChannel(channel.id, channel.name, channel.is_archived, true, false);            // 107
			});                                                                                                           // 107
			var selectionMessages = this.importRecord.count.messages;                                                     // 108
			this.updateProgress(Importer.ProgressStep.USER_SELECTION);                                                    // 109
			return new Importer.Selection(this.name, selectionUsers, selectionChannels, selectionMessages);               // 110
		}                                                                                                              // 111
                                                                                                                 //
		return prepare;                                                                                                // 2
	}();                                                                                                            // 2
                                                                                                                 //
	_class.prototype.startImport = function () {                                                                    // 2
		function startImport(importSelection) {                                                                        // 2
			var _this3 = this;                                                                                            // 112
                                                                                                                 //
			_Importer$Base.prototype.startImport.call(this, importSelection);                                             // 113
                                                                                                                 //
			var start = Date.now();                                                                                       // 114
			Object.keys(importSelection.users).forEach(function (key) {                                                   // 116
				var user = importSelection.users[key];                                                                       // 117
				Object.keys(_this3.users.users).forEach(function (k) {                                                       // 118
					var u = _this3.users.users[k];                                                                              // 119
                                                                                                                 //
					if (u.id === user.user_id) {                                                                                // 120
						u.do_import = user.do_import;                                                                              // 121
					}                                                                                                           // 122
				});                                                                                                          // 123
			});                                                                                                           // 124
			this.collection.update({                                                                                      // 125
				_id: this.users._id                                                                                          // 125
			}, {                                                                                                          // 125
				$set: {                                                                                                      // 125
					'users': this.users.users                                                                                   // 125
				}                                                                                                            // 125
			});                                                                                                           // 125
			Object.keys(importSelection.channels).forEach(function (key) {                                                // 127
				var channel = importSelection.channels[key];                                                                 // 128
				Object.keys(_this3.channels.channels).forEach(function (k) {                                                 // 129
					var c = _this3.channels.channels[k];                                                                        // 130
                                                                                                                 //
					if (c.id === channel.channel_id) {                                                                          // 131
						c.do_import = channel.do_import;                                                                           // 132
					}                                                                                                           // 133
				});                                                                                                          // 134
			});                                                                                                           // 135
			this.collection.update({                                                                                      // 136
				_id: this.channels._id                                                                                       // 136
			}, {                                                                                                          // 136
				$set: {                                                                                                      // 136
					'channels': this.channels.channels                                                                          // 136
				}                                                                                                            // 136
			});                                                                                                           // 136
			var startedByUserId = Meteor.userId();                                                                        // 138
			Meteor.defer(function () {                                                                                    // 139
				try {                                                                                                        // 140
					_this3.updateProgress(Importer.ProgressStep.IMPORTING_USERS);                                               // 141
                                                                                                                 //
					_this3.users.users.forEach(function (user) {                                                                // 142
						if (!user.do_import) {                                                                                     // 143
							return;                                                                                                   // 144
						}                                                                                                          // 145
                                                                                                                 //
						Meteor.runAsUser(startedByUserId, function () {                                                            // 147
							var existantUser = RocketChat.models.Users.findOneByEmailAddress(user.profile.email) || RocketChat.models.Users.findOneByUsername(user.name);
                                                                                                                 //
							if (existantUser) {                                                                                       // 149
								user.rocketId = existantUser._id;                                                                        // 150
								RocketChat.models.Users.update({                                                                         // 151
									_id: user.rocketId                                                                                      // 151
								}, {                                                                                                     // 151
									$addToSet: {                                                                                            // 151
										importIds: user.id                                                                                     // 151
									}                                                                                                       // 151
								});                                                                                                      // 151
                                                                                                                 //
								_this3.userTags.push({                                                                                   // 152
									slack: "<@" + user.id + ">",                                                                            // 153
									slackLong: "<@" + user.id + "|" + user.name + ">",                                                      // 154
									rocket: "@" + existantUser.username                                                                     // 155
								});                                                                                                      // 152
							} else {                                                                                                  // 157
								var userId = user.profile.email ? Accounts.createUser({                                                  // 158
									email: user.profile.email,                                                                              // 158
									password: Date.now() + user.name + user.profile.email.toUpperCase()                                     // 158
								}) : Accounts.createUser({                                                                               // 158
									username: user.name,                                                                                    // 158
									password: Date.now() + user.name,                                                                       // 158
									joinDefaultChannelsSilenced: true                                                                       // 158
								});                                                                                                      // 158
								Meteor.runAsUser(userId, function () {                                                                   // 159
									Meteor.call('setUsername', user.name, {                                                                 // 160
										joinDefaultChannelsSilenced: true                                                                      // 160
									});                                                                                                     // 160
									var url = user.profile.image_original || user.profile.image_512;                                        // 162
                                                                                                                 //
									try {                                                                                                   // 163
										Meteor.call('setAvatarFromService', url, undefined, 'url');                                            // 164
									} catch (error) {                                                                                       // 165
										_this3.logger.warn("Failed to set " + user.name + "'s avatar from url " + url);                        // 166
                                                                                                                 //
										console.log("Failed to set " + user.name + "'s avatar from url " + url);                               // 167
									} // Slack's is -18000 which translates to Rocket.Chat's after dividing by 3600                         // 168
                                                                                                                 //
                                                                                                                 //
									if (user.tz_offset) {                                                                                   // 171
										Meteor.call('userSetUtcOffset', user.tz_offset / 3600);                                                // 172
									}                                                                                                       // 173
								});                                                                                                      // 174
								RocketChat.models.Users.update({                                                                         // 176
									_id: userId                                                                                             // 176
								}, {                                                                                                     // 176
									$addToSet: {                                                                                            // 176
										importIds: user.id                                                                                     // 176
									}                                                                                                       // 176
								});                                                                                                      // 176
                                                                                                                 //
								if (user.profile.real_name) {                                                                            // 178
									RocketChat.models.Users.setName(userId, user.profile.real_name);                                        // 179
								} //Deleted users are 'inactive' users in Rocket.Chat                                                    // 180
                                                                                                                 //
                                                                                                                 //
								if (user.deleted) {                                                                                      // 183
									Meteor.call('setUserActiveStatus', userId, false);                                                      // 184
								}                                                                                                        // 185
                                                                                                                 //
								user.rocketId = userId;                                                                                  // 187
                                                                                                                 //
								_this3.userTags.push({                                                                                   // 188
									slack: "<@" + user.id + ">",                                                                            // 189
									slackLong: "<@" + user.id + "|" + user.name + ">",                                                      // 190
									rocket: "@" + user.name                                                                                 // 191
								});                                                                                                      // 188
							}                                                                                                         // 193
                                                                                                                 //
							_this3.addCountCompleted(1);                                                                              // 195
						});                                                                                                        // 196
					});                                                                                                         // 197
                                                                                                                 //
					_this3.collection.update({                                                                                  // 198
						_id: _this3.users._id                                                                                      // 198
					}, {                                                                                                        // 198
						$set: {                                                                                                    // 198
							'users': _this3.users.users                                                                               // 198
						}                                                                                                          // 198
					});                                                                                                         // 198
                                                                                                                 //
					_this3.updateProgress(Importer.ProgressStep.IMPORTING_CHANNELS);                                            // 200
                                                                                                                 //
					_this3.channels.channels.forEach(function (channel) {                                                       // 201
						if (!channel.do_import) {                                                                                  // 202
							return;                                                                                                   // 203
						}                                                                                                          // 204
                                                                                                                 //
						Meteor.runAsUser(startedByUserId, function () {                                                            // 206
							var existantRoom = RocketChat.models.Rooms.findOneByName(channel.name);                                   // 207
                                                                                                                 //
							if (existantRoom || channel.is_general) {                                                                 // 208
								if (channel.is_general && existantRoom && channel.name !== existantRoom.name) {                          // 209
									Meteor.call('saveRoomSettings', 'GENERAL', 'roomName', channel.name);                                   // 210
								}                                                                                                        // 211
                                                                                                                 //
								channel.rocketId = channel.is_general ? 'GENERAL' : existantRoom._id;                                    // 213
								RocketChat.models.Rooms.update({                                                                         // 214
									_id: channel.rocketId                                                                                   // 214
								}, {                                                                                                     // 214
									$addToSet: {                                                                                            // 214
										importIds: channel.id                                                                                  // 214
									}                                                                                                       // 214
								});                                                                                                      // 214
							} else {                                                                                                  // 215
								var users = channel.members.reduce(function (ret, member) {                                              // 216
									if (member !== channel.creator) {                                                                       // 218
										var user = _this3.getRocketUser(member);                                                               // 219
                                                                                                                 //
										if (user && user.username) {                                                                           // 220
											ret.push(user.username);                                                                              // 221
										}                                                                                                      // 222
									}                                                                                                       // 223
                                                                                                                 //
									return ret;                                                                                             // 224
								}, []);                                                                                                  // 225
								var userId = startedByUserId;                                                                            // 226
                                                                                                                 //
								_this3.users.users.forEach(function (user) {                                                             // 227
									if (user.id === channel.creator && user.do_import) {                                                    // 228
										userId = user.rocketId;                                                                                // 229
									}                                                                                                       // 230
								});                                                                                                      // 231
                                                                                                                 //
								Meteor.runAsUser(userId, function () {                                                                   // 232
									var returned = Meteor.call('createChannel', channel.name, users);                                       // 233
									channel.rocketId = returned.rid;                                                                        // 234
								}); // @TODO implement model specific function                                                           // 235
                                                                                                                 //
								var roomUpdate = {                                                                                       // 238
									ts: new Date(channel.created * 1000)                                                                    // 239
								};                                                                                                       // 238
                                                                                                                 //
								if (!_.isEmpty(channel.topic && channel.topic.value)) {                                                  // 241
									roomUpdate.topic = channel.topic.value;                                                                 // 242
								}                                                                                                        // 243
                                                                                                                 //
								if (!_.isEmpty(channel.purpose && channel.purpose.value)) {                                              // 244
									roomUpdate.description = channel.purpose.value;                                                         // 245
								}                                                                                                        // 246
                                                                                                                 //
								RocketChat.models.Rooms.update({                                                                         // 247
									_id: channel.rocketId                                                                                   // 247
								}, {                                                                                                     // 247
									$set: roomUpdate,                                                                                       // 247
									$addToSet: {                                                                                            // 247
										importIds: channel.id                                                                                  // 247
									}                                                                                                       // 247
								});                                                                                                      // 247
							}                                                                                                         // 248
                                                                                                                 //
							_this3.addCountCompleted(1);                                                                              // 249
						});                                                                                                        // 250
					});                                                                                                         // 251
                                                                                                                 //
					_this3.collection.update({                                                                                  // 252
						_id: _this3.channels._id                                                                                   // 252
					}, {                                                                                                        // 252
						$set: {                                                                                                    // 252
							'channels': _this3.channels.channels                                                                      // 252
						}                                                                                                          // 252
					});                                                                                                         // 252
                                                                                                                 //
					var missedTypes = {};                                                                                       // 254
					var ignoreTypes = {                                                                                         // 255
						'bot_add': true,                                                                                           // 255
						'file_comment': true,                                                                                      // 255
						'file_mention': true                                                                                       // 255
					};                                                                                                          // 255
                                                                                                                 //
					_this3.updateProgress(Importer.ProgressStep.IMPORTING_MESSAGES);                                            // 256
                                                                                                                 //
					Object.keys(_this3.messages).forEach(function (channel) {                                                   // 257
						var messagesObj = _this3.messages[channel];                                                                // 258
						Meteor.runAsUser(startedByUserId, function () {                                                            // 260
							var slackChannel = _this3.getSlackChannelFromName(channel);                                               // 261
                                                                                                                 //
							if (!slackChannel || !slackChannel.do_import) {                                                           // 262
								return;                                                                                                  // 262
							}                                                                                                         // 262
                                                                                                                 //
							var room = RocketChat.models.Rooms.findOneById(slackChannel.rocketId, {                                   // 263
								fields: {                                                                                                // 263
									usernames: 1,                                                                                           // 263
									t: 1,                                                                                                   // 263
									name: 1                                                                                                 // 263
								}                                                                                                        // 263
							});                                                                                                       // 263
							Object.keys(messagesObj).forEach(function (date) {                                                        // 264
								var msgs = messagesObj[date];                                                                            // 265
								msgs.messages.forEach(function (message) {                                                               // 266
									_this3.updateRecord({                                                                                   // 267
										'messagesstatus': channel + "/" + date + "." + msgs.messages.length                                    // 267
									});                                                                                                     // 267
                                                                                                                 //
									var msgDataDefaults = {                                                                                 // 268
										_id: "slack-" + slackChannel.id + "-" + message.ts.replace(/\./g, '-'),                                // 269
										ts: new Date(parseInt(message.ts.split('.')[0]) * 1000)                                                // 270
									}; // Process the reactions                                                                             // 268
                                                                                                                 //
									if (message.reactions && message.reactions.length > 0) {                                                // 274
										msgDataDefaults.reactions = {};                                                                        // 275
										message.reactions.forEach(function (reaction) {                                                        // 277
											msgDataDefaults.reactions[reaction.name] = {                                                          // 278
												usernames: []                                                                                        // 278
											};                                                                                                    // 278
											reaction.users.forEach(function (u) {                                                                 // 280
												var rcUser = _this3.getRocketUser(u);                                                                // 281
                                                                                                                 //
												if (!rcUser) {                                                                                       // 282
													return;                                                                                             // 282
												}                                                                                                    // 282
                                                                                                                 //
												msgDataDefaults.reactions[reaction.name].usernames.push(rcUser.username);                            // 284
											});                                                                                                   // 285
                                                                                                                 //
											if (msgDataDefaults.reactions[reaction.name].usernames.length === 0) {                                // 287
												delete msgDataDefaults.reactions[reaction.name];                                                     // 288
											}                                                                                                     // 289
										});                                                                                                    // 290
									}                                                                                                       // 291
                                                                                                                 //
									if (message.type === 'message') {                                                                       // 293
										if (message.subtype) {                                                                                 // 294
											if (message.subtype === 'channel_join') {                                                             // 295
												if (_this3.getRocketUser(message.user)) {                                                            // 296
													RocketChat.models.Messages.createUserJoinWithRoomIdAndUser(room._id, _this3.getRocketUser(message.user), msgDataDefaults);
												}                                                                                                    // 298
											} else if (message.subtype === 'channel_leave') {                                                     // 299
												if (_this3.getRocketUser(message.user)) {                                                            // 300
													RocketChat.models.Messages.createUserLeaveWithRoomIdAndUser(room._id, _this3.getRocketUser(message.user), msgDataDefaults);
												}                                                                                                    // 302
											} else if (message.subtype === 'me_message') {                                                        // 303
												var msgObj = (0, _extends3.default)({}, msgDataDefaults, {                                           // 304
													msg: "_" + _this3.convertSlackMessageToRocketChat(message.text) + "_"                               // 306
												});                                                                                                  // 304
												RocketChat.sendMessage(_this3.getRocketUser(message.user), msgObj, room, true);                      // 308
											} else if (message.subtype === 'bot_message' || message.subtype === 'slackbot_response') {            // 309
												var botUser = RocketChat.models.Users.findOneById('rocket.cat', {                                    // 310
													fields: {                                                                                           // 310
														username: 1                                                                                        // 310
													}                                                                                                   // 310
												});                                                                                                  // 310
												var botUsername = _this3.bots[message.bot_id] ? _this3.bots[message.bot_id].name : message.username;
                                                                                                                 //
												var _msgObj = (0, _extends3.default)({}, msgDataDefaults, {                                          // 312
													msg: _this3.convertSlackMessageToRocketChat(message.text),                                          // 314
													rid: room._id,                                                                                      // 315
													bot: true,                                                                                          // 316
													attachments: message.attachments,                                                                   // 317
													username: botUsername || undefined                                                                  // 318
												});                                                                                                  // 312
                                                                                                                 //
												if (message.edited) {                                                                                // 321
													_msgObj.editedAt = new Date(parseInt(message.edited.ts.split('.')[0]) * 1000);                      // 322
                                                                                                                 //
													var editedBy = _this3.getRocketUser(message.edited.user);                                           // 323
                                                                                                                 //
													if (editedBy) {                                                                                     // 324
														_msgObj.editedBy = {                                                                               // 325
															_id: editedBy._id,                                                                                // 326
															username: editedBy.username                                                                       // 327
														};                                                                                                 // 325
													}                                                                                                   // 329
												}                                                                                                    // 330
                                                                                                                 //
												if (message.icons) {                                                                                 // 332
													_msgObj.emoji = message.icons.emoji;                                                                // 333
												}                                                                                                    // 334
                                                                                                                 //
												RocketChat.sendMessage(botUser, _msgObj, room, true);                                                // 335
											} else if (message.subtype === 'channel_purpose') {                                                   // 336
												if (_this3.getRocketUser(message.user)) {                                                            // 337
													RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_description', room._id, message.purpose, _this3.getRocketUser(message.user), msgDataDefaults);
												}                                                                                                    // 339
											} else if (message.subtype === 'channel_topic') {                                                     // 340
												if (_this3.getRocketUser(message.user)) {                                                            // 341
													RocketChat.models.Messages.createRoomSettingsChangedWithTypeRoomIdMessageAndUser('room_changed_topic', room._id, message.topic, _this3.getRocketUser(message.user), msgDataDefaults);
												}                                                                                                    // 343
											} else if (message.subtype === 'channel_name') {                                                      // 344
												if (_this3.getRocketUser(message.user)) {                                                            // 345
													RocketChat.models.Messages.createRoomRenamedWithRoomIdRoomNameAndUser(room._id, message.name, _this3.getRocketUser(message.user), msgDataDefaults);
												}                                                                                                    // 347
											} else if (message.subtype === 'pinned_item') {                                                       // 348
												if (message.attachments) {                                                                           // 349
													var _msgObj2 = (0, _extends3.default)({}, msgDataDefaults, {                                        // 350
														attachments: [{                                                                                    // 352
															'text': _this3.convertSlackMessageToRocketChat(message.attachments[0].text),                      // 353
															'author_name': message.attachments[0].author_subname,                                             // 354
															'author_icon': getAvatarUrlFromUsername(message.attachments[0].author_subname)                    // 355
														}]                                                                                                 // 352
													});                                                                                                 // 350
                                                                                                                 //
													RocketChat.models.Messages.createWithTypeRoomIdMessageAndUser('message_pinned', room._id, '', _this3.getRocketUser(message.user), _msgObj2);
												} else {                                                                                             // 359
													//TODO: make this better                                                                            // 360
													_this3.logger.debug('Pinned item with no attachment, needs work.'); //RocketChat.models.Messages.createWithTypeRoomIdMessageAndUser 'message_pinned', room._id, '', @getRocketUser(message.user), msgDataDefaults
                                                                                                                 //
												}                                                                                                    // 363
											} else if (message.subtype === 'file_share') {                                                        // 364
												if (message.file && message.file.url_private_download !== undefined) {                               // 365
													var details = {                                                                                     // 366
														message_id: "slack-" + message.ts.replace(/\./g, '-'),                                             // 367
														name: message.file.name,                                                                           // 368
														size: message.file.size,                                                                           // 369
														type: message.file.mimetype,                                                                       // 370
														rid: room._id                                                                                      // 371
													};                                                                                                  // 366
                                                                                                                 //
													_this3.uploadFile(details, message.file.url_private_download, _this3.getRocketUser(message.user), room, new Date(parseInt(message.ts.split('.')[0]) * 1000));
												}                                                                                                    // 374
											} else if (!missedTypes[message.subtype] && !ignoreTypes[message.subtype]) {                          // 375
												missedTypes[message.subtype] = message;                                                              // 376
											}                                                                                                     // 377
										} else {                                                                                               // 378
											var user = _this3.getRocketUser(message.user);                                                        // 379
                                                                                                                 //
											if (user) {                                                                                           // 380
												var _msgObj3 = (0, _extends3.default)({}, msgDataDefaults, {                                         // 381
													msg: _this3.convertSlackMessageToRocketChat(message.text),                                          // 383
													rid: room._id,                                                                                      // 384
													u: {                                                                                                // 385
														_id: user._id,                                                                                     // 386
														username: user.username                                                                            // 387
													}                                                                                                   // 385
												});                                                                                                  // 381
                                                                                                                 //
												if (message.edited) {                                                                                // 391
													_msgObj3.editedAt = new Date(parseInt(message.edited.ts.split('.')[0]) * 1000);                     // 392
                                                                                                                 //
													var _editedBy = _this3.getRocketUser(message.edited.user);                                          // 393
                                                                                                                 //
													if (_editedBy) {                                                                                    // 394
														_msgObj3.editedBy = {                                                                              // 395
															_id: _editedBy._id,                                                                               // 396
															username: _editedBy.username                                                                      // 397
														};                                                                                                 // 395
													}                                                                                                   // 399
												}                                                                                                    // 400
                                                                                                                 //
												try {                                                                                                // 402
													RocketChat.sendMessage(_this3.getRocketUser(message.user), _msgObj3, room, true);                   // 403
												} catch (e) {                                                                                        // 404
													_this3.logger.warn("Failed to import the message: " + msgDataDefaults._id);                         // 405
												}                                                                                                    // 406
											}                                                                                                     // 407
										}                                                                                                      // 408
									}                                                                                                       // 409
                                                                                                                 //
									_this3.addCountCompleted(1);                                                                            // 411
								});                                                                                                      // 412
							});                                                                                                       // 413
						});                                                                                                        // 414
					});                                                                                                         // 415
                                                                                                                 //
					if (!_.isEmpty(missedTypes)) {                                                                              // 417
						console.log('Missed import types:', missedTypes);                                                          // 418
					}                                                                                                           // 419
                                                                                                                 //
					_this3.updateProgress(Importer.ProgressStep.FINISHING);                                                     // 421
                                                                                                                 //
					_this3.channels.channels.forEach(function (channel) {                                                       // 423
						if (channel.do_import && channel.is_archived) {                                                            // 424
							Meteor.runAsUser(startedByUserId, function () {                                                           // 425
								Meteor.call('archiveRoom', channel.rocketId);                                                            // 426
							});                                                                                                       // 427
						}                                                                                                          // 428
					});                                                                                                         // 429
                                                                                                                 //
					_this3.updateProgress(Importer.ProgressStep.DONE);                                                          // 430
                                                                                                                 //
					var timeTook = Date.now() - start;                                                                          // 432
                                                                                                                 //
					_this3.logger.log("Import took " + timeTook + " milliseconds.");                                            // 434
				} catch (e) {                                                                                                // 435
					_this3.logger.error(e);                                                                                     // 436
                                                                                                                 //
					_this3.updateProgress(Importer.ProgressStep.ERROR);                                                         // 437
				}                                                                                                            // 438
			});                                                                                                           // 439
			return this.getProgress();                                                                                    // 441
		}                                                                                                              // 442
                                                                                                                 //
		return startImport;                                                                                            // 2
	}();                                                                                                            // 2
                                                                                                                 //
	_class.prototype.getSlackChannelFromName = function () {                                                        // 2
		function getSlackChannelFromName(channelName) {                                                                // 2
			return this.channels.channels.find(function (channel) {                                                       // 444
				return channel.name === channelName;                                                                         // 444
			});                                                                                                           // 444
		}                                                                                                              // 445
                                                                                                                 //
		return getSlackChannelFromName;                                                                                // 2
	}();                                                                                                            // 2
                                                                                                                 //
	_class.prototype.getRocketUser = function () {                                                                  // 2
		function getRocketUser(slackId) {                                                                              // 2
			var user = this.users.users.find(function (user) {                                                            // 447
				return user.id === slackId;                                                                                  // 447
			});                                                                                                           // 447
                                                                                                                 //
			if (user) {                                                                                                   // 448
				return RocketChat.models.Users.findOneById(user.rocketId, {                                                  // 449
					fields: {                                                                                                   // 449
						username: 1,                                                                                               // 449
						name: 1                                                                                                    // 449
					}                                                                                                           // 449
				});                                                                                                          // 449
			}                                                                                                             // 450
		}                                                                                                              // 451
                                                                                                                 //
		return getRocketUser;                                                                                          // 2
	}();                                                                                                            // 2
                                                                                                                 //
	_class.prototype.convertSlackMessageToRocketChat = function () {                                                // 2
		function convertSlackMessageToRocketChat(message) {                                                            // 2
			if (message != null) {                                                                                        // 453
				message = message.replace(/<!everyone>/g, '@all');                                                           // 454
				message = message.replace(/<!channel>/g, '@all');                                                            // 455
				message = message.replace(/<!here>/g, '@here');                                                              // 456
				message = message.replace(/&gt;/g, '>');                                                                     // 457
				message = message.replace(/&lt;/g, '<');                                                                     // 458
				message = message.replace(/&amp;/g, '&');                                                                    // 459
				message = message.replace(/:simple_smile:/g, ':smile:');                                                     // 460
				message = message.replace(/:memo:/g, ':pencil:');                                                            // 461
				message = message.replace(/:piggy:/g, ':pig:');                                                              // 462
				message = message.replace(/:uk:/g, ':gb:');                                                                  // 463
				message = message.replace(/<(http[s]?:[^>]*)>/g, '$1');                                                      // 464
                                                                                                                 //
				for (var _iterator = Array.from(this.userTags), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
					var _ref;                                                                                                   // 465
                                                                                                                 //
					if (_isArray) {                                                                                             // 465
						if (_i >= _iterator.length) break;                                                                         // 465
						_ref = _iterator[_i++];                                                                                    // 465
					} else {                                                                                                    // 465
						_i = _iterator.next();                                                                                     // 465
						if (_i.done) break;                                                                                        // 465
						_ref = _i.value;                                                                                           // 465
					}                                                                                                           // 465
                                                                                                                 //
					var userReplace = _ref;                                                                                     // 465
					message = message.replace(userReplace.slack, userReplace.rocket);                                           // 466
					message = message.replace(userReplace.slackLong, userReplace.rocket);                                       // 467
				}                                                                                                            // 468
			} else {                                                                                                      // 469
				message = '';                                                                                                // 470
			}                                                                                                             // 471
                                                                                                                 //
			return message;                                                                                               // 472
		}                                                                                                              // 473
                                                                                                                 //
		return convertSlackMessageToRocketChat;                                                                        // 2
	}();                                                                                                            // 2
                                                                                                                 //
	_class.prototype.getSelection = function () {                                                                   // 2
		function getSelection() {                                                                                      // 2
			var selectionUsers = this.users.users.map(function (user) {                                                   // 475
				return new Importer.SelectionUser(user.id, user.name, user.profile.email, user.deleted, user.is_bot, !user.is_bot);
			});                                                                                                           // 475
			var selectionChannels = this.channels.channels.map(function (channel) {                                       // 476
				return new Importer.SelectionChannel(channel.id, channel.name, channel.is_archived, true, false);            // 476
			});                                                                                                           // 476
			var selectionMessages = this.importRecord.count.messages;                                                     // 477
			return new Importer.Selection(this.name, selectionUsers, selectionChannels, selectionMessages);               // 478
		}                                                                                                              // 479
                                                                                                                 //
		return getSelection;                                                                                           // 2
	}();                                                                                                            // 2
                                                                                                                 //
	return _class;                                                                                                  // 2
}(Importer.Base);                                                                                                // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rocketchat_importer-slack/main.js                                                                    //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/* globals Importer */Importer.addImporter('slack', Importer.Slack, {                                            // 1
	name: 'Slack',                                                                                                  // 3
	mimeType: 'application/zip'                                                                                     // 4
});                                                                                                              // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/rocketchat:importer-slack/server.js");
require("./node_modules/meteor/rocketchat:importer-slack/main.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:importer-slack'] = {};

})();

//# sourceMappingURL=rocketchat_importer-slack.js.map
