/**
 *
 * @returns string
 */
export function tmpl(this: any): string {
	return this.replace(/\${([^{}]*)}/g, (a: any, b: any) => arguments[b]);
}

/**
 *
 * @param obj
 */
export function isEmptyObject(obj: any): boolean {
	return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
}
