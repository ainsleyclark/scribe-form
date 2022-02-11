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
     */
    form: HTMLFormElement;
    /**
     * Fields is the array of validation elements on the form.
     */
    private fields: ValidationElement[];
    /**
     * Classes are the default class names to add when fields are marked.
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
     * Messages TODO
     * @private
     */
    private messages = {};
    /**
     * The data attribute to target.
     * @private
     */
    private dataAttribute = "validate";
    /**
     * If the inputs should be validated on the fly, as the user types.
     * @private
     */
    private live = false;

    /**
     * Creates a new Validation instance, form is either an element
     * or selector. If the form does not exist in the DOM an error
     * will be logged.
     * @param form
     * @param config
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

        if (config) {
            this.setConfig(config);
        }

        this.init();
    }
    /**
     * Sets form attributes and construct the forms fields.
     * @private
     */
    private init(): void {
        // Add novalidate attribute to form to ensure there's no
        // nasty HTML5 attributes being added.
        this.form.setAttribute("novalidate", "true");

        // Initialises the fields with new Validation elements.
        this.fields = Array.from(this.form.querySelectorAll(SELECTORS)).map(input => {
            const el = new ValidationElement(<HTMLElement>input, this.dataAttribute);

            // Attach event listener to input if live is set.
            if (this.live) {
                let type = el.input.getAttribute('type') || 'input' ;
                el.input.addEventListener(~['radio', 'checkbox'].indexOf(type) ? 'change' : 'input', () => {
                    this.validateField(el.input);
                })
            }

            return el;
        });
    }
    /**
     * Set the validation configuration.
     * @param config
     * @private
     */
    public setConfig(config: ValidationConfig): void {
        if (config.classes) {
            this.classes = {...this.classes, ...config.classes};
        }
        if (config.messages) {
            this.messages = {...this.messages, ...config.messages};
        }
        if (config.live) {
            this.live = config.live;
        }
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
        const validate = el.validate(this.messages);

        console.log(validate);

        if (!validate.valid && !silent) {
            console.log(validate);
            this.mark(el.input, validate.message);
        } else if (!silent) {
            this.unmark(el.input);
        }

        return validate.valid;
    }
    /**
     *
     */
    public getErrors(field: HTMLElement | Element | string | null): ValidationErrors | ValidationErrors[] {
        return [];

        // let errors: ScribeValidationErrors[] = [];
        // this.fields.forEach(field => {
        //     errors.push(field.errors);
        // })
        // return errors;
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
        validators.add(name, validator, priority, message);
    }
    /**
     * Mark the field container invalid and adds a message to the
     * end of the containers HTML.
     * @param field
     * @param message
     * @private
     */
    private mark(field: HTMLElement, message: string): void {
        const container = <HTMLElement>field.closest('.' + this.classes.classTo);
        if (!container) {
            Log.error('Container not found in DOM:', this.classes.classTo);
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
}
