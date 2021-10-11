import { NativeModules } from "react-native";

declare var global: any;

const { FileLogger: RNFileLogger } = NativeModules;

export enum LogLevel {
	Debug,
	Info,
	Warning,
	Error,
}

export type LogFormatter = (level: LogLevel, msg: string, context: any) => string;

export interface ConfigureOptions {
	logLevel?: LogLevel;
	formatter?: LogFormatter;
	sendFileLogsAlsoToConsole?: boolean;
	captureConsole?: boolean;
	dailyRolling?: boolean;
	maximumFileSize?: number;
	maximumNumberOfFiles?: number;
	logsDirectory?: string;
}

export interface SendByEmailOptions {
	to?: string;
	subject?: string;
	body?: string;
}

class FileLoggerStatic {
	private _logLevel = LogLevel.Debug;
	private _formatter = defaultFormatter;
	private _sendFileLogsAlsoToConsole = false;
	private context = {}

	apply(newContext: any) {
		this.context = { ...this.context, ...newContext };
	}

	async configure(options: ConfigureOptions = {}): Promise<void> {
		const {
			logLevel = LogLevel.Debug,
			formatter = defaultFormatter,
			captureConsole = true,
			dailyRolling = true,
			maximumFileSize = 1024 * 1024,
			maximumNumberOfFiles = 5,
			logsDirectory,
			sendFileLogsAlsoToConsole,
		} = options;

		await RNFileLogger.configure({
			dailyRolling,
			maximumFileSize,
			maximumNumberOfFiles,
			logsDirectory,
		});

		this._logLevel = logLevel;
		this._formatter = formatter;
		this._sendFileLogsAlsoToConsole = sendFileLogsAlsoToConsole ?? false;

		// If the logs are captured, a console log would cause a stackoverflow.
		if (captureConsole) {
			this._sendFileLogsAlsoToConsole = false;
		}

		if (captureConsole) {
			this.enableConsoleCapture();
		}
	}

	enableConsoleCapture() {
		// __inspectorLog is an undocumented feature of React Native
		// that allows to intercept calls to console.debug/log/warn/error
		global.__inspectorLog = this._handleLog;
	}

	disableConsoleCapture() {
		global.__inspectorLog = undefined;
	}

	setLogLevel(logLevel: LogLevel) {
		this._logLevel = logLevel;
	}

	getLogLevel(): LogLevel {
		return this._logLevel;
	}

	getLogFilePaths(): Promise<string[]> {
		return RNFileLogger.getLogFilePaths();
	}

	deleteLogFiles(): Promise<void> {
		return RNFileLogger.deleteLogFiles();
	}

	sendLogFilesByEmail(options: SendByEmailOptions = {}): Promise<void> {
		return RNFileLogger.sendLogFilesByEmail(options);
	}

	debug(msg: string, context: any = {}) {
		const logContext = { ...this.context, ...context };
		const message = msg.replace('\n', '');

		this.write(LogLevel.Debug, message, logContext);
	}

	info(msg: string, context: any = {}) {
		const logContext = { ...this.context, ...context };
		const message = msg.replace('\n', '');

		this.write(LogLevel.Info, message, logContext);
	}

	warn(msg: string, context: any = {}) {
		const logContext = { ...this.context, ...context };
		const message = msg.replace('\n', '');

		this.write(LogLevel.Warning, message, logContext);
	}

	error(msg: string, context: any = {}) {
		const logContext = { ...this.context, ...context };
		const message = msg.replace('\n', '');

		this.write(LogLevel.Error, message, logContext);
	}

	write(level: LogLevel, msg: string, context: any = {}) {
		if (this._logLevel <= level) {
			const message = this._formatter(level, msg, context);
			if (this._sendFileLogsAlsoToConsole) {
				console.log(`[${level}] ${message}`);
			}
			RNFileLogger.write(level, message);
		}
	}

	private _handleLog = (level: string, msg: string) => {
		switch (level) {
			case "debug":
				this.debug(msg, {});
				break;
			case "log":
				this.info(msg, {});
				break;
			case "warning":
				this.warn(msg, {});
				break;
			case "error":
				this.error(msg, {});
				break;
		}
	};
}

export const logLevelNames = ["DEBUG", "INFO", "WARN", "ERROR"];

export const defaultFormatter: LogFormatter = (level, msg, context) => {
	const now = new Date();
	const levelName = logLevelNames[level];
	return `${now.toISOString()} [${levelName}]  ${msg} ${context}`;
};

export const jsonFormatter: LogFormatter = (level, msg, context) => {
	const now = new Date();
	const levelName = logLevelNames[level];
	return JSON.stringify({
		timestamp: now.toISOString(),
		logLevel: levelName,
		message: msg,
		...context
	});
}

export const FileLogger = new FileLoggerStatic();
