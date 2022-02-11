/**
 *
 */
declare interface ScribeInstance {
    /**
     * Version number of scribe.
     */
    version(): string;
    /**
     * Get the info about current tiny-slider instance
     */
    getInfo(): ScribeInfo;
    /**
     * Go to specific slide by index or keywords.
     * @param target the slide to go to (index or a code-word)
     */
    goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void,
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
    /**
     * TODO
     */
    validate(): boolean,
}
/**
 * Configuration for Scribe that is passed when a
 * new instance is created.
 */
declare interface ScribeConfig {
    /**
     * Form
     * @default ".scribe-form"
     */
    form?: HTMLFormElement | string;
    /**
     *
     * @default 600
     */
    speed?: number
    /**
     * TODO
     */
    size?: string
    /**
     * Controls the display and functionalities of controls components (prev/next buttons).
     * If true, display the controls and add all functionalities.
     * @default true
     */
    controls?: boolean;
    /**
     * Determines if the animations should animate on the X axis.
     * @default true
     */
    horizontal?: boolean
    /**
     * TODO
     */
    okButton?: string | false;
    /**
     * Customized previous buttons.
     * This option will be ignored if controlsContainer is a Node element or a CSS selector.
     * @default false
     */
    prevButton?: HTMLElement | string | false;
    /**
     * Moves throughout all the slides seamlessly.
     * @default true
     */
    nextButton?: HTMLElement | string | false;
}

/**
 *
 */
declare interface ScribeInfo {
    index: number;
    items: number;
    progress: number,
    navContainer?: HTMLElement
}