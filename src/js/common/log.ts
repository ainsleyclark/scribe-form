/**
 * Logger utility class for logging out messages to the
 * console.
 */
export class Log {
    static prefix = "Scribe - "

    /**
     * Log a console error.
     * @param message
     */
    static error(message: string) {
        console.error(this.prefix, message);
    }

    /**
     * Log a console warning,
     * @param message
     */
    static warn(message: string) {
        console.warn(this.prefix, message);
    }

    /**
     * Log a console message.
     * @param message
     */
    static info(message: string) {
        console.log(this.prefix, message)
    }
}