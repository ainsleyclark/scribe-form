/**
 *
 */
export interface Validator {
	name: string
	priority: number,
	validate: (el: HTMLInputElement, ...args: any[]) => boolean
}

/**
 *
 */
export const tests: Record<string, Validator> = {
	'required': {
		name: 'required',
		priority: 99,
		validate: (el: HTMLInputElement): boolean => {
			const value = el.value;
			if (el.type === 'radio' || el.type === 'checkbox') {

			}
			return value !== undefined && value !== '';
		}
	},
	'email': {
		name: 'email',
		priority: 1,
		validate: (el: HTMLInputElement): boolean => {
			return !!el.value.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
		}
	},
	'number': {
		name: 'number',
		priority: 1,
		validate: (el: HTMLInputElement): boolean => {
			return !el.value || !isNaN(parseFloat(el.value));
		}
	},
	'url': {
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
	'minlength': {
		name: 'minlength',
		priority: 1,
		validate: (el: HTMLInputElement, length: number): boolean => {
			const value = el.value;
			return true;
		}
	},
	'maxlength': {
		name: 'maxlength',
		priority: 1,
		validate: (el: HTMLInputElement, length: number): boolean => {
			const value = el.value;
			return true;
		}
	},
	'min': {
		name: 'min',
		priority: 1,
		validate: (el: HTMLInputElement, limit: number): boolean => {
			const value = el.value;
			return true;
		}
	},
	'max': {
		name: 'max',
		priority: 1,
		validate: (el: HTMLInputElement, limit: number): boolean => {
			const value = el.value;
			return true;
		}
	},
	'pattern': {
		name: 'pattern',
		priority: 1,
		validate: (el: HTMLInputElement, pattern: string): boolean => {
			const value = el.value;
			return true;
		}
	},
	'equals': {
		name: 'equals',
		priority: 1,
		validate: (el: HTMLInputElement, selector: string): boolean => {
			const value = el.value;
			return true;
		}
	},
};
