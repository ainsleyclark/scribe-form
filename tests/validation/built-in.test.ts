import {validators} from "../../src/js/validation/built-in";


describe('emails should be validated', () => {
    const cases = [
        ["user@email.com", true],
        ["user-1@email.com", true],
        ["@email.com", false],
        ["user@", false],
        ["useremail.com", false],
    ]

    test.each(cases)("validateEmail(%s) should be %s", (email, expected) => {
        const input = document.createElement('input');
        if (typeof email === "string") {
            input.value = email;
        }
        expect(validators.tests['email'].validate(input)).toEqual(expected);
    });
})