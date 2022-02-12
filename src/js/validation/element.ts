/**
 * element.ts
 *
 * Element is a singular field for validation. It's used
 * for building up validation functions on an HTML entity by
 * storing error messages, parameters and validators.
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */
import {ValidationErrors, ValidationMessages, Validator} from "./main";
import {validators} from "./built-in";
import {lang} from "./lang";
import {tmpl} from "./util";

/**
 * The attributes to search for on the element, either natively
 * or using the data- selector.
 */
const ALLOWED_ATTRIBUTES = ['required', 'min', 'max', 'minlength', 'maxlength', 'pattern'];

export class ValidationElement {
    /**
     * The HTMLElement being validated
     * @type {HTMLElement}
     */
    input: HTMLElement;
    /**
     * The array of validators to check against.
     * @type {Validator[]}
     */
    validators: Validator[] = [];
    /**
     * The key value pair of parameters to pass to the validator.
     * @type {{[p: string]: any}}
     */
    params: {
        [key: string]: any
    } = {};
    /**
     * Map of messages attached to the element, for example:
     * data-validate-required-message="hello"
     * @type {Map<string, string>}
     */
    messages: Map<string, string> = new Map<string, string>();
    /**
     * The object of validation errors that have occurred during
     * validation.
     * @type {ValidationErrors}
     */
    errors: ValidationErrors = {};
    /**
     * The data attribute that should be checked.
     * @type {string}
     */
    dataAttribute: string;

    /**
     * Creates a new Validation element.
     * @param {HTMLElement} input
     * @param {string} dataAttribute
     */
    constructor(input: HTMLElement, dataAttribute: string) {
        this.input = input;
        this.dataAttribute = dataAttribute;
        this.assign();
    }

    /**
     * Validates the element by applying the validator function and
     * assigns the error message if there is any.
     * @param {ValidationMessages} messages - Globally set messages.
     * @returns {boolean} - True if the field passed validation.
     */
    public validate(messages: ValidationMessages): boolean {
        let valid = true,
            message = '';

        this.validators.forEach(validator => {
            const name = validator.name,
                params = this.params[name] ? this.params[name] : [] as any;
            params[0] = this.input;

            const isValid = validator.validate.apply(this.input, params);
            if (!isValid) {
                valid = false;
                message = tmpl.apply(this.getMessage(messages, validator, name), params);
                this.errors[name] = message;
            }
        });

        return valid;
    }

    /**
     * Clears out any validation errors from the element.
     */
    public clearErrors(): void {
        this.errors = {};
    }

    /**
     * Retrieves a string slice of errors messages without
     * their name.
     * @returns {string[]}
     */
    public errorMessages(): string[] {
        return Object.keys(this.errors).map(key => this.errors[key]);
    }

    /**
     * Obtains the validation error message. Lookup order:
     *  1) On the field as a data attribute.
     *  2) On the validator itself (user defined validators).
     *  3) On the globally defined validator messages.
     *  4) From lang.
     *  5) Generic message.
     * @param {ValidationMessages} global
     * @param {Validator} validator
     * @param {string} name
     * @returns {string}
     * @private
     */
    private getMessage(global: ValidationMessages, validator: Validator, name: string): string {
        // Check if there is a message attached to the field
        // i.e (data attribute).
        const attr = this.messages.get(name);
        if (attr) {
            return attr;
        }

        // Check if there is a message within the
        // validator, as that's where to user defined messages are.
        if (validator.message) {
            return validator.message;
        }

        // Fall back to the global messages.
        const glob = global[name as keyof ValidationMessages];
        if (glob) {
            return glob;
        }

        // Return from lang/default.
		return lang[name] ? lang[name] : 'Please enter a correct value';
    }

    /**
     * Assigns the input to the class by looping over the input
     * attributes and checking them against the allowed attributes.
     * Lookup order:
     *  1) From the data attribute.
     *  2) From the allowed attributes, i.e. data-validate-required
     *  3) From the type (HTML5 native).
     * @private
     */
    private assign() {
        Array.from(this.input.attributes).forEach(attr => {
            const reg = new RegExp(`^data-${this.dataAttribute}-`);
            if (reg.test(attr.name)) {
                let name = <string>attr.name.substr(6 + this.dataAttribute.length);
                if (name.includes("message")) {
                    this.messages.set(name.replace("-message", ""), attr.value);
                    return;
                }
                if (name === 'type') {
                    name = attr.value;
                    attr.value = "";
                }
                this.addValidatorToField(name, attr.value);
            } else if (~ALLOWED_ATTRIBUTES.indexOf(attr.name)) {
                this.addValidatorToField(attr.name, attr.value);
            } else if (attr.name === 'type') {
                this.addValidatorToField(attr.value);
            }
        });
    }

    /**
     * For use with the init function. Adds an array of validators, parameters
     * for the validator, name and a value if there is one attached.
     * @param {string} name
     * @param {string} value
     * @private
     */
    private addValidatorToField(name: string, value?: string): void {
        // Bail if there is no validator that exists with the
        // given name.
        const validator = validators.tests[name];
        if (!validator) {
            return;
        }

        // Check if the validators is already been added, such as
        // data-scribe-required and required.
        const exists = this.validators.find(v => v.name === name);
        if (exists) {
            return;
        }

        this.validators.push(validator);

        // Add the values to the parameters for validation functions.
        if (!value) {
            return;
        }

        const values = (name === "pattern" ? [value] : value.split(',')) as any[];
        values.unshift(null); // Placeholder for HTML Element, when validation.
        this.params[name] = values;
    }
}


