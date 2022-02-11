/**
 * tests.ts
 *
 * Built in validators and definitions for validation
 * including the Validation class for adding user
 * defined validation functions.
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */
import {ValidateFn, Validator} from "./main";
import {groupedElemCount} from "./util";
import {Log} from "../common/log";

/**
 * Validation is responsive for formatting initial validation methods
 * and adding any custom user validation functions.
 */
class Validation {
	/**
	 * The key, value pairs of validators.
	 */
    tests: { [name: string]: Validator }

    /**
     * Creates a new Validation type and initialises built in
     * validation methods.
     */
    constructor() {
        this.tests = {};
        tests.forEach(test => this.add(test.name, test.validate, test.priority));
    }
    /**
	 * Adds a validator to the tests object.
	 * If a validator already exists, the function will return.
	 * @param name
	 * @param validate
	 * @param priority
	 * @param message
	 */
    add(name: string, validate: ValidateFn, priority?: number, message?: string): void {
        if (Object.prototype.hasOwnProperty.call(this.tests, name)) {
            Log.error("Validator already exists:", name)
            return;
        }
        if (!priority) {
            priority = 1;
        }
        this.tests[name] = <Validator>{name, priority, validate, message}
		this.sort();
    }
	/**
	 * Sorts the tests' priority in ascending order.
	 */
	sort() {
		this.tests = Object
			.entries(this.tests)
			.sort((a, b) => b[1].priority - a[1].priority)
			.reduce((_sortedObj, [k,v]) => ({
				..._sortedObj,
				[k]: v
			}), {})
	}
}

/**
 * The array of built-in validators.
 */
const tests: Validator[] = [
    {
        name: 'required',
        priority: 99,
        validate: (el: HTMLInputElement): boolean => {
            const value = el.value;
            if (el.type === 'radio' || el.type === 'checkbox') {
                return groupedElemCount(el) === 0;
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
        validate: (el: HTMLInputElement): boolean => {
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
            if (el.type === 'checkbox') {
                return groupedElemCount(el) >= parseInt(limit)
            }
            return parseFloat(el.value) >= parseFloat(limit)
        }
    },
    {
        name: 'max',
        priority: 1,
        validate: (el: HTMLInputElement, limit: any): boolean => {
            if (el.type === 'checkbox') {
                return groupedElemCount(el) <= parseInt(limit)
            }
            return parseFloat(el.value) <= parseFloat(limit)
        }
    },
    {
        name: 'pattern',
        priority: 1,
        validate: (el: HTMLInputElement, pattern: any): boolean => {
            const reg = new RegExp('^/(.*?)/([gimy]*)$');
            const m = pattern.match(reg);
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

export const validators = new Validation();
