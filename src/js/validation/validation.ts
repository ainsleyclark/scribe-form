/**
 * validation.js
 * Validation logic for Scribe
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {tests, ValidateFn, Validator} from "./tests";
import Classes from "../common/classes";
import * as stream from "stream";
import {lang} from "./lang";
import {tmpl} from "./util";
import {Log} from "../common/log";

export const DATA_ATTRIBUTE = "scribe"
const ALLOWED_ATTRIBUTES = ['required', 'min', 'max', 'minlength', 'maxlength', 'pattern'],
	SELECTORS = "input:not([type^=hidden]):not([type^=submit]), textarea, select"


interface ScribeHTMLElement extends HTMLElement {
	scribe?: ScribeValidation
}

interface ScribeValidation {
	input: ScribeHTMLElement,
	validators: Validator[],
	params: { [key: string]: string },
	messages: Map<string, string>,
	errors: ScribeValidationErrors
}

interface ScribeValidationErrors {
	[key: string]: string
}

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
	fields: ScribeValidation[]

	/**
	 *
	 * @param form
	 */
	constructor(form: HTMLFormElement) {
		// Add novalidate attribute to form to ensure there's no
		// nasty HTML5 attributes being added.
		form.setAttribute("novalidate", "true");
		this.form = form;
		this.init();
	}

	/**
	 *
	 * @private
	 */
	private init(): void {

		this.fields = Array.from(this.form.querySelectorAll(SELECTORS)).map(input => {
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
		let valid = true;

		if (typeof field === 'string') {
			field = <HTMLElement>document.querySelector(field);
		}
		const el = field as ScribeHTMLElement;
		if (!el || !el.scribe) {
			// Log
			return false;
		}

		const scribe = el.scribe;

		let errors: { [key: string]: string } = {};
		scribe.validators.forEach(validator => {
			if (!el.scribe) {
				return false;
			}

			const name = validator.name;
			let params = scribe.params[name] ? scribe.params[name] : [] as any;
			params[0] = scribe.input;

			const isValid = validator.validate.apply(<ScribeHTMLElement>scribe.input, params);
			if (isValid) {
				return;
			}

			valid = false;

			let msg = scribe.messages.get(name);
			if (!msg) {
				msg = lang[name];
			}
			msg = tmpl.apply(msg, params)

			errors[name] = msg;

			if (!silent) {
				this.mark(<HTMLElement>el, msg);
			}
		});

		el.scribe.errors = errors;

		console.log(el.scribe.errors);

		return valid;
	}

	/**
	 *
	 */
	public getErrors(): ScribeValidationErrors[] {
		let errors: ScribeValidationErrors[] = [];
		this.fields.forEach(field => {
			errors.push(field.errors);
		})
		return errors;

	}

	// TODO: Events

	/**
	 * Resets the form validation removing any invalid messages,
	 * and error classes from the form.
	 */
	public reset(): void {
		this.fields.forEach((field, index) => {
			this.unmark(field.input);
			this.fields[index].errors = {};
		});
	}

	/**
	 * Resets the form by removing any invalid messages and error
	 * classes, and destroys the validation instance.
	 */
	public destroy(): void {
		this.reset();
		this.fields.forEach(field => {
			delete field.input.scribe;
		});
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

	/**
	 * For use with the init function. Adds an array of validators, parameters
	 * for the validator, name and a value if there is one attached.
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

		// Add the values to the parameters for validation functions.
		if (!value) {
			return;
		}
		let values = (name === "pattern" ? [value] : value.split(',')) as any[];
		values.unshift(null); // Placeholder for HTML Element, when validation.
		params[name] = values;
	}
}
