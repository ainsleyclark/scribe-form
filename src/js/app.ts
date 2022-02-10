/**
 * app.js
 * All custom JS for theme stored here.
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {Scribe} from "./scribe";
import {Validation} from "./validation/validation";

// new Scribe({
//     form: ".scribe-form",
//     size: "50vw",
// }) as ScribeInstance;


const form = document.querySelector(".scribe-form") as HTMLFormElement,
	input = document.querySelector("[name='first-name']") as HTMLInputElement;
if (form) {
	const test = new Validation(form);

	input.addEventListener("blur", e => {
		const valid = test.validateField("#q1");
		if (valid) {
			console.log("valid");
			return;
		}
		console.log("not valid");
	});
}



