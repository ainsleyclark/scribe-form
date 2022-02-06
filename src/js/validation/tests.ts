/**
 *
 */
import {DataAttributes, Messages} from "./validation";
import {Log} from "../common/log";
import any = jasmine.any;


interface Validator {
	priority?: number,
	validate: (el: HTMLInputElement) => boolean
}

const test: Record<string, Validator> = {
	'required': {
		priority: 0,
		validate: (el: HTMLInputElement): boolean => {
			const value = el.value;
			if (el.type === 'radio' || el.type === 'checkbox') {

			}
			return value !== undefined && value !== '';
		}
	},
}

/**
 *
 */
export const validationTests = {
    /**
	 *
	 * @param el
	 * @param attr
	 * @param msg
	 */
    text: (el: HTMLInputElement, attr: DataAttributes, msg: Messages): boolean | string => {
		const value = el.value;

		if (attr.required && value == "") {
			return msg.required;
		}

		if (attr.minLength && value.length < attr.minLength) {
			return msg.minLength;
		}

		if (attr.maxLength && value.length > attr.maxLength) {
			return msg.maxLength;
		}

		if (attr.equals) {
			const match = document.querySelector(attr.equals) as HTMLInputElement;
			if (!match) {
				Log.warn("Equals selector does not exist in the DOM:", attr.equals)
				return msg.invalid;
			}
			if (match.value != attr.equals) {
				return msg.equals;
			}
		}

		if (attr.pattern) {
			try {
				const reg = new RegExp(attr.pattern).test(value)
				if (!reg) {
					return msg.pattern;
				}
			} catch(err) {
				Log.warn("Regex is invalid:", err);
				return msg.invalid;
			}
		}

        return true
    },
	/**
	 *
	 * @param el
	 * @param attr
	 * @param msg
	 */
    email: (el: HTMLInputElement, attr: DataAttributes, msg: Messages): boolean | string => {
		const value = el.value;

		if (attr.required && value == "") {
			return msg.required;
		}

		const reg = value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

		if (!reg) {
			return msg.email;
		}

		return true;
    },
	/**
	 *
	 * @param field
	 * @param attr
	 * @param msg
	 */
    number: (field: HTMLInputElement, attr: DataAttributes, msg: Messages): boolean | string => {

        return true
    },
	/**
	 *
	 * @param field
	 * @param attr
	 * @param msg
	 */
	url: (field: HTMLInputElement, attr: DataAttributes, msg: Messages): boolean | string => {

		return true
	},

}
