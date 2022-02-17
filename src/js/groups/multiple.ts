

export interface Group {
    view(): void
    value(): any
}

export class Multiple implements Group {


    /**
     *
     * @param form
     * @param goTo
     */
    constructor(form: HTMLFormElement, goTo: (target: (number | "next" | "prev" | "first" | "last")) => void) {


        this.addKeyListener();

        const els = form.querySelectorAll(`[data-scribe-type=multiple]`);
        els.forEach(el => {
            console.log(el.children);
        });
    }

    view(): void {
        throw new Error("Method not implemented.");
    }
    value() {
        throw new Error("Method not implemented.");
    }

    /**
     * If it's in view add the key listener,
     * if it's out of view remove it.
     * Emit the value back up to the parent
     */


    /**
     *
     */
    addKeyListener(): void {
        document.addEventListener("keydown", this.onKeyListener);
    }

    /**
     *
     */
    removeKeyListener(): void {
        document.removeEventListener("keydown", this.onKeyListener);
    }

    /**
     *
     * @param {KeyboardEvent} e
     */
    onKeyListener(e: KeyboardEvent) {
        const keyCode = e.key.toUpperCase().charCodeAt(0);
        if (keyCode < 65 || keyCode > 90) {
           return;
        }
        const index = keyCode - 65;

        //const group =
        console.log(index);
    }
}