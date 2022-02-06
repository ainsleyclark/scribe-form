/**
 * Logger utility class for logging out messages to the
 * console.
 */
export class Log {
    static prefix = "Scribe -"

    /**
	 * Log a console error.
	 * @param message
	 * @param data
	 */
    static error(message: string, ...data: any[]): void {
        console.error(this.prefix, message, data);
    }

    /**
	 * Log a console warning,
	 * @param message
	 * @param data
	 */
    static warn(message: string, ...data: any[]): void {
        console.warn(this.prefix, message, data);
    }

    /**
	 * Log a console message.
	 * @param message
	 * @param data
	 */
    static info(message: string, ...data: any[]): void {
        console.log(this.prefix, message, data)
    }
}
