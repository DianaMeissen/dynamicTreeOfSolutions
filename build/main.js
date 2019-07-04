/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "50e034425c7ff184c26f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _variables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables.js */ "./src/variables.js");


var state = { options: [], firstBlock: [] };

const onDocumentReady = () => {
  state.options = new Map();
  state.firstBlock = new Map();

  createComponent(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"].bauform);
};

document.addEventListener("DOMContentLoaded", onDocumentReady);

const createComponent = inputObject => {
  if (inputObject.type === "select") {

    createSelect(inputObject);
  } else if (inputObject.type === "input") {

    createInput(inputObject);
  } else if (inputObject.type === "lastEl") {

    createNecessarilyBlock(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][inputObject.nextShownElement]);
  } else if (inputObject.type === "block") {

    //inputObject.options.map(item => createComponent(mainObject[item]));
    createBlock(inputObject);
  }

  // if (inputObject.nextShownElement !== undefined) {
  //   createComponent(mainObject[inputObject.nextShownElement]);
  // }

  state.options.set(inputObject.name, inputObject.options);
};

const addHiddenOption = inputObject => {
  let variables = inputObject.options.map(item => _variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][`${item}`].type === "defaultSelected");
  if (variables.includes(true)) {
    return "";
  } else {
    return "<option selected disabled hidden>---Select item---</option>";
  }
};

const addTypeForInput = inputObject => {
  if (inputObject.inputType === "text" || inputObject.inputType === "checkbox") {
    return `type="${inputObject.inputType}"`;
  } else if (inputObject.inputType === "number") {
    return `type="${inputObject.inputType}" min="${inputObject.min}"`;
  } else if (inputObject.inputType === "file") {
    return `type="${inputObject.inputType}" accept=".csv"`;
  }
}

const createSelect = inputObject => {
  let div = document.createElement("div"), inputObjName = inputObject.name,
    elementToAppend = document.querySelector(`${inputObject.appendTo}`);
  div.id = inputObjName;

  div.innerHTML = `<label class="col-md-6">${inputObject.labelName}:</label>
  <select class="${inputObjName} col-md-6 form-control"> ${addHiddenOption(inputObject)}
  ${inputObject.options.map(item => `<option value="${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][`${item}`].name}">
  ${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][`${item}`].optionName}</option>`)}</select>`;

  elementToAppend.append(div);

  let select = document.querySelector(`.${inputObjName}`);
  select.addEventListener("change", function () {
    onSelect(select.value);
  });
};

const createInput = inputObject => {
  let div = document.createElement("div"), elementToAppend = document.querySelector(`${inputObject.appendTo}`),
    inputObjName = inputObject.name;
  div.id = inputObjName;
  div.innerHTML = `<label class="col-md-6">${inputObject.labelName}:</label>
  <input class="${inputObjName} col-md-6" ${addTypeForInput(inputObject)} required \/>`;

  elementToAppend.append(div);

  let input = document.querySelector(`.${inputObjName}`);
  input.addEventListener("click", function () {
    onSelect(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][inputObjName].nextShownElement);
  });
};

const checkState = inputObject => {
  //for deleting items
  // if (state.options.has(inputObject.name)) {

  // } else {

  // }
  //state.options.find(item => item.name === name);
};

const createNecessarilyBlock = inputObject => {
  let div = document.createElement("div"), elementToAppend = document.querySelector(`${inputObject.appendTo}`);
  div.id = inputObject.name;
  //div.className = "col-md-12";
  elementToAppend.append(div);

  inputObject.options.map(item => createBlock(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item]));
  state.firstBlock.set(inputObject.name, inputObject.options);
};

const createBlock = inputObject => {
  let div = document.createElement("div"), elementToAppend = document.querySelector(`${inputObject.appendTo}`);

  div.id = inputObject.name;
  div.innerHTML = `<hr/><h3>${inputObject.labelName}</h3>`;
  div.className = "col-md-12";
  elementToAppend.append(div);

  state.firstBlock.set(inputObject.name, inputObject.options);

  inputObject.options.map(function (item) {
    // elementToAppend = document.querySelector(`${mainObject[item].appendTo}`)
    div = document.createElement("div");
    div.id = _variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].name;

    if (_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].type == "select") {
      div.innerHTML = `<label class="col-md-6">${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].labelName}:</label>
      <select class="${inputObject.name} col-md-6 form-control"> ${addHiddenOption(inputObject)}
      ${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].options.map(newItem => `<option value="${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][`${newItem}`].name}">
      ${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][`${newItem}`].optionName}</option>`)}</select>`;

    } else if (_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].type == "input") {
      if (_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].inputType == "checkbox") {
        div.innerHTML = `<input ${addTypeForInput(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item])} \/>
        <label for="${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].name}" class="label-pad">${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].labelName}</label>`
      } else {
        div.className = "col-md-6";
        div.innerHTML = `<label>${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].labelName}:</label>
        <input class="${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].name}" ${addTypeForInput(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item])} required \/>`;
      }
    }

    elementToAppend.append(div);
    state.firstBlock.set(item.name, item.options);

    let input = document.querySelector(`.${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].name}`);
    console.log("listener added to " + `.${_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].name}`);
    if (!input === null) {
      input.addEventListener("click", function () {
        onSelectForNecessarlyBlock(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][item].nextShownElement);
      });
    }
  });
}

const onSelectForNecessarlyBlock = name => {
  checkState(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][name]);
  createNecessarilyBlock(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][name]);
};

const onSelect = name => {
  checkState(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][name]);
  createComponent(_variables_js__WEBPACK_IMPORTED_MODULE_0__["default"][name]);
};



// const onSelect = name => {
// 	console.log("****" + name);
// 	state[name] = window[name];
// 	Object.keys(state).map(key => {
// 		if (state[key].type === 'select' ) {
// 			selectCmp(state[key].option)
// 		} else {
// 			checkBoxCmp(state[key].option)
// 		}
// 	})
// 	checkState(eval(name));
// 	createComponent(eval(name));
//	 };

//	 //for deleting items
//	 state.options.find(item => item.name === name);
//	 state.rsults = [{
// 		name: 'bAufasdasdsdsa',
// 		value: ''
//	 }]


/***/ }),

/***/ "./src/variables.js":
/*!**************************!*\
  !*** ./src/variables.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const mainObject = {

  /*block of dead end points*/

  UntenLinks: {
    type: 'lastEl',
    name: "UntenLinks",
    nextShownElement: "firstBlock",
    optionName: "Unten Links"
  },

  ObenLinks: {
    type: 'lastEl',
    name: "ObenLinks",
    nextShownElement: "firstBlock",
    optionName: "Oben Links"
  },

  UntenRechts: {
    type: 'lastEl',
    name: "UntenRechts",
    nextShownElement: "firstBlock",
    optionName: "Unten Rechts"
  },

  ObenRechts: {
    type: 'lastEl',
    name: "ObenRechts",
    nextShownElement: "firstBlock",
    optionName: "Oben Rechts"
  },

  hitagMIT24450: {
    type: 'lastEl',
    name: "hitagMIT24450",
    optionName: "HITAG 2 mit EM4450"
  },

  hitagMIT24102: {
    type: 'lastEl',
    name: "hitagMIT24102",
    optionName: "HITAG 2 mit EM4200 (EM4102)"
  },

  hitagMIT14450: {
    type: 'lastEl',
    name: "hitagMIT14450",
    optionName: "HITAG 1 mit EM4450"
  },

  hitagMIT14102: {
    type: 'lastEl',
    name: "hitagMIT14102",
    optionName: "HITAG 1 mit EM4200 (EM4102)"
  },

  mifareDESFire4kInduktiv: {
    type: 'lastEl',
    name: "mifareDESFire4kInduktiv",
    optionName: "MIFARE DESFire EV1 4K mit Induktiv, Kartenstärke ca. 1mm"
  },

  mifareDESFire4kSupertagUHFmonza: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertagUHFmonza",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit UHF Monza 3 (Monza 4, 5, Gen 2)"
  },

  mifareDESFire4kSupertagAtmel: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertagAtmel",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit Atmel (Temic, Q5) 5577"
  },

  mifareDESFire4kSupertagProx125: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertagProx125",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  mifareDESFire4kSupertagICode: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertagICode",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit I-Code SLI S20"
  },

  mifareDESFire4kSupertagEM4200codiert: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertagEM4200codiert",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit EM4200 (EM4102) 0F-codiert"
  },

  mifareDESFire4kSupertagEM4450: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertagEM4450",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit EM4450"
  },

  mifareDESFire4kSupertagEM4200: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertagEM4200",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit EM4200 (EM4102)"
  },

  mifareDESFire4kSupertagS: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertagS",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit HITAG S 2048 bit"
  },

  mifareDESFire4kSupertag2: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertag2",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit HITAG 2"
  },

  mifareDESFire4kSupertag1: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertag1",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit HITAG 1"
  },

  mifareDESFire4kSupertagMifareClassic: {
    type: 'lastEl',
    name: "mifareDESFire4kSupertagMifareClassic",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit MIFARE Classic EV1 4K"
  },

  mifareDESFire4kMifareClassic: {
    type: 'lastEl',
    name: "mifareDESFire4kMifareClassic",
    optionName: "MIFARE DESFire EV1 4K mit MIFARE Classic EV1 1K"
  },

  mifareDESFire8kInduktiv: {
    type: 'lastEl',
    name: "mifareDESFire8kInduktiv",
    optionName: "MIFARE DESFire EV1 8K mit Induktiv, Kartenstärke ca. 1mm"
  },

  mifareDESFire8kSupertagUHFmonza: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertagUHFmonza",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit UHF Monza 3 (Monza 4, 5, Gen 2)"
  },

  mifareDESFire8kSupertagAtmel: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertagAtmel",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit Atmel (Temic, Q5) 5577"
  },

  mifareDESFire8kSupertagProx125: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertagProx125",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  mifareDESFire8kSupertagICode: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertagICode",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit I-Code SLI S20"
  },

  mifareDESFire8kSupertagEM4200codiert: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertagEM4200codiert",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit EM4200 (EM4102) 0F-codiert"
  },

  mifareDESFire8kSupertagEM4450: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertagEM4450",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit EM4450"
  },

  mifareDESFire8kSupertagEM4200: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertagEM4200",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit EM4200 (EM4102)"
  },

  mifareDESFire8kSupertagS: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertagS",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit HITAG S 2048 bit"
  },

  mifareDESFire8kSupertag2: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertag2",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit HITAG 2"
  },

  mifareDESFire8kSupertag1: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertag1",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit HITAG 1"
  },

  mifareDESFire8kSupertagMifareClassic: {
    type: 'lastEl',
    name: "mifareDESFire8kSupertagMifareClassic",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit MIFARE Classic EV1 4K"
  },

  mifareDESFire8kMifareClassic: {
    type: 'lastEl',
    name: "mifareDESFire8kMifareClassic",
    optionName: "MIFARE DESFire EV1 8K mit MIFARE Classic EV1 1K"
  },

  mifareClassic1kMitInduktiv: {
    type: 'lastEl',
    name: "mifareClassic1kMitInduktiv",
    optionName: "MIFARE Classic EV1 1K mit Induktiv, Kartenstärke ca. 1mm"
  },

  mifareClassic1kMitUHFMonza: {
    type: 'lastEl',
    name: "mifareClassic1kMitUHFMonza",
    optionName: "MIFARE Classic EV1 1K mit UHF Monza 3 (Monza 4, 5, Gen 2)"
  },

  mifareClassic1kMitAtmel: {
    type: 'lastEl',
    name: "mifareClassic1kMitAtmel",
    optionName: "MIFARE Classic EV1 1K mit Atmel (Temic, Q5) 5577"
  },

  mifareClassic1kMitProx125: {
    type: 'lastEl',
    name: "mifareClassic1kMitProx125",
    optionName: "MIFARE Classic EV1 1K mit Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  mifareClassic1kMit4450: {
    type: 'lastEl',
    name: "mifareClassic1kMit4450",
    optionName: "MIFARE Classic EV1 1K mit EM4450"
  },

  mifareClassic1kMitEM4200: {
    type: 'lastEl',
    name: "mifareClassic1kMitEM4200",
    optionName: "MIFARE Classic EV1 1K mit EM4200 (EM4102)"
  },

  mifareClassic1kMitHitag2: {
    type: 'lastEl',
    name: "mifareClassic1kMitHitag2",
    optionName: "MIFARE Classic EV1 1K mit HITAG 2"
  },

  mifareClassic1kMitHitag1: {
    type: 'lastEl',
    name: "mifareClassic1kMitHitag1",
    optionName: "MIFARE Classic EV1 1K mit HITAG 1"
  },

  mifareClassic4kMitInduktiv: {
    type: 'lastEl',
    name: "mifareClassic4kMitInduktiv",
    optionName: "MIFARE Classic EV1 4K mit Induktiv, Kartenstärke ca. 1mm"
  },

  mifareClassic4kMitUHFMonza: {
    type: 'lastEl',
    name: "mifareClassic4kMitUHFMonza",
    optionName: "MIFARE Classic EV1 4K mit UHF Monza 3 (Monza 4, 5, Gen 2)"
  },

  mifareClassic4kMitAtmel: {
    type: 'lastEl',
    name: "mifareClassic4kMitAtmel",
    optionName: "MIFARE Classic EV1 4K mit Atmel (Temic, Q5) 5577"
  },

  mifareClassic4kMitProx125: {
    type: 'lastEl',
    name: "mifareClassic4kMitProx125",
    optionName: "MIFARE Classic EV1 4K mit Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  mifareClassic4kMit4450: {
    type: 'lastEl',
    name: "mifareClassic4kMit4450",
    optionName: "MIFARE Classic EV1 4K mit EM4450"
  },

  mifareClassic4kMitEM4200: {
    type: 'lastEl',
    name: "mifareClassic4kMitEM4200",
    optionName: "MIFARE Classic EV1 4K mit EM4200 (EM4102)"
  },

  mifareClassic4kMitHitag2: {
    type: 'lastEl',
    name: "mifareClassic4kMitHitag2",
    optionName: "MIFARE Classic EV1 4K mit HITAG 2"
  },

  mifareClassic4kMitHitag1: {
    type: 'lastEl',
    name: "mifareClassic4kMitHitag1",
    optionName: "MIFARE Classic EV1 4K mit HITAG 1"
  },

  legicAdvant4096mitInduktiv: {
    type: 'lastEl',
    name: "legicAdvant4096mitInduktiv",
    optionName: "LEGIC Advant ATC 4096 MP mit Induktiv, Kartenstärke 1,0 mm"
  },

  legicAdvant4096mitUHFmonza: {
    type: 'lastEl',
    name: "legicAdvant4096mitUHFmonza",
    optionName: "LEGIC Advant ATC 4096 MP mit UHF Monza 3 / 4 / 5 / Gen 2"
  },

  legicAdvant4096mitAtmel5577: {
    type: 'lastEl',
    name: "legicAdvant4096mitAtmel5577",
    optionName: "LEGIC Advant ATC 4096 MPmit Atmel (Temic, Q5) 5577"
  },

  legicAdvant4096mitProx125: {
    type: 'lastEl',
    name: "legicAdvant4096mitProx125",
    optionName: "LEGIC Advant ATC 4096 MP mit Prox 125 kHz / 26 Bit (34, 35, 36, 37)"
  },

  legicAdvant4096mitICode: {
    type: 'lastEl',
    name: "legicAdvant4096mitICode",
    optionName: "LEGIC Advant ATC 4096 MP mit I-Code SLI S20"
  },

  legicAdvant4096mitEM4200codiert: {
    type: 'lastEl',
    name: "legicAdvant4096mitEM4200codiert",
    optionName: "LEGIC Advant ATC 4096 MP mit EM4200 0F-codiert"
  },

  legicAdvant4096mitEM4450: {
    type: 'lastEl',
    name: "legicAdvant4096mitEM4450",
    optionName: "LEGIC Advant ATC 4096 MP mit EM4450"
  },

  legicAdvant4096mitEM4200: {
    type: 'lastEl',
    name: "legicAdvant4096mitEM4200",
    optionName: "LEGIC Advant ATC 4096 MP mit EM4200 (EM4102)"
  },

  legicAdvant4096mitHitagS2048: {
    type: 'lastEl',
    name: "legicAdvant4096mitHitagS2048",
    optionName: "LEGIC Advant ATC 4096 MP mit HITAG S 2048 Bit"
  },

  legicAdvant4096mitHitag256: {
    type: 'lastEl',
    name: "legicAdvant4096mitHitag256",
    optionName: "LEGIC Advant ATC 4096 MP mit HITAG 2 256 Bit"
  },

  legicAdvant4096mitHitag2048: {
    type: 'lastEl',
    name: "legicAdvant4096mitHitag2048",
    optionName: "LEGIC Advant ATC 4096 MP mit HITAG 1 2048 Bit"
  },

  legicAdvant4096mitMifareDESFire: {
    type: 'lastEl',
    name: "legicAdvant4096mitMifareDESFire",
    optionName: "LEGIC Advant ATC 4096 MP mit MIFARE DESFire EV1 4K V05 70pF Supertag"
  },

  legicAdvant4096mitMifareClassic4k: {
    type: 'lastEl',
    name: "legicAdvant4096mitMifareClassic4k",
    optionName: "LEGIC Advant ATC 4096 MP mit MIFARE Classic EV1 4K"
  },

  legicAdvant4096mitMifareClassic1k: {
    type: 'lastEl',
    name: "legicAdvant4096mitMifareClassic1k",
    optionName: "LEGIC Advant ATC 4096 MP mit MIFARE Classic EV1 1K"
  },

  legicAdvant4096mitLegic: {
    type: 'lastEl',
    name: "legicAdvant4096mitLegic",
    optionName: "LEGIC Advant ATC 4096 MP mit LEGIC Advant ATC 4096 MP311 V2 Supertag"
  },

  legicAdvant1024mitInduktiv: {
    type: 'lastEl',
    name: "legicAdvant1024mitInduktiv",
    optionName: "LEGIC Advant ATC 1024 MV mit Induktiv, Kartenstärke 1,0 mm"
  },

  legicAdvant1024mitUHFmonza: {
    type: 'lastEl',
    name: "legicAdvant1024mitUHFmonza",
    optionName: "LEGIC Advant ATC 1024 MV mit UHF Monza 3 / 4 / 5 / Gen 2"
  },

  legicAdvant1024mitAtmel5577: {
    type: 'lastEl',
    name: "legicAdvant1024mitAtmel5577",
    optionName: "LEGIC Advant ATC 1024 MVmit Atmel (Temic, Q5) 5577"
  },

  legicAdvant1024mitProx125: {
    type: 'lastEl',
    name: "legicAdvant1024mitProx125",
    optionName: "LEGIC Advant ATC 1024 MV mit Prox 125 kHz / 26 Bit (34, 35, 36, 37)"
  },

  legicAdvant1024mitICode: {
    type: 'lastEl',
    name: "legicAdvant1024mitICode",
    optionName: "LEGIC Advant ATC 1024 MV mit I-Code SLI S20"
  },

  legicAdvant1024mitEM4200codiert: {
    type: 'lastEl',
    name: "legicAdvant1024mitEM4200codiert",
    optionName: "LEGIC Advant ATC 1024 MV mit EM4200 0F-codiert"
  },

  legicAdvant1024mitEM4450: {
    type: 'lastEl',
    name: "legicAdvant1024mitEM4450",
    optionName: "LEGIC Advant ATC 1024 MV mit EM4450"
  },

  legicAdvant1024mitEM4200: {
    type: 'lastEl',
    name: "legicAdvant1024mitEM4200",
    optionName: "LEGIC Advant ATC 1024 MV mit EM4200 (EM4102)"
  },

  legicAdvant1024mitHitagS2048: {
    type: 'lastEl',
    name: "legicAdvant1024mitHitagS2048",
    optionName: "LEGIC Advant ATC 1024 MV mit HITAG S 2048 Bit"
  },

  legicAdvant1024mitHitag256: {
    type: 'lastEl',
    name: "legicAdvant1024mitHitag256",
    optionName: "LEGIC Advant ATC 1024 MV mit HITAG 2 256 Bit"
  },

  legicAdvant1024mitHitag2048: {
    type: 'lastEl',
    name: "legicAdvant1024mitHitag2048",
    optionName: "LEGIC Advant ATC 1024 MV mit HITAG 1 2048 Bit"
  },

  legicAdvant1024mitMifareDESFire: {
    type: 'lastEl',
    name: "legicAdvant1024mitMifareDESFire",
    optionName: "LEGIC Advant ATC 1024 MV mit MIFARE DESFire EV1 4K V05 70pF Supertag"
  },

  legicAdvant1024mitMifareClassic4k: {
    type: 'lastEl',
    name: "legicAdvant1024mitMifareClassic4k",
    optionName: "LEGIC Advant ATC 1024 MV mit MIFARE Classic EV1 4K"
  },

  legicAdvant1024mitMifareClassic1k: {
    type: 'lastEl',
    name: "legicAdvant1024mitMifareClassic1k",
    optionName: "LEGIC Advant ATC 1024 MV mit MIFARE Classic EV1 1K"
  },

  legicAdvant1024mitLegic: {
    type: 'lastEl',
    name: "legicAdvant1024mitLegic",
    optionName: "LEGIC Advant ATC 1024 MV mit LEGIC Advant ATC 4096 MP311 V2 Supertag"
  },

  legicMIM1024mitInduktiv: {
    type: 'lastEl',
    name: "legicMIM1024mitInduktiv",
    optionName: "LEGIC MIM 1024 mit Induktiv, Kartenstärke 1,0 mm"
  },

  legicMIM1024mitUHFmonza: {
    type: 'lastEl',
    name: "legicMIM1024mitUHFmonza",
    optionName: "LEGIC MIM 1024 mit UHF Monza 3 / 4 / 5 / Gen 2"
  },

  legicMIM1024mitAtmel5577: {
    type: 'lastEl',
    name: "legicMIM1024mitAtmel5577",
    optionName: "LEGIC MIM 1024 mit Atmel (Temic, Q5) 5577"
  },

  legicMIM1024mitProx125: {
    type: 'lastEl',
    name: "legicMIM1024mitProx125",
    optionName: "LEGIC MIM 1024 mit Prox 125 kHz / 26 Bit (34, 35, 36, 37)"
  },

  legicMIM1024mitICode: {
    type: 'lastEl',
    name: "legicMIM1024mitICode",
    optionName: "LEGIC MIM 1024 mit I-Code SLI S20"
  },

  legicMIM1024mitEM4200codiert: {
    type: 'lastEl',
    name: "legicMIM1024mitEM4200codiert",
    optionName: "LEGIC MIM 1024 mit EM4200 0F-codiert"
  },

  legicMIM1024mitEM4450: {
    type: 'lastEl',
    name: "legicMIM1024mitEM4450",
    optionName: "LEGIC MIM 1024 mit EM4450"
  },

  legicMIM1024mitEM4200: {
    type: 'lastEl',
    name: "legicMIM1024mitEM4200",
    optionName: "LEGIC MIM 1024 mit EM4200 (EM4102)"
  },

  legicMIM1024mitHitagS2048: {
    type: 'lastEl',
    name: "legicMIM1024mitHitagS2048",
    optionName: "LEGIC MIM 1024 mit HITAG S 2048 Bit"
  },

  legicMIM1024mitHitag256: {
    type: 'lastEl',
    name: "legicMIM1024mitHitag256",
    optionName: "LEGIC MIM 1024 mit HITAG 2 256 Bit"
  },

  legicMIM1024mitHitag2048: {
    type: 'lastEl',
    name: "legicMIM1024mitHitag2048",
    optionName: "LEGIC MIM 1024 mit HITAG 1 2048 Bit"
  },

  legicMIM1024mitMifareDESFire: {
    type: 'lastEl',
    name: "legicMIM1024mitMifareDESFire",
    optionName: "LEGIC MIM 1024 mit MIFARE DESFire EV1 4K V05 70pF Supertag"
  },

  legicMIM1024mitMifareClassic4k: {
    type: 'lastEl',
    name: "legicMIM1024mitMifareClassic4k",
    optionName: "LEGIC MIM 1024 mit MIFARE Classic EV1 4K"
  },

  legicMIM1024mitMifareClassic1k: {
    type: 'lastEl',
    name: "legicMIM1024mitMifareClassic1k",
    optionName: "LEGIC MIM 1024 mit MIFARE Classic EV1 1K"
  },

  legicMIM1024mitLegic: {
    type: 'lastEl',
    name: "legicMIM1024mitLegic",
    optionName: "LEGIC MIM 1024 mit LEGIC Advant ATC 4096 MP311 V2 Supertag"
  },

  individualChiplageRfidHybridBreite: {
    type: 'input',
    inputType: 'number',
    min: 0,
    name: "individualChiplageRfidHybridBreite",
    nextShownElement: "firstBlock",
    labelName: "Breite"
  },

  individualChiplageRfidHybridHöhe: {
    type: 'input',
    inputType: 'number',
    min: 0,
    name: "individualChiplageRfidHybridHöhe",
    nextShownElement: "firstBlock",
    labelName: "Höhe"
  },

  individualChiplageRfidHybridPositionX: {
    type: 'input',
    inputType: 'number',
    min: 0,
    name: "individualChiplageRfidHybridPositionX",
    nextShownElement: "firstBlock",
    labelName: "Position X"
  },

  individualChiplageRfidHybridPositionY: {
    type: 'input',
    inputType: 'number',
    min: 0,
    name: "individualChiplageRfidHybridPositionY",
    nextShownElement: "firstBlock",
    labelName: "Position Y"
  },

  sichtausweis: {
    type: "lastEl",
    name: "sichtausweis",
    nextShownElement: "firstBlock",
    optionName: "Sichtausweis"
  },

  prox: {
    type: "lastEl",
    name: "prox",
    optionName: "Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  tagIt: {
    type: "lastEl",
    name: "tagIt",
    optionName: "Tag-it Plus 2048 bit"
  },

  iCode: {
    type: "lastEl",
    name: "iCode",
    optionName: "I-Code SLI S20 / SLIX"
  },

  atmel: {
    type: "lastEl",
    name: "atmel",
    optionName: "Atmel (Temic) ATA5577"
  },

  q5: {
    type: "lastEl",
    name: "q5",
    optionName: "Q5"
  },

  monza: {
    type: "lastEl",
    name: "monza",
    optionName: "UHF Monza 3 / 4 / 5"
  },

  em4200: {
    type: "lastEl",
    name: "em4200",
    optionName: "EM4200 (EM4102)"
  },

  em4450: {
    type: "lastEl",
    name: "em4450",
    optionName: "EM4450"
  },

  em4200Codiert: {
    type: "lastEl",
    name: "em4200Codiert",
    optionName: "EM4200 (EM4102) 0F-codiert"
  },

  hitag: {
    type: "lastEl",
    name: "hitag",
    optionName: "HITAG 1 2048 Bit"
  },

  hitag2: {
    type: "lastEl",
    name: "hitag2",
    optionName: "HITAG 2 256 Bit"
  },

  hitagS2048: {
    type: "lastEl",
    name: "hitagS2048",
    optionName: "HITAG S 2048 Bit"
  },

  hitagS256: {
    type: "lastEl",
    name: "hitagS256",
    optionName: "HITAG S 256 Bit"
  },

  fudan: {
    type: "lastEl",
    name: "fudan",
    optionName: "FUDAN Microelectronics 1K Chip FM11RF08"
  },

  fudan4K: {
    type: "lastEl",
    name: "fudan4K",
    optionName: "FUDAN Microelectronics 4K Chip FM11RF32N"
  },

  mifareClassic: {
    type: "lastEl",
    name: "mifareClassic",
    optionName: "MIFARE Classic 1K (4B NUID)"
  },

  mifareClassicNXP4B: {
    type: "lastEl",
    name: "mifareClassicNXP4B",
    optionName: "MIFARE Classic NXP EV1 1K (4B NUID)"
  },

  mifareClassicNXP7B: {
    type: "lastEl",
    name: "mifareClassicNXP7B",
    optionName: "MIFARE Classic NXP EV1 1K (7B UID)"
  },

  mifareClassicNXP4K: {
    type: "lastEl",
    name: "mifareClassicNXP4K",
    optionName: "MIFARE Classic NXP EV1 4K"
  },

  mifareUltralight: {
    type: "lastEl",
    name: "mifareUltralight",
    optionName: "MIFARE Ultralight MF0ICU1X 64 Byte"
  },

  mifareDES4: {
    type: "lastEl",
    name: "mifareDES4",
    optionName: "MIFARE DESFire EV1 4K V05 17pF"
  },

  mifareDES4Supertag: {
    type: "lastEl",
    name: "mifareDES4Supertag",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag"
  },

  mifareDES8: {
    type: "lastEl",
    name: "mifareDES8",
    optionName: "MIFARE DESFire EV1 8K V05 17pF"
  },

  mifareDES8Supertag: {
    type: "lastEl",
    name: "mifareDES8Supertag",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag"
  },

  mifarePlusS: {
    type: "lastEl",
    name: "mifarePlusS",
    optionName: "MIFARE Plus S 4K (7B UID)"
  },

  mifarePlusX: {
    type: "lastEl",
    name: "mifarePlusX",
    optionName: "MIFARE Plus X 4K (7B UID)"
  },

  legicMIM256: {
    type: "lastEl",
    name: "legicMIM256",
    optionName: "LEGIC MIM 256"
  },

  legicMIM256Supertag: {
    type: "lastEl",
    name: "legicMIM256Supertag",
    optionName: "LEGIC MIM 256 Supertag"
  },

  legicMIM1024: {
    type: "lastEl",
    name: "legicMIM1024",
    optionName: "LEGIC MIM 1024"
  },

  legicMIM1024Supertag: {
    type: "lastEl",
    name: "legicMIM1024Supertag",
    optionName: "LEGIC MIM 1024 Supertag"
  },

  legicATC128: {
    type: "lastEl",
    name: "legicATC128",
    optionName: "LEGIC Advant ATC 128 MV, ISO 15693"
  },

  legicATC1024: {
    type: "lastEl",
    name: "legicATC1024",
    optionName: "LEGIC Advant ATC 1024 MV, ISO 15693"
  },

  legicATC4096: {
    type: "lastEl",
    name: "legicATC4096",
    nextShownElement: "firstBlock",
    optionName: "LEGIC Advant ATC 4096 MP 311 V2, ISO 14443"
  },

  legicATC4096Supertag: {
    type: "lastEl",
    name: "legicATC4096Supertag",
    nextShownElement: "firstBlock",
    optionName: "LEGIC Advant ATC 4096 MP 311 V2 Supertag, ISO 14443"
  },

  legicCTC4096: {
    type: "lastEl",
    name: "legicCTC4096",
    nextShownElement: "firstBlock",
    optionName: "LEGIC CTC 4096, ISO 14443"
  },

  linksISO: {
    type: "lastEl",
    name: "linksISO",
    nextShownElement: "firstBlock",
    optionName: "Links, gem. ISO"
  },

  rechtsISO: {
    type: "lastEl",
    name: "rechtsISO",
    nextShownElement: "firstBlock",
    optionName: "Rechts gem. ISO"
  },

  obenISO: {
    type: "lastEl",
    name: "obenISO",
    nextShownElement: "firstBlock",
    optionName: "Oben, gem. ISO"
  },

  untenISO: {
    type: "lastEl",
    name: "untenISO",
    nextShownElement: "firstBlock",
    optionName: "Unten, gem. ISO"
  },

  positionKontaktchipAndCodierung: {
    type: "select",
    appendTo: "#wrapper",
    name: "positionKontaktchipAndCodierung",
    options: ["linksISO", "rechtsISO"],
    labelName: "Position Kontaktchip"
  },

  SLE66CX680pemitCardOS44Betriebssystem: {
    type: "lastEl",
    name: "SLE66CX680pemitCardOS44Betriebssystem",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "SLE66CX680pe mit CardOS 4.4 Betriebssystem"
  },

  P5CC072mitStarCOS30: {
    type: "lastEl",
    name: "P5CC072mitStarCOS30",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "P5CC072 mit StarCOS 3.0"
  },

  GemaltoChipNETv3IDPrime510: {
    type: "lastEl",
    name: "GemaltoChipNETv3IDPrime510",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Gemalto Chip .NET v3 ID Prime 510"
  },

  GemaltoCyberflexAccess64kv2CTOPIMFIPSCY2: {
    type: "lastEl",
    name: "GemaltoCyberflexAccess64kv2CTOPIMFIPSCY2",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Gemalto Cyberflex Access 64kv2C TOP IM FIPS CY2"
  },

  P5CD080mitTCOS30: {
    type: "lastEl",
    name: "P5CD080mitTCOS30",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "P5CD080 mit TCOS 3.0"
  },

  J2A080GX0T0BG295mitJCOP21241SingleInterface80kB: {
    type: "lastEl",
    name: "J2A080GX0T0BG295mitJCOP21241SingleInterface80kB",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "J2A080GX0/T0BG295 mit JCOP21 2.4.1 Single Interface 80kB"
  },

  Kontaktspeicherchip24LC16: {
    type: "lastEl",
    name: "Kontaktspeicherchip24LC16",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip 24LC16"
  },

  Kontaktspeicherchip24LC32: {
    type: "lastEl",
    name: "Kontaktspeicherchip24LC32",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip 24LC32"
  },

  Kontaktspeicherchip24LC128: {
    type: "lastEl",
    name: "Kontaktspeicherchip24LC128",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip 24LC128"
  },

  KontaktspeicherchipSLE55421024byteSpeicherPINSchutz: {
    type: "lastEl",
    name: "KontaktspeicherchipSLE55421024byteSpeicherPINSchutz",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip SLE 5542, 1024 byte Speicher, PIN-Schutz"
  },

  Kontaktspeicherchip24LC02: {
    type: "lastEl",
    name: "Kontaktspeicherchip24LC02",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip 24LC02 (I²C-Bus)"
  },

  positionMagnetstreifenAndCodierung: {
    type: "select",
    appendTo: "#wrapper",
    name: "positionMagnetstreifenAndCodierung",
    options: ["obenISO", "untenISO"],
    labelName: "Position Magnetstreifen"
  },

  Schwarz: {
    type: "defaultSelected",
    name: "Schwarz",
    optionName: "Schwarz"
  },

  Grün: {
    type: "lastEl",
    name: "Grün",
    optionName: "Grün"
  },

  Silber: {
    type: "lastEl",
    name: "Silber",
    optionName: "Silber"
  },

  Braun: {
    type: "lastEl",
    name: "Braun",
    optionName: "Braun"
  },

  // xexexeee : {
  // 	type: "lastEl",
  // 	name: "xexexexex",
  // 	optionName: "exexexe"
  // },

  /*normal blocks*/

  // exexex : {
  // type: "select",
  // 	name: "xexexe",
  // 	options: [prox, tagIt, iCode, atmel, xexexeee, monza],
  // 	optionName: "xexexexe",
  // 	labelName: "xexexe"
  // },

  hico4000: {
    type: "select",
    appendTo: "#wrapper",
    name: "hico4000",
    nextShownElement: "positionMagnetstreifenAndCodierung",
    options: ["Schwarz", "Braun"],
    optionName: "Magnetstreifen HiCo 4000 Oe",
    labelName: "Magnetstreifenausführung"
  },

  hico2750: {
    type: "select",
    appendTo: "#wrapper",
    name: "hico2750",
    nextShownElement: "positionMagnetstreifenAndCodierung",
    options: ["Schwarz", "Silber"],
    optionName: "Magnetstreifen HiCo 2750 Oe",
    labelName: "Magnetstreifenausführung"
  },

  loco300: {
    type: "select",
    appendTo: "#wrapper",
    name: "loco300",
    nextShownElement: "positionMagnetstreifenAndCodierung",
    options: ["Schwarz", "Grün"],
    optionName: "Magnetstreifen LoCo 300 Oe",
    labelName: "Magnetstreifenausführung"
  },

  WeitereSpeicherchips: {
    type: "input",
    appendTo: "#speicherchip",
    inputType: "text",
    name: "WeitereSpeicherchips",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Weitere Speicherchips",
    labelName: "Chiptyp"
  },

  WeitereProzessorchipsinklBetriebssytem: {
    type: "input",
    appendTo: "#prozessor",
    inputType: "text",
    name: "WeitereProzessorchipsinklBetriebssytem",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Weitere Prozessorchips inkl. Betriebssytem",
    labelName: "Chiptyp"
  },

  speicherchip: {
    type: "select",
    appendTo: "#wrapper",
    name: "speicherchip",
    options: ["Kontaktspeicherchip24LC16", "Kontaktspeicherchip24LC32", "Kontaktspeicherchip24LC128", "KontaktspeicherchipSLE55421024byteSpeicherPINSchutz", "Kontaktspeicherchip24LC02", "WeitereSpeicherchips"],
    optionName: "Speicherchip (Read Only Memory)",
    labelName: "Speicherchips (Read Only Memory)"
  },

  prozessor: {
    type: "select",
    appendTo: "#wrapper",
    name: "prozessor",
    options: ["SLE66CX680pemitCardOS44Betriebssystem", "P5CC072mitStarCOS30", "GemaltoChipNETv3IDPrime510", "GemaltoCyberflexAccess64kv2CTOPIMFIPSCY2", "P5CD080mitTCOS30", "J2A080GX0T0BG295mitJCOP21241SingleInterface80kB", "WeitereProzessorchipsinklBetriebssytem"],
    optionName: "Prozessor-/ PKI-Chip",
    labelName: "Prozessor-/ PKI-chips"
  },

  weitereRFID: {
    type: "input",
    appendTo: "#mainSonstige",
    inputType: "text",
    name: "weitereRFID",
    optionName: "Weitere RFID-Technologien",
    labelName: "RFID-Technologie"
  },

  mainSonstige: {
    type: "select",
    appendTo: "#wrapper",
    name: "mainSonstige",
    options: ["prox", "tagIt", "iCode", "atmel", "q5", "monza", "weitereRFID"],
    optionName: "Sonstige RFID-Technologien",
    labelName: "Sonstige RFID-Technologien"
  },

  mainEm: {
    type: "select",
    appendTo: "#wrapper",
    name: "mainEm",
    options: ["em4200", "em4450", "em4200Codiert"],
    optionName: "EM",
    labelName: "EM-Technologien"
  },

  mainHitag: {
    type: "select",
    appendTo: "#wrapper",
    name: "mainHitag",
    options: ["hitag", "hitag2", "hitagS2048", "hitagS256"],
    optionName: "HITAG",
    labelName: "HITAG-Technologien"
  },

  mainFudan: {
    type: "select",
    appendTo: "#wrapper",
    name: "mainFudan",
    options: ["fudan", "fudan4K"],
    optionName: "FUDAN",
    labelName: "FUDAN-Technologien"
  },

  mainMifare: {
    type: "select",
    appendTo: "#wrapper",
    name: "mainMifare",
    options: ["mifareClassic", "mifareClassicNXP4B", "mifareClassicNXP7B", "mifareClassicNXP4K", "mifareUltralight", "mifareDES4", "mifareDES4Supertag", "mifareDES8", "mifareDES8Supertag", "mifarePlusS", "mifarePlusX"],
    optionName: "MIFARE",
    labelName: "MIFARE-Technologien"
  },

  mainLegic: {
    type: "select",
    appendTo: "#wrapper",
    name: "mainLegic",
    options: ["legicMIM256", "legicMIM256Supertag", "legicMIM1024", "legicMIM1024Supertag", "legicATC128", "legicATC1024", "legicATC4096", "legicATC4096Supertag", "legicCTC4096"],
    optionName: "LEGIC",
    labelName: "LEGIC-Technologien"
  },

  karte: {
    type: "select",
    appendTo: "#wrapper",
    name: "karte",
    options: ["mainLegic", "mainMifare", "mainFudan", "mainHitag", "mainEm", "mainSonstige"],
    optionName: "RFID-Karte",
    labelName: "RFID-Technologie"
  },

  sonstigeHybridTechnologien: {
    type: "select",
    appendTo: "#wrapper",
    name: "sonstigeHybridTechnologien",
    options: ["mainLegic", "mainMifare", "mainFudan", "mainHitag", "mainEm", "mainSonstige"],
    optionName: "Sonstige Hybrid-Technologien",
    labelName: "Sonstige Hybrid-Technologien"
  },

  technologieMifare: {
    type: "select",
    appendTo: "#wrapper",
    name: "technologieMifare",
    options: ["mainLegic", "mainMifare", "mainFudan", "mainHitag", "mainEm", "mainSonstige"],
    optionName: "Hybride mit führender Technologie MIFARE",
    labelName: "MIFARE-Hybridkarten"
  },

  technologieLegic: {
    type: "select",
    appendTo: "#wrapper",
    name: "technologieLegic",
    options: ["mainLegic", "mainMifare", "mainFudan", "mainHitag", "mainEm", "mainSonstige"],
    optionName: "Hybride mit führender Technologie LEGIC",
    labelName: "LEGIC-Hybridkarten"
  },

  hybrid: {
    type: "select",
    appendTo: "#wrapper",
    name: "hybrid",
    options: ["technologieLegic", "technologieMifare", "sonstigeHybridTechnologien"],
    optionName: "RFID-Hybridkarte",
    labelName: "Führendes System"
  },

  kontaktchip: {
    type: "select",
    appendTo: "#wrapper",
    name: "kontaktchip",
    options: ["prozessor", "speicherchip"],
    optionName: "Kontaktchipkarte",
    labelName: "Chiptyp"
  },

  magnetstreifen: {
    type: "select",
    appendTo: "#wrapper",
    name: "magnetstreifen",
    options: ["loco300", "hico2750", "hico4000"],
    optionName: "Magnetstreifenkarte",
    labelName: "Magnetstreifentyp"
  },

  blanko: {
    type: "select",
    appendTo: "#wrapper",
    name: "blanko",
    options: ["karte", "hybrid", "kontaktchip", "magnetstreifen"],
    optionName: "Plastikkarte (blanko)",
    labelName: "Kartentyp: Plastikkarte (blanko)"
  },

  bedruckt: {
    type: "select",
    appendTo: "#wrapper",
    name: "bedruckt",
    options: ["sichtausweis", "karte", "hybrid", "kontaktchip", "magnetstreifen"],
    optionName: "Plastikkarte (bedruckt/personalissert)",
    labelName: "Kartentyp: Plastikkarte (bedruckt/personalissert)"
  },

  plastikkarten: {
    type: "select",
    appendTo: "#wrapper",
    name: "plastikkarten",
    options: ["blanko", "bedruckt"],
    optionName: "Plastikkarte",
    labelName: "Kartentyp"
  },

  // necessarily block part
  individualChiplageRfidHybrid: {
    type: "block",
    appendTo: "#chiplageRfIdHybrid",
    name: "individualChiplageRfidHybrid",
    nextShownElement: "firstBlock",
    options: ["individualChiplageRfidHybridBreite", "individualChiplageRfidHybridHöhe", "individualChiplageRfidHybridPositionX", "individualChiplageRfidHybridPositionY"],
    optionName: "Individuelle Chiplage",
    labelName: "Individuelle Chiplage"
  },

  chiplageRfIdHybrid: {
    type: 'select',
    appendTo: "#wrapper",
    name: "chiplageRfIdHybrid",
    nextShownElement: "firstBlock",
    options: ["ObenRechts", "UntenRechts", "ObenLinks", "UntenLinks", "individualChiplageRfidHybrid"],
    labelName: "Chiplage"
  },

  weitereHybridkarten: {
    type: 'input',
    appendTo: "#wrapper",
    inputType: 'text',
    name: "weitereHybridkarten",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "Weitere Hybridkarten",
    labelName: "Bezeichnung Hybridkarte"
  },

  mifareClassicEv14k: {
    type: 'select',
    appendTo: "#wrapper",
    name: "mifareClassicEv14k",
    options: ["mifareClassic4kMitHitag1", "mifareClassic4kMitHitag2", "mifareClassic4kMitEM4200", "mifareClassic4kMit4450", "mifareClassic4kMitProx125", "mifareClassic4kMitAtmel", "mifareClassic4kMitUHFMonza", "mifareClassic4kMitInduktiv"],
    optionName: "MIFARE Classic EV1 4K Hybridkarten",
    labelName: "MIFARE Classic EV1 4K Hybridkarten"
  },

  mifareClassicEv1: {
    type: 'select',
    appendTo: "#wrapper",
    name: "mifareClassicEv1",
    options: ["mifareClassic1kMitHitag1", "mifareClassic1kMitHitag2", "mifareClassic1kMitEM4200", "mifareClassic1kMit4450", "mifareClassic1kMitProx125", "mifareClassic1kMitAtmel", "mifareClassic1kMitUHFMonza", "mifareClassic1kMitInduktiv"],
    optionName: "MIFARE Classic EV1 Hybridkarten",
    labelName: "MIFARE Classic EV1 Hybridkarten"
  },

  mifareEv18k: {
    type: 'select',
    appendTo: "#wrapper",
    name: "mifareEv18k",
    options: ["mifareDESFire8kMifareClassic", "mifareDESFire8kSupertagMifareClassic", "mifareDESFire8kSupertag1", "mifareDESFire8kSupertag2", "mifareDESFire8kSupertagS", "mifareDESFire8kSupertagEM4200", "mifareDESFire8kSupertagEM4450", "mifareDESFire8kSupertagEM4200codiert", "mifareDESFire8kSupertagICode", "mifareDESFire8kSupertagProx125", "mifareDESFire8kSupertagAtmel", "mifareDESFire8kSupertagUHFmonza", "mifareDESFire8kInduktiv"],
    optionName: "MIFARE DESFire EV1 8K V05 70pF Hybridkarten",
    labelName: "MIFARE DESFire EV1 8K V05 70pF Hybridkarten"
  },

  mifareEv14k: {
    type: 'select',
    appendTo: "#wrapper",
    name: "mifareEv14k",
    options: ["mifareDESFire4kMifareClassic", "mifareDESFire4kSupertagMifareClassic", "mifareDESFire4kSupertag1", "mifareDESFire4kSupertag2", "mifareDESFire4kSupertagS", "mifareDESFire4kSupertagEM4200", "mifareDESFire4kSupertagEM4450", "mifareDESFire4kSupertagEM4200codiert", "mifareDESFire4kSupertagICode", "mifareDESFire4kSupertagProx125", "mifareDESFire4kSupertagAtmel", "mifareDESFire4kSupertagUHFmonza", "mifareDESFire4kInduktiv"],
    optionName: "MIFARE DESFire EV1 4k Hybridkarten",
    labelName: "MIFARE DESFire EV1 Hybridkarten"
  },

  legicAdvant4096: {
    type: 'select',
    appendTo: "#wrapper",
    name: "legicAdvant4096",
    options: ["legicAdvant4096mitLegic", "legicAdvant4096mitMifareClassic1k", "legicAdvant4096mitMifareClassic4k", "legicAdvant4096mitMifareDESFire", "legicAdvant4096mitHitag2048", "legicAdvant4096mitHitag256", "legicAdvant4096mitHitagS2048", "legicAdvant4096mitEM4200", "legicAdvant4096mitEM4450", "legicAdvant4096mitEM4200codiert", "legicAdvant4096mitICode", "legicAdvant4096mitProx125", "legicAdvant4096mitAtmel5577", "legicAdvant4096mitUHFmonza", "legicAdvant4096mitInduktiv"],
    optionName: "LEGIC Advant ATC 4096 MP Hybridkarten",
    labelName: "Kartentyp: Plastikkarte (blanko)"
  },

  legicAdvant1024: {
    type: 'select',
    appendTo: "#wrapper",
    name: "legicAdvant1024",
    options: ["legicAdvant1024mitLegic", "legicAdvant1024mitMifareClassic1k", "legicAdvant1024mitMifareClassic4k", "legicAdvant1024mitMifareDESFire", "legicAdvant1024mitHitag2048", "legicAdvant1024mitHitag256", "legicAdvant1024mitHitagS2048", "legicAdvant1024mitEM4200", "legicAdvant1024mitEM4450", "legicAdvant1024mitEM4200codiert", "legicAdvant1024mitICode", "legicAdvant1024mitProx125", "legicAdvant1024mitAtmel5577", "legicAdvant1024mitUHFmonza", "legicAdvant1024mitInduktiv"],
    optionName: "LEGIC Advant ATC 1024 MV Hybridkarten",
    labelName: "Kartentyp: Plastikkarte (blanko)"
  },

  legicMIM1024Hybridkarten: {
    type: 'select',
    appendTo: "#wrapper",
    name: "legicMIM1024Hybridkarten",
    options: ["legicMIM1024mitLegic", "legicMIM1024mitMifareClassic1k", "legicMIM1024mitMifareClassic4k", "legicMIM1024mitMifareDESFire", "legicMIM1024mitHitag2048", "legicMIM1024mitHitag256", "legicMIM1024mitHitagS2048", "legicMIM1024mitEM4200", "legicMIM1024mitEM4450", "legicMIM1024mitEM4200codiert", "legicMIM1024mitICode", "legicMIM1024mitProx125", "legicMIM1024mitAtmel5577", "legicMIM1024mitUHFmonza", "legicMIM1024mitInduktiv"],
    optionName: "LEGIC MIM 1024 Hybridkarten",
    labelName: "LEGIC MIM 1024 Hybridkarten"
  },

  sonstigeHybridTechnologien: {
    type: 'select',
    appendTo: "#wrapper",
    name: "sonstigeHybridTechnologien",
    options: ["hitagMIT14102", "hitagMIT14450", "hitagMIT24102", "hitagMIT24450", "weitereHybridkarten"],
    optionName: "Sonstige Hybrid-Technologien",
    labelName: "Sonstige Hybrid-Technologien"
  },

  technologieMifare: {
    type: 'select',
    appendTo: "#wrapper",
    name: "technologieMifare",
    options: ["mifareEv14k", "mifareEv18k", "mifareClassicEv1", "mifareClassicEv14k"],
    optionName: "Hybride mit führender Technologie MIFARE",
    labelName: "MIFARE-Hybridkarten"
  },

  technologieLegic: {
    type: 'select',
    appendTo: "#wrapper",
    name: "technologieLegic",
    options: ["legicMIM1024Hybridkarten", "legicAdvant1024", "legicAdvant4096"],
    optionName: "Hybride mit führender Technologie LEGIC",
    labelName: "LEGIC-Hybridkarten"
  },

  Glänzend: {
    type: "lastEl",
    name: "Glänzend",
    optionName: "Glänzend"
  },

  Matt: {
    type: "lastEl",
    name: "Matt",
    optionName: "Matt"
  },

  Geschliffen: {
    type: "lastEl",
    name: "Geschliffen",
    optionName: "Geschliffen, mit Metallic-Effekt"
  },

  Partiell: {
    type: "lastEl",
    name: "Partiell",
    optionName: "Partiell poliert / matt"
  },

  PVCStandard: {
    type: "lastEl",
    name: "PVCStandard",
    optionName: "PVC Standard"
  },

  PremiumCardPVCPETVerbundwerkstoff: {
    type: "lastEl",
    name: "PremiumCardPVCPETVerbundwerkstoff",
    optionName: "Premium Card (PVC-PET-Verbundwerkstoff)"
  },

  UltraCardPVCPETPCVerbundwerkstoff: {
    type: "lastEl",
    name: "UltraCardPVCPETPCVerbundwerkstoff",
    optionName: "Ultra Card (PVC-, PET-, PC - Verbundwerkstoff)"
  },

  PolycarbonatCard100Polycarbonat: {
    type: "lastEl",
    name: "PolycarbonatCard100Polycarbonat",
    optionName: "Polycarbonat Card (100% Polycarbonat)"
  },

  hochformat: {
    type: "lastEl",
    name: "hochformat",
    optionName: "Hochformat"
  },

  querformat: {
    type: "defaultSelected",
    name: "querformat",
    optionName: "Querformat"
  },

  ausrichtung: {
    type: "select",
    appendTo: "#kartenspezifikationen",
    name: "ausrichtung",
    options: ["querformat", "hochformat"],
    labelName: "Ausrichtung"
  },

  kartenmaterial: {
    type: "select",
    appendTo: "#kartenspezifikationen",
    name: "kartenmaterial",
    options: ["PVCStandard", "PremiumCardPVCPETVerbundwerkstoff", "UltraCardPVCPETPCVerbundwerkstoff", "PolycarbonatCard100Polycarbonat"],
    labelName: "Kartenmaterial"
  },

  kartenoberfläche: {
    type: "select",
    appendTo: "#kartenspezifikationen",
    name: "kartenoberfläche",
    options: ["Glänzend", "Matt", "Geschliffen", "Partiell"],
    labelName: "Kartenoberfläche"
  },

  kartenspezifikationen: {
    type: "block",
    appendTo: "#firstBlock",
    labelName: "Kartenspezifikationen",
    name: "kartenspezifikationen",
    options: ["ausrichtung", "kartenmaterial", "kartenoberfläche"]
  },

  UnbedrucktWeiß: {
    type: "lastEl",
    name: "UnbedrucktWeiß",
    optionName: "Unbedruckt Weiß"
  },

  farbigSchwarz: {
    type: "lastEl",
    name: "farbigSchwarz",
    optionName: "1-farbig Schwarz"
  },

  MehrfarbendruckEuroskala: {
    type: "lastEl",
    name: "MehrfarbendruckEuroskala",
    optionName: "Mehrfarbendruck Euroskala"
  },

  SonderfarbenVeredelung: {
    type: "lastEl",
    name: "SonderfarbenVeredelung",
    optionName: "Sonderfarben/Veredelung"
  },

  druckdatenVorderseiteInput: {
    type: "input",
    inputType: "file",
    appendTo: "#druckFarbePlastikkarte",
    name: "druckdatenVorderseiteInput",
    labelName: "Druckdaten Vorderseite"
  },

  druckdatenVorderseiteSelect: {
    type: "select",
    appendTo: "#druckFarbePlastikkarte",
    name: "druckdatenVorderseiteSelect",
    options: ["UnbedrucktWeiß", "farbigSchwarz", "MehrfarbendruckEuroskala", "SonderfarbenVeredelung"],
    labelName: "Druckausführung Vorderseite"
  },

  druckdatenRückseiteInput: {
    type: "input",
    inputType: "file",
    appendTo: "#druckFarbePlastikkarte",
    name: "druckdatenRückseiteInput",
    labelName: "Druckdaten Rückseite"
  },

  druckdatenRückseiteSelect: {
    type: "select",
    appendTo: "#druckFarbePlastikkarte",
    name: "druckdatenRückseiteSelect",
    options: ["UnbedrucktWeiß", "farbigSchwarz", "MehrfarbendruckEuroskala", "SonderfarbenVeredelung"],
    labelName: "Druckdaten Rückseite"
  },

  druckFarbePlastikkarte: {
    type: "block",
    appendTo: "#firstBlock",
    name: "druckFarbePlastikkarte",
    labelName: "Druck/Farbe Plastikkarte",
    options: ["druckdatenVorderseiteInput", "druckdatenRückseiteInput", "druckdatenVorderseiteSelect", "druckdatenRückseiteSelect"]
  },

  /* checkboxes */

  checkboxKontaktchip: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxKontaktchip",
    labelName: "Kontaktchip / Prozessorchip"
  },

  checkboxMagnetstreifen: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxMagnetstreifen",
    labelName: "Magnetstreifen"
  },

  checkboxPersonalisierung: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxPersonalisierung",
    labelName: "Personalisierung"
  },

  checkboxStatischerText: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxStatischerText",
    labelName: "Statischer Text"
  },

  checkboxNummerierung: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxNummerierung",
    labelName: "Nummerierung / Fortl. Nummerierung"
  },

  checkboxBarcode: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxBarcode",
    labelName: "Barcode"
  },

  checkboxTRW: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxTRW",
    labelName: "TRW (Thermo-Rewrite)"
  },

  checkboxUnterschriftenfeld: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxUnterschriftenfeld",
    labelName: "Unterschriftenfeld"
  },

  checkboxHologramme: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxHologramme",
    labelName: "Standardhologramm / Endlosmotiv"
  },

  checkboxCliploch: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxCliploch",
    labelName: "Cliploch"
  },

  checkboxBlindenschrift: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxBlindenschrift",
    labelName: "Blindenschrift / Brailleschrift"
  },

  checkboxRubbelfeld: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxRubbelfeld",
    labelName: "Rubbelfeld / Scratch-Off"
  },

  kartenoptionen: {
    type: "checkbox",
    appendTo: "#firstBlock",
    labelName: "Kartenoptionen",
    name: "kartenoptionen",
    options: ["checkboxKontaktchip", "checkboxMagnetstreifen", "checkboxPersonalisierung", "checkboxStatischerText", "checkboxNummerierung", "checkboxBarcode", "checkboxTRW", "checkboxUnterschriftenfeld", "checkboxHologramme", "checkboxCliploch", "checkboxBlindenschrift", "checkboxRubbelfeld"]
  },

  firstBlock: {
    type: "block",
    appendTo: "#wrapper",
    name: "firstBlock",
    options: ["kartenspezifikationen", "druckFarbePlastikkarte", "kartenoptionen"]
  },

  bauform: {
    type: "select",
    appendTo: "#wrapper",
    name: "bauform",
    options: ["plastikkarten"],
    labelName: "Bauform"
  }
}

/* harmony default export */ __webpack_exports__["default"] = (mainObject);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHVDQUF1QztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBYyx3Q0FBd0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0EsOENBQXNDLHVCQUF1Qjs7O0FBRzdEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyeEJBO0FBQUE7QUFBd0M7O0FBRXhDLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixxREFBVTtBQUM1Qjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLEdBQUc7O0FBRUgsMkJBQTJCLHFEQUFVO0FBQ3JDLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtELHFEQUFVLElBQUksS0FBSztBQUNyRTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQyxHQUFHO0FBQ0gsb0JBQW9CLHNCQUFzQixTQUFTLGdCQUFnQjtBQUNuRSxHQUFHO0FBQ0gsb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QscUJBQXFCO0FBQ3JFOztBQUVBLDZDQUE2QyxzQkFBc0I7QUFDbkUsbUJBQW1CLGFBQWEsMkJBQTJCO0FBQzNELElBQUksa0RBQWtELHFEQUFVLElBQUksS0FBSyxRQUFRO0FBQ2pGLElBQUkscURBQVUsSUFBSSxLQUFLLGNBQWMsWUFBWTs7QUFFakQ7O0FBRUEsMENBQTBDLGFBQWE7QUFDdkQ7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLHVGQUF1RixxQkFBcUI7QUFDNUc7QUFDQTtBQUNBLDZDQUE2QyxzQkFBc0I7QUFDbkUsa0JBQWtCLGFBQWEsYUFBYSw2QkFBNkI7O0FBRXpFOztBQUVBLHlDQUF5QyxhQUFhO0FBQ3REO0FBQ0EsYUFBYSxxREFBVTtBQUN2QixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE1BQU07O0FBRU47QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUZBQXVGLHFCQUFxQjtBQUM1RztBQUNBO0FBQ0E7O0FBRUEsOENBQThDLHFEQUFVO0FBQ3hEO0FBQ0E7O0FBRUE7QUFDQSx1RkFBdUYscUJBQXFCOztBQUU1RztBQUNBLDhCQUE4QixzQkFBc0I7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1EQUFtRCwwQkFBMEI7QUFDN0U7QUFDQSxhQUFhLHFEQUFVOztBQUV2QixRQUFRLHFEQUFVO0FBQ2xCLGlEQUFpRCxxREFBVSxpQkFBaUI7QUFDNUUsdUJBQXVCLGlCQUFpQiwyQkFBMkI7QUFDbkUsUUFBUSxxREFBVSxnREFBZ0QscURBQVUsSUFBSSxRQUFRLFFBQVE7QUFDaEcsUUFBUSxxREFBVSxJQUFJLFFBQVEsY0FBYyxZQUFZOztBQUV4RCxLQUFLLFVBQVUscURBQVU7QUFDekIsVUFBVSxxREFBVTtBQUNwQixrQ0FBa0MsZ0JBQWdCLHFEQUFVLFFBQVE7QUFDcEUsc0JBQXNCLHFEQUFVLFlBQVksc0JBQXNCLHFEQUFVLGlCQUFpQjtBQUM3RixPQUFPO0FBQ1A7QUFDQSxrQ0FBa0MscURBQVUsaUJBQWlCO0FBQzdELHdCQUF3QixxREFBVSxZQUFZLElBQUksZ0JBQWdCLHFEQUFVLFFBQVE7QUFDcEY7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJDQUEyQyxxREFBVSxZQUFZO0FBQ2pFLDJDQUEyQyxxREFBVSxZQUFZO0FBQ2pFO0FBQ0E7QUFDQSxtQ0FBbUMscURBQVU7QUFDN0MsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsYUFBYSxxREFBVTtBQUN2Qix5QkFBeUIscURBQVU7QUFDbkM7O0FBRUE7QUFDQSxhQUFhLHFEQUFVO0FBQ3ZCLGtCQUFrQixxREFBVTtBQUM1Qjs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7Ozs7Ozs7Ozs7OztBQ3hMTDtBQUFBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUseUVBQVUsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNTBlMDM0NDI1YzdmZjE4NGMyNmZcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgbWFpbk9iamVjdCBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XG5cbnZhciBzdGF0ZSA9IHsgb3B0aW9uczogW10sIGZpcnN0QmxvY2s6IFtdIH07XG5cbmNvbnN0IG9uRG9jdW1lbnRSZWFkeSA9ICgpID0+IHtcbiAgc3RhdGUub3B0aW9ucyA9IG5ldyBNYXAoKTtcbiAgc3RhdGUuZmlyc3RCbG9jayA9IG5ldyBNYXAoKTtcblxuICBjcmVhdGVDb21wb25lbnQobWFpbk9iamVjdC5iYXVmb3JtKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG9uRG9jdW1lbnRSZWFkeSk7XG5cbmNvbnN0IGNyZWF0ZUNvbXBvbmVudCA9IGlucHV0T2JqZWN0ID0+IHtcbiAgaWYgKGlucHV0T2JqZWN0LnR5cGUgPT09IFwic2VsZWN0XCIpIHtcblxuICAgIGNyZWF0ZVNlbGVjdChpbnB1dE9iamVjdCk7XG4gIH0gZWxzZSBpZiAoaW5wdXRPYmplY3QudHlwZSA9PT0gXCJpbnB1dFwiKSB7XG5cbiAgICBjcmVhdGVJbnB1dChpbnB1dE9iamVjdCk7XG4gIH0gZWxzZSBpZiAoaW5wdXRPYmplY3QudHlwZSA9PT0gXCJsYXN0RWxcIikge1xuXG4gICAgY3JlYXRlTmVjZXNzYXJpbHlCbG9jayhtYWluT2JqZWN0W2lucHV0T2JqZWN0Lm5leHRTaG93bkVsZW1lbnRdKTtcbiAgfSBlbHNlIGlmIChpbnB1dE9iamVjdC50eXBlID09PSBcImJsb2NrXCIpIHtcblxuICAgIC8vaW5wdXRPYmplY3Qub3B0aW9ucy5tYXAoaXRlbSA9PiBjcmVhdGVDb21wb25lbnQobWFpbk9iamVjdFtpdGVtXSkpO1xuICAgIGNyZWF0ZUJsb2NrKGlucHV0T2JqZWN0KTtcbiAgfVxuXG4gIC8vIGlmIChpbnB1dE9iamVjdC5uZXh0U2hvd25FbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgLy8gICBjcmVhdGVDb21wb25lbnQobWFpbk9iamVjdFtpbnB1dE9iamVjdC5uZXh0U2hvd25FbGVtZW50XSk7XG4gIC8vIH1cblxuICBzdGF0ZS5vcHRpb25zLnNldChpbnB1dE9iamVjdC5uYW1lLCBpbnB1dE9iamVjdC5vcHRpb25zKTtcbn07XG5cbmNvbnN0IGFkZEhpZGRlbk9wdGlvbiA9IGlucHV0T2JqZWN0ID0+IHtcbiAgbGV0IHZhcmlhYmxlcyA9IGlucHV0T2JqZWN0Lm9wdGlvbnMubWFwKGl0ZW0gPT4gbWFpbk9iamVjdFtgJHtpdGVtfWBdLnR5cGUgPT09IFwiZGVmYXVsdFNlbGVjdGVkXCIpO1xuICBpZiAodmFyaWFibGVzLmluY2x1ZGVzKHRydWUpKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiPG9wdGlvbiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4+LS0tU2VsZWN0IGl0ZW0tLS08L29wdGlvbj5cIjtcbiAgfVxufTtcblxuY29uc3QgYWRkVHlwZUZvcklucHV0ID0gaW5wdXRPYmplY3QgPT4ge1xuICBpZiAoaW5wdXRPYmplY3QuaW5wdXRUeXBlID09PSBcInRleHRcIiB8fCBpbnB1dE9iamVjdC5pbnB1dFR5cGUgPT09IFwiY2hlY2tib3hcIikge1xuICAgIHJldHVybiBgdHlwZT1cIiR7aW5wdXRPYmplY3QuaW5wdXRUeXBlfVwiYDtcbiAgfSBlbHNlIGlmIChpbnB1dE9iamVjdC5pbnB1dFR5cGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICByZXR1cm4gYHR5cGU9XCIke2lucHV0T2JqZWN0LmlucHV0VHlwZX1cIiBtaW49XCIke2lucHV0T2JqZWN0Lm1pbn1cImA7XG4gIH0gZWxzZSBpZiAoaW5wdXRPYmplY3QuaW5wdXRUeXBlID09PSBcImZpbGVcIikge1xuICAgIHJldHVybiBgdHlwZT1cIiR7aW5wdXRPYmplY3QuaW5wdXRUeXBlfVwiIGFjY2VwdD1cIi5jc3ZcImA7XG4gIH1cbn1cblxuY29uc3QgY3JlYXRlU2VsZWN0ID0gaW5wdXRPYmplY3QgPT4ge1xuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgaW5wdXRPYmpOYW1lID0gaW5wdXRPYmplY3QubmFtZSxcbiAgICBlbGVtZW50VG9BcHBlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2lucHV0T2JqZWN0LmFwcGVuZFRvfWApO1xuICBkaXYuaWQgPSBpbnB1dE9iak5hbWU7XG5cbiAgZGl2LmlubmVySFRNTCA9IGA8bGFiZWwgY2xhc3M9XCJjb2wtbWQtNlwiPiR7aW5wdXRPYmplY3QubGFiZWxOYW1lfTo8L2xhYmVsPlxuICA8c2VsZWN0IGNsYXNzPVwiJHtpbnB1dE9iak5hbWV9IGNvbC1tZC02IGZvcm0tY29udHJvbFwiPiAke2FkZEhpZGRlbk9wdGlvbihpbnB1dE9iamVjdCl9XG4gICR7aW5wdXRPYmplY3Qub3B0aW9ucy5tYXAoaXRlbSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7bWFpbk9iamVjdFtgJHtpdGVtfWBdLm5hbWV9XCI+XG4gICR7bWFpbk9iamVjdFtgJHtpdGVtfWBdLm9wdGlvbk5hbWV9PC9vcHRpb24+YCl9PC9zZWxlY3Q+YDtcblxuICBlbGVtZW50VG9BcHBlbmQuYXBwZW5kKGRpdik7XG5cbiAgbGV0IHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2lucHV0T2JqTmFtZX1gKTtcbiAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgIG9uU2VsZWN0KHNlbGVjdC52YWx1ZSk7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlSW5wdXQgPSBpbnB1dE9iamVjdCA9PiB7XG4gIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCBlbGVtZW50VG9BcHBlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2lucHV0T2JqZWN0LmFwcGVuZFRvfWApLFxuICAgIGlucHV0T2JqTmFtZSA9IGlucHV0T2JqZWN0Lm5hbWU7XG4gIGRpdi5pZCA9IGlucHV0T2JqTmFtZTtcbiAgZGl2LmlubmVySFRNTCA9IGA8bGFiZWwgY2xhc3M9XCJjb2wtbWQtNlwiPiR7aW5wdXRPYmplY3QubGFiZWxOYW1lfTo8L2xhYmVsPlxuICA8aW5wdXQgY2xhc3M9XCIke2lucHV0T2JqTmFtZX0gY29sLW1kLTZcIiAke2FkZFR5cGVGb3JJbnB1dChpbnB1dE9iamVjdCl9IHJlcXVpcmVkIFxcLz5gO1xuXG4gIGVsZW1lbnRUb0FwcGVuZC5hcHBlbmQoZGl2KTtcblxuICBsZXQgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtpbnB1dE9iak5hbWV9YCk7XG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgb25TZWxlY3QobWFpbk9iamVjdFtpbnB1dE9iak5hbWVdLm5leHRTaG93bkVsZW1lbnQpO1xuICB9KTtcbn07XG5cbmNvbnN0IGNoZWNrU3RhdGUgPSBpbnB1dE9iamVjdCA9PiB7XG4gIC8vZm9yIGRlbGV0aW5nIGl0ZW1zXG4gIC8vIGlmIChzdGF0ZS5vcHRpb25zLmhhcyhpbnB1dE9iamVjdC5uYW1lKSkge1xuXG4gIC8vIH0gZWxzZSB7XG5cbiAgLy8gfVxuICAvL3N0YXRlLm9wdGlvbnMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZWNlc3NhcmlseUJsb2NrID0gaW5wdXRPYmplY3QgPT4ge1xuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgZWxlbWVudFRvQXBwZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtpbnB1dE9iamVjdC5hcHBlbmRUb31gKTtcbiAgZGl2LmlkID0gaW5wdXRPYmplY3QubmFtZTtcbiAgLy9kaXYuY2xhc3NOYW1lID0gXCJjb2wtbWQtMTJcIjtcbiAgZWxlbWVudFRvQXBwZW5kLmFwcGVuZChkaXYpO1xuXG4gIGlucHV0T2JqZWN0Lm9wdGlvbnMubWFwKGl0ZW0gPT4gY3JlYXRlQmxvY2sobWFpbk9iamVjdFtpdGVtXSkpO1xuICBzdGF0ZS5maXJzdEJsb2NrLnNldChpbnB1dE9iamVjdC5uYW1lLCBpbnB1dE9iamVjdC5vcHRpb25zKTtcbn07XG5cbmNvbnN0IGNyZWF0ZUJsb2NrID0gaW5wdXRPYmplY3QgPT4ge1xuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgZWxlbWVudFRvQXBwZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtpbnB1dE9iamVjdC5hcHBlbmRUb31gKTtcblxuICBkaXYuaWQgPSBpbnB1dE9iamVjdC5uYW1lO1xuICBkaXYuaW5uZXJIVE1MID0gYDxoci8+PGgzPiR7aW5wdXRPYmplY3QubGFiZWxOYW1lfTwvaDM+YDtcbiAgZGl2LmNsYXNzTmFtZSA9IFwiY29sLW1kLTEyXCI7XG4gIGVsZW1lbnRUb0FwcGVuZC5hcHBlbmQoZGl2KTtcblxuICBzdGF0ZS5maXJzdEJsb2NrLnNldChpbnB1dE9iamVjdC5uYW1lLCBpbnB1dE9iamVjdC5vcHRpb25zKTtcblxuICBpbnB1dE9iamVjdC5vcHRpb25zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgIC8vIGVsZW1lbnRUb0FwcGVuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7bWFpbk9iamVjdFtpdGVtXS5hcHBlbmRUb31gKVxuICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmlkID0gbWFpbk9iamVjdFtpdGVtXS5uYW1lO1xuXG4gICAgaWYgKG1haW5PYmplY3RbaXRlbV0udHlwZSA9PSBcInNlbGVjdFwiKSB7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gYDxsYWJlbCBjbGFzcz1cImNvbC1tZC02XCI+JHttYWluT2JqZWN0W2l0ZW1dLmxhYmVsTmFtZX06PC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgY2xhc3M9XCIke2lucHV0T2JqZWN0Lm5hbWV9IGNvbC1tZC02IGZvcm0tY29udHJvbFwiPiAke2FkZEhpZGRlbk9wdGlvbihpbnB1dE9iamVjdCl9XG4gICAgICAke21haW5PYmplY3RbaXRlbV0ub3B0aW9ucy5tYXAobmV3SXRlbSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7bWFpbk9iamVjdFtgJHtuZXdJdGVtfWBdLm5hbWV9XCI+XG4gICAgICAke21haW5PYmplY3RbYCR7bmV3SXRlbX1gXS5vcHRpb25OYW1lfTwvb3B0aW9uPmApfTwvc2VsZWN0PmA7XG5cbiAgICB9IGVsc2UgaWYgKG1haW5PYmplY3RbaXRlbV0udHlwZSA9PSBcImlucHV0XCIpIHtcbiAgICAgIGlmIChtYWluT2JqZWN0W2l0ZW1dLmlucHV0VHlwZSA9PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IGA8aW5wdXQgJHthZGRUeXBlRm9ySW5wdXQobWFpbk9iamVjdFtpdGVtXSl9IFxcLz5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7bWFpbk9iamVjdFtpdGVtXS5uYW1lfVwiIGNsYXNzPVwibGFiZWwtcGFkXCI+JHttYWluT2JqZWN0W2l0ZW1dLmxhYmVsTmFtZX08L2xhYmVsPmBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpdi5jbGFzc05hbWUgPSBcImNvbC1tZC02XCI7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBgPGxhYmVsPiR7bWFpbk9iamVjdFtpdGVtXS5sYWJlbE5hbWV9OjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cIiR7bWFpbk9iamVjdFtpdGVtXS5uYW1lfVwiICR7YWRkVHlwZUZvcklucHV0KG1haW5PYmplY3RbaXRlbV0pfSByZXF1aXJlZCBcXC8+YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50VG9BcHBlbmQuYXBwZW5kKGRpdik7XG4gICAgc3RhdGUuZmlyc3RCbG9jay5zZXQoaXRlbS5uYW1lLCBpdGVtLm9wdGlvbnMpO1xuXG4gICAgbGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7bWFpbk9iamVjdFtpdGVtXS5uYW1lfWApO1xuICAgIGNvbnNvbGUubG9nKFwibGlzdGVuZXIgYWRkZWQgdG8gXCIgKyBgLiR7bWFpbk9iamVjdFtpdGVtXS5uYW1lfWApO1xuICAgIGlmICghaW5wdXQgPT09IG51bGwpIHtcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9uU2VsZWN0Rm9yTmVjZXNzYXJseUJsb2NrKG1haW5PYmplY3RbaXRlbV0ubmV4dFNob3duRWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCBvblNlbGVjdEZvck5lY2Vzc2FybHlCbG9jayA9IG5hbWUgPT4ge1xuICBjaGVja1N0YXRlKG1haW5PYmplY3RbbmFtZV0pO1xuICBjcmVhdGVOZWNlc3NhcmlseUJsb2NrKG1haW5PYmplY3RbbmFtZV0pO1xufTtcblxuY29uc3Qgb25TZWxlY3QgPSBuYW1lID0+IHtcbiAgY2hlY2tTdGF0ZShtYWluT2JqZWN0W25hbWVdKTtcbiAgY3JlYXRlQ29tcG9uZW50KG1haW5PYmplY3RbbmFtZV0pO1xufTtcblxuXG5cbi8vIGNvbnN0IG9uU2VsZWN0ID0gbmFtZSA9PiB7XG4vLyBcdGNvbnNvbGUubG9nKFwiKioqKlwiICsgbmFtZSk7XG4vLyBcdHN0YXRlW25hbWVdID0gd2luZG93W25hbWVdO1xuLy8gXHRPYmplY3Qua2V5cyhzdGF0ZSkubWFwKGtleSA9PiB7XG4vLyBcdFx0aWYgKHN0YXRlW2tleV0udHlwZSA9PT0gJ3NlbGVjdCcgKSB7XG4vLyBcdFx0XHRzZWxlY3RDbXAoc3RhdGVba2V5XS5vcHRpb24pXG4vLyBcdFx0fSBlbHNlIHtcbi8vIFx0XHRcdGNoZWNrQm94Q21wKHN0YXRlW2tleV0ub3B0aW9uKVxuLy8gXHRcdH1cbi8vIFx0fSlcbi8vIFx0Y2hlY2tTdGF0ZShldmFsKG5hbWUpKTtcbi8vIFx0Y3JlYXRlQ29tcG9uZW50KGV2YWwobmFtZSkpO1xuLy9cdCB9O1xuXG4vL1x0IC8vZm9yIGRlbGV0aW5nIGl0ZW1zXG4vL1x0IHN0YXRlLm9wdGlvbnMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSk7XG4vL1x0IHN0YXRlLnJzdWx0cyA9IFt7XG4vLyBcdFx0bmFtZTogJ2JBdWZhc2Rhc2RzZHNhJyxcbi8vIFx0XHR2YWx1ZTogJydcbi8vXHQgfV1cbiIsImNvbnN0IG1haW5PYmplY3QgPSB7XG5cbiAgLypibG9jayBvZiBkZWFkIGVuZCBwb2ludHMqL1xuXG4gIFVudGVuTGlua3M6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIlVudGVuTGlua3NcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcImZpcnN0QmxvY2tcIixcbiAgICBvcHRpb25OYW1lOiBcIlVudGVuIExpbmtzXCJcbiAgfSxcblxuICBPYmVuTGlua3M6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIk9iZW5MaW5rc1wiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwiZmlyc3RCbG9ja1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiT2JlbiBMaW5rc1wiXG4gIH0sXG5cbiAgVW50ZW5SZWNodHM6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIlVudGVuUmVjaHRzXCIsXG4gICAgbmV4dFNob3duRWxlbWVudDogXCJmaXJzdEJsb2NrXCIsXG4gICAgb3B0aW9uTmFtZTogXCJVbnRlbiBSZWNodHNcIlxuICB9LFxuXG4gIE9iZW5SZWNodHM6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIk9iZW5SZWNodHNcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcImZpcnN0QmxvY2tcIixcbiAgICBvcHRpb25OYW1lOiBcIk9iZW4gUmVjaHRzXCJcbiAgfSxcblxuICBoaXRhZ01JVDI0NDUwOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJoaXRhZ01JVDI0NDUwXCIsXG4gICAgb3B0aW9uTmFtZTogXCJISVRBRyAyIG1pdCBFTTQ0NTBcIlxuICB9LFxuXG4gIGhpdGFnTUlUMjQxMDI6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImhpdGFnTUlUMjQxMDJcIixcbiAgICBvcHRpb25OYW1lOiBcIkhJVEFHIDIgbWl0IEVNNDIwMCAoRU00MTAyKVwiXG4gIH0sXG5cbiAgaGl0YWdNSVQxNDQ1MDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwiaGl0YWdNSVQxNDQ1MFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiSElUQUcgMSBtaXQgRU00NDUwXCJcbiAgfSxcblxuICBoaXRhZ01JVDE0MTAyOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJoaXRhZ01JVDE0MTAyXCIsXG4gICAgb3B0aW9uTmFtZTogXCJISVRBRyAxIG1pdCBFTTQyMDAgKEVNNDEwMilcIlxuICB9LFxuXG4gIG1pZmFyZURFU0ZpcmU0a0luZHVrdGl2OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlNGtJbmR1a3RpdlwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIERFU0ZpcmUgRVYxIDRLIG1pdCBJbmR1a3RpdiwgS2FydGVuc3TDpHJrZSBjYS4gMW1tXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlNGtTdXBlcnRhZ1VIRm1vbnphOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlNGtTdXBlcnRhZ1VIRm1vbnphXCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgNEsgVjA1IDcwcEYgU3VwZXJ0YWcgbWl0IFVIRiBNb256YSAzIChNb256YSA0LCA1LCBHZW4gMilcIlxuICB9LFxuXG4gIG1pZmFyZURFU0ZpcmU0a1N1cGVydGFnQXRtZWw6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnQXRtZWxcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA0SyBWMDUgNzBwRiBTdXBlcnRhZyBtaXQgQXRtZWwgKFRlbWljLCBRNSkgNTU3N1wiXG4gIH0sXG5cbiAgbWlmYXJlREVTRmlyZTRrU3VwZXJ0YWdQcm94MTI1OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlNGtTdXBlcnRhZ1Byb3gxMjVcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA0SyBWMDUgNzBwRiBTdXBlcnRhZyBtaXQgUHJveCAxMjUga0h6IC8gMjYgYml0ICgzNCwgMzUsIDM2LCAzNylcIlxuICB9LFxuXG4gIG1pZmFyZURFU0ZpcmU0a1N1cGVydGFnSUNvZGU6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnSUNvZGVcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA0SyBWMDUgNzBwRiBTdXBlcnRhZyBtaXQgSS1Db2RlIFNMSSBTMjBcIlxuICB9LFxuXG4gIG1pZmFyZURFU0ZpcmU0a1N1cGVydGFnRU00MjAwY29kaWVydDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlREVTRmlyZTRrU3VwZXJ0YWdFTTQyMDBjb2RpZXJ0XCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgNEsgVjA1IDcwcEYgU3VwZXJ0YWcgbWl0IEVNNDIwMCAoRU00MTAyKSAwRi1jb2RpZXJ0XCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlNGtTdXBlcnRhZ0VNNDQ1MDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlREVTRmlyZTRrU3VwZXJ0YWdFTTQ0NTBcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA0SyBWMDUgNzBwRiBTdXBlcnRhZyBtaXQgRU00NDUwXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlNGtTdXBlcnRhZ0VNNDIwMDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlREVTRmlyZTRrU3VwZXJ0YWdFTTQyMDBcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA0SyBWMDUgNzBwRiBTdXBlcnRhZyBtaXQgRU00MjAwIChFTTQxMDIpXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlNGtTdXBlcnRhZ1M6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnU1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIERFU0ZpcmUgRVYxIDRLIFYwNSA3MHBGIFN1cGVydGFnIG1pdCBISVRBRyBTIDIwNDggYml0XCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlNGtTdXBlcnRhZzI6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnMlwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIERFU0ZpcmUgRVYxIDRLIFYwNSA3MHBGIFN1cGVydGFnIG1pdCBISVRBRyAyXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlNGtTdXBlcnRhZzE6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnMVwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIERFU0ZpcmUgRVYxIDRLIFYwNSA3MHBGIFN1cGVydGFnIG1pdCBISVRBRyAxXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlNGtTdXBlcnRhZ01pZmFyZUNsYXNzaWM6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnTWlmYXJlQ2xhc3NpY1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIERFU0ZpcmUgRVYxIDRLIFYwNSA3MHBGIFN1cGVydGFnIG1pdCBNSUZBUkUgQ2xhc3NpYyBFVjEgNEtcIlxuICB9LFxuXG4gIG1pZmFyZURFU0ZpcmU0a01pZmFyZUNsYXNzaWM6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU0a01pZmFyZUNsYXNzaWNcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA0SyBtaXQgTUlGQVJFIENsYXNzaWMgRVYxIDFLXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlOGtJbmR1a3Rpdjoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlREVTRmlyZThrSW5kdWt0aXZcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA4SyBtaXQgSW5kdWt0aXYsIEthcnRlbnN0w6Rya2UgY2EuIDFtbVwiXG4gIH0sXG5cbiAgbWlmYXJlREVTRmlyZThrU3VwZXJ0YWdVSEZtb256YToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlREVTRmlyZThrU3VwZXJ0YWdVSEZtb256YVwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIERFU0ZpcmUgRVYxIDhLIFYwNSA3MHBGIFN1cGVydGFnIG1pdCBVSEYgTW9uemEgMyAoTW9uemEgNCwgNSwgR2VuIDIpXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ0F0bWVsOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ0F0bWVsXCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgOEsgVjA1IDcwcEYgU3VwZXJ0YWcgbWl0IEF0bWVsIChUZW1pYywgUTUpIDU1NzdcIlxuICB9LFxuXG4gIG1pZmFyZURFU0ZpcmU4a1N1cGVydGFnUHJveDEyNToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlREVTRmlyZThrU3VwZXJ0YWdQcm94MTI1XCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgOEsgVjA1IDcwcEYgU3VwZXJ0YWcgbWl0IFByb3ggMTI1IGtIeiAvIDI2IGJpdCAoMzQsIDM1LCAzNiwgMzcpXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ0lDb2RlOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ0lDb2RlXCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgOEsgVjA1IDcwcEYgU3VwZXJ0YWcgbWl0IEktQ29kZSBTTEkgUzIwXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ0VNNDIwMGNvZGllcnQ6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU4a1N1cGVydGFnRU00MjAwY29kaWVydFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIERFU0ZpcmUgRVYxIDhLIFYwNSA3MHBGIFN1cGVydGFnIG1pdCBFTTQyMDAgKEVNNDEwMikgMEYtY29kaWVydFwiXG4gIH0sXG5cbiAgbWlmYXJlREVTRmlyZThrU3VwZXJ0YWdFTTQ0NTA6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU4a1N1cGVydGFnRU00NDUwXCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgOEsgVjA1IDcwcEYgU3VwZXJ0YWcgbWl0IEVNNDQ1MFwiXG4gIH0sXG5cbiAgbWlmYXJlREVTRmlyZThrU3VwZXJ0YWdFTTQyMDA6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZURFU0ZpcmU4a1N1cGVydGFnRU00MjAwXCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgOEsgVjA1IDcwcEYgU3VwZXJ0YWcgbWl0IEVNNDIwMCAoRU00MTAyKVwiXG4gIH0sXG5cbiAgbWlmYXJlREVTRmlyZThrU3VwZXJ0YWdTOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ1NcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA4SyBWMDUgNzBwRiBTdXBlcnRhZyBtaXQgSElUQUcgUyAyMDQ4IGJpdFwiXG4gIH0sXG5cbiAgbWlmYXJlREVTRmlyZThrU3VwZXJ0YWcyOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZzJcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA4SyBWMDUgNzBwRiBTdXBlcnRhZyBtaXQgSElUQUcgMlwiXG4gIH0sXG5cbiAgbWlmYXJlREVTRmlyZThrU3VwZXJ0YWcxOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZzFcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA4SyBWMDUgNzBwRiBTdXBlcnRhZyBtaXQgSElUQUcgMVwiXG4gIH0sXG5cbiAgbWlmYXJlREVTRmlyZThrU3VwZXJ0YWdNaWZhcmVDbGFzc2ljOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ01pZmFyZUNsYXNzaWNcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA4SyBWMDUgNzBwRiBTdXBlcnRhZyBtaXQgTUlGQVJFIENsYXNzaWMgRVYxIDRLXCJcbiAgfSxcblxuICBtaWZhcmVERVNGaXJlOGtNaWZhcmVDbGFzc2ljOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVERVNGaXJlOGtNaWZhcmVDbGFzc2ljXCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgOEsgbWl0IE1JRkFSRSBDbGFzc2ljIEVWMSAxS1wiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzFrTWl0SW5kdWt0aXY6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZUNsYXNzaWMxa01pdEluZHVrdGl2XCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgQ2xhc3NpYyBFVjEgMUsgbWl0IEluZHVrdGl2LCBLYXJ0ZW5zdMOkcmtlIGNhLiAxbW1cIlxuICB9LFxuXG4gIG1pZmFyZUNsYXNzaWMxa01pdFVIRk1vbnphOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVDbGFzc2ljMWtNaXRVSEZNb256YVwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIENsYXNzaWMgRVYxIDFLIG1pdCBVSEYgTW9uemEgMyAoTW9uemEgNCwgNSwgR2VuIDIpXCJcbiAgfSxcblxuICBtaWZhcmVDbGFzc2ljMWtNaXRBdG1lbDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpYzFrTWl0QXRtZWxcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBDbGFzc2ljIEVWMSAxSyBtaXQgQXRtZWwgKFRlbWljLCBRNSkgNTU3N1wiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzFrTWl0UHJveDEyNToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpYzFrTWl0UHJveDEyNVwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIENsYXNzaWMgRVYxIDFLIG1pdCBQcm94IDEyNSBrSHogLyAyNiBiaXQgKDM0LCAzNSwgMzYsIDM3KVwiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzFrTWl0NDQ1MDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpYzFrTWl0NDQ1MFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIENsYXNzaWMgRVYxIDFLIG1pdCBFTTQ0NTBcIlxuICB9LFxuXG4gIG1pZmFyZUNsYXNzaWMxa01pdEVNNDIwMDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpYzFrTWl0RU00MjAwXCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgQ2xhc3NpYyBFVjEgMUsgbWl0IEVNNDIwMCAoRU00MTAyKVwiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzFrTWl0SGl0YWcyOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVDbGFzc2ljMWtNaXRIaXRhZzJcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBDbGFzc2ljIEVWMSAxSyBtaXQgSElUQUcgMlwiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzFrTWl0SGl0YWcxOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVDbGFzc2ljMWtNaXRIaXRhZzFcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBDbGFzc2ljIEVWMSAxSyBtaXQgSElUQUcgMVwiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzRrTWl0SW5kdWt0aXY6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcIm1pZmFyZUNsYXNzaWM0a01pdEluZHVrdGl2XCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgQ2xhc3NpYyBFVjEgNEsgbWl0IEluZHVrdGl2LCBLYXJ0ZW5zdMOkcmtlIGNhLiAxbW1cIlxuICB9LFxuXG4gIG1pZmFyZUNsYXNzaWM0a01pdFVIRk1vbnphOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVDbGFzc2ljNGtNaXRVSEZNb256YVwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIENsYXNzaWMgRVYxIDRLIG1pdCBVSEYgTW9uemEgMyAoTW9uemEgNCwgNSwgR2VuIDIpXCJcbiAgfSxcblxuICBtaWZhcmVDbGFzc2ljNGtNaXRBdG1lbDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpYzRrTWl0QXRtZWxcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBDbGFzc2ljIEVWMSA0SyBtaXQgQXRtZWwgKFRlbWljLCBRNSkgNTU3N1wiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzRrTWl0UHJveDEyNToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpYzRrTWl0UHJveDEyNVwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIENsYXNzaWMgRVYxIDRLIG1pdCBQcm94IDEyNSBrSHogLyAyNiBiaXQgKDM0LCAzNSwgMzYsIDM3KVwiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzRrTWl0NDQ1MDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpYzRrTWl0NDQ1MFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIENsYXNzaWMgRVYxIDRLIG1pdCBFTTQ0NTBcIlxuICB9LFxuXG4gIG1pZmFyZUNsYXNzaWM0a01pdEVNNDIwMDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpYzRrTWl0RU00MjAwXCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgQ2xhc3NpYyBFVjEgNEsgbWl0IEVNNDIwMCAoRU00MTAyKVwiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzRrTWl0SGl0YWcyOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVDbGFzc2ljNGtNaXRIaXRhZzJcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBDbGFzc2ljIEVWMSA0SyBtaXQgSElUQUcgMlwiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpYzRrTWl0SGl0YWcxOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJtaWZhcmVDbGFzc2ljNGtNaXRIaXRhZzFcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBDbGFzc2ljIEVWMSA0SyBtaXQgSElUQUcgMVwiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQ0MDk2bWl0SW5kdWt0aXY6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50NDA5Nm1pdEluZHVrdGl2XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDQwOTYgTVAgbWl0IEluZHVrdGl2LCBLYXJ0ZW5zdMOkcmtlIDEsMCBtbVwiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQ0MDk2bWl0VUhGbW9uemE6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50NDA5Nm1pdFVIRm1vbnphXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDQwOTYgTVAgbWl0IFVIRiBNb256YSAzIC8gNCAvIDUgLyBHZW4gMlwiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQ0MDk2bWl0QXRtZWw1NTc3OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDQwOTZtaXRBdG1lbDU1NzdcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgNDA5NiBNUG1pdCBBdG1lbCAoVGVtaWMsIFE1KSA1NTc3XCJcbiAgfSxcblxuICBsZWdpY0FkdmFudDQwOTZtaXRQcm94MTI1OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDQwOTZtaXRQcm94MTI1XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDQwOTYgTVAgbWl0IFByb3ggMTI1IGtIeiAvIDI2IEJpdCAoMzQsIDM1LCAzNiwgMzcpXCJcbiAgfSxcblxuICBsZWdpY0FkdmFudDQwOTZtaXRJQ29kZToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNBZHZhbnQ0MDk2bWl0SUNvZGVcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgNDA5NiBNUCBtaXQgSS1Db2RlIFNMSSBTMjBcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50NDA5Nm1pdEVNNDIwMGNvZGllcnQ6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50NDA5Nm1pdEVNNDIwMGNvZGllcnRcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgNDA5NiBNUCBtaXQgRU00MjAwIDBGLWNvZGllcnRcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50NDA5Nm1pdEVNNDQ1MDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNBZHZhbnQ0MDk2bWl0RU00NDUwXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDQwOTYgTVAgbWl0IEVNNDQ1MFwiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQ0MDk2bWl0RU00MjAwOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDQwOTZtaXRFTTQyMDBcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgNDA5NiBNUCBtaXQgRU00MjAwIChFTTQxMDIpXCJcbiAgfSxcblxuICBsZWdpY0FkdmFudDQwOTZtaXRIaXRhZ1MyMDQ4OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDQwOTZtaXRIaXRhZ1MyMDQ4XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDQwOTYgTVAgbWl0IEhJVEFHIFMgMjA0OCBCaXRcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50NDA5Nm1pdEhpdGFnMjU2OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDQwOTZtaXRIaXRhZzI1NlwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgQWR2YW50IEFUQyA0MDk2IE1QIG1pdCBISVRBRyAyIDI1NiBCaXRcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50NDA5Nm1pdEhpdGFnMjA0ODoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNBZHZhbnQ0MDk2bWl0SGl0YWcyMDQ4XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDQwOTYgTVAgbWl0IEhJVEFHIDEgMjA0OCBCaXRcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50NDA5Nm1pdE1pZmFyZURFU0ZpcmU6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50NDA5Nm1pdE1pZmFyZURFU0ZpcmVcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgNDA5NiBNUCBtaXQgTUlGQVJFIERFU0ZpcmUgRVYxIDRLIFYwNSA3MHBGIFN1cGVydGFnXCJcbiAgfSxcblxuICBsZWdpY0FkdmFudDQwOTZtaXRNaWZhcmVDbGFzc2ljNGs6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50NDA5Nm1pdE1pZmFyZUNsYXNzaWM0a1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgQWR2YW50IEFUQyA0MDk2IE1QIG1pdCBNSUZBUkUgQ2xhc3NpYyBFVjEgNEtcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50NDA5Nm1pdE1pZmFyZUNsYXNzaWMxazoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNBZHZhbnQ0MDk2bWl0TWlmYXJlQ2xhc3NpYzFrXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDQwOTYgTVAgbWl0IE1JRkFSRSBDbGFzc2ljIEVWMSAxS1wiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQ0MDk2bWl0TGVnaWM6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50NDA5Nm1pdExlZ2ljXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDQwOTYgTVAgbWl0IExFR0lDIEFkdmFudCBBVEMgNDA5NiBNUDMxMSBWMiBTdXBlcnRhZ1wiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQxMDI0bWl0SW5kdWt0aXY6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50MTAyNG1pdEluZHVrdGl2XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDEwMjQgTVYgbWl0IEluZHVrdGl2LCBLYXJ0ZW5zdMOkcmtlIDEsMCBtbVwiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQxMDI0bWl0VUhGbW9uemE6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50MTAyNG1pdFVIRm1vbnphXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDEwMjQgTVYgbWl0IFVIRiBNb256YSAzIC8gNCAvIDUgLyBHZW4gMlwiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQxMDI0bWl0QXRtZWw1NTc3OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDEwMjRtaXRBdG1lbDU1NzdcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgMTAyNCBNVm1pdCBBdG1lbCAoVGVtaWMsIFE1KSA1NTc3XCJcbiAgfSxcblxuICBsZWdpY0FkdmFudDEwMjRtaXRQcm94MTI1OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDEwMjRtaXRQcm94MTI1XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDEwMjQgTVYgbWl0IFByb3ggMTI1IGtIeiAvIDI2IEJpdCAoMzQsIDM1LCAzNiwgMzcpXCJcbiAgfSxcblxuICBsZWdpY0FkdmFudDEwMjRtaXRJQ29kZToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNBZHZhbnQxMDI0bWl0SUNvZGVcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgMTAyNCBNViBtaXQgSS1Db2RlIFNMSSBTMjBcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50MTAyNG1pdEVNNDIwMGNvZGllcnQ6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50MTAyNG1pdEVNNDIwMGNvZGllcnRcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgMTAyNCBNViBtaXQgRU00MjAwIDBGLWNvZGllcnRcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50MTAyNG1pdEVNNDQ1MDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNBZHZhbnQxMDI0bWl0RU00NDUwXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDEwMjQgTVYgbWl0IEVNNDQ1MFwiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQxMDI0bWl0RU00MjAwOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDEwMjRtaXRFTTQyMDBcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgMTAyNCBNViBtaXQgRU00MjAwIChFTTQxMDIpXCJcbiAgfSxcblxuICBsZWdpY0FkdmFudDEwMjRtaXRIaXRhZ1MyMDQ4OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDEwMjRtaXRIaXRhZ1MyMDQ4XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDEwMjQgTVYgbWl0IEhJVEFHIFMgMjA0OCBCaXRcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50MTAyNG1pdEhpdGFnMjU2OiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY0FkdmFudDEwMjRtaXRIaXRhZzI1NlwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgQWR2YW50IEFUQyAxMDI0IE1WIG1pdCBISVRBRyAyIDI1NiBCaXRcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50MTAyNG1pdEhpdGFnMjA0ODoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNBZHZhbnQxMDI0bWl0SGl0YWcyMDQ4XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDEwMjQgTVYgbWl0IEhJVEFHIDEgMjA0OCBCaXRcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50MTAyNG1pdE1pZmFyZURFU0ZpcmU6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50MTAyNG1pdE1pZmFyZURFU0ZpcmVcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgMTAyNCBNViBtaXQgTUlGQVJFIERFU0ZpcmUgRVYxIDRLIFYwNSA3MHBGIFN1cGVydGFnXCJcbiAgfSxcblxuICBsZWdpY0FkdmFudDEwMjRtaXRNaWZhcmVDbGFzc2ljNGs6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50MTAyNG1pdE1pZmFyZUNsYXNzaWM0a1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgQWR2YW50IEFUQyAxMDI0IE1WIG1pdCBNSUZBUkUgQ2xhc3NpYyBFVjEgNEtcIlxuICB9LFxuXG4gIGxlZ2ljQWR2YW50MTAyNG1pdE1pZmFyZUNsYXNzaWMxazoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNBZHZhbnQxMDI0bWl0TWlmYXJlQ2xhc3NpYzFrXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDEwMjQgTVYgbWl0IE1JRkFSRSBDbGFzc2ljIEVWMSAxS1wiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQxMDI0bWl0TGVnaWM6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50MTAyNG1pdExlZ2ljXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBBZHZhbnQgQVRDIDEwMjQgTVYgbWl0IExFR0lDIEFkdmFudCBBVEMgNDA5NiBNUDMxMSBWMiBTdXBlcnRhZ1wiXG4gIH0sXG5cbiAgbGVnaWNNSU0xMDI0bWl0SW5kdWt0aXY6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljTUlNMTAyNG1pdEluZHVrdGl2XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBNSU0gMTAyNCBtaXQgSW5kdWt0aXYsIEthcnRlbnN0w6Rya2UgMSwwIG1tXCJcbiAgfSxcblxuICBsZWdpY01JTTEwMjRtaXRVSEZtb256YToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0VUhGbW9uemFcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIE1JTSAxMDI0IG1pdCBVSEYgTW9uemEgMyAvIDQgLyA1IC8gR2VuIDJcIlxuICB9LFxuXG4gIGxlZ2ljTUlNMTAyNG1pdEF0bWVsNTU3Nzoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0QXRtZWw1NTc3XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBNSU0gMTAyNCBtaXQgQXRtZWwgKFRlbWljLCBRNSkgNTU3N1wiXG4gIH0sXG5cbiAgbGVnaWNNSU0xMDI0bWl0UHJveDEyNToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0UHJveDEyNVwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgTUlNIDEwMjQgbWl0IFByb3ggMTI1IGtIeiAvIDI2IEJpdCAoMzQsIDM1LCAzNiwgMzcpXCJcbiAgfSxcblxuICBsZWdpY01JTTEwMjRtaXRJQ29kZToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0SUNvZGVcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIE1JTSAxMDI0IG1pdCBJLUNvZGUgU0xJIFMyMFwiXG4gIH0sXG5cbiAgbGVnaWNNSU0xMDI0bWl0RU00MjAwY29kaWVydDoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0RU00MjAwY29kaWVydFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgTUlNIDEwMjQgbWl0IEVNNDIwMCAwRi1jb2RpZXJ0XCJcbiAgfSxcblxuICBsZWdpY01JTTEwMjRtaXRFTTQ0NTA6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljTUlNMTAyNG1pdEVNNDQ1MFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgTUlNIDEwMjQgbWl0IEVNNDQ1MFwiXG4gIH0sXG5cbiAgbGVnaWNNSU0xMDI0bWl0RU00MjAwOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY01JTTEwMjRtaXRFTTQyMDBcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIE1JTSAxMDI0IG1pdCBFTTQyMDAgKEVNNDEwMilcIlxuICB9LFxuXG4gIGxlZ2ljTUlNMTAyNG1pdEhpdGFnUzIwNDg6IHtcbiAgICB0eXBlOiAnbGFzdEVsJyxcbiAgICBuYW1lOiBcImxlZ2ljTUlNMTAyNG1pdEhpdGFnUzIwNDhcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIE1JTSAxMDI0IG1pdCBISVRBRyBTIDIwNDggQml0XCJcbiAgfSxcblxuICBsZWdpY01JTTEwMjRtaXRIaXRhZzI1Njoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0SGl0YWcyNTZcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIE1JTSAxMDI0IG1pdCBISVRBRyAyIDI1NiBCaXRcIlxuICB9LFxuXG4gIGxlZ2ljTUlNMTAyNG1pdEhpdGFnMjA0ODoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0SGl0YWcyMDQ4XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBNSU0gMTAyNCBtaXQgSElUQUcgMSAyMDQ4IEJpdFwiXG4gIH0sXG5cbiAgbGVnaWNNSU0xMDI0bWl0TWlmYXJlREVTRmlyZToge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0TWlmYXJlREVTRmlyZVwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgTUlNIDEwMjQgbWl0IE1JRkFSRSBERVNGaXJlIEVWMSA0SyBWMDUgNzBwRiBTdXBlcnRhZ1wiXG4gIH0sXG5cbiAgbGVnaWNNSU0xMDI0bWl0TWlmYXJlQ2xhc3NpYzRrOiB7XG4gICAgdHlwZTogJ2xhc3RFbCcsXG4gICAgbmFtZTogXCJsZWdpY01JTTEwMjRtaXRNaWZhcmVDbGFzc2ljNGtcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIE1JTSAxMDI0IG1pdCBNSUZBUkUgQ2xhc3NpYyBFVjEgNEtcIlxuICB9LFxuXG4gIGxlZ2ljTUlNMTAyNG1pdE1pZmFyZUNsYXNzaWMxazoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0TWlmYXJlQ2xhc3NpYzFrXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBNSU0gMTAyNCBtaXQgTUlGQVJFIENsYXNzaWMgRVYxIDFLXCJcbiAgfSxcblxuICBsZWdpY01JTTEwMjRtaXRMZWdpYzoge1xuICAgIHR5cGU6ICdsYXN0RWwnLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0bWl0TGVnaWNcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIE1JTSAxMDI0IG1pdCBMRUdJQyBBZHZhbnQgQVRDIDQwOTYgTVAzMTEgVjIgU3VwZXJ0YWdcIlxuICB9LFxuXG4gIGluZGl2aWR1YWxDaGlwbGFnZVJmaWRIeWJyaWRCcmVpdGU6IHtcbiAgICB0eXBlOiAnaW5wdXQnLFxuICAgIGlucHV0VHlwZTogJ251bWJlcicsXG4gICAgbWluOiAwLFxuICAgIG5hbWU6IFwiaW5kaXZpZHVhbENoaXBsYWdlUmZpZEh5YnJpZEJyZWl0ZVwiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwiZmlyc3RCbG9ja1wiLFxuICAgIGxhYmVsTmFtZTogXCJCcmVpdGVcIlxuICB9LFxuXG4gIGluZGl2aWR1YWxDaGlwbGFnZVJmaWRIeWJyaWRIw7ZoZToge1xuICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgaW5wdXRUeXBlOiAnbnVtYmVyJyxcbiAgICBtaW46IDAsXG4gICAgbmFtZTogXCJpbmRpdmlkdWFsQ2hpcGxhZ2VSZmlkSHlicmlkSMO2aGVcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcImZpcnN0QmxvY2tcIixcbiAgICBsYWJlbE5hbWU6IFwiSMO2aGVcIlxuICB9LFxuXG4gIGluZGl2aWR1YWxDaGlwbGFnZVJmaWRIeWJyaWRQb3NpdGlvblg6IHtcbiAgICB0eXBlOiAnaW5wdXQnLFxuICAgIGlucHV0VHlwZTogJ251bWJlcicsXG4gICAgbWluOiAwLFxuICAgIG5hbWU6IFwiaW5kaXZpZHVhbENoaXBsYWdlUmZpZEh5YnJpZFBvc2l0aW9uWFwiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwiZmlyc3RCbG9ja1wiLFxuICAgIGxhYmVsTmFtZTogXCJQb3NpdGlvbiBYXCJcbiAgfSxcblxuICBpbmRpdmlkdWFsQ2hpcGxhZ2VSZmlkSHlicmlkUG9zaXRpb25ZOiB7XG4gICAgdHlwZTogJ2lucHV0JyxcbiAgICBpbnB1dFR5cGU6ICdudW1iZXInLFxuICAgIG1pbjogMCxcbiAgICBuYW1lOiBcImluZGl2aWR1YWxDaGlwbGFnZVJmaWRIeWJyaWRQb3NpdGlvbllcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcImZpcnN0QmxvY2tcIixcbiAgICBsYWJlbE5hbWU6IFwiUG9zaXRpb24gWVwiXG4gIH0sXG5cbiAgc2ljaHRhdXN3ZWlzOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcInNpY2h0YXVzd2Vpc1wiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwiZmlyc3RCbG9ja1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiU2ljaHRhdXN3ZWlzXCJcbiAgfSxcblxuICBwcm94OiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcInByb3hcIixcbiAgICBvcHRpb25OYW1lOiBcIlByb3ggMTI1IGtIeiAvIDI2IGJpdCAoMzQsIDM1LCAzNiwgMzcpXCJcbiAgfSxcblxuICB0YWdJdDoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJ0YWdJdFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiVGFnLWl0IFBsdXMgMjA0OCBiaXRcIlxuICB9LFxuXG4gIGlDb2RlOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcImlDb2RlXCIsXG4gICAgb3B0aW9uTmFtZTogXCJJLUNvZGUgU0xJIFMyMCAvIFNMSVhcIlxuICB9LFxuXG4gIGF0bWVsOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcImF0bWVsXCIsXG4gICAgb3B0aW9uTmFtZTogXCJBdG1lbCAoVGVtaWMpIEFUQTU1NzdcIlxuICB9LFxuXG4gIHE1OiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcInE1XCIsXG4gICAgb3B0aW9uTmFtZTogXCJRNVwiXG4gIH0sXG5cbiAgbW9uemE6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwibW9uemFcIixcbiAgICBvcHRpb25OYW1lOiBcIlVIRiBNb256YSAzIC8gNCAvIDVcIlxuICB9LFxuXG4gIGVtNDIwMDoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJlbTQyMDBcIixcbiAgICBvcHRpb25OYW1lOiBcIkVNNDIwMCAoRU00MTAyKVwiXG4gIH0sXG5cbiAgZW00NDUwOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcImVtNDQ1MFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiRU00NDUwXCJcbiAgfSxcblxuICBlbTQyMDBDb2RpZXJ0OiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcImVtNDIwMENvZGllcnRcIixcbiAgICBvcHRpb25OYW1lOiBcIkVNNDIwMCAoRU00MTAyKSAwRi1jb2RpZXJ0XCJcbiAgfSxcblxuICBoaXRhZzoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJoaXRhZ1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiSElUQUcgMSAyMDQ4IEJpdFwiXG4gIH0sXG5cbiAgaGl0YWcyOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcImhpdGFnMlwiLFxuICAgIG9wdGlvbk5hbWU6IFwiSElUQUcgMiAyNTYgQml0XCJcbiAgfSxcblxuICBoaXRhZ1MyMDQ4OiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcImhpdGFnUzIwNDhcIixcbiAgICBvcHRpb25OYW1lOiBcIkhJVEFHIFMgMjA0OCBCaXRcIlxuICB9LFxuXG4gIGhpdGFnUzI1Njoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJoaXRhZ1MyNTZcIixcbiAgICBvcHRpb25OYW1lOiBcIkhJVEFHIFMgMjU2IEJpdFwiXG4gIH0sXG5cbiAgZnVkYW46IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiZnVkYW5cIixcbiAgICBvcHRpb25OYW1lOiBcIkZVREFOIE1pY3JvZWxlY3Ryb25pY3MgMUsgQ2hpcCBGTTExUkYwOFwiXG4gIH0sXG5cbiAgZnVkYW40Szoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJmdWRhbjRLXCIsXG4gICAgb3B0aW9uTmFtZTogXCJGVURBTiBNaWNyb2VsZWN0cm9uaWNzIDRLIENoaXAgRk0xMVJGMzJOXCJcbiAgfSxcblxuICBtaWZhcmVDbGFzc2ljOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIm1pZmFyZUNsYXNzaWNcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBDbGFzc2ljIDFLICg0QiBOVUlEKVwiXG4gIH0sXG5cbiAgbWlmYXJlQ2xhc3NpY05YUDRCOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIm1pZmFyZUNsYXNzaWNOWFA0QlwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIENsYXNzaWMgTlhQIEVWMSAxSyAoNEIgTlVJRClcIlxuICB9LFxuXG4gIG1pZmFyZUNsYXNzaWNOWFA3Qjoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJtaWZhcmVDbGFzc2ljTlhQN0JcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBDbGFzc2ljIE5YUCBFVjEgMUsgKDdCIFVJRClcIlxuICB9LFxuXG4gIG1pZmFyZUNsYXNzaWNOWFA0Szoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJtaWZhcmVDbGFzc2ljTlhQNEtcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBDbGFzc2ljIE5YUCBFVjEgNEtcIlxuICB9LFxuXG4gIG1pZmFyZVVsdHJhbGlnaHQ6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwibWlmYXJlVWx0cmFsaWdodFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIFVsdHJhbGlnaHQgTUYwSUNVMVggNjQgQnl0ZVwiXG4gIH0sXG5cbiAgbWlmYXJlREVTNDoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJtaWZhcmVERVM0XCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgNEsgVjA1IDE3cEZcIlxuICB9LFxuXG4gIG1pZmFyZURFUzRTdXBlcnRhZzoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJtaWZhcmVERVM0U3VwZXJ0YWdcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA0SyBWMDUgNzBwRiBTdXBlcnRhZ1wiXG4gIH0sXG5cbiAgbWlmYXJlREVTODoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJtaWZhcmVERVM4XCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgOEsgVjA1IDE3cEZcIlxuICB9LFxuXG4gIG1pZmFyZURFUzhTdXBlcnRhZzoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJtaWZhcmVERVM4U3VwZXJ0YWdcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA4SyBWMDUgNzBwRiBTdXBlcnRhZ1wiXG4gIH0sXG5cbiAgbWlmYXJlUGx1c1M6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwibWlmYXJlUGx1c1NcIixcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBQbHVzIFMgNEsgKDdCIFVJRClcIlxuICB9LFxuXG4gIG1pZmFyZVBsdXNYOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIm1pZmFyZVBsdXNYXCIsXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgUGx1cyBYIDRLICg3QiBVSUQpXCJcbiAgfSxcblxuICBsZWdpY01JTTI1Njoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJsZWdpY01JTTI1NlwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgTUlNIDI1NlwiXG4gIH0sXG5cbiAgbGVnaWNNSU0yNTZTdXBlcnRhZzoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJsZWdpY01JTTI1NlN1cGVydGFnXCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBNSU0gMjU2IFN1cGVydGFnXCJcbiAgfSxcblxuICBsZWdpY01JTTEwMjQ6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0XCIsXG4gICAgb3B0aW9uTmFtZTogXCJMRUdJQyBNSU0gMTAyNFwiXG4gIH0sXG5cbiAgbGVnaWNNSU0xMDI0U3VwZXJ0YWc6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwibGVnaWNNSU0xMDI0U3VwZXJ0YWdcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIE1JTSAxMDI0IFN1cGVydGFnXCJcbiAgfSxcblxuICBsZWdpY0FUQzEyODoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJsZWdpY0FUQzEyOFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgQWR2YW50IEFUQyAxMjggTVYsIElTTyAxNTY5M1wiXG4gIH0sXG5cbiAgbGVnaWNBVEMxMDI0OiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcImxlZ2ljQVRDMTAyNFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgQWR2YW50IEFUQyAxMDI0IE1WLCBJU08gMTU2OTNcIlxuICB9LFxuXG4gIGxlZ2ljQVRDNDA5Njoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJsZWdpY0FUQzQwOTZcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcImZpcnN0QmxvY2tcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgNDA5NiBNUCAzMTEgVjIsIElTTyAxNDQ0M1wiXG4gIH0sXG5cbiAgbGVnaWNBVEM0MDk2U3VwZXJ0YWc6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwibGVnaWNBVEM0MDk2U3VwZXJ0YWdcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcImZpcnN0QmxvY2tcIixcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDIEFkdmFudCBBVEMgNDA5NiBNUCAzMTEgVjIgU3VwZXJ0YWcsIElTTyAxNDQ0M1wiXG4gIH0sXG5cbiAgbGVnaWNDVEM0MDk2OiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcImxlZ2ljQ1RDNDA5NlwiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwiZmlyc3RCbG9ja1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgQ1RDIDQwOTYsIElTTyAxNDQ0M1wiXG4gIH0sXG5cbiAgbGlua3NJU086IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwibGlua3NJU09cIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcImZpcnN0QmxvY2tcIixcbiAgICBvcHRpb25OYW1lOiBcIkxpbmtzLCBnZW0uIElTT1wiXG4gIH0sXG5cbiAgcmVjaHRzSVNPOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcInJlY2h0c0lTT1wiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwiZmlyc3RCbG9ja1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiUmVjaHRzIGdlbS4gSVNPXCJcbiAgfSxcblxuICBvYmVuSVNPOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIm9iZW5JU09cIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcImZpcnN0QmxvY2tcIixcbiAgICBvcHRpb25OYW1lOiBcIk9iZW4sIGdlbS4gSVNPXCJcbiAgfSxcblxuICB1bnRlbklTTzoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJ1bnRlbklTT1wiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwiZmlyc3RCbG9ja1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiVW50ZW4sIGdlbS4gSVNPXCJcbiAgfSxcblxuICBwb3NpdGlvbktvbnRha3RjaGlwQW5kQ29kaWVydW5nOiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwicG9zaXRpb25Lb250YWt0Y2hpcEFuZENvZGllcnVuZ1wiLFxuICAgIG9wdGlvbnM6IFtcImxpbmtzSVNPXCIsIFwicmVjaHRzSVNPXCJdLFxuICAgIGxhYmVsTmFtZTogXCJQb3NpdGlvbiBLb250YWt0Y2hpcFwiXG4gIH0sXG5cbiAgU0xFNjZDWDY4MHBlbWl0Q2FyZE9TNDRCZXRyaWVic3N5c3RlbToge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJTTEU2NkNYNjgwcGVtaXRDYXJkT1M0NEJldHJpZWJzc3lzdGVtXCIsXG4gICAgbmV4dFNob3duRWxlbWVudDogXCJwb3NpdGlvbktvbnRha3RjaGlwQW5kQ29kaWVydW5nXCIsXG4gICAgb3B0aW9uTmFtZTogXCJTTEU2NkNYNjgwcGUgbWl0IENhcmRPUyA0LjQgQmV0cmllYnNzeXN0ZW1cIlxuICB9LFxuXG4gIFA1Q0MwNzJtaXRTdGFyQ09TMzA6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiUDVDQzA3Mm1pdFN0YXJDT1MzMFwiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwicG9zaXRpb25Lb250YWt0Y2hpcEFuZENvZGllcnVuZ1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiUDVDQzA3MiBtaXQgU3RhckNPUyAzLjBcIlxuICB9LFxuXG4gIEdlbWFsdG9DaGlwTkVUdjNJRFByaW1lNTEwOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIkdlbWFsdG9DaGlwTkVUdjNJRFByaW1lNTEwXCIsXG4gICAgbmV4dFNob3duRWxlbWVudDogXCJwb3NpdGlvbktvbnRha3RjaGlwQW5kQ29kaWVydW5nXCIsXG4gICAgb3B0aW9uTmFtZTogXCJHZW1hbHRvIENoaXAgLk5FVCB2MyBJRCBQcmltZSA1MTBcIlxuICB9LFxuXG4gIEdlbWFsdG9DeWJlcmZsZXhBY2Nlc3M2NGt2MkNUT1BJTUZJUFNDWTI6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiR2VtYWx0b0N5YmVyZmxleEFjY2VzczY0a3YyQ1RPUElNRklQU0NZMlwiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwicG9zaXRpb25Lb250YWt0Y2hpcEFuZENvZGllcnVuZ1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiR2VtYWx0byBDeWJlcmZsZXggQWNjZXNzIDY0a3YyQyBUT1AgSU0gRklQUyBDWTJcIlxuICB9LFxuXG4gIFA1Q0QwODBtaXRUQ09TMzA6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiUDVDRDA4MG1pdFRDT1MzMFwiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwicG9zaXRpb25Lb250YWt0Y2hpcEFuZENvZGllcnVuZ1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiUDVDRDA4MCBtaXQgVENPUyAzLjBcIlxuICB9LFxuXG4gIEoyQTA4MEdYMFQwQkcyOTVtaXRKQ09QMjEyNDFTaW5nbGVJbnRlcmZhY2U4MGtCOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIkoyQTA4MEdYMFQwQkcyOTVtaXRKQ09QMjEyNDFTaW5nbGVJbnRlcmZhY2U4MGtCXCIsXG4gICAgbmV4dFNob3duRWxlbWVudDogXCJwb3NpdGlvbktvbnRha3RjaGlwQW5kQ29kaWVydW5nXCIsXG4gICAgb3B0aW9uTmFtZTogXCJKMkEwODBHWDAvVDBCRzI5NSBtaXQgSkNPUDIxIDIuNC4xIFNpbmdsZSBJbnRlcmZhY2UgODBrQlwiXG4gIH0sXG5cbiAgS29udGFrdHNwZWljaGVyY2hpcDI0TEMxNjoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJLb250YWt0c3BlaWNoZXJjaGlwMjRMQzE2XCIsXG4gICAgbmV4dFNob3duRWxlbWVudDogXCJwb3NpdGlvbktvbnRha3RjaGlwQW5kQ29kaWVydW5nXCIsXG4gICAgb3B0aW9uTmFtZTogXCJLb250YWt0c3BlaWNoZXJjaGlwIDI0TEMxNlwiXG4gIH0sXG5cbiAgS29udGFrdHNwZWljaGVyY2hpcDI0TEMzMjoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJLb250YWt0c3BlaWNoZXJjaGlwMjRMQzMyXCIsXG4gICAgbmV4dFNob3duRWxlbWVudDogXCJwb3NpdGlvbktvbnRha3RjaGlwQW5kQ29kaWVydW5nXCIsXG4gICAgb3B0aW9uTmFtZTogXCJLb250YWt0c3BlaWNoZXJjaGlwIDI0TEMzMlwiXG4gIH0sXG5cbiAgS29udGFrdHNwZWljaGVyY2hpcDI0TEMxMjg6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiS29udGFrdHNwZWljaGVyY2hpcDI0TEMxMjhcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcInBvc2l0aW9uS29udGFrdGNoaXBBbmRDb2RpZXJ1bmdcIixcbiAgICBvcHRpb25OYW1lOiBcIktvbnRha3RzcGVpY2hlcmNoaXAgMjRMQzEyOFwiXG4gIH0sXG5cbiAgS29udGFrdHNwZWljaGVyY2hpcFNMRTU1NDIxMDI0Ynl0ZVNwZWljaGVyUElOU2NodXR6OiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIktvbnRha3RzcGVpY2hlcmNoaXBTTEU1NTQyMTAyNGJ5dGVTcGVpY2hlclBJTlNjaHV0elwiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwicG9zaXRpb25Lb250YWt0Y2hpcEFuZENvZGllcnVuZ1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiS29udGFrdHNwZWljaGVyY2hpcCBTTEUgNTU0MiwgMTAyNCBieXRlIFNwZWljaGVyLCBQSU4tU2NodXR6XCJcbiAgfSxcblxuICBLb250YWt0c3BlaWNoZXJjaGlwMjRMQzAyOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIktvbnRha3RzcGVpY2hlcmNoaXAyNExDMDJcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcInBvc2l0aW9uS29udGFrdGNoaXBBbmRDb2RpZXJ1bmdcIixcbiAgICBvcHRpb25OYW1lOiBcIktvbnRha3RzcGVpY2hlcmNoaXAgMjRMQzAyIChJwrJDLUJ1cylcIlxuICB9LFxuXG4gIHBvc2l0aW9uTWFnbmV0c3RyZWlmZW5BbmRDb2RpZXJ1bmc6IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJwb3NpdGlvbk1hZ25ldHN0cmVpZmVuQW5kQ29kaWVydW5nXCIsXG4gICAgb3B0aW9uczogW1wib2JlbklTT1wiLCBcInVudGVuSVNPXCJdLFxuICAgIGxhYmVsTmFtZTogXCJQb3NpdGlvbiBNYWduZXRzdHJlaWZlblwiXG4gIH0sXG5cbiAgU2Nod2Fyejoge1xuICAgIHR5cGU6IFwiZGVmYXVsdFNlbGVjdGVkXCIsXG4gICAgbmFtZTogXCJTY2h3YXJ6XCIsXG4gICAgb3B0aW9uTmFtZTogXCJTY2h3YXJ6XCJcbiAgfSxcblxuICBHcsO8bjoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJHcsO8blwiLFxuICAgIG9wdGlvbk5hbWU6IFwiR3LDvG5cIlxuICB9LFxuXG4gIFNpbGJlcjoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJTaWxiZXJcIixcbiAgICBvcHRpb25OYW1lOiBcIlNpbGJlclwiXG4gIH0sXG5cbiAgQnJhdW46IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiQnJhdW5cIixcbiAgICBvcHRpb25OYW1lOiBcIkJyYXVuXCJcbiAgfSxcblxuICAvLyB4ZXhleGVlZSA6IHtcbiAgLy8gXHR0eXBlOiBcImxhc3RFbFwiLFxuICAvLyBcdG5hbWU6IFwieGV4ZXhleGV4XCIsXG4gIC8vIFx0b3B0aW9uTmFtZTogXCJleGV4ZXhlXCJcbiAgLy8gfSxcblxuICAvKm5vcm1hbCBibG9ja3MqL1xuXG4gIC8vIGV4ZXhleCA6IHtcbiAgLy8gdHlwZTogXCJzZWxlY3RcIixcbiAgLy8gXHRuYW1lOiBcInhleGV4ZVwiLFxuICAvLyBcdG9wdGlvbnM6IFtwcm94LCB0YWdJdCwgaUNvZGUsIGF0bWVsLCB4ZXhleGVlZSwgbW9uemFdLFxuICAvLyBcdG9wdGlvbk5hbWU6IFwieGV4ZXhleGVcIixcbiAgLy8gXHRsYWJlbE5hbWU6IFwieGV4ZXhlXCJcbiAgLy8gfSxcblxuICBoaWNvNDAwMDoge1xuICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcImhpY280MDAwXCIsXG4gICAgbmV4dFNob3duRWxlbWVudDogXCJwb3NpdGlvbk1hZ25ldHN0cmVpZmVuQW5kQ29kaWVydW5nXCIsXG4gICAgb3B0aW9uczogW1wiU2Nod2FyelwiLCBcIkJyYXVuXCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiTWFnbmV0c3RyZWlmZW4gSGlDbyA0MDAwIE9lXCIsXG4gICAgbGFiZWxOYW1lOiBcIk1hZ25ldHN0cmVpZmVuYXVzZsO8aHJ1bmdcIlxuICB9LFxuXG4gIGhpY28yNzUwOiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwiaGljbzI3NTBcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcInBvc2l0aW9uTWFnbmV0c3RyZWlmZW5BbmRDb2RpZXJ1bmdcIixcbiAgICBvcHRpb25zOiBbXCJTY2h3YXJ6XCIsIFwiU2lsYmVyXCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiTWFnbmV0c3RyZWlmZW4gSGlDbyAyNzUwIE9lXCIsXG4gICAgbGFiZWxOYW1lOiBcIk1hZ25ldHN0cmVpZmVuYXVzZsO8aHJ1bmdcIlxuICB9LFxuXG4gIGxvY28zMDA6IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJsb2NvMzAwXCIsXG4gICAgbmV4dFNob3duRWxlbWVudDogXCJwb3NpdGlvbk1hZ25ldHN0cmVpZmVuQW5kQ29kaWVydW5nXCIsXG4gICAgb3B0aW9uczogW1wiU2Nod2FyelwiLCBcIkdyw7xuXCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiTWFnbmV0c3RyZWlmZW4gTG9DbyAzMDAgT2VcIixcbiAgICBsYWJlbE5hbWU6IFwiTWFnbmV0c3RyZWlmZW5hdXNmw7xocnVuZ1wiXG4gIH0sXG5cbiAgV2VpdGVyZVNwZWljaGVyY2hpcHM6IHtcbiAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgYXBwZW5kVG86IFwiI3NwZWljaGVyY2hpcFwiLFxuICAgIGlucHV0VHlwZTogXCJ0ZXh0XCIsXG4gICAgbmFtZTogXCJXZWl0ZXJlU3BlaWNoZXJjaGlwc1wiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwicG9zaXRpb25Lb250YWt0Y2hpcEFuZENvZGllcnVuZ1wiLFxuICAgIG9wdGlvbk5hbWU6IFwiV2VpdGVyZSBTcGVpY2hlcmNoaXBzXCIsXG4gICAgbGFiZWxOYW1lOiBcIkNoaXB0eXBcIlxuICB9LFxuXG4gIFdlaXRlcmVQcm96ZXNzb3JjaGlwc2lua2xCZXRyaWVic3N5dGVtOiB7XG4gICAgdHlwZTogXCJpbnB1dFwiLFxuICAgIGFwcGVuZFRvOiBcIiNwcm96ZXNzb3JcIixcbiAgICBpbnB1dFR5cGU6IFwidGV4dFwiLFxuICAgIG5hbWU6IFwiV2VpdGVyZVByb3plc3NvcmNoaXBzaW5rbEJldHJpZWJzc3l0ZW1cIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcInBvc2l0aW9uS29udGFrdGNoaXBBbmRDb2RpZXJ1bmdcIixcbiAgICBvcHRpb25OYW1lOiBcIldlaXRlcmUgUHJvemVzc29yY2hpcHMgaW5rbC4gQmV0cmllYnNzeXRlbVwiLFxuICAgIGxhYmVsTmFtZTogXCJDaGlwdHlwXCJcbiAgfSxcblxuICBzcGVpY2hlcmNoaXA6IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJzcGVpY2hlcmNoaXBcIixcbiAgICBvcHRpb25zOiBbXCJLb250YWt0c3BlaWNoZXJjaGlwMjRMQzE2XCIsIFwiS29udGFrdHNwZWljaGVyY2hpcDI0TEMzMlwiLCBcIktvbnRha3RzcGVpY2hlcmNoaXAyNExDMTI4XCIsIFwiS29udGFrdHNwZWljaGVyY2hpcFNMRTU1NDIxMDI0Ynl0ZVNwZWljaGVyUElOU2NodXR6XCIsIFwiS29udGFrdHNwZWljaGVyY2hpcDI0TEMwMlwiLCBcIldlaXRlcmVTcGVpY2hlcmNoaXBzXCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiU3BlaWNoZXJjaGlwIChSZWFkIE9ubHkgTWVtb3J5KVwiLFxuICAgIGxhYmVsTmFtZTogXCJTcGVpY2hlcmNoaXBzIChSZWFkIE9ubHkgTWVtb3J5KVwiXG4gIH0sXG5cbiAgcHJvemVzc29yOiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwicHJvemVzc29yXCIsXG4gICAgb3B0aW9uczogW1wiU0xFNjZDWDY4MHBlbWl0Q2FyZE9TNDRCZXRyaWVic3N5c3RlbVwiLCBcIlA1Q0MwNzJtaXRTdGFyQ09TMzBcIiwgXCJHZW1hbHRvQ2hpcE5FVHYzSURQcmltZTUxMFwiLCBcIkdlbWFsdG9DeWJlcmZsZXhBY2Nlc3M2NGt2MkNUT1BJTUZJUFNDWTJcIiwgXCJQNUNEMDgwbWl0VENPUzMwXCIsIFwiSjJBMDgwR1gwVDBCRzI5NW1pdEpDT1AyMTI0MVNpbmdsZUludGVyZmFjZTgwa0JcIiwgXCJXZWl0ZXJlUHJvemVzc29yY2hpcHNpbmtsQmV0cmllYnNzeXRlbVwiXSxcbiAgICBvcHRpb25OYW1lOiBcIlByb3plc3Nvci0vIFBLSS1DaGlwXCIsXG4gICAgbGFiZWxOYW1lOiBcIlByb3plc3Nvci0vIFBLSS1jaGlwc1wiXG4gIH0sXG5cbiAgd2VpdGVyZVJGSUQ6IHtcbiAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgYXBwZW5kVG86IFwiI21haW5Tb25zdGlnZVwiLFxuICAgIGlucHV0VHlwZTogXCJ0ZXh0XCIsXG4gICAgbmFtZTogXCJ3ZWl0ZXJlUkZJRFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiV2VpdGVyZSBSRklELVRlY2hub2xvZ2llblwiLFxuICAgIGxhYmVsTmFtZTogXCJSRklELVRlY2hub2xvZ2llXCJcbiAgfSxcblxuICBtYWluU29uc3RpZ2U6IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJtYWluU29uc3RpZ2VcIixcbiAgICBvcHRpb25zOiBbXCJwcm94XCIsIFwidGFnSXRcIiwgXCJpQ29kZVwiLCBcImF0bWVsXCIsIFwicTVcIiwgXCJtb256YVwiLCBcIndlaXRlcmVSRklEXCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiU29uc3RpZ2UgUkZJRC1UZWNobm9sb2dpZW5cIixcbiAgICBsYWJlbE5hbWU6IFwiU29uc3RpZ2UgUkZJRC1UZWNobm9sb2dpZW5cIlxuICB9LFxuXG4gIG1haW5FbToge1xuICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcIm1haW5FbVwiLFxuICAgIG9wdGlvbnM6IFtcImVtNDIwMFwiLCBcImVtNDQ1MFwiLCBcImVtNDIwMENvZGllcnRcIl0sXG4gICAgb3B0aW9uTmFtZTogXCJFTVwiLFxuICAgIGxhYmVsTmFtZTogXCJFTS1UZWNobm9sb2dpZW5cIlxuICB9LFxuXG4gIG1haW5IaXRhZzoge1xuICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcIm1haW5IaXRhZ1wiLFxuICAgIG9wdGlvbnM6IFtcImhpdGFnXCIsIFwiaGl0YWcyXCIsIFwiaGl0YWdTMjA0OFwiLCBcImhpdGFnUzI1NlwiXSxcbiAgICBvcHRpb25OYW1lOiBcIkhJVEFHXCIsXG4gICAgbGFiZWxOYW1lOiBcIkhJVEFHLVRlY2hub2xvZ2llblwiXG4gIH0sXG5cbiAgbWFpbkZ1ZGFuOiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwibWFpbkZ1ZGFuXCIsXG4gICAgb3B0aW9uczogW1wiZnVkYW5cIiwgXCJmdWRhbjRLXCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiRlVEQU5cIixcbiAgICBsYWJlbE5hbWU6IFwiRlVEQU4tVGVjaG5vbG9naWVuXCJcbiAgfSxcblxuICBtYWluTWlmYXJlOiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwibWFpbk1pZmFyZVwiLFxuICAgIG9wdGlvbnM6IFtcIm1pZmFyZUNsYXNzaWNcIiwgXCJtaWZhcmVDbGFzc2ljTlhQNEJcIiwgXCJtaWZhcmVDbGFzc2ljTlhQN0JcIiwgXCJtaWZhcmVDbGFzc2ljTlhQNEtcIiwgXCJtaWZhcmVVbHRyYWxpZ2h0XCIsIFwibWlmYXJlREVTNFwiLCBcIm1pZmFyZURFUzRTdXBlcnRhZ1wiLCBcIm1pZmFyZURFUzhcIiwgXCJtaWZhcmVERVM4U3VwZXJ0YWdcIiwgXCJtaWZhcmVQbHVzU1wiLCBcIm1pZmFyZVBsdXNYXCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFXCIsXG4gICAgbGFiZWxOYW1lOiBcIk1JRkFSRS1UZWNobm9sb2dpZW5cIlxuICB9LFxuXG4gIG1haW5MZWdpYzoge1xuICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcIm1haW5MZWdpY1wiLFxuICAgIG9wdGlvbnM6IFtcImxlZ2ljTUlNMjU2XCIsIFwibGVnaWNNSU0yNTZTdXBlcnRhZ1wiLCBcImxlZ2ljTUlNMTAyNFwiLCBcImxlZ2ljTUlNMTAyNFN1cGVydGFnXCIsIFwibGVnaWNBVEMxMjhcIiwgXCJsZWdpY0FUQzEwMjRcIiwgXCJsZWdpY0FUQzQwOTZcIiwgXCJsZWdpY0FUQzQwOTZTdXBlcnRhZ1wiLCBcImxlZ2ljQ1RDNDA5NlwiXSxcbiAgICBvcHRpb25OYW1lOiBcIkxFR0lDXCIsXG4gICAgbGFiZWxOYW1lOiBcIkxFR0lDLVRlY2hub2xvZ2llblwiXG4gIH0sXG5cbiAga2FydGU6IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJrYXJ0ZVwiLFxuICAgIG9wdGlvbnM6IFtcIm1haW5MZWdpY1wiLCBcIm1haW5NaWZhcmVcIiwgXCJtYWluRnVkYW5cIiwgXCJtYWluSGl0YWdcIiwgXCJtYWluRW1cIiwgXCJtYWluU29uc3RpZ2VcIl0sXG4gICAgb3B0aW9uTmFtZTogXCJSRklELUthcnRlXCIsXG4gICAgbGFiZWxOYW1lOiBcIlJGSUQtVGVjaG5vbG9naWVcIlxuICB9LFxuXG4gIHNvbnN0aWdlSHlicmlkVGVjaG5vbG9naWVuOiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwic29uc3RpZ2VIeWJyaWRUZWNobm9sb2dpZW5cIixcbiAgICBvcHRpb25zOiBbXCJtYWluTGVnaWNcIiwgXCJtYWluTWlmYXJlXCIsIFwibWFpbkZ1ZGFuXCIsIFwibWFpbkhpdGFnXCIsIFwibWFpbkVtXCIsIFwibWFpblNvbnN0aWdlXCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiU29uc3RpZ2UgSHlicmlkLVRlY2hub2xvZ2llblwiLFxuICAgIGxhYmVsTmFtZTogXCJTb25zdGlnZSBIeWJyaWQtVGVjaG5vbG9naWVuXCJcbiAgfSxcblxuICB0ZWNobm9sb2dpZU1pZmFyZToge1xuICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcInRlY2hub2xvZ2llTWlmYXJlXCIsXG4gICAgb3B0aW9uczogW1wibWFpbkxlZ2ljXCIsIFwibWFpbk1pZmFyZVwiLCBcIm1haW5GdWRhblwiLCBcIm1haW5IaXRhZ1wiLCBcIm1haW5FbVwiLCBcIm1haW5Tb25zdGlnZVwiXSxcbiAgICBvcHRpb25OYW1lOiBcIkh5YnJpZGUgbWl0IGbDvGhyZW5kZXIgVGVjaG5vbG9naWUgTUlGQVJFXCIsXG4gICAgbGFiZWxOYW1lOiBcIk1JRkFSRS1IeWJyaWRrYXJ0ZW5cIlxuICB9LFxuXG4gIHRlY2hub2xvZ2llTGVnaWM6IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJ0ZWNobm9sb2dpZUxlZ2ljXCIsXG4gICAgb3B0aW9uczogW1wibWFpbkxlZ2ljXCIsIFwibWFpbk1pZmFyZVwiLCBcIm1haW5GdWRhblwiLCBcIm1haW5IaXRhZ1wiLCBcIm1haW5FbVwiLCBcIm1haW5Tb25zdGlnZVwiXSxcbiAgICBvcHRpb25OYW1lOiBcIkh5YnJpZGUgbWl0IGbDvGhyZW5kZXIgVGVjaG5vbG9naWUgTEVHSUNcIixcbiAgICBsYWJlbE5hbWU6IFwiTEVHSUMtSHlicmlka2FydGVuXCJcbiAgfSxcblxuICBoeWJyaWQ6IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJoeWJyaWRcIixcbiAgICBvcHRpb25zOiBbXCJ0ZWNobm9sb2dpZUxlZ2ljXCIsIFwidGVjaG5vbG9naWVNaWZhcmVcIiwgXCJzb25zdGlnZUh5YnJpZFRlY2hub2xvZ2llblwiXSxcbiAgICBvcHRpb25OYW1lOiBcIlJGSUQtSHlicmlka2FydGVcIixcbiAgICBsYWJlbE5hbWU6IFwiRsO8aHJlbmRlcyBTeXN0ZW1cIlxuICB9LFxuXG4gIGtvbnRha3RjaGlwOiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwia29udGFrdGNoaXBcIixcbiAgICBvcHRpb25zOiBbXCJwcm96ZXNzb3JcIiwgXCJzcGVpY2hlcmNoaXBcIl0sXG4gICAgb3B0aW9uTmFtZTogXCJLb250YWt0Y2hpcGthcnRlXCIsXG4gICAgbGFiZWxOYW1lOiBcIkNoaXB0eXBcIlxuICB9LFxuXG4gIG1hZ25ldHN0cmVpZmVuOiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwibWFnbmV0c3RyZWlmZW5cIixcbiAgICBvcHRpb25zOiBbXCJsb2NvMzAwXCIsIFwiaGljbzI3NTBcIiwgXCJoaWNvNDAwMFwiXSxcbiAgICBvcHRpb25OYW1lOiBcIk1hZ25ldHN0cmVpZmVua2FydGVcIixcbiAgICBsYWJlbE5hbWU6IFwiTWFnbmV0c3RyZWlmZW50eXBcIlxuICB9LFxuXG4gIGJsYW5rbzoge1xuICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcImJsYW5rb1wiLFxuICAgIG9wdGlvbnM6IFtcImthcnRlXCIsIFwiaHlicmlkXCIsIFwia29udGFrdGNoaXBcIiwgXCJtYWduZXRzdHJlaWZlblwiXSxcbiAgICBvcHRpb25OYW1lOiBcIlBsYXN0aWtrYXJ0ZSAoYmxhbmtvKVwiLFxuICAgIGxhYmVsTmFtZTogXCJLYXJ0ZW50eXA6IFBsYXN0aWtrYXJ0ZSAoYmxhbmtvKVwiXG4gIH0sXG5cbiAgYmVkcnVja3Q6IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJiZWRydWNrdFwiLFxuICAgIG9wdGlvbnM6IFtcInNpY2h0YXVzd2Vpc1wiLCBcImthcnRlXCIsIFwiaHlicmlkXCIsIFwia29udGFrdGNoaXBcIiwgXCJtYWduZXRzdHJlaWZlblwiXSxcbiAgICBvcHRpb25OYW1lOiBcIlBsYXN0aWtrYXJ0ZSAoYmVkcnVja3QvcGVyc29uYWxpc3NlcnQpXCIsXG4gICAgbGFiZWxOYW1lOiBcIkthcnRlbnR5cDogUGxhc3Rpa2thcnRlIChiZWRydWNrdC9wZXJzb25hbGlzc2VydClcIlxuICB9LFxuXG4gIHBsYXN0aWtrYXJ0ZW46IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJwbGFzdGlra2FydGVuXCIsXG4gICAgb3B0aW9uczogW1wiYmxhbmtvXCIsIFwiYmVkcnVja3RcIl0sXG4gICAgb3B0aW9uTmFtZTogXCJQbGFzdGlra2FydGVcIixcbiAgICBsYWJlbE5hbWU6IFwiS2FydGVudHlwXCJcbiAgfSxcblxuICAvLyBuZWNlc3NhcmlseSBibG9jayBwYXJ0XG4gIGluZGl2aWR1YWxDaGlwbGFnZVJmaWRIeWJyaWQ6IHtcbiAgICB0eXBlOiBcImJsb2NrXCIsXG4gICAgYXBwZW5kVG86IFwiI2NoaXBsYWdlUmZJZEh5YnJpZFwiLFxuICAgIG5hbWU6IFwiaW5kaXZpZHVhbENoaXBsYWdlUmZpZEh5YnJpZFwiLFxuICAgIG5leHRTaG93bkVsZW1lbnQ6IFwiZmlyc3RCbG9ja1wiLFxuICAgIG9wdGlvbnM6IFtcImluZGl2aWR1YWxDaGlwbGFnZVJmaWRIeWJyaWRCcmVpdGVcIiwgXCJpbmRpdmlkdWFsQ2hpcGxhZ2VSZmlkSHlicmlkSMO2aGVcIiwgXCJpbmRpdmlkdWFsQ2hpcGxhZ2VSZmlkSHlicmlkUG9zaXRpb25YXCIsIFwiaW5kaXZpZHVhbENoaXBsYWdlUmZpZEh5YnJpZFBvc2l0aW9uWVwiXSxcbiAgICBvcHRpb25OYW1lOiBcIkluZGl2aWR1ZWxsZSBDaGlwbGFnZVwiLFxuICAgIGxhYmVsTmFtZTogXCJJbmRpdmlkdWVsbGUgQ2hpcGxhZ2VcIlxuICB9LFxuXG4gIGNoaXBsYWdlUmZJZEh5YnJpZDoge1xuICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJjaGlwbGFnZVJmSWRIeWJyaWRcIixcbiAgICBuZXh0U2hvd25FbGVtZW50OiBcImZpcnN0QmxvY2tcIixcbiAgICBvcHRpb25zOiBbXCJPYmVuUmVjaHRzXCIsIFwiVW50ZW5SZWNodHNcIiwgXCJPYmVuTGlua3NcIiwgXCJVbnRlbkxpbmtzXCIsIFwiaW5kaXZpZHVhbENoaXBsYWdlUmZpZEh5YnJpZFwiXSxcbiAgICBsYWJlbE5hbWU6IFwiQ2hpcGxhZ2VcIlxuICB9LFxuXG4gIHdlaXRlcmVIeWJyaWRrYXJ0ZW46IHtcbiAgICB0eXBlOiAnaW5wdXQnLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgaW5wdXRUeXBlOiAndGV4dCcsXG4gICAgbmFtZTogXCJ3ZWl0ZXJlSHlicmlka2FydGVuXCIsXG4gICAgbmV4dFNob3duRWxlbWVudDogXCJjaGlwbGFnZVJmSWRIeWJyaWRcIixcbiAgICBvcHRpb25OYW1lOiBcIldlaXRlcmUgSHlicmlka2FydGVuXCIsXG4gICAgbGFiZWxOYW1lOiBcIkJlemVpY2hudW5nIEh5YnJpZGthcnRlXCJcbiAgfSxcblxuICBtaWZhcmVDbGFzc2ljRXYxNGs6IHtcbiAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpY0V2MTRrXCIsXG4gICAgb3B0aW9uczogW1wibWlmYXJlQ2xhc3NpYzRrTWl0SGl0YWcxXCIsIFwibWlmYXJlQ2xhc3NpYzRrTWl0SGl0YWcyXCIsIFwibWlmYXJlQ2xhc3NpYzRrTWl0RU00MjAwXCIsIFwibWlmYXJlQ2xhc3NpYzRrTWl0NDQ1MFwiLCBcIm1pZmFyZUNsYXNzaWM0a01pdFByb3gxMjVcIiwgXCJtaWZhcmVDbGFzc2ljNGtNaXRBdG1lbFwiLCBcIm1pZmFyZUNsYXNzaWM0a01pdFVIRk1vbnphXCIsIFwibWlmYXJlQ2xhc3NpYzRrTWl0SW5kdWt0aXZcIl0sXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgQ2xhc3NpYyBFVjEgNEsgSHlicmlka2FydGVuXCIsXG4gICAgbGFiZWxOYW1lOiBcIk1JRkFSRSBDbGFzc2ljIEVWMSA0SyBIeWJyaWRrYXJ0ZW5cIlxuICB9LFxuXG4gIG1pZmFyZUNsYXNzaWNFdjE6IHtcbiAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwibWlmYXJlQ2xhc3NpY0V2MVwiLFxuICAgIG9wdGlvbnM6IFtcIm1pZmFyZUNsYXNzaWMxa01pdEhpdGFnMVwiLCBcIm1pZmFyZUNsYXNzaWMxa01pdEhpdGFnMlwiLCBcIm1pZmFyZUNsYXNzaWMxa01pdEVNNDIwMFwiLCBcIm1pZmFyZUNsYXNzaWMxa01pdDQ0NTBcIiwgXCJtaWZhcmVDbGFzc2ljMWtNaXRQcm94MTI1XCIsIFwibWlmYXJlQ2xhc3NpYzFrTWl0QXRtZWxcIiwgXCJtaWZhcmVDbGFzc2ljMWtNaXRVSEZNb256YVwiLCBcIm1pZmFyZUNsYXNzaWMxa01pdEluZHVrdGl2XCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiTUlGQVJFIENsYXNzaWMgRVYxIEh5YnJpZGthcnRlblwiLFxuICAgIGxhYmVsTmFtZTogXCJNSUZBUkUgQ2xhc3NpYyBFVjEgSHlicmlka2FydGVuXCJcbiAgfSxcblxuICBtaWZhcmVFdjE4azoge1xuICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJtaWZhcmVFdjE4a1wiLFxuICAgIG9wdGlvbnM6IFtcIm1pZmFyZURFU0ZpcmU4a01pZmFyZUNsYXNzaWNcIiwgXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ01pZmFyZUNsYXNzaWNcIiwgXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZzFcIiwgXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZzJcIiwgXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ1NcIiwgXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ0VNNDIwMFwiLCBcIm1pZmFyZURFU0ZpcmU4a1N1cGVydGFnRU00NDUwXCIsIFwibWlmYXJlREVTRmlyZThrU3VwZXJ0YWdFTTQyMDBjb2RpZXJ0XCIsIFwibWlmYXJlREVTRmlyZThrU3VwZXJ0YWdJQ29kZVwiLCBcIm1pZmFyZURFU0ZpcmU4a1N1cGVydGFnUHJveDEyNVwiLCBcIm1pZmFyZURFU0ZpcmU4a1N1cGVydGFnQXRtZWxcIiwgXCJtaWZhcmVERVNGaXJlOGtTdXBlcnRhZ1VIRm1vbnphXCIsIFwibWlmYXJlREVTRmlyZThrSW5kdWt0aXZcIl0sXG4gICAgb3B0aW9uTmFtZTogXCJNSUZBUkUgREVTRmlyZSBFVjEgOEsgVjA1IDcwcEYgSHlicmlka2FydGVuXCIsXG4gICAgbGFiZWxOYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA4SyBWMDUgNzBwRiBIeWJyaWRrYXJ0ZW5cIlxuICB9LFxuXG4gIG1pZmFyZUV2MTRrOiB7XG4gICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcIm1pZmFyZUV2MTRrXCIsXG4gICAgb3B0aW9uczogW1wibWlmYXJlREVTRmlyZTRrTWlmYXJlQ2xhc3NpY1wiLCBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnTWlmYXJlQ2xhc3NpY1wiLCBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnMVwiLCBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnMlwiLCBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnU1wiLCBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnRU00MjAwXCIsIFwibWlmYXJlREVTRmlyZTRrU3VwZXJ0YWdFTTQ0NTBcIiwgXCJtaWZhcmVERVNGaXJlNGtTdXBlcnRhZ0VNNDIwMGNvZGllcnRcIiwgXCJtaWZhcmVERVNGaXJlNGtTdXBlcnRhZ0lDb2RlXCIsIFwibWlmYXJlREVTRmlyZTRrU3VwZXJ0YWdQcm94MTI1XCIsIFwibWlmYXJlREVTRmlyZTRrU3VwZXJ0YWdBdG1lbFwiLCBcIm1pZmFyZURFU0ZpcmU0a1N1cGVydGFnVUhGbW9uemFcIiwgXCJtaWZhcmVERVNGaXJlNGtJbmR1a3RpdlwiXSxcbiAgICBvcHRpb25OYW1lOiBcIk1JRkFSRSBERVNGaXJlIEVWMSA0ayBIeWJyaWRrYXJ0ZW5cIixcbiAgICBsYWJlbE5hbWU6IFwiTUlGQVJFIERFU0ZpcmUgRVYxIEh5YnJpZGthcnRlblwiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQ0MDk2OiB7XG4gICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50NDA5NlwiLFxuICAgIG9wdGlvbnM6IFtcImxlZ2ljQWR2YW50NDA5Nm1pdExlZ2ljXCIsIFwibGVnaWNBZHZhbnQ0MDk2bWl0TWlmYXJlQ2xhc3NpYzFrXCIsIFwibGVnaWNBZHZhbnQ0MDk2bWl0TWlmYXJlQ2xhc3NpYzRrXCIsIFwibGVnaWNBZHZhbnQ0MDk2bWl0TWlmYXJlREVTRmlyZVwiLCBcImxlZ2ljQWR2YW50NDA5Nm1pdEhpdGFnMjA0OFwiLCBcImxlZ2ljQWR2YW50NDA5Nm1pdEhpdGFnMjU2XCIsIFwibGVnaWNBZHZhbnQ0MDk2bWl0SGl0YWdTMjA0OFwiLCBcImxlZ2ljQWR2YW50NDA5Nm1pdEVNNDIwMFwiLCBcImxlZ2ljQWR2YW50NDA5Nm1pdEVNNDQ1MFwiLCBcImxlZ2ljQWR2YW50NDA5Nm1pdEVNNDIwMGNvZGllcnRcIiwgXCJsZWdpY0FkdmFudDQwOTZtaXRJQ29kZVwiLCBcImxlZ2ljQWR2YW50NDA5Nm1pdFByb3gxMjVcIiwgXCJsZWdpY0FkdmFudDQwOTZtaXRBdG1lbDU1NzdcIiwgXCJsZWdpY0FkdmFudDQwOTZtaXRVSEZtb256YVwiLCBcImxlZ2ljQWR2YW50NDA5Nm1pdEluZHVrdGl2XCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgQWR2YW50IEFUQyA0MDk2IE1QIEh5YnJpZGthcnRlblwiLFxuICAgIGxhYmVsTmFtZTogXCJLYXJ0ZW50eXA6IFBsYXN0aWtrYXJ0ZSAoYmxhbmtvKVwiXG4gIH0sXG5cbiAgbGVnaWNBZHZhbnQxMDI0OiB7XG4gICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcImxlZ2ljQWR2YW50MTAyNFwiLFxuICAgIG9wdGlvbnM6IFtcImxlZ2ljQWR2YW50MTAyNG1pdExlZ2ljXCIsIFwibGVnaWNBZHZhbnQxMDI0bWl0TWlmYXJlQ2xhc3NpYzFrXCIsIFwibGVnaWNBZHZhbnQxMDI0bWl0TWlmYXJlQ2xhc3NpYzRrXCIsIFwibGVnaWNBZHZhbnQxMDI0bWl0TWlmYXJlREVTRmlyZVwiLCBcImxlZ2ljQWR2YW50MTAyNG1pdEhpdGFnMjA0OFwiLCBcImxlZ2ljQWR2YW50MTAyNG1pdEhpdGFnMjU2XCIsIFwibGVnaWNBZHZhbnQxMDI0bWl0SGl0YWdTMjA0OFwiLCBcImxlZ2ljQWR2YW50MTAyNG1pdEVNNDIwMFwiLCBcImxlZ2ljQWR2YW50MTAyNG1pdEVNNDQ1MFwiLCBcImxlZ2ljQWR2YW50MTAyNG1pdEVNNDIwMGNvZGllcnRcIiwgXCJsZWdpY0FkdmFudDEwMjRtaXRJQ29kZVwiLCBcImxlZ2ljQWR2YW50MTAyNG1pdFByb3gxMjVcIiwgXCJsZWdpY0FkdmFudDEwMjRtaXRBdG1lbDU1NzdcIiwgXCJsZWdpY0FkdmFudDEwMjRtaXRVSEZtb256YVwiLCBcImxlZ2ljQWR2YW50MTAyNG1pdEluZHVrdGl2XCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgQWR2YW50IEFUQyAxMDI0IE1WIEh5YnJpZGthcnRlblwiLFxuICAgIGxhYmVsTmFtZTogXCJLYXJ0ZW50eXA6IFBsYXN0aWtrYXJ0ZSAoYmxhbmtvKVwiXG4gIH0sXG5cbiAgbGVnaWNNSU0xMDI0SHlicmlka2FydGVuOiB7XG4gICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgYXBwZW5kVG86IFwiI3dyYXBwZXJcIixcbiAgICBuYW1lOiBcImxlZ2ljTUlNMTAyNEh5YnJpZGthcnRlblwiLFxuICAgIG9wdGlvbnM6IFtcImxlZ2ljTUlNMTAyNG1pdExlZ2ljXCIsIFwibGVnaWNNSU0xMDI0bWl0TWlmYXJlQ2xhc3NpYzFrXCIsIFwibGVnaWNNSU0xMDI0bWl0TWlmYXJlQ2xhc3NpYzRrXCIsIFwibGVnaWNNSU0xMDI0bWl0TWlmYXJlREVTRmlyZVwiLCBcImxlZ2ljTUlNMTAyNG1pdEhpdGFnMjA0OFwiLCBcImxlZ2ljTUlNMTAyNG1pdEhpdGFnMjU2XCIsIFwibGVnaWNNSU0xMDI0bWl0SGl0YWdTMjA0OFwiLCBcImxlZ2ljTUlNMTAyNG1pdEVNNDIwMFwiLCBcImxlZ2ljTUlNMTAyNG1pdEVNNDQ1MFwiLCBcImxlZ2ljTUlNMTAyNG1pdEVNNDIwMGNvZGllcnRcIiwgXCJsZWdpY01JTTEwMjRtaXRJQ29kZVwiLCBcImxlZ2ljTUlNMTAyNG1pdFByb3gxMjVcIiwgXCJsZWdpY01JTTEwMjRtaXRBdG1lbDU1NzdcIiwgXCJsZWdpY01JTTEwMjRtaXRVSEZtb256YVwiLCBcImxlZ2ljTUlNMTAyNG1pdEluZHVrdGl2XCJdLFxuICAgIG9wdGlvbk5hbWU6IFwiTEVHSUMgTUlNIDEwMjQgSHlicmlka2FydGVuXCIsXG4gICAgbGFiZWxOYW1lOiBcIkxFR0lDIE1JTSAxMDI0IEh5YnJpZGthcnRlblwiXG4gIH0sXG5cbiAgc29uc3RpZ2VIeWJyaWRUZWNobm9sb2dpZW46IHtcbiAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwic29uc3RpZ2VIeWJyaWRUZWNobm9sb2dpZW5cIixcbiAgICBvcHRpb25zOiBbXCJoaXRhZ01JVDE0MTAyXCIsIFwiaGl0YWdNSVQxNDQ1MFwiLCBcImhpdGFnTUlUMjQxMDJcIiwgXCJoaXRhZ01JVDI0NDUwXCIsIFwid2VpdGVyZUh5YnJpZGthcnRlblwiXSxcbiAgICBvcHRpb25OYW1lOiBcIlNvbnN0aWdlIEh5YnJpZC1UZWNobm9sb2dpZW5cIixcbiAgICBsYWJlbE5hbWU6IFwiU29uc3RpZ2UgSHlicmlkLVRlY2hub2xvZ2llblwiXG4gIH0sXG5cbiAgdGVjaG5vbG9naWVNaWZhcmU6IHtcbiAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwidGVjaG5vbG9naWVNaWZhcmVcIixcbiAgICBvcHRpb25zOiBbXCJtaWZhcmVFdjE0a1wiLCBcIm1pZmFyZUV2MThrXCIsIFwibWlmYXJlQ2xhc3NpY0V2MVwiLCBcIm1pZmFyZUNsYXNzaWNFdjE0a1wiXSxcbiAgICBvcHRpb25OYW1lOiBcIkh5YnJpZGUgbWl0IGbDvGhyZW5kZXIgVGVjaG5vbG9naWUgTUlGQVJFXCIsXG4gICAgbGFiZWxOYW1lOiBcIk1JRkFSRS1IeWJyaWRrYXJ0ZW5cIlxuICB9LFxuXG4gIHRlY2hub2xvZ2llTGVnaWM6IHtcbiAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwidGVjaG5vbG9naWVMZWdpY1wiLFxuICAgIG9wdGlvbnM6IFtcImxlZ2ljTUlNMTAyNEh5YnJpZGthcnRlblwiLCBcImxlZ2ljQWR2YW50MTAyNFwiLCBcImxlZ2ljQWR2YW50NDA5NlwiXSxcbiAgICBvcHRpb25OYW1lOiBcIkh5YnJpZGUgbWl0IGbDvGhyZW5kZXIgVGVjaG5vbG9naWUgTEVHSUNcIixcbiAgICBsYWJlbE5hbWU6IFwiTEVHSUMtSHlicmlka2FydGVuXCJcbiAgfSxcblxuICBHbMOkbnplbmQ6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiR2zDpG56ZW5kXCIsXG4gICAgb3B0aW9uTmFtZTogXCJHbMOkbnplbmRcIlxuICB9LFxuXG4gIE1hdHQ6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiTWF0dFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTWF0dFwiXG4gIH0sXG5cbiAgR2VzY2hsaWZmZW46IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiR2VzY2hsaWZmZW5cIixcbiAgICBvcHRpb25OYW1lOiBcIkdlc2NobGlmZmVuLCBtaXQgTWV0YWxsaWMtRWZmZWt0XCJcbiAgfSxcblxuICBQYXJ0aWVsbDoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJQYXJ0aWVsbFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiUGFydGllbGwgcG9saWVydCAvIG1hdHRcIlxuICB9LFxuXG4gIFBWQ1N0YW5kYXJkOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIlBWQ1N0YW5kYXJkXCIsXG4gICAgb3B0aW9uTmFtZTogXCJQVkMgU3RhbmRhcmRcIlxuICB9LFxuXG4gIFByZW1pdW1DYXJkUFZDUEVUVmVyYnVuZHdlcmtzdG9mZjoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJQcmVtaXVtQ2FyZFBWQ1BFVFZlcmJ1bmR3ZXJrc3RvZmZcIixcbiAgICBvcHRpb25OYW1lOiBcIlByZW1pdW0gQ2FyZCAoUFZDLVBFVC1WZXJidW5kd2Vya3N0b2ZmKVwiXG4gIH0sXG5cbiAgVWx0cmFDYXJkUFZDUEVUUENWZXJidW5kd2Vya3N0b2ZmOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIlVsdHJhQ2FyZFBWQ1BFVFBDVmVyYnVuZHdlcmtzdG9mZlwiLFxuICAgIG9wdGlvbk5hbWU6IFwiVWx0cmEgQ2FyZCAoUFZDLSwgUEVULSwgUEMgLSBWZXJidW5kd2Vya3N0b2ZmKVwiXG4gIH0sXG5cbiAgUG9seWNhcmJvbmF0Q2FyZDEwMFBvbHljYXJib25hdDoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJQb2x5Y2FyYm9uYXRDYXJkMTAwUG9seWNhcmJvbmF0XCIsXG4gICAgb3B0aW9uTmFtZTogXCJQb2x5Y2FyYm9uYXQgQ2FyZCAoMTAwJSBQb2x5Y2FyYm9uYXQpXCJcbiAgfSxcblxuICBob2NoZm9ybWF0OiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcImhvY2hmb3JtYXRcIixcbiAgICBvcHRpb25OYW1lOiBcIkhvY2hmb3JtYXRcIlxuICB9LFxuXG4gIHF1ZXJmb3JtYXQ6IHtcbiAgICB0eXBlOiBcImRlZmF1bHRTZWxlY3RlZFwiLFxuICAgIG5hbWU6IFwicXVlcmZvcm1hdFwiLFxuICAgIG9wdGlvbk5hbWU6IFwiUXVlcmZvcm1hdFwiXG4gIH0sXG5cbiAgYXVzcmljaHR1bmc6IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiNrYXJ0ZW5zcGV6aWZpa2F0aW9uZW5cIixcbiAgICBuYW1lOiBcImF1c3JpY2h0dW5nXCIsXG4gICAgb3B0aW9uczogW1wicXVlcmZvcm1hdFwiLCBcImhvY2hmb3JtYXRcIl0sXG4gICAgbGFiZWxOYW1lOiBcIkF1c3JpY2h0dW5nXCJcbiAgfSxcblxuICBrYXJ0ZW5tYXRlcmlhbDoge1xuICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgYXBwZW5kVG86IFwiI2thcnRlbnNwZXppZmlrYXRpb25lblwiLFxuICAgIG5hbWU6IFwia2FydGVubWF0ZXJpYWxcIixcbiAgICBvcHRpb25zOiBbXCJQVkNTdGFuZGFyZFwiLCBcIlByZW1pdW1DYXJkUFZDUEVUVmVyYnVuZHdlcmtzdG9mZlwiLCBcIlVsdHJhQ2FyZFBWQ1BFVFBDVmVyYnVuZHdlcmtzdG9mZlwiLCBcIlBvbHljYXJib25hdENhcmQxMDBQb2x5Y2FyYm9uYXRcIl0sXG4gICAgbGFiZWxOYW1lOiBcIkthcnRlbm1hdGVyaWFsXCJcbiAgfSxcblxuICBrYXJ0ZW5vYmVyZmzDpGNoZToge1xuICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgYXBwZW5kVG86IFwiI2thcnRlbnNwZXppZmlrYXRpb25lblwiLFxuICAgIG5hbWU6IFwia2FydGVub2JlcmZsw6RjaGVcIixcbiAgICBvcHRpb25zOiBbXCJHbMOkbnplbmRcIiwgXCJNYXR0XCIsIFwiR2VzY2hsaWZmZW5cIiwgXCJQYXJ0aWVsbFwiXSxcbiAgICBsYWJlbE5hbWU6IFwiS2FydGVub2JlcmZsw6RjaGVcIlxuICB9LFxuXG4gIGthcnRlbnNwZXppZmlrYXRpb25lbjoge1xuICAgIHR5cGU6IFwiYmxvY2tcIixcbiAgICBhcHBlbmRUbzogXCIjZmlyc3RCbG9ja1wiLFxuICAgIGxhYmVsTmFtZTogXCJLYXJ0ZW5zcGV6aWZpa2F0aW9uZW5cIixcbiAgICBuYW1lOiBcImthcnRlbnNwZXppZmlrYXRpb25lblwiLFxuICAgIG9wdGlvbnM6IFtcImF1c3JpY2h0dW5nXCIsIFwia2FydGVubWF0ZXJpYWxcIiwgXCJrYXJ0ZW5vYmVyZmzDpGNoZVwiXVxuICB9LFxuXG4gIFVuYmVkcnVja3RXZWnDnzoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJVbmJlZHJ1Y2t0V2Vpw59cIixcbiAgICBvcHRpb25OYW1lOiBcIlVuYmVkcnVja3QgV2Vpw59cIlxuICB9LFxuXG4gIGZhcmJpZ1NjaHdhcno6IHtcbiAgICB0eXBlOiBcImxhc3RFbFwiLFxuICAgIG5hbWU6IFwiZmFyYmlnU2Nod2FyelwiLFxuICAgIG9wdGlvbk5hbWU6IFwiMS1mYXJiaWcgU2Nod2FyelwiXG4gIH0sXG5cbiAgTWVocmZhcmJlbmRydWNrRXVyb3NrYWxhOiB7XG4gICAgdHlwZTogXCJsYXN0RWxcIixcbiAgICBuYW1lOiBcIk1laHJmYXJiZW5kcnVja0V1cm9za2FsYVwiLFxuICAgIG9wdGlvbk5hbWU6IFwiTWVocmZhcmJlbmRydWNrIEV1cm9za2FsYVwiXG4gIH0sXG5cbiAgU29uZGVyZmFyYmVuVmVyZWRlbHVuZzoge1xuICAgIHR5cGU6IFwibGFzdEVsXCIsXG4gICAgbmFtZTogXCJTb25kZXJmYXJiZW5WZXJlZGVsdW5nXCIsXG4gICAgb3B0aW9uTmFtZTogXCJTb25kZXJmYXJiZW4vVmVyZWRlbHVuZ1wiXG4gIH0sXG5cbiAgZHJ1Y2tkYXRlblZvcmRlcnNlaXRlSW5wdXQ6IHtcbiAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgaW5wdXRUeXBlOiBcImZpbGVcIixcbiAgICBhcHBlbmRUbzogXCIjZHJ1Y2tGYXJiZVBsYXN0aWtrYXJ0ZVwiLFxuICAgIG5hbWU6IFwiZHJ1Y2tkYXRlblZvcmRlcnNlaXRlSW5wdXRcIixcbiAgICBsYWJlbE5hbWU6IFwiRHJ1Y2tkYXRlbiBWb3JkZXJzZWl0ZVwiXG4gIH0sXG5cbiAgZHJ1Y2tkYXRlblZvcmRlcnNlaXRlU2VsZWN0OiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjZHJ1Y2tGYXJiZVBsYXN0aWtrYXJ0ZVwiLFxuICAgIG5hbWU6IFwiZHJ1Y2tkYXRlblZvcmRlcnNlaXRlU2VsZWN0XCIsXG4gICAgb3B0aW9uczogW1wiVW5iZWRydWNrdFdlacOfXCIsIFwiZmFyYmlnU2Nod2FyelwiLCBcIk1laHJmYXJiZW5kcnVja0V1cm9za2FsYVwiLCBcIlNvbmRlcmZhcmJlblZlcmVkZWx1bmdcIl0sXG4gICAgbGFiZWxOYW1lOiBcIkRydWNrYXVzZsO8aHJ1bmcgVm9yZGVyc2VpdGVcIlxuICB9LFxuXG4gIGRydWNrZGF0ZW5Sw7xja3NlaXRlSW5wdXQ6IHtcbiAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgaW5wdXRUeXBlOiBcImZpbGVcIixcbiAgICBhcHBlbmRUbzogXCIjZHJ1Y2tGYXJiZVBsYXN0aWtrYXJ0ZVwiLFxuICAgIG5hbWU6IFwiZHJ1Y2tkYXRlblLDvGNrc2VpdGVJbnB1dFwiLFxuICAgIGxhYmVsTmFtZTogXCJEcnVja2RhdGVuIFLDvGNrc2VpdGVcIlxuICB9LFxuXG4gIGRydWNrZGF0ZW5Sw7xja3NlaXRlU2VsZWN0OiB7XG4gICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICBhcHBlbmRUbzogXCIjZHJ1Y2tGYXJiZVBsYXN0aWtrYXJ0ZVwiLFxuICAgIG5hbWU6IFwiZHJ1Y2tkYXRlblLDvGNrc2VpdGVTZWxlY3RcIixcbiAgICBvcHRpb25zOiBbXCJVbmJlZHJ1Y2t0V2Vpw59cIiwgXCJmYXJiaWdTY2h3YXJ6XCIsIFwiTWVocmZhcmJlbmRydWNrRXVyb3NrYWxhXCIsIFwiU29uZGVyZmFyYmVuVmVyZWRlbHVuZ1wiXSxcbiAgICBsYWJlbE5hbWU6IFwiRHJ1Y2tkYXRlbiBSw7xja3NlaXRlXCJcbiAgfSxcblxuICBkcnVja0ZhcmJlUGxhc3Rpa2thcnRlOiB7XG4gICAgdHlwZTogXCJibG9ja1wiLFxuICAgIGFwcGVuZFRvOiBcIiNmaXJzdEJsb2NrXCIsXG4gICAgbmFtZTogXCJkcnVja0ZhcmJlUGxhc3Rpa2thcnRlXCIsXG4gICAgbGFiZWxOYW1lOiBcIkRydWNrL0ZhcmJlIFBsYXN0aWtrYXJ0ZVwiLFxuICAgIG9wdGlvbnM6IFtcImRydWNrZGF0ZW5Wb3JkZXJzZWl0ZUlucHV0XCIsIFwiZHJ1Y2tkYXRlblLDvGNrc2VpdGVJbnB1dFwiLCBcImRydWNrZGF0ZW5Wb3JkZXJzZWl0ZVNlbGVjdFwiLCBcImRydWNrZGF0ZW5Sw7xja3NlaXRlU2VsZWN0XCJdXG4gIH0sXG5cbiAgLyogY2hlY2tib3hlcyAqL1xuXG4gIGNoZWNrYm94S29udGFrdGNoaXA6IHtcbiAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgaW5wdXRUeXBlOiBcImNoZWNrYm94XCIsXG4gICAgYXBwZW5kVG86IFwiI2thcnRlbm9wdGlvbmVuXCIsXG4gICAgbmFtZTogXCJjaGVja2JveEtvbnRha3RjaGlwXCIsXG4gICAgbGFiZWxOYW1lOiBcIktvbnRha3RjaGlwIC8gUHJvemVzc29yY2hpcFwiXG4gIH0sXG5cbiAgY2hlY2tib3hNYWduZXRzdHJlaWZlbjoge1xuICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICBpbnB1dFR5cGU6IFwiY2hlY2tib3hcIixcbiAgICBhcHBlbmRUbzogXCIja2FydGVub3B0aW9uZW5cIixcbiAgICBuYW1lOiBcImNoZWNrYm94TWFnbmV0c3RyZWlmZW5cIixcbiAgICBsYWJlbE5hbWU6IFwiTWFnbmV0c3RyZWlmZW5cIlxuICB9LFxuXG4gIGNoZWNrYm94UGVyc29uYWxpc2llcnVuZzoge1xuICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICBpbnB1dFR5cGU6IFwiY2hlY2tib3hcIixcbiAgICBhcHBlbmRUbzogXCIja2FydGVub3B0aW9uZW5cIixcbiAgICBuYW1lOiBcImNoZWNrYm94UGVyc29uYWxpc2llcnVuZ1wiLFxuICAgIGxhYmVsTmFtZTogXCJQZXJzb25hbGlzaWVydW5nXCJcbiAgfSxcblxuICBjaGVja2JveFN0YXRpc2NoZXJUZXh0OiB7XG4gICAgdHlwZTogXCJpbnB1dFwiLFxuICAgIGlucHV0VHlwZTogXCJjaGVja2JveFwiLFxuICAgIGFwcGVuZFRvOiBcIiNrYXJ0ZW5vcHRpb25lblwiLFxuICAgIG5hbWU6IFwiY2hlY2tib3hTdGF0aXNjaGVyVGV4dFwiLFxuICAgIGxhYmVsTmFtZTogXCJTdGF0aXNjaGVyIFRleHRcIlxuICB9LFxuXG4gIGNoZWNrYm94TnVtbWVyaWVydW5nOiB7XG4gICAgdHlwZTogXCJpbnB1dFwiLFxuICAgIGlucHV0VHlwZTogXCJjaGVja2JveFwiLFxuICAgIGFwcGVuZFRvOiBcIiNrYXJ0ZW5vcHRpb25lblwiLFxuICAgIG5hbWU6IFwiY2hlY2tib3hOdW1tZXJpZXJ1bmdcIixcbiAgICBsYWJlbE5hbWU6IFwiTnVtbWVyaWVydW5nIC8gRm9ydGwuIE51bW1lcmllcnVuZ1wiXG4gIH0sXG5cbiAgY2hlY2tib3hCYXJjb2RlOiB7XG4gICAgdHlwZTogXCJpbnB1dFwiLFxuICAgIGlucHV0VHlwZTogXCJjaGVja2JveFwiLFxuICAgIGFwcGVuZFRvOiBcIiNrYXJ0ZW5vcHRpb25lblwiLFxuICAgIG5hbWU6IFwiY2hlY2tib3hCYXJjb2RlXCIsXG4gICAgbGFiZWxOYW1lOiBcIkJhcmNvZGVcIlxuICB9LFxuXG4gIGNoZWNrYm94VFJXOiB7XG4gICAgdHlwZTogXCJpbnB1dFwiLFxuICAgIGlucHV0VHlwZTogXCJjaGVja2JveFwiLFxuICAgIGFwcGVuZFRvOiBcIiNrYXJ0ZW5vcHRpb25lblwiLFxuICAgIG5hbWU6IFwiY2hlY2tib3hUUldcIixcbiAgICBsYWJlbE5hbWU6IFwiVFJXIChUaGVybW8tUmV3cml0ZSlcIlxuICB9LFxuXG4gIGNoZWNrYm94VW50ZXJzY2hyaWZ0ZW5mZWxkOiB7XG4gICAgdHlwZTogXCJpbnB1dFwiLFxuICAgIGlucHV0VHlwZTogXCJjaGVja2JveFwiLFxuICAgIGFwcGVuZFRvOiBcIiNrYXJ0ZW5vcHRpb25lblwiLFxuICAgIG5hbWU6IFwiY2hlY2tib3hVbnRlcnNjaHJpZnRlbmZlbGRcIixcbiAgICBsYWJlbE5hbWU6IFwiVW50ZXJzY2hyaWZ0ZW5mZWxkXCJcbiAgfSxcblxuICBjaGVja2JveEhvbG9ncmFtbWU6IHtcbiAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgaW5wdXRUeXBlOiBcImNoZWNrYm94XCIsXG4gICAgYXBwZW5kVG86IFwiI2thcnRlbm9wdGlvbmVuXCIsXG4gICAgbmFtZTogXCJjaGVja2JveEhvbG9ncmFtbWVcIixcbiAgICBsYWJlbE5hbWU6IFwiU3RhbmRhcmRob2xvZ3JhbW0gLyBFbmRsb3Ntb3RpdlwiXG4gIH0sXG5cbiAgY2hlY2tib3hDbGlwbG9jaDoge1xuICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICBpbnB1dFR5cGU6IFwiY2hlY2tib3hcIixcbiAgICBhcHBlbmRUbzogXCIja2FydGVub3B0aW9uZW5cIixcbiAgICBuYW1lOiBcImNoZWNrYm94Q2xpcGxvY2hcIixcbiAgICBsYWJlbE5hbWU6IFwiQ2xpcGxvY2hcIlxuICB9LFxuXG4gIGNoZWNrYm94QmxpbmRlbnNjaHJpZnQ6IHtcbiAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgaW5wdXRUeXBlOiBcImNoZWNrYm94XCIsXG4gICAgYXBwZW5kVG86IFwiI2thcnRlbm9wdGlvbmVuXCIsXG4gICAgbmFtZTogXCJjaGVja2JveEJsaW5kZW5zY2hyaWZ0XCIsXG4gICAgbGFiZWxOYW1lOiBcIkJsaW5kZW5zY2hyaWZ0IC8gQnJhaWxsZXNjaHJpZnRcIlxuICB9LFxuXG4gIGNoZWNrYm94UnViYmVsZmVsZDoge1xuICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICBpbnB1dFR5cGU6IFwiY2hlY2tib3hcIixcbiAgICBhcHBlbmRUbzogXCIja2FydGVub3B0aW9uZW5cIixcbiAgICBuYW1lOiBcImNoZWNrYm94UnViYmVsZmVsZFwiLFxuICAgIGxhYmVsTmFtZTogXCJSdWJiZWxmZWxkIC8gU2NyYXRjaC1PZmZcIlxuICB9LFxuXG4gIGthcnRlbm9wdGlvbmVuOiB7XG4gICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgIGFwcGVuZFRvOiBcIiNmaXJzdEJsb2NrXCIsXG4gICAgbGFiZWxOYW1lOiBcIkthcnRlbm9wdGlvbmVuXCIsXG4gICAgbmFtZTogXCJrYXJ0ZW5vcHRpb25lblwiLFxuICAgIG9wdGlvbnM6IFtcImNoZWNrYm94S29udGFrdGNoaXBcIiwgXCJjaGVja2JveE1hZ25ldHN0cmVpZmVuXCIsIFwiY2hlY2tib3hQZXJzb25hbGlzaWVydW5nXCIsIFwiY2hlY2tib3hTdGF0aXNjaGVyVGV4dFwiLCBcImNoZWNrYm94TnVtbWVyaWVydW5nXCIsIFwiY2hlY2tib3hCYXJjb2RlXCIsIFwiY2hlY2tib3hUUldcIiwgXCJjaGVja2JveFVudGVyc2NocmlmdGVuZmVsZFwiLCBcImNoZWNrYm94SG9sb2dyYW1tZVwiLCBcImNoZWNrYm94Q2xpcGxvY2hcIiwgXCJjaGVja2JveEJsaW5kZW5zY2hyaWZ0XCIsIFwiY2hlY2tib3hSdWJiZWxmZWxkXCJdXG4gIH0sXG5cbiAgZmlyc3RCbG9jazoge1xuICAgIHR5cGU6IFwiYmxvY2tcIixcbiAgICBhcHBlbmRUbzogXCIjd3JhcHBlclwiLFxuICAgIG5hbWU6IFwiZmlyc3RCbG9ja1wiLFxuICAgIG9wdGlvbnM6IFtcImthcnRlbnNwZXppZmlrYXRpb25lblwiLCBcImRydWNrRmFyYmVQbGFzdGlra2FydGVcIiwgXCJrYXJ0ZW5vcHRpb25lblwiXVxuICB9LFxuXG4gIGJhdWZvcm06IHtcbiAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgIGFwcGVuZFRvOiBcIiN3cmFwcGVyXCIsXG4gICAgbmFtZTogXCJiYXVmb3JtXCIsXG4gICAgb3B0aW9uczogW1wicGxhc3Rpa2thcnRlblwiXSxcbiAgICBsYWJlbE5hbWU6IFwiQmF1Zm9ybVwiXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFpbk9iamVjdDsiXSwic291cmNlUm9vdCI6IiJ9