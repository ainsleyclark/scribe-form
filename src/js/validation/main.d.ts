/**
 * The main configuration for the validation library.
 */
export declare type ValidationConfig = {
	/**
	 * A boolean value indicating whether validation should validate
	 * as you type.
	 * @default false.
	 */
	live?: boolean
	/**
	 * The data attribute to target for validation types and messages
	 * for example, data-my-attribute-message="Hello"
	 * @default validation
	 */
	dataAttribute?: string
	/**
	 * Determines if all the error messages should be shown. If set
	 * to false, only one error message will be appended.
	 * @default false
	 */
	showAll?: boolean
	/**
	 * Optional classes configuration.
	 */
	classes?: ValidationClasses
	/**
	 * Optional message configuration.
	 */
	messages?: ValidationMessages
}
/**
 *
 */
export type ValidationClasses = {
	/**
	 * Class of the parent element where the error/success class
	 * is added.
	 * @default form-group
	 */
	classTo?: string,
	/**
	 * Class of the parent to add in case of an error.
	 * @default form-grouop-error
	 */
	errorClass?: string,
	/**
	 * Class of the parent to add in case of success.
	 * @default form-group-success
	 */
	successClass?: string,
	/**
	 * Class of the parent element where error text element is appended.
	 * @default form-group
	 */
	errorTextParent?: string,
	/**
	 * Type of element to create for the error text.
	 * @default span
	 */
	errorTextTag?: string,
	/**
	 * Class of the form error message that is appended when validation
	 * failed on a field.
	 * @default form-message
	 */
	errorTextClass?: string,
	// TODO: Add INPUT ERROR CLASS AND SUCCESS
}
/**
 *
 */
export type ValidationMessages = {
	required?: string,
	email?: string,
	number?: string,
	url?: string,
	minLength?: string,
	maxLength?: string,
	min?: string,
	max?: string,
	pattern?: string,
	equals?: string,
}
/**
 * Validator defines a validation instance for the library.
 * Priority indicates the order in which the validation
 * methods will be evaluated.
 */
export interface Validator {
	/**
	 * The name of the validator to add, this will be reflective of messages
	 * such as `my-validate` will resolve to data-my-validate-message="test".
	 */
	name: string
	/**
	 * The priority of the validator. This determines in which order the
	 * validate functions will be executed.
	 * @default 1
	 */
	priority: number,
	/**
	 * The validate function to check to see if the field passed or
	 * failed validation.
	 */
	validate: ValidateFn
	/**
	 * Optional user defined messages attached to the validator.
	 */
	message?: string
}
/**
 * ValidateFn is the function that validates input values
 * with any amount of arguments.
 */
export type ValidateFn = (el: HTMLInputElement, ...args: any[]) => boolean
/**
 * ValidationErrors defines the key value pair of errors when
 * a field has been marked unsuccessful. THe key represents the
 * name of the validator and the value is the message.
 */
export type ValidationErrors = {
	[name: string]: string
}
