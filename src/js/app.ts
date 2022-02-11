/**
 * app.js
 * All custom JS for theme stored here.
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/* eslint-disable */

import {Validation} from "./validation/validation";

// new Scribe({
//     form: ".scribe-form",
//     size: "50vw",
// }) as ScribeInstance;



const form = document.querySelector(".scribe-form") as HTMLFormElement,
	input = document.querySelector("[name='first-name']") as HTMLInputElement;
if (form) {
	const validation = new Validation(form, {
		live: true,
		classes: {
			classTo: 'scribe-question',
		}
	});

	validation.addValidator('test', (el: HTMLElement, param1: any, param2: any): boolean => {
		console.log(el, param1, param2)
		return false;
	}, "something fucked up ${1} and ${2}", 0)



	form.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), textarea, select").forEach(input => {
		//input.addEventListener("input", e => {
		//	console.log(validation.getErrors());
		// d});
	});
}

/* eslint-enable */



