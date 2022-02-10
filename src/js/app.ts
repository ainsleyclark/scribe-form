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
	const validation = new Validation(form);


	form.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), textarea, select").forEach(input => {
		input.addEventListener("blur", e => {
			validation.validateField(input);
			// console.log(validation.getErrors())


			setTimeout(() => {
				validation.destroy();
			}, 1000)
		});
	})
}



