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
import {Multiple} from "./groups/multiple";

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
	 *
	 * @type {{[p: string]: (...args: any[]) => void}}
	 * @private
	 */
	private events: {
		[method: string]: EventCallback
	} = {}
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

		if (!this.config.form) {
			Log.error(`${this.config.form} is not a valid element`);
			return;
		}

        this.setForm(this.config.form);

        this.list = this.form.querySelectorAll(".scribe-group") as unknown as HTMLElement[];

        this.form.addEventListener("submit", e => {
            e.preventDefault();
        });

        this.validation = new Validation(this.form, <ValidationConfig>{
            live: false,
            dataAttribute: 'scribe',
            showAll: false,
            classes: {
                classTo: 'scribe-group',
            }
        });

        new Multiple(this.form, this.goTo);

        this.listener();
        this.attachControls();
       //x this.attachOk();
        this.addClasses();

     	//this.focusElement(this.getInput(this.list[0]))
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
                Log.error("Target should be 'next', 'prev', 'first', 'last' or a number");
        }
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
            // TODO: Events
            progress: this.progress(),
        };
    }

	/**
	 *
	 * @param {string} method
	 * @param {EventCallback} callback
	 */
	public addEventListener(method: string, callback: EventCallback) {
		this.events[method] = callback;
	}

	/**
	 *
	 * @param {string} method
	 */
	public removeEventListener(method: string) {
		delete this.events[method];
	}

    /**
     *
     * @param {boolean} silent
     * @returns {boolean}
     */
    public validate(silent: boolean): boolean {
        return this.validation.validate(silent);
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
            this.emit('validationFailed', currentInput);
        }

        this.burst++;

		this.emit('transitionStart');
        this.addRemoveStyles(curr, false, isForwards);
        this.addRemoveStyles(next, true, isForwards);

		isForwards ? this.currentSlide++ : this.currentSlide--;

        this.focusElement(this.getInput(next));

		this.emit('indexChanged');
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
     *
     * @returns {number}
     * @private
     */
    private progress(): number {
        return (this.currentSlide / this.list.length) * 100;
    }

	/**
	 *
	 * @private
	 */
	private addClasses(): void {
		this.list.forEach((el, index) => {
			index === 0 ? this.addRemoveStyles(el, true): this.addRemoveStyles(el, false);
		});
		Classes.add(this.form, 'scribe-form-loaded');
		this.form.setAttribute('autocomplete', 'off');
	}

	/**
	 *
	 * @param {HTMLElement} el
	 * @param {boolean} hide
	 * @param {boolean} forwards
	 * @private
	 */
	private addRemoveStyles(el: HTMLElement, hide: boolean, forwards = false): void {
		if (!hide) {
			el.style.transform = this.getTransform(forwards);
			el.style.opacity = '0';
			el.ariaHidden = 'true';
			Classes.remove(el, 'scribe-active');
			return
		}

		el.style.transform = 'translate3d(0,0,0)';
		el.style.opacity = '1';
		el.ariaHidden = 'false';
		Classes.add(el, 'scribe-active');
	}

	/**
	 *
	 * @return {string}
	 * @private
	 * @param negative
	 */
	private getTransform(negative: boolean): string {
		const trans = negative ? `-${this.config.size}` : this.config.size;
		if (this.config.horizontal) {
			return `translate3d(${trans},0,0)`;
		}
		return `translate3d(0,${trans},0)`;
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
	 * @param {string} method
	 * @param {any} payload
	 * @private
	 */
	private emit(method: string, payload: any = null) {
		const callback = this.events[method];
		if (typeof callback === 'function') {
			callback(payload);
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
			this.emit('transitionEnd');
            this.burst--;
            if (this.burst === 0) {
                el.focus();
            }
        }, this.animatingTime);
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
        this.form = form;
    }
}
