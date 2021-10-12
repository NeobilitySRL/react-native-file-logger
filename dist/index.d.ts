export declare enum LogLevel {
    Debug = 0,
    Info = 1,
    Warning = 2,
    Error = 3
}
export declare type LogLevelMessage = {
    message: string;
    context: any;
};
export declare type LogFormatter = (level: LogLevel, msg: string, context: any, args: any[]) => string;
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
declare class FileLoggerStatic {
    private _logLevel;
    private _formatter;
    private _sendFileLogsAlsoToConsole;
    private context;
    apply(newContext: any): void;
    configure(options?: ConfigureOptions): Promise<void>;
    enableConsoleCapture(): void;
    disableConsoleCapture(): void;
    setLogLevel(logLevel: LogLevel): void;
    getLogLevel(): LogLevel;
    getLogFilePaths(): Promise<string[]>;
    deleteLogFiles(): Promise<void>;
    sendLogFilesByEmail(options?: SendByEmailOptions): Promise<void>;
    debug(msg: string | LogLevelMessage, ...args: any[]): void;
    info(msg: string | LogLevelMessage, ...args: any[]): void;
    warn(msg: string | LogLevelMessage, ...args: any[]): void;
    error(msg: string | LogLevelMessage, ...args: any[]): void;
    write(level: LogLevel, msg: string, context: any, args: any): void;
    private extractMessageAndContext;
    private _handleLog;
}
export declare const logLevelNames: string[];
export declare const defaultFormatter: LogFormatter;
export declare const jsonFormatter: LogFormatter;
export declare const FileLogger: FileLoggerStatic;
export {};
