/**
 *
 * @returns string
 */
export function tmpl(this: any): string {
	return this.replace(/\${([^{}]*)}/g, (a: any, b: any) => arguments[b]);
}
