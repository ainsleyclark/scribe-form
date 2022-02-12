import {Validation} from "../../src/js/validation/validation";
import {validators} from "../../src/js/validation/built-in";
import {lang} from "../../src/js/validation/lang";

beforeEach(() => {
	jest.spyOn(console, 'error').mockImplementation(() => ({}));
});


const setup = (input: string, containerClass = 'form-group'): Validation => {
	document.body.innerHTML = '';
	const tmpl = `
<form class="form">
	<div class="${containerClass}">${input}</div>
</form>`;
	document.body.innerHTML += tmpl;
	return new Validation('.form');

};

describe('Validator Class', () => {

	describe('validateField()', () => {

		describe('Validates field successfully', () => {
			const validCases: string[] = [
				'<input type="text" required value="hello">',
				'<input type="text" data-validate-required value="hello">',
				'<input type="email" value="hello@scribeforms.com">',
				'<input data-validate-email value="hello@scribeforms.com">',
				'<input type="number" value="100">',
				'<input data-validate-number value="100">',
				'<input type="url" value="google.com">',
				'<input data-validate-url value="google.com">',
				'<input data-validate-minlength="3" value="hello">',
				'<input data-validate-maxlength="10" value="hello">',
				'<input type="number" data-validate-min="10" value="20">',
				'<input type="number" data-validate-max="30" value="20">',
				'<input type="text" data-validate-pattern="/[a-z]+$/i" value="abc">',
			];

			test.each(validCases)(('.validate(\'%s\') returns true'), test => {
				expect(setup(test).validate()).toBeTruthy();
			});


			const invalidCases: string[] = [
				'<input type="text" required>',
				'<input type="text" data-validate-required>',
				'<input type="email" value="wrong">',
				'<input data-validate-email value="wrong">',
				// TODO, not working
				//'<input type="number" value="wrong">',
				'<input data-validate-number value="wrong">',
				'<input type="url" value="wrong">',
				'<input data-validate-url value="wrong">',
				'<input data-validate-minlength="3" value="a">',
				'<input data-validate-maxlength="3" value="wrong">',
				'<input type="number" data-validate-min="10" value="1">',
				'<input type="number" data-validate-max="10" value="20">',
				'<input type="text" data-validate-pattern="/[a-z]+$/i" value="123">',
			];

			test.each(invalidCases)(('.validate(\'%s\') returns false'), test => {
				expect(setup(test).validate()).toBeFalsy();
			});

			// type InvalidCases = {
			// 	input: string,
			// 	message?: string
			// }
			//
			// const invalidCases: InvalidCases[] = [
			// 	{input: '<input type="text" required>', message: lang['required']},
			// 	{input: '<input type="text" required data-validate-required-message="invalid">', message: 'invalid'},
			// 	{input: '<input type="email" value="wrong">', message: lang['email']},
			// 	{input: '<input type="email" value="wrong" data-validate-email-message="invalid">', message: 'invalid'},
			// 	{input: '<input data-validate-email value="wrong">', message: lang['email']},
			// 	//{input: '<input type="number" value="wrong">', message: lang['number']},
			// 	//{input: '<input type="number" value="wrong" data-validate-number-message="invalid">', message: 'invalid'},
			// 	{input: '<input data-validate-number value="wrong">', message: lang['number']},
			// 	{input: '<input type="url" value="wrong">', message: lang['url']},
			// 	{input: '<input type="url" value="wrong" data-validate-url-message="invalid">', message: 'invalid'},
			// 	{input: '<input data-validate-url="url" value="wrong">', message: lang['url']},
			// 	{input: '<input type="url" value="wrong">', message: lang['url']},
			// ];
			//
			// test.each(invalidCases)(('.validate($input) returns false with message ($message)'), test => {
			// 	expect(setup(test.input).validate()).toBeFalsy();
			// 	const message = document.querySelector('.form-message');
			// 	if (!test.message || !message) {
			// 		return;
			// 	}
			// 	expect(message.innerHTML).toEqual(test.message);
			// });
		});

		// describe('TODO', () => {
		//
		// 	it('Adds error class', async() => {
		// 		const val = setup('<input type="text" required>');
		// 		val.validateField('.test');
		// 		const group = document.querySelector('.form-group');
		// 		if (!group) {
		// 			fail('Group should exist');
		// 		}
		// 		await new Promise((r) => setTimeout(r, 20));
		// 		expect(group.classList.contains('form-group-error')).toBe(true)
		// 	});
		//
		// 	it('Adds success class', async() => {
		// 		const val = setup('<input type="text" required value="test">');
		// 		val.validateField('.test');
		// 		const group = document.querySelector('.form-group');
		// 		if (!group) {
		// 			fail('Group should exist');
		// 		}
		// 		await new Promise((r) => setTimeout(r, 20));
		// 		expect(group.classList.contains('form-group-success')).toBe(true)
		// 	});
		// });
	});
});



