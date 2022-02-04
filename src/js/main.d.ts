/**
 *
 */
declare interface ScribeInstance {
	/**
	 * Version number of scribe.
	 */
	version: number;
	/**
	 * Get the info about current tiny-slider instance
	 */
	getInfo(): ScribeInfo;
	/**
	 * Go to specific slide by number or keywords.
	 * @param target the slide to go to (index or a code-word)
	 */
	goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void,
	/**
	 * Goes to the previous slide in the form.
	 * If it's the first slide, the function will exit.
	 * Input elements are autofocused once the animation has been completed.
	 */
	previousSlide(): void
	/**
	 * Goes to the next slide in the form.
	 * If it's the last slide, the function will exit.
	 * Input elements are autofocused once the animation has been completed.
	 */
	nextSlide(): void
	/**
	 * Determines if the current slide is the first in the form.
	 * @returns bool
	 */
	isFirstSlide(): boolean
	/**
	 * Determines if the current slide is the last in the form.
	 * @returns bool
	 */
	isLastSlide(): boolean

	validate(): boolean,
}
/**
 * Configuration for Scribe that is passed when a
 * new instance is created.
 */
declare interface ScribeConfig {
	/**
	 * Form
	 * @defaultValue ".scribe-form"
	 */
	form?: HTMLElement | Element | string;
	/**
	 * Controls the display and functionalities of controls components (prev/next buttons).
	 * If true, display the controls and add all functionalities.
	 * @defaultValue true
	 */
	controls?: boolean;
	/**
	 * Moves throughout all the slides seamlessly.
	 * @defaultValue true
	 */
	nextButton?: HTMLElement | string | false;
	/**
	 * Customized previous buttons.
	 * This option will be ignored if controlsContainer is a Node element or a CSS selector.
	 * @defaultValue false
	 */
	prevButton?: HTMLElement | string | false;
}
/**
 *
 */
declare interface ScribeInfo {
	index: number;
	items: number;
	navContainer?: HTMLElement
}
