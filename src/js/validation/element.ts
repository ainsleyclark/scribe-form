/**
 * element.ts
 *
 * TODO
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */
import {ValidationErrors, ValidationMessages, Validator} from "./main";
import {validators} from "./tests";
import {lang} from "./lang";
import {tmpl} from "./util";

/**
 *
 */
const ALLOWED_ATTRIBUTES = ['required', 'min', 'max', 'minlength', 'maxlength', 'pattern'];

/**
 *
 */
export class ValidationElement {
    /**
     *
     */
    input: HTMLElement
    /**
     *
     */
    validators: Validator[] = [];
    /**
     *
     */
    params: {
        [key: string]: any
    } = {};
    /**
     *
     */
    messages: Map<string, string> = new Map<string, string>();
    /**
     *
     */
    errors: ValidationErrors = {};
    /**
     *
     */
    dataAttribute: string
    /**
     *
     * @param input
     * @param dataAttribute
     */
    constructor(input: HTMLElement, dataAttribute: string) {
        this.input = input;
        this.dataAttribute = dataAttribute;
        this.assign();
    }
    /**
     *
     * @param messages
     * @returns { message: string, valid: boolean }
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
     *
     */
    public clearErrors() {
        this.errors = {};
    }
    /**
     * []
     */
    public errorMessages(): string[] {
        return Object.keys(this.errors).map(key => this.errors[key]);
    }
    /**
     *
     * @param global
     * @param validator
     * @param name
     * @returns string
     * @private
     */
    private getMessage(global: ValidationMessages, validator: Validator, name: string): string {
        // First check if there is a message within the
        // validator, as that's where to user defined messages are.
        if (validator.message) {
            return validator.message
        }

        // Check if there is a message attached to the field
        // i.e (data attribute).
        const attr = this.messages.get(name);
        if (attr) {
            return attr
        }

        // Fall back to the global messages.
        const glob = global[name as keyof ValidationMessages];
        if (glob) {
            return glob;
        }

        // Return from lang.
        const def = lang[name];
        if (def) {
            return def;
        }

        return "Please enter a correct value";
    }
    /**
     *
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
     * @param name
     * @param value
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


