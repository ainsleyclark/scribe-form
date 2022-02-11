/**
 * app.js
 * All custom JS for theme stored here.
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/* eslint-disable */

import {Validation} from "./validation/validation";
import {Scribe} from "./scribe";

// new Scribe({
//     form: ".scribe-form",
//     size: "50vw",
// }) as ScribeInstance;



const form = document.querySelector(".scribe-form") as HTMLFormElement,
	input = document.querySelector("[name='first-name']") as HTMLInputElement;
if (form) {
	new Scribe({
		form: form,
	} as ScribeConfig);





	form.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), textarea, select").forEach(input => {
		//input.addEventListener("input", e => {
		//	console.log(validation.getErrors());
		// d});
	});
}

/* eslint-enable */



