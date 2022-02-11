/**
 * validation.ts
 *
 * Validation logic for Scribe
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */
import {validators} from "./tests";
import Classes from "../common/classes";
import {Log} from "../common/log";
import {ValidationElement} from "./element";
import {ValidateFn, ValidationConfig, ValidationErrors} from "./main";

/**
 * The inputs to select for validation.
 */
const SELECTORS = "input:not([type^=hidden]):not([type^=submit]), textarea, select"

/**
 *
 */
export class Validation {
    /**
     * Form is the element being validated.
     * @type {HTMLFormElement}
     * @private
     */
    private form: HTMLFormElement;
    /**
     * Fields is the array of validation elements on the form.
     * @type {ValidationElement[]}
     * @private
     */
    private fields: ValidationElement[];
    /**
     * Classes are the default class names to add when fields are marked.
     * @type {{successClass: string, classTo: string, errorClass: string, errorTextParent: string, errorTextClass: string, errorTextTag: string}}
     * @private
     */
    private classes = {
        classTo: 'form-group',
        errorClass: 'form-group-error',
        successClass: 'form-group-success',
        errorTextParent: 'form-group',
        errorTextTag: 'span',
        errorTextClass: 'form-message',
    };
    /**
     * Global custom error messages.
     * @type {{}}
     * @private
     */
    private messages = {};
    /**
     * The data attribute to target.
     * @type {string}
     * @private
     */
    private dataAttribute = "validate";
    /**
     * Determines if the inputs should be validated on the fly, as the user types.
     * @type {boolean}
     * @private
     */
    private live = false;
    /**
     * Determines if all the error messages should be shown. If set
     * to false, only one error message will be appended.
     */
    private showAll = false;
    /**
     * Bound listener for live events/
     * @type {(e: Event) => void}
     * @private
     */
    private readonly boundEventListener: (e: Event) => void

    /**
     * Creates a new Validation instance, form is either an element
     * or selector. If the form does not exist in the DOM an error
     * will be logged.
     * @param {HTMLFormElement | Element | string} form
     * @param {ValidationConfig} config
     */
    constructor(form: HTMLFormElement | Element | string, config?: ValidationConfig) {
        if (typeof form === 'string') {
            form = <HTMLFormElement>document.querySelector(form);
        }

        if (!form) {
            Log.error("Cannot find form element in DOM: ", form)
            return;
        }

        this.form = <HTMLFormElement>form;

        // Add novalidate attribute to form to ensure there's no
        // nasty HTML5 attributes being added.
        this.form.setAttribute("novalidate", "true");

        if (config) {
            this.setConfig(config);
        }

        this.boundEventListener = (p: Event) => this.validateField(<HTMLElement>p.target);

        this.assignFields();
    }

    /**
     * Validates the whole form on for errors.
     * @param {boolean} silent - Don't mark the field, only return if it passed validation.
     * @returns {boolean} - If the form passed validation.
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
     * Validates a specific field of the form.
     * @param {HTMLElement | Element | string} field - Element or query selector.
     * @param {boolean} silent - Don't mark the field, only return if it passed validation.
     * @returns {boolean} - If the field passed validation.
     */
    public validateField(field: HTMLElement | Element | string, silent = false): boolean {
        const el = this.findField(field);
        if (!el) {
            return false;
        }

        // Validate and mark/unmark the field.
        const valid = el.validate(this.messages);
        if (!valid && !silent) {
            this.mark(el.input, el.errorMessages());
        } else if (!silent) {
            this.unmark(el.input);
        }

        return valid;
    }

    /**
     * Retrieves the errors for the
     * @param {HTMLElement | Element | string} field
     * @returns {ValidationErrors | ValidationErrors[]}
     */
    public getErrors(field?: HTMLElement | Element | string): ValidationErrors | ValidationErrors[] {
        const errors: ValidationErrors[] = [];
        if (field) {
            const el = this.findField(field);
            if (!el) {
                return errors;
            }
            return el.errors;
        }
        return this.fields.map(f => f.errors);
    }

    /**
     * Adds a global custom validator.
     * @param {string} name - The name of the new validation method i.e. data-validate-range
     * @param {ValidateFn} validator - The validate function which should return a boolean indicating it's passed.
     * @param {string} message - The message to return if validation failed
     * @param {number} priority - The priority of the validator, defaults to 1.
     */
    public addValidator(name: string, validator: ValidateFn, message?: string, priority?: number): void {
        validators.add(name, validator, priority, message);
        this.fields = [];
        this.assignFields();
    }

    /**
     * Set the validation global configuration.
     * @param {ValidationConfig} config
     */
    public setConfig(config: ValidationConfig): void {
        if (config.live !== undefined) {
            this.live = config.live;
        }
        if (config.showAll !== undefined) {
            this.showAll = config.showAll;
        }
        if (config.classes) {
            this.classes = {...this.classes, ...config.classes};
        }
        if (config.messages) {
            this.messages = {...this.messages, ...config.messages};
        }
    }

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
        this.fields.forEach(el => this.listener(el, false));
        this.fields = [];
    }

    /**
     * Mark the field container invalid and adds a message to the
     * end of the containers HTML.
     * @param {HTMLElement} field
     * @param {string[]} errors
     * @private
     */
    private mark(field: HTMLElement, errors: string[]): void {
        const container = <HTMLElement>field.closest('.' + this.classes.classTo);
        if (!container) {
            Log.error('Container not found in DOM:', this.classes.classTo);
            return;
        }

        // Remove the success class from the container.
        Classes.remove(container, '.' + this.classes.successClass);

        // Bail if the validation already has been marked as invalid.
        if (Classes.has(container, this.classes.errorClass)) {
            const msg = container.querySelector('.' + this.classes.errorClass);
            if (msg) {
                msg.innerHTML = errors[0];
            }
            return;
        }

        // Append the error message to the container.
        const tag = `<${this.classes.errorTextTag} class="${this.classes.errorClass}">${errors[0]}</${this.classes.errorTextTag}>`
        container.insertAdjacentHTML('beforeend', tag);

        // Add the error class to the container, add a delay, so it can be
        // transitioned via CSS.
        setTimeout(() => {
            Classes.add(container, this.classes.errorClass);
        }, 10);
    }

    /**
     * Unmark the field as invalid and removes the message from
     * the DOM.
     * @param {HTMLElement} field
     * @private
     */
    private unmark(field: HTMLElement): void {
        const container = <HTMLElement>field.closest('.' + this.classes.classTo);
        if (!container) {
            Log.error('Container not found in DOM:', this.classes.classTo);
            return;
        }

        // Remove the error class from the container.
        Classes.remove(container, this.classes.errorClass);

        // Remove the message field from the DOM.
        const message = container.querySelector('.' + this.classes.errorClass);
        if (message) {
            container.removeChild(message);
        }
    }

    /**
     * Initialises the fields with new Validation elements.
     * @private
     */
    private assignFields(): void {
        this.fields = Array.from(this.form.querySelectorAll(SELECTORS)).map(input => {
            const el = new ValidationElement(<HTMLElement>input, this.dataAttribute);
            // Attach event listener to input if live is set.
            if (this.live) {
                this.listener(el);
            }
            return el;
        });
    }

    /**
     * Removes the validation event listener from a ValidationElement. If add is
     * false, the listeners will only be removed and not added.
     * @param {ValidationElement} el
     * @param {boolean} add
     * @private
     */
    private listener(el: ValidationElement, add = true): void {
        const listener = ~['radio', 'checkbox'].indexOf(el.input.getAttribute('type') || 'input') ? 'change' : 'input';
        el.input.removeEventListener(listener, this.boundEventListener, false)
        if (add) {
            el.input.addEventListener(listener, this.boundEventListener, false);
        }
    }

    /**
     * Retrieves a ValidationElement based on the input. If the element
     * could not be found in the fields, an error will be logged and null
     * returned.
     * @param {HTMLElement | Element | string} field
     * @returns {ValidationElement | null}
     * @private
     */
    private findField(field: HTMLElement | Element | string): ValidationElement | null {
        if (typeof field === 'string') {
            field = <HTMLElement>document.querySelector(field);
        }

        // Check the html element exists in the current
        // fields, if there is no match, bail.
        const el = this.fields.find(f => f.input === field);
        if (!el) {
            Log.error("Field not found in form:", field)
            return null;
        }

        return el;
    }
}
