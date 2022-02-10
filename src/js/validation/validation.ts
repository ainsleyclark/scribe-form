/**
 * validation.js
 * Validation logic for Scribe
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */
import {tests, Validator} from "./tests";
import Classes from "../common/classes";
import * as stream from "stream";


export const DATA_ATTRIBUTE = "scribe"

const ALLOWED_ATTRIBUTES = ['required', 'min', 'max', 'minlength', 'maxlength', 'pattern'],
	SELECTORS = "input:not([type^=hidden]):not([type^=submit]), textarea, select"

/**
 * Require * Import
 *
 */

interface ScribeHTMLElement extends HTMLElement {
	scribe: ScribeValidation
}

interface ScribeValidation {
	input: HTMLElement,
	validators: Validator[],
	params: {[key: string]: string},
	messages: Map<string, string>,
}



export class Validation {

	config = {
		// Class of the parent element where the error/success class is added
		classTo: 'form-group',
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

	// Validation error texts
	messages: {[key: string]: string} = {
		required: 'please put something here',
		invalid: 'input is not as expected',
		short: 'input is too short',
		long: 'input is too long',
		checked: 'must be checked',
		select: 'Please select an option',
		number_min: 'too low',
		number_max: 'too high',
		url: 'invalid URL',
		number: 'not a number',
		email: 'email address is invalid',
		email_repeat: 'emails do not match',
		date: 'invalid date',
		time: 'invalid time',
		password_repeat: 'passwords do not match',
		no_match: 'no match',
		complete: 'input is not complete'
	}

	form: HTMLFormElement

	fields: ScribeValidation[]

	/**
	 *
	 * @param form
	 */
	constructor(form: HTMLFormElement) {
		// Add novalidate attribute to form to ensure there's no
		// nasty HTML5 attributes being added.
		form.setAttribute("novalidate", "true");

		this.init(form);
	}


	private init(form: HTMLFormElement) {

		this.fields = Array.from(form.querySelectorAll(SELECTORS)).map(input => {
			let validators: Validator[] = [],
				params = {},
				messages = new Map<string, string>();

			Array.from(input.attributes).forEach(attr => {
				const reg = new RegExp(`^data-${DATA_ATTRIBUTE}-`);
				if (reg.test(attr.name)) {
					let name = <string>attr.name.substr(12);
					if (name.includes("message")) {
						messages.set(name.replace("-message", ""), attr.value);
						return;
					}
					if (name === 'type') {
						name = attr.value;
						attr.value = "";
					}
					this.addValidatorToField(validators, params, name, attr.value);
				} else if (~ALLOWED_ATTRIBUTES.indexOf(attr.name)) {
					this.addValidatorToField(validators, params, attr.name, attr.value);
				} else if (attr.name === 'type') {
					this.addValidatorToField(validators, params, attr.value);
				}
			});

			validators.sort((a, b) => a.priority - b.priority);

			let el = input as ScribeHTMLElement;
			return el.scribe = <ScribeValidation>{input, validators, params, messages};
		});
	}


	/**
	 *
	 * @param validators
	 * @param params
	 * @param name
	 * @param value
	 * @private
	 */
	private addValidatorToField(validators: Validator[], params: any, name: string, value?: string): void {
		// Bail if there is no validator that exists with the
		// given name.
		let validator = tests[name];
		if (!validator) {
			return;
		}

		// Check if the validators is already been added, such as
		// data-scribe-required and required.
		const exists = validators.find(v => v.name === name);
		if (exists) {
			return;
		}

		validators.push(validator);
		if (!value) {
			return;
		}
		let values = (name === "pattern" ? [value]: value.split(',')) as any[];
		values.unshift(null); // Placeholder for HTML Element, when validation.
		params[name] = values;
	}


	/**
	 * @returns boolean
	 */
	public validate(): boolean {

		return false;
	}

	/**
	 *
	 * @param field
	 * @param silent - Don't mark the field, only return if it passed validation.
	 * @returns boolean
	 */
	public validateField(field: HTMLElement | Element | string, silent = false): boolean {
		let valid = true;

		if (typeof field === 'string') {
			field = <HTMLElement>document.querySelector(field);
		}
		const el = field as ScribeHTMLElement;
		if (!el) {
			// Log
			return false;
		}

		let errors: string[] = [];

		el.scribe.validators.forEach((validator, index) => {
			const name = validator.name;
			let params = el.scribe.params[name] ? el.scribe.params[name] : [] as any;
			params[0] = el.scribe.input;

			const isValid = validator.validate.apply(<HTMLInputElement>el.scribe.input, params);
			if (isValid) {
				return;
			}

			valid = false;

			const msg = el.scribe.messages.get(name)
			if (!msg) {
				errors.push(this.messages[name]);
			} else {
				errors.push(msg);
			}
		});

		return valid;
	}

	// TODO: Events

	/**
	 * Resets the form validation removing any invalid messages,
	 * and error classes from the form.
	 * @returns void
	 */
	public reset(): void {
		// TODO
		this.form.querySelectorAll("")
	}

	/**
	 * Mark the field container invalid and adds a message to the
	 * end of the containers HTML.
	 * @param field
	 * @param message
	 * @returns void
	 * @private
	 */
	private mark(field: HTMLElement, message: string): void {
		const container = <HTMLElement>field.closest(this.config.classTo)
		if (!container) {
			return;
		}

		// Bail if the validation already has been marked as invalid.
		if (Classes.has(container, this.config.errorClass)) {
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
	 * @returns void
	 * @private
	 */
	private unmark(field: HTMLElement): void {
		const container = <HTMLElement>field.closest(this.config.classTo)
		if (!container) {
			return;
		}

		// Remove the error class from the container.
		Classes.remove(container, this.config.errorClass);

		// Remove the message field from the DOM.
		const message = container.querySelector(this.config.errorClass);
		if (message) {
			container.removeChild(message);
		}
	}
}
