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

/**
 *
 */
const SELECTORS = "input:not([type^=hidden]):not([type^=submit]), textarea, select"

/**
 *
 */
export class Validation {
    /**
     * The main form being validated.
     */
    form: HTMLFormElement;
    /**
     * The array of validation elements on the form.
     */
    fields: ValidationElement[];
    /**
     * TODO
     */
    classes: {
        classTo: 'form-group',
        errorClass: 'form-group-error',
        successClass: 'form-group-success',
        errorTextParent: 'form-group',
        errorTextTag: 'span',
        errorTextClass: 'form-message',
    }
    messages: {}

    dataAttribute: "validate"

    /**
     * TODO
     * @param form
     * @param config
     */
    constructor(form: HTMLFormElement | Element | string, config?: ValidationConfig) {
        if (typeof form === 'string') {
            form = <HTMLFormElement>document.querySelector(form);
        }
        this.form = <HTMLFormElement>form;
        if (config && config.classes) {
            this.classes = {...this.classes, ...config.classes};
        }
        this.init();
    }

    /**
     * TODO
     * @private
     */
    private init(): void {
        // Add novalidate attribute to form to ensure there's no
        // nasty HTML5 attributes being added.
        this.form.setAttribute("novalidate", "true");

        // Initialises the fields with new Validation elements.
        this.fields = Array.from(this.form.querySelectorAll(SELECTORS))
            .map(input => new ValidationElement(<HTMLElement>input, this.dataAttribute));
    }

    /**
     * TODO
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
     * TODO
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
        if (!validate.valid && !silent) {
            this.mark(el.input, validate.message);
        } else if (!silent) {
            this.unmark(el.input);
        }

        return validate.valid;
    }

    /**
     *
     */
    public getErrors(): { [name: string]: string } {
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
        validators.add(name, validator, priority);
        // TODO: We need to add the message to globals here.
    }

    /**
     * Mark the field container invalid and adds a message to the
     * end of the containers HTML.
     * @param field
     * @param message
     * @private
     */
    private mark(field: HTMLElement, message: string): void {
        const container = <HTMLElement>field.closest('.' + this.classes.classTo)
        if (!container) {
            return;
        }

        // Bail if the validation already has been marked as invalid.
        if (Classes.has(container, this.classes.errorClass)) {
            const msg = container.querySelector('.' + this.classes.errorClass);
            if (msg) {
                msg.innerHTML = message;
            }
            return;
        }

        // Append the error message to the container.
        const tag = `<${this.classes.errorTextTag} class="${this.classes.errorClass}">${message}</${this.classes.errorTextTag}>`
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
     * @param field
     * @private
     */
    private unmark(field: HTMLElement): void {
        const container = <HTMLElement>field.closest('.' + this.classes.classTo);
        if (!container) {
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
}
