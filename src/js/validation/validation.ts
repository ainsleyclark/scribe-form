/**
 * validation.js
 * Validation logic for Scribe
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {tests, ValidateFn, Validator} from "./tests";
import Classes from "../common/classes";
import {Log} from "../common/log";
import {ValidationElement} from "./element";

export const DATA_ATTRIBUTE = "scribe"
const SELECTORS = "input:not([type^=hidden]):not([type^=submit]), textarea, select"

/**
 *
 */
export class Validation {

	config = {
		// Class of the parent element where the error/success class is added
		classTo: 'scribe-question',
		// Class of the parent to add in case of an error.
		errorClass: 'form-group-error',
		// Class of the parent to add in case of success.
		successClass: 'form-group-success',
		// Class of the parent element where error text element is appended
		errorTextParent: 'form-group',
		// Type of element to create for the error text
		errorTextTag: 'span',
		// Class of the error text element
		errorTextClass: 'form-message',
	};

	/**
	 *
	 */
	form: HTMLFormElement

	/**
	 *
	 */
	fields: ValidationElement[]

	/**
	 *
	 * @param form
	 */
	constructor(form: HTMLFormElement) {
		this.form = form;
		this.init();
	}

	/**
	 *
	 * @private
	 */
	private init(): void {
		// Add novalidate attribute to form to ensure there's no
		// nasty HTML5 attributes being added.
		this.form.setAttribute("novalidate", "true");

		// TODO
		this.fields = Array.from(this.form.querySelectorAll(SELECTORS)).map(input => {
			return new ValidationElement(<HTMLElement>input);
		});
	}

	/**
	 *
	 * @param silent
	 */
	public validate(silent = false): boolean {
		let valid = true;
		this.fields.forEach(field => {
			if (!this.validateField(field.input, silent)) {
				valid = false;
			}
		});
		return valid;
	}

	/**
	 * TODO: This needs to be cleaned up
	 * @param field
	 * @param silent - Don't mark the field, only return if it passed validation.
	 * @returns boolean
	 */
	public validateField(field: HTMLElement | Element | string, silent = false): boolean {
		if (typeof field === 'string') {
			field = <HTMLElement>document.querySelector(field);
		}

		// Check the html element exists in the current
		// fields, if there is no match, bail.
		const el = this.fields.find(f => f.input === field);
		if (!el) {
			Log.error("Field not found in form:", field)
			return false;
		}

		// Validate and mark/unmark the field.
		const validate = el.validate();
		if (!validate.valid) {
			this.mark(el.input, validate.message);
		} else {
			this.unmark(el.input);
		}

		return validate.valid;
	}

	/**
	 *
	 */
	// public getErrors(): ScribeValidationErrors[] {
	// 	let errors: ScribeValidationErrors[] = [];
	// 	this.fields.forEach(field => {
	// 		errors.push(field.errors);
	// 	})
	// 	return errors;
	// }

	// TODO: Events

	/**
	 * Resets the form validation removing any invalid messages,
	 * and error classes from the form.
	 */
	public reset(): void {
		this.fields.forEach((field, index) => {
			this.unmark(field.input);
			this.fields[index].clearErrors();
		});
	}

	/**
	 * Resets the form by removing any invalid messages and error
	 * classes, and destroys the validation instance.
	 */
	public destroy(): void {
		this.reset();
		this.fields = [];
	}

	/**
	 * Adds a global custom validator to the instance.
	 * @param name
	 * @param validator
	 * @param message
	 * @param priority
	 */
	public addValidator(name: string, validator: ValidateFn, message: string, priority: number): void {
		if (tests.hasOwnProperty(name)) {
			Log.error("Validator already exists:", name)
			return;
		}
		tests[name] = <Validator>{
			name: name,
			validate: validator,
			priority: priority,
		}
	}

	/**
	 * Mark the field container invalid and adds a message to the
	 * end of the containers HTML.
	 * @param field
	 * @param message
	 * @private
	 */
	private mark(field: HTMLElement, message: string): void {
		const container = <HTMLElement>field.closest('.' + this.config.classTo)
		if (!container) {
			return;
		}

		// Bail if the validation already has been marked as invalid.
		if (Classes.has(container, this.config.errorClass)) {
			const msg = container.querySelector('.' + this.config.errorClass);
			if (msg) {
				msg.innerHTML = message;
			}
			return;
		}

		// Append the error message to the container.
		container.insertAdjacentHTML('beforeend', `<span class="${this.config.errorClass}">${message}</span>`);

		// Add the error class to the container, add a delay, so it can be
		// transitioned via CSS.
		setTimeout(() => {
			Classes.add(container, this.config.errorClass);
		}, 10);
	}

	/**
	 * Unmark the field as invalid and removes the message from
	 * the DOM.
	 * @param field
	 * @private
	 */
	private unmark(field: HTMLElement): void {
		const container = <HTMLElement>field.closest('.' + this.config.classTo);
		if (!container) {
			return;
		}

		// Remove the error class from the container.
		Classes.remove(container, this.config.errorClass);

		// Remove the message field from the DOM.
		const message = container.querySelector('.' + this.config.errorClass);
		if (message) {
			container.removeChild(message);
		}
	}
}
