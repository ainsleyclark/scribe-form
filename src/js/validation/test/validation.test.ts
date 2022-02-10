import {Validation} from "../validation";

const val = new Validation(document.createElement("form")) as any; //es-lint disable

test('adds 1 + 2 to equal 3', () => {
    const el = document.createElement("input");
    el.setAttribute(`data-validate-required`, 'required');

    expect(val.getDataAttributes(el)).toStrictEqual({
        "required": true,
        "email": false,
        "number": false,
        "minLength": null,
        "maxLength": null,
        "max": null,
        "min": null,
        "equals": null,
    });
});
