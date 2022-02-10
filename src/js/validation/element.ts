import {Validator} from "./tests";

class Tester extends HTMLElement  {
	input: HTMLElement
	validators: Validator[]
	params: {
		[key: string]: string
	}
	messages: Map<string, string>
	errors: {[key: string]: string}

	constructor(input: HTMLElement, validators: Validator[], params: {[key: string]: string}, messages: Map<string, string>) {
		super();
		this.input = input;
		this.validators = validators;
		this.params = params;
		this.messages = messages;
		this.errors = {};
	}

	/**
	 *
	 * @param name
	 * @param message
	 */
	addError(name: string, message: string): void {
		this.errors[name] = message;
	}
}

const t = new Tester();
