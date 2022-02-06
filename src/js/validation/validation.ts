/**
 * validation.js
 * Validation logic for Scribe
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */


export interface DataAttributes {
    required: boolean
    email: boolean
    number: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
    equals?: string
}

export const DATA_ATTRIBUTE = "validate"


/**
 * Require * Import
 *
 */

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
    messages: {
        required        : 'please put something here',
        invalid         : 'input is not as expected',
        short           : 'input is too short',
        long            : 'input is too long',
        checked         : 'must be checked',
        select          : 'Please select an option',
        number_min      : 'too low',
        number_max      : 'too high',
        url             : 'invalid URL',
        number          : 'not a number',
        email           : 'email address is invalid',
        email_repeat    : 'emails do not match',
        date            : 'invalid date',
        time            : 'invalid time',
        password_repeat : 'passwords do not match',
        no_match        : 'no match',
        complete        : 'input is not complete'
    }

    /**
     *
     * @param form
     */
    constructor(form: HTMLFormElement) {

    }

    /**
     * @returns boolean
     */
    public validateAll(): boolean {
        return false
    }

    /**
     *
     * @param field
     * @param silent - Don't mark the field, only return if it passed validation.
     * @returns boolean
     */
    public checkField(field: HTMLElement, silent = false): boolean {
        return false
    }

    /**
     *
     */
    public reset(): void {

    }

    /**
     *
     * @param field
     * @private
     */
    private mark(field: HTMLElement): void {

    }

    /**
     *
     * @param field
     * @private
     */
    private unmark(field: HTMLElement): void {

    }


    /**
     *
     * @param field
     * @private
     */
    private getDataAttributes(field: HTMLElement): DataAttributes {
        return <DataAttributes>{
            required: field.hasAttribute(`data-${DATA_ATTRIBUTE}-required`) || field.hasAttribute("required"),
            email: field.getAttribute(`data-${DATA_ATTRIBUTE}-type`) === 'email' || field.getAttribute("type") === 'email',
            number: field.getAttribute(`data-${DATA_ATTRIBUTE}-type`) === 'number' || field.getAttribute("type") === 'number',
            minLength: (field.getAttribute(`data-${DATA_ATTRIBUTE}-minlength`) || field.getAttribute("minlength")) as Number | null,
            maxLength: (field.getAttribute(`data-${DATA_ATTRIBUTE}-maxlength`) || field.getAttribute("maxlength")) as Number | null,
            min: (field.getAttribute(`data-${DATA_ATTRIBUTE}-min`) || field.getAttribute("min")) as Number | null,
            max: (field.getAttribute(`data-${DATA_ATTRIBUTE}-max`) || field.getAttribute("max")) as Number | null,
            equals: field.getAttribute(`data-${DATA_ATTRIBUTE}-equals`) || field.getAttribute("equals"),
        }
    }
}

