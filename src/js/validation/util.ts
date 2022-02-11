/**
 *
 * @returns string
 */
export function tmpl(this: any): string {
	return this.replace(/\${([^{}]*)}/g, (a: any, b: any) => arguments[b]);
}

/**
 *
 * @param el
 */
export function groupedElemCount(el: HTMLInputElement): number {
	const form = el.closest('form');
	if (!form) {
		return 0;
	}
	return form
		.querySelectorAll('input[name="' + el.getAttribute('name') + '"]:checked')
		.length;
}