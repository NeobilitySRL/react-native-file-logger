export declare enum LogLevel {
    Debug = 0,
    Info = 1,
    Warning = 2,
    Error = 3
}
export declare type LogFormatter = (level: LogLevel, msg: string, context: any) => string;
export interface ConfigureOptions {
    logLevel?: LogLevel;
    formatter?: LogFormatter;
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
    debug(msg: string, context: any): void;
    info(msg: string, context: any): void;
    warn(msg: string, context: any): void;
    error(msg: string, context: any): void;
    write(level: LogLevel, msg: string, context?: any): void;
    private _handleLog;
}
export declare const logLevelNames: string[];
export declare const defaultFormatter: LogFormatter;
export declare const jsonFormatter: LogFormatter;
export declare const FileLogger: FileLoggerStatic;
export {};
