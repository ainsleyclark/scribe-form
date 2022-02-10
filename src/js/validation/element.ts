import {Validator, validators} from "./tests";
import {lang} from "./lang";
import {tmpl} from "./util";

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
    validators: Validator[]
    /**
     *
     */
    params: {
        [key: string]: any
    }
    /**
     *
     */
    messages: Map<string, string>
    /**
     *
     */
    errors: { [key: string]: string }
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
        this.validators = [];
        this.params = {};
        this.messages = new Map<string, string>();
        this.errors = {};
        this.dataAttribute = dataAttribute;
        this.assign();
    }

    /**
     *
     */
    public clearErrors() {
        this.errors = {};
    }

    /**
     *
     */
    public validate(): { message: string, valid: boolean } {
        let valid = true,
            message = '';

        this.validators.forEach(validator => {
            const name = validator.name,
                params = this.params[name] ? this.params[name] : [] as any;
            params[0] = this.input;

            const isValid = validator.validate.apply(this.input, params);
            if (!isValid) {
                valid = false;
                let msg = this.messages.get(name);
                if (!msg) {
                    msg = lang[name];
                }
                msg = tmpl.apply(msg, params)
                this.errors[name] = msg
                message = msg;
            }
        });

        return {
            message: message,
            valid: valid,
        };
    }

    /**
     *
     * @private
     */
    private assign() {
        Array.from(this.input.attributes).forEach(attr => {
            const reg = new RegExp(`^data-${this.dataAttribute}-`);
            if (reg.test(attr.name)) {
                let name = <string>attr.name.substr(12);
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


