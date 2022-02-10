import {Log} from "../common/log";

/**
 * Validator defines a validation method for Scribe.
 * Priority indicates the order in which the validation
 * methods will be evaluated.
 */
export interface Validator {
	name: string
	priority: number,
	validate: (el: HTMLInputElement, ...args: any[]) => boolean
}

/**
 * The array of validators.
 */
const validators: Validator[] = [
	{
		name: 'required',
		priority: 99,
		validate: (el: HTMLInputElement): boolean => {
			const value = el.value;
			if (el.type === 'radio' || el.type === 'checkbox') {

			}
			return value !== undefined && value !== '';
		}
	},
	{
		name: 'email',
		priority: 1,
		validate: (el: HTMLInputElement): boolean => {
			return !!el.value.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
		}
	},
	{
		name: 'number',
		priority: 1,
		validate: (el: HTMLInputElement): boolean => {
			return !el.value || !isNaN(parseFloat(el.value));
		}
	},
	{
		name: 'url',
		priority: 1,
		validate: (el: HTMLInputElement, length: number): boolean => {
			try {
				new URL(el.value);
			} catch (_) {
				return false;
			}
			return true;
		}
	},
	{
		name: 'minlength',
		priority: 1,
		validate: (el: HTMLInputElement, length: any): boolean => {
			return !el.value || el.value.length >= parseInt(length);
		}
	},
	{
		name: 'maxlength',
		priority: 1,
		validate: (el: HTMLInputElement, length: any): boolean => {
			return !el.value || el.value.length <= parseInt(length)
		}
	},
	{
		name: 'min',
		priority: 1,
		validate: (el: HTMLInputElement, limit: any): boolean => {
			// TODO: Need to account for checkboxes
			return parseFloat(el.value) >= parseFloat(limit)
		}
	},
	{
		name: 'pattern',
		priority: 1,
		validate: (el: HTMLInputElement, pattern: any): boolean => {
			const reg = new RegExp('^/(.*?)/([gimy]*)$');
			let m = pattern.match(reg);
			return !el.value || (new RegExp(m[1], m[2])).test(el.value)
		}
	},
	{
		name: 'equals',
		priority: 1,
		validate: (el: HTMLInputElement, selector: any): boolean => {
			const other = <HTMLInputElement>document.querySelector(selector);
			if (!other) {
				Log.error("No query selector found for equals:", selector)
				return false;
			}
			return other.value == el.value;
		}
	}
];

/**
 * Formats the tests, so they are key => validator pair.
 * @returns {[key: string]: Validator}
 */
const format = (): {[key: string]: Validator} => {
	let rt: {[key: string]: Validator} = {};
	validators.forEach(test => {
		rt[test.name] = test;
	})
	return rt;
}

export const tests = format();
