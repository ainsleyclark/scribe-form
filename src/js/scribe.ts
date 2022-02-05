/**
 * scribe.js
 * Scribe class for forms.
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {Log} from "./common/log";

const VERSION = "1.0.0";

export class Scribe {
    /**
     * Default configuration for scribe.
     */
    config: ScribeConfig = {
        form: ".scribe-form",
        controls: true,
        horizontal: false,
        okButton: ".scribe-ok",
        prevButton: ".scribe-prev",
        nextButton: ".scribe-next",
    }
    /**
     * The main HTML Form element to use.
     */
    form: HTMLFormElement;
    /**
     *
     */
    list: HTMLLIElement[];
    /**
     *
     */
    currentSlide = 0;
    /**
     *
     */
    animatingTime = 600;

    /**
     * Creates a new Scribe instance based of the configuration passed.
     * If no config is passed, scribe defaults will be used.
     * @param config
     */
    constructor(config?: ScribeConfig) {
        if (config) {
            this.config = {...this.config, ...config};
        }

        // @ts-ignore
        this.setForm(this.config.form);

        this.list = this.form.querySelectorAll(".scribe-question") as unknown as HTMLLIElement[];

        this.form.addEventListener("submit", e => {
            e.preventDefault();
        });

        this.listener();
        this.attachNavigation();
        this.attachOk();
        this.addLoadedForm();

     //   this.focusElement(this.getInput(this.list[0]), true)
    }

    /**
     * Obtains the current Scribe Version number.
     * @returns string
     */
    public version(): string {
        return VERSION
    }

    /**
     *
     * @param target
     */
    public goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void {
        if (typeof target === 'string') {
            switch (target as string) {
                case 'next':
                    this.nextSlide();
                    break;
                case 'prev':
                    this.previousSlide();
                    break;
                case 'first':
                    break;
                case 'last':
                    break;
                default:
                    Log.error("Target should be 'next', 'prev', 'first', 'last' or index");
            }
            return;
        }
        // TODO: Handle index
    }

    /**
     *
     * @private
     */
    private listener(): void {
        document.addEventListener('keypress', e => {
            const isEnter = e.key === 'Enter';
            if (e.shiftKey && isEnter && e.target instanceof HTMLTextAreaElement) {
                e.preventDefault();
                e.target.value += "\n";
                return;
            }
            if (isEnter) {
                e.preventDefault();
                this.nextSlide();
            }
        });
    }

    /**
     * Goes to the previous slide in the form.
     * If it's the first slide, the function will exit.
     * Input elements are autofocused once the animation has been completed.
     */
    public previousSlide(): void {
        if (this.isFirstSlide()) {
            return;
        }

        const curr = this.list[this.currentSlide],
            prev = this.list[this.currentSlide - 1];

        // TODO: Broken here. Adding unecessary classes.
        prev.classList.add("scribe-question-show");
        curr.classList.remove("scribe-question-show");
        curr.classList.add("scribe-question-hide-forwards");

        this.focusElement(this.getInput(prev));

        this.currentSlide--;
    }

    /**
     * Goes to the next slide in the form.
     * If it's the last slide, the function will exit.
     * Input elements are autofocused once the animation has been completed.
     */
    public nextSlide(): void {
        if (this.isLastSlide()) {
            return;
        }

        const curr = this.list[this.currentSlide],
            next = this.list[this.currentSlide + 1];

        curr.classList.add("scribe-question-hide");
        curr.classList.remove("scribe-question-show");
        curr.classList.remove("scribe-question-hide-forwards");
        next.classList.add("scribe-question-show");

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
     *
     * @returns bool
     */
    public validate(): boolean {
        return true
    }

    /**
     *
     * @private
     */
    private attachNavigation(): void {
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

    private attachOk(): void {
        if (!this.config.okButton) {
            return;
        }
        this.form.querySelectorAll(this.config.okButton).forEach(btn => {
            btn.addEventListener("click", () => this.nextSlide());
        })
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
     * @param timeout
     * @private
     */
    private focusElement(el: HTMLElement | null, timeout = true): void {
        if (!el) {
            return;
        }
        if (!timeout) {
            el.focus();
            return;
        }
        setTimeout(() => {
            el.focus();
        }, this.animatingTime)
    }

    /**
     * Sets the form
     * @param form
     * @private
     */
    private setForm(form: HTMLFormElement | string): void {
        if (typeof form === "string") {
            form = document.querySelector(form) as HTMLFormElement;
        }
        if (!form) {
           Log.error(`${form} is not a valid HTMLFormElement`);
        }
        this.form = form;
    }

    /**
     * Add the loaded class to the scribe form, ths will prevent
     * any transitions occurring on initial page load.
     * @private
     */
    private addLoadedForm(): void {
        this.form.classList.add("scribe-form-loaded");
    }
}
