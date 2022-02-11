/**
 * Helper utility functions for adding, removing and toggling
 * classes on HTML elements.
 */
export default class Classes {
    /**
     * Determines if a HTMLElement has a particular class.
     * @param el
     * @param className
     * @returns boolean
     */
    static has(el: HTMLElement, className: string): boolean {
        return new RegExp(' ' + className + ' ').test(' ' + el.className + ' ');
    }

    /**
     * Adds a class from the given HTMLElement.
     * @param el
     * @param name
     * @returns void
     */
    static add(el: HTMLElement, name: string): void {
        el.classList.add(name);
    }

    /**
     * Removes a class from the given HTMLElement.
     * @param el
     * @param name
     * @returns void
     */
    static remove(el: HTMLElement, name: string): void {
        el.classList.remove(name);
    }

    /**
     * Toggles a classname, if the class already exists on the element,
     * it will be removed, otherwise it will be added.
     * @param el
     * @param name
     * @returns void
     */
    static toggle(el: HTMLElement, name: string): void {
        if (Classes.has(el, name)) {
            Classes.remove(el, name);
            return;
        }
        Classes.add(el, name);
    }
}
