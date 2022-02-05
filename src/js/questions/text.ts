/**
 *
 */
import {DataQuestion} from "./question";

export class QuestionText {

    /**
     *
     * @param form
     */
    constructor(form: HTMLFormElement) {
        const els = form.querySelectorAll(`[data-scribe-type=${DataQuestion.Text}]`);
        els.forEach(el => {
            el.innerHTML += this.template();
        });
    }



    /**
     *
     */
    template(): string {


        const ok = document.createElement('button');
        ok.classList.add('scribe-ok');


        //
        // eltTooltip.innerHTML = "test"
        // eltTooltip.setAttribute('id', idTooltip);
        // eltTooltip.addEventListener("click", function () {
        //     alert('click');
        // });

        return `
        <div class="scribe-submit">
            <button class="scribe-ok">Ok</button>
            <span>press Enter ↵</span>
        </div>`;
    }
}