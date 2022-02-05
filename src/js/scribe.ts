/**
 * scribe.js
 * Scribe class for forms.
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {Log} from "./common/log";
import Classes from "./common/classes";

const VERSION = "1.0.0";

export class Scribe {



    pixels: "400px";

    isAnimating: boolean;


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
        this.addClasses();

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
        if (typeof target === 'number') {
            this.animate(target)
            return;
        }
        switch (target as string) {
            case 'next':
                this.animate(this.currentSlide + 1);
                break;
            case 'prev':
                this.animate(this.currentSlide - 1);
                break;
            case 'first':
                this.animate(0);
                break;
            case 'last':
                this.animate(this.list.length);
                break;
            default:
                Log.error("Target should be 'next', 'prev', 'first', 'last' or index");
        }
        Log.error("Target should be a string or number")
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
                this.goTo('next');
            }
        });
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

    private addClasses() {
        this.list.forEach((el, index) => {
            if (index === 0) {
                el.classList.add('scribe-active');
                el.ariaHidden = 'false';
            } else {
                el.ariaHidden = 'true';
            }
        });
        this.form.classList.add('scribe-form-loaded');
    }

    /**
     *
     * @param slideIn
     * @param slideOut
     * @private
     */
    private animate(to: number) {
        // TODO Sanity check array
        const next = this.list[to],
            curr = this.list[this.currentSlide],
            isForwards = to > this.currentSlide;

        if (isForwards && this.isLastSlide()) {
            return
        }

        if (!isForwards && this.isFirstSlide()) {
            return;
        }

        let currTransform = 'translate3d(0,100vh,0)';
        if (isForwards) {
            currTransform = 'translate3d(0,-100vh,0)';
        }

        curr.style.transform = currTransform;
        curr.style.opacity = '0';
        curr.ariaHidden = 'true';
        Classes.remove(curr,'scribe-active');

        next.style.transform = 'translate3d(0,0,0)';
        next.style.opacity = '1';
        next.ariaHidden = 'false';
        Classes.remove(next, 'scribe-active');

        if (isForwards) {
            this.currentSlide++;
        } else {
            this.currentSlide--;
        }

        this.focusElement(this.getInput(next));
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
                this.goTo('next');
            })
        }
        const prev = document.querySelector(".scribe-previous");
        if (prev) {
            prev.addEventListener("click", e => {
                e.preventDefault();
                this.goTo('prev');
            })
        }
    }

    private attachOk(): void {
        if (!this.config.okButton) {
            return;
        }
        this.form.querySelectorAll(this.config.okButton).forEach(btn => {
            btn.addEventListener("click", () => this.goTo('next'));
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
          //  el.focus();
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
}
