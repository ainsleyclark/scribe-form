/**
 * scribe.js
 *
 * Scribe class for forms.
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import {Log} from "./common/log";
import Classes from "./common/classes";
import {Validation} from "./validation/validation";
import {ValidationConfig} from "./validation/main";

const VERSION = "1.0.0";

/**
 * TODO
 */
enum Direction {
    Next = 'next',
    Previous = 'prev',
    First = 'first',
    Last = 'last',
}

export class Scribe {
    /**
     * Default configuration for scribe.
     */
    config: ScribeConfig = {
        form: ".scribe-form",
        speed: 600,
        size: "100vh",
        controls: true,
        horizontal: false,
        okButton: ".scribe-ok",
        prevButton: ".scribe-prev",
        nextButton: ".scribe-next",
    };
    /**
     * The main HTML Form element to use.
     * @type {HTMLFormElement}
     */
    form: HTMLFormElement;
    /**
     * TODO: Add jsDoc
     * @type {Validation}
     */
    validation: Validation;
    /**
     * TODO: Add jsDoc
     * @type {HTMLElement[]}
     */
    list: HTMLElement[];
    /**
     * TODO: Add jsDoc
     * @type {number}
     * @private
     */
    private currentSlide = 0;
    /**
     * TODO: Add jsDoc
     * @type {number}
     * @private
     */
    private burst = 0;
    /**
     * TODO: Add jsDoc
     * @type {number}
     * @private
     */
    private animatingTime = 600;

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

        this.validation = new Validation(this.form, <ValidationConfig>{
            live: false,
            dataAttribute: 'scribe',
            showAll: false,
            classes: {
                classTo: 'scribe-question',
            }
        });

        this.listener();
        this.attachControls();
       //x this.attachOk();
        this.addClasses();

     //   this.focusElement(this.getInput(this.list[0]))
    }

    /**
     * Obtains the current Scribe Version number.
     * @returns string
     */
    public version(): string {
        return VERSION;
    }

    /**
     * TODO: Add jsDoc
     * @param {number | "next" | "prev" | "first" | "last"} target
     */
    public goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void {
        if (typeof target === 'number') {
            this.animate(target);
            return;
        }
        switch (target as string) {
            case Direction.Next:
                this.animate(this.currentSlide + 1);
                break;
            case Direction.Previous:
                this.animate(this.currentSlide - 1);
                break;
            case Direction.First:
                this.animate(0);
                break;
            case Direction.Last:
                this.animate(this.list.length);
                break;
            default:
                Log.error("Target should be 'next', 'prev', 'first', 'last' or index");
        }
    }

    /**
     * TODO: Add jsDoc
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
     * @returns {boolean}
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
     * TODO: jsDoc
     * @returns {ScribeInfo}
     */
    public getInfo(): ScribeInfo {
        return <ScribeInfo>{
            index: this.currentSlide,
            items: this.list.length,
            progress: this.progress(),
        };
    }

    // on(event,callback) {
    //     if(!_triggers[event])
    //         _triggers[event] = [];
    //     _triggers[event].push( callback );
    // }

    /**
     *
     * @returns {number}
     * @private
     */
    private progress(): number {
        return (this.currentSlide / this.list.length) * 100;
    }

    /**
     *
     * @returns {boolean}
     */
    public validate(): boolean {
        return true;
    }

    /**
     *
     * @private
     */
    private addClasses() {
        this.list.forEach((el, index) => {
            if (index === 0) {
                el.classList.add('scribe-active');
                el.ariaHidden = 'false';
            } else {
                el.ariaHidden = 'true';
                el.style.transform = `translate3d(0,${this.config.size},0)`;
            }
        });
        this.form.classList.add('scribe-form-loaded');
    }

    /**
     *
     * @param {number} to
     * @private
     */
    private animate(to: number) {
        const isForwards = to > this.currentSlide;
        if (isForwards && this.isLastSlide()) {
            return;
        }

        if (!isForwards && this.isFirstSlide()) {
            return;
        }


        // TODO Sanity check array
        const next = this.list[to],
            curr = this.list[this.currentSlide];


        const currentInput = this.getInput(curr);
        if (!currentInput) {
            return;
        }

        const valid = this.validation.validateField(currentInput);
        if (!valid && isForwards) {
            return;
        }

        this.burst++;

        let currTransform = `translate3d(0,${this.config.size},0)`;
        if (isForwards) {
            currTransform = `translate3d(0,-${this.config.size},0)`;
        }

        curr.style.transform = currTransform;
        curr.style.opacity = '0';
        curr.ariaHidden = 'true';
        Classes.remove(curr, 'scribe-active');

        next.style.transform = 'translate3d(0,0,0)';
        next.style.opacity = '1';
        next.ariaHidden = 'false';
        Classes.add(next, 'scribe-active');

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
    private attachControls(): void {
        if (!this.config.controls) {
            return;
        }
        const next = document.querySelector(".scribe-next");
        if (next) {
            next.addEventListener("click", e => {
                e.preventDefault();
                this.goTo(Direction.Next);
            });
        }
        const prev = document.querySelector(".scribe-previous");
        if (prev) {
            prev.addEventListener("click", e => {
                e.preventDefault();
                this.goTo(Direction.Previous);
            });
        }
    }

    /**
     *
     * @private
     */
    // private attachOk(): void {
    //     if (!this.config.okButton) {
    //         return;
    //     }
    //     this.form.querySelectorAll(this.config.okButton).forEach(btn => {
    //         btn.addEventListener("click", () => this.goTo('next'));
    //     })
    // }

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
    private focusElement(el: HTMLElement | null): void {
        if (!el) {
            return;
        }
        setTimeout(() => {
            this.burst--;
            if (this.burst === 0) {
                el.focus();
            }
        }, this.animatingTime - 100);
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
