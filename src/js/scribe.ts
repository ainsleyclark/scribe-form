/**
 * scribe.js
 * Scribe class for forms.
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {Validation} from "./validation";

export class Scribe {

	// This would be great for options
	form: HTMLFormElement;
	list: HTMLLIElement[];
	validator: Validation
	currentSlide: number = 0;
	animatingTime = 600;

	// TODO this will be a config struct;
	constructor(formSelector: string) {
		const form = document.querySelector("form");
		if (!form) {
			console.error(`${formSelector} not found in DOM`);
			return;
		}
		this.form = <HTMLFormElement>form;

		this.list = form.querySelectorAll(".scribe-item") as unknown as HTMLLIElement[];

		form.addEventListener("submit", e => {
			e.preventDefault();
		});

		this.validator = new Validation(form);
		this.listener();

		this.form.classList.add("scribe-form-loaded");

	}

	private listener() {
		document.addEventListener('keypress', e => {
			if (e.key === 'Enter') {
				this.nextSlide();
			}
		});

		const next = document.querySelector(".scribe-next");
		if (next) {
			next.addEventListener("click", e => {
				e.preventDefault();
				this.nextSlide();
			})
		}

		const prev = document.querySelector(".scribe-previous");
		if (prev) {
			prev.addEventListener("click", e => {
				e.preventDefault();
				this.previousSlide();
			})
		}
	}
	/**
	 * Goes to the previous slide in the form.
	 * If it's the first slide, the function will exit.
	 * Input elements are autofocused once the animation has been completed.
	 */
	public previousSlide() {
		if (this.isFirstSlide()) {
			return;
		}

		const curr = this.list[this.currentSlide],
			prev = this.list[this.currentSlide - 1];

		prev.classList.add("scribe-item-show");
		curr.classList.remove("scribe-item-show");
		curr.classList.add("scribe-item-hide-forwards");

		this.focusElement(this.getInput(prev));

		this.currentSlide--;
	}
	/**
	 * Goes to the next slide in the form.
	 * If it's the last slide, the function will exit.
	 * Input elements are autofocused once the animation has been completed.
	 */
	public nextSlide() {
		if (this.isLastSlide()) {
			return;
		}

		const curr = this.list[this.currentSlide],
			next = this.list[this.currentSlide + 1];

		curr.classList.add("scribe-item-hide");
		curr.classList.remove("scribe-item-show");
		curr.classList.remove("scribe-item-hide-forwards");
		next.classList.add("scribe-item-show");

		this.focusElement(this.getInput(next));

		this.currentSlide++;
	}
	/**
	 * Determines if the current slide is the first in the form.
	 * @returns bool
	 */
	public isFirstSlide(): boolean {
		return this.currentSlide === 0;
	}
	/**
	 * Determines if the current slide is the last in the form.
	 * @returns bool
	 */
	public isLastSlide(): boolean {
		return this.list.length - 1 === this.currentSlide;
	}
	/**
	 * Obtains Scribe information.
	 * TODO: Add navContainer etc.
	 * @returns ScribeInfo
	 */
	public getInfo(): ScribeInfo {
		return <ScribeInfo>{
			index: this.currentSlide,
			items: this.list.length,
		}
	}
	/**
	 * Obtains the input element from a list item.
	 * @param el
	 * @private
	 */
	private getInput = (el: HTMLElement): HTMLElement | null => el.querySelector("input, textarea, select");
	/**
	 * Focuses the HTMLElement, in order for the user to type when
	 * a slide has transitioned.
	 * @param el
	 * @private
	 */
	private focusElement(el: HTMLElement | null) {
		if (el) {
			setTimeout(() => {
				el.focus();
			}, this.animatingTime)
		}
	}
}
