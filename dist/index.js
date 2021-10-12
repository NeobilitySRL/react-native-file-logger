"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = exports.jsonFormatter = exports.defaultFormatter = exports.logLevelNames = exports.LogLevel = void 0;
var react_native_1 = require("react-native");
var RNFileLogger = react_native_1.NativeModules.FileLogger;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 3] = "Error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var FileLoggerStatic = /** @class */ (function () {
    function FileLoggerStatic() {
        var _this = this;
        this._logLevel = LogLevel.Debug;
        this._formatter = exports.defaultFormatter;
        this._sendFileLogsAlsoToConsole = false;
        this.context = {};
        this._handleLog = function (level, msg) {
            switch (level) {
                case "debug":
                    _this.debug(msg, {});
                    break;
                case "log":
                    _this.info(msg, {});
                    break;
                case "warning":
                    _this.warn(msg, {});
                    break;
                case "error":
                    _this.error(msg, {});
                    break;
            }
        };
    }
    FileLoggerStatic.prototype.apply = function (newContext) {
        this.context = __assign(__assign({}, this.context), newContext);
    };
    FileLoggerStatic.prototype.configure = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, logLevel, _b, formatter, _c, captureConsole, _d, dailyRolling, _e, maximumFileSize, _f, maximumNumberOfFiles, logsDirectory, sendFileLogsAlsoToConsole;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = options.logLevel, logLevel = _a === void 0 ? LogLevel.Debug : _a, _b = options.formatter, formatter = _b === void 0 ? exports.defaultFormatter : _b, _c = options.captureConsole, captureConsole = _c === void 0 ? true : _c, _d = options.dailyRolling, dailyRolling = _d === void 0 ? true : _d, _e = options.maximumFileSize, maximumFileSize = _e === void 0 ? 1024 * 1024 : _e, _f = options.maximumNumberOfFiles, maximumNumberOfFiles = _f === void 0 ? 5 : _f, logsDirectory = options.logsDirectory, sendFileLogsAlsoToConsole = options.sendFileLogsAlsoToConsole;
                        return [4 /*yield*/, RNFileLogger.configure({
                                dailyRolling: dailyRolling,
                                maximumFileSize: maximumFileSize,
                                maximumNumberOfFiles: maximumNumberOfFiles,
                                logsDirectory: logsDirectory,
                            })];
                    case 1:
                        _g.sent();
                        this._logLevel = logLevel;
                        this._formatter = formatter;
                        this._sendFileLogsAlsoToConsole = sendFileLogsAlsoToConsole !== null && sendFileLogsAlsoToConsole !== void 0 ? sendFileLogsAlsoToConsole : false;
                        // If the logs are captured, a console log would cause a stackoverflow.
                        if (captureConsole) {
                            this._sendFileLogsAlsoToConsole = false;
                        }
                        if (captureConsole) {
                            this.enableConsoleCapture();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FileLoggerStatic.prototype.enableConsoleCapture = function () {
        // __inspectorLog is an undocumented feature of React Native
        // that allows to intercept calls to console.debug/log/warn/error
        global.__inspectorLog = this._handleLog;
    };
    FileLoggerStatic.prototype.disableConsoleCapture = function () {
        global.__inspectorLog = undefined;
    };
    FileLoggerStatic.prototype.setLogLevel = function (logLevel) {
        this._logLevel = logLevel;
    };
    FileLoggerStatic.prototype.getLogLevel = function () {
        return this._logLevel;
    };
    FileLoggerStatic.prototype.getLogFilePaths = function () {
        return RNFileLogger.getLogFilePaths();
    };
    FileLoggerStatic.prototype.deleteLogFiles = function () {
        return RNFileLogger.deleteLogFiles();
    };
    FileLoggerStatic.prototype.sendLogFilesByEmail = function (options) {
        if (options === void 0) { options = {}; }
        return RNFileLogger.sendLogFilesByEmail(options);
    };
    FileLoggerStatic.prototype.debug = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.extractMessageAndContext(msg), error = _a.error, message = _a.message, logContext = _a.logContext;
        if (error) {
            return;
        }
        this.write(LogLevel.Debug, message, logContext, args);
    };
    FileLoggerStatic.prototype.info = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.extractMessageAndContext(msg), error = _a.error, message = _a.message, logContext = _a.logContext;
        if (error) {
            return;
        }
        this.write(LogLevel.Info, message, logContext, args);
    };
    FileLoggerStatic.prototype.warn = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.extractMessageAndContext(msg), error = _a.error, message = _a.message, logContext = _a.logContext;
        if (error) {
            return;
        }
        this.write(LogLevel.Warning, message, logContext, args);
    };
    FileLoggerStatic.prototype.error = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.extractMessageAndContext(msg), error = _a.error, message = _a.message, logContext = _a.logContext;
        if (error) {
            return;
        }
        this.write(LogLevel.Error, message, logContext, args);
    };
    FileLoggerStatic.prototype.write = function (level, msg, context) {
        if (context === void 0) { context = {}; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (this._logLevel <= level) {
            var message = this._formatter.apply(this, __spreadArrays([level, msg, context], args));
            if (this._sendFileLogsAlsoToConsole) {
                var outputMessage_1 = msg;
                args.forEach(function (arg) {
                    outputMessage_1 += " " + arg.toString();
                });
                console.log(new Date().toISOString() + " | [" + level + "]: " + outputMessage_1);
            }
            RNFileLogger.write(level, message);
        }
    };
    FileLoggerStatic.prototype.extractMessageAndContext = function (msg) {
        var message;
        var logContext = __assign({}, this.context);
        if (typeof msg === 'string') {
            message = msg.replace('\n', '');
        }
        else if (msg.message) {
            message = msg.message.replace('\n', '');
            if (msg.context) {
                logContext = __assign(__assign({}, this.context), msg.context);
            }
        }
        else {
            return { error: true };
        }
        return { error: false, message: message, logContext: logContext };
    };
    return FileLoggerStatic;
}());
exports.logLevelNames = ["DEBUG", "INFO", "WARN", "ERROR"];
exports.defaultFormatter = function (level, msg, context) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var now = new Date();
    var levelName = exports.logLevelNames[level];
    var message = now.toISOString() + " [" + levelName + "]  " + msg + " " + context;
    args.forEach(function (arg) {
        message += " " + arg.toString();
    });
    return message;
};
exports.jsonFormatter = function (level, msg, context) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var now = new Date();
    var levelName = exports.logLevelNames[level];
    var message = msg;
    args.forEach(function (arg) {
        message += " " + arg.toString();
    });
    return JSON.stringify(__assign({ timestamp: now.toISOString(), logLevel: levelName, message: message }, context));
};
exports.FileLogger = new FileLoggerStatic();
//# sourceMappingURL=index.js.map