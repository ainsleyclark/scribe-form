import {validators} from "../../src/js/validation/built-in";

type Cases = {
    input: string,
    want: boolean,
    param?: any
}

const setup = (input: string): HTMLInputElement => {
    const el = document.createElement('input');
    el.value = input;
    return el;
};

describe('emails should be validated', () => {
    const cases: Cases[] = [
        {input: "user@email.com", want: true},
        {input: "user@email.com", want: true},
        {input: "email.com", want: false},
        {input: "user@", want: false},
        {input: "useremail.com", want: false},
    ];

    test.each(cases)(test.name, test => {
        expect(validators.tests['email'].validate(setup(test.input))).toEqual(test.want);
    });
});

describe('number should be validated', () => {
    const cases: Cases[] = [
        {input: "0", want: true},
        {input: "1", want: true},
        {input: "1.1", want: true},
        {input: "9.999", want: true},
        {input: "wrong", want: false},
    ];

    test.each(cases)("validateEmail(%s) should be %s", test => {
        expect(validators.tests['number'].validate(setup(test.input))).toEqual(test.want);
    });
});

describe('url should be validated', () => {
    const cases: Cases[] = [
        {input: "https://google.com", want: true},
        {input: "http://google.com", want: true},
        {input: "www.google.com", want: true},
        {input: "google.com", want: true},
        {input: "www.", want: false},
        {input: "wrong", want: false},
        {input: "hello.", want: false},
    ];

    test.each(cases)("validateEmail(%s) should be %s", test => {
        expect(validators.tests['url'].validate(setup(test.input))).toEqual(test.want);
    });
});

describe('minlength should be validated', () => {
    const cases: Cases[] = [
        {input: "hello", param: "1", want: true},
        {input: "hello", param: "10", want: false},

    ];

    test.each(cases)("validateEmail(%s) should be %s", test => {
        expect(validators.tests['minlength'].validate(setup(test.input), test.param)).toEqual(test.want);
    });
});