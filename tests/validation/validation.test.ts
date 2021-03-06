import {Validation} from "../../src/js/validation/validation";
import {Log} from "../../src/js/common/log";
import {ValidationConfig, ValidationErrors, ValidationMessages} from "../../src/js/validation/main";
import {validators} from "../../src/js/validation/built-in";
import {lang} from "../../src/js/validation/lang";

beforeEach(() => {
	jest.spyOn(console, 'error').mockImplementation(() => ({}));
});

const addForm = (input = '', containerClass = 'form-group'): void => {
	document.body.innerHTML = '';
	const tmpl = `
<form class="form">
	<div class="${containerClass}">${input}</div>
</form>`;
	document.body.innerHTML += tmpl;
};

const setup = (input = '', containerClass = 'form-group'): Validation => {
	addForm(input, containerClass);
	return new Validation('.form');
};

describe('Validator Class', () => {

	describe('new', () => {

		it('Should return if there is no form found', () => {
			const consoleSpy = jest.spyOn(Log, 'error');
			new Validation('wrong');
			expect(consoleSpy).toHaveBeenCalledWith('Cannot find form element in DOM:', null);
		});

		it('Adds configuration', () => {
			addForm();
			const config = <ValidationConfig>{
				live: true,
				showAll: true,
				dataAttribute: 'attr',
				classes: {
					classTo: 'class',
				},
				messages: {
					required: 'required',
				}
			};
			const val = new Validation('.form', config);
			expect(val['live']).toBeTruthy();
			expect(val['showAll']).toBeTruthy();
			expect(val['dataAttribute']).toEqual(config.dataAttribute);
			expect(val['classes'].classTo).toEqual(config.classes?.classTo);
			expect(val['messages']).toEqual(config.messages);
		});
	});

	describe('validate()', () => {
		describe('Validates valid fields', () => {
			const validCases: string[] = [
				'<input type="text" required value="hello">',
				'<input type="text" data-validate-required value="hello">',
				'<input type="email" value="hello@scribeforms.com">',
				'<input data-validate-type="email" value="hello@scribeforms.com">',
				'<input type="number" value="100">',
				'<input data-validate-number value="100">',
				'<input type="url" value="google.com">',
				'<input data-validate-type="url" value="google.com">',
				'<input data-validate-minlength="3" value="hello">',
				'<input data-validate-maxlength="10" value="hello">',
				'<input type="number" data-validate-min="10" value="20">',
				'<input type="number" data-validate-max="30" value="20">',
				'<input type="text" data-validate-pattern="/[a-z]+$/i" value="abc">',
			];

			test.each(validCases)(('.validate(\'%s\') returns true'), test => {
				expect(setup(test).validate()).toBeTruthy();
			});
		});

		describe('Validates invalid fields', () => {
			const invalidCases: string[] = [
				'<input type="text" required>',
				'<input type="text" data-validate-required>',
				'<input type="email" value="wrong">',
				'<input data-validate-type="email" value="wrong">',
				// TODO, not working
				//'<input type="number" value="wrong">',
				'<input data-validate-number value="wrong">',
				'<input type="url" value="wrong">',
				'<input data-validate-type="url" value="wrong">',
				'<input data-validate-minlength="3" value="a">',
				'<input data-validate-maxlength="3" value="wrong">',
				'<input type="number" data-validate-min="10" value="1">',
				'<input type="number" data-validate-max="10" value="20">',
				'<input type="text" data-validate-pattern="/[a-z]+$/i" value="123">',
			];

			test.each(invalidCases)(('.validate(\'%s\') returns false'), test => {
				expect(setup(test).validate()).toBeFalsy();
			});
		});

		describe('Messages', () => {
			type Cases = {
				input: string,
				messages?: ValidationMessages
				want: string,
			};

			const cases: Cases[] = [
				{input: '<input type="text" data-validate-required>', want: lang['required']},
				{input: '<input type="text" data-validate-required data-validate-required-message="required">', want: 'required'},
				{input: '<input type="text" data-validate-required>', messages: {required: 'global'}, want: 'global'},
				{input: '<input type="text" data-validate-type="email" value="wrong">',  want: lang['email']},
				{input: '<input type="text" data-validate-type="email" value="wrong" data-validate-email-message="email">',  want: 'email'},
				{input: '<input type="text" data-validate-type="email" value="wrong">', messages: {email: 'global'},  want: 'global'},
				{input: '<input type="text" data-validate-number value="wrong">',  want: lang['number']},
				{input: '<input type="text" data-validate-number value="wrong" data-validate-number-message="number">',  want: 'number'},
				{input: '<input type="text" data-validate-number value="wrong">', messages: {number: 'global'},  want: 'global'},
				{input: '<input type="text" data-validate-type="url" value="wrong">',  want: lang['url']},
				{input: '<input type="text" data-validate-type="url" value="wrong" data-validate-url-message="url">',  want: 'url'},
				{input: '<input type="text" data-validate-type="url" value="wrong">', messages: {url: 'global'},  want: 'global'},
				{input: '<input type="text" data-validate-minlength="10" value="wrong">',  want: 'This fields length must be &gt; 10'},
				{input: '<input type="text" data-validate-minlength="10" value="wrong" data-validate-minlength-message="minlength">',  want: 'minlength'},
				{input: '<input type="text" data-validate-minlength="10" value="wrong">', messages: {minlength: 'global'},  want: 'global'},
				{input: '<input type="text" data-validate-maxlength="1" value="wrong">',  want: 'This fields length must be &lt; 1'},
				{input: '<input type="text" data-validate-maxlength="1" value="wrong" data-validate-maxlength-message="maxlength">',  want: 'maxlength'},
				{input: '<input type="text" data-validate-maxlength="1" value="wrong">', messages: {maxlength: 'global'},  want: 'global'},
				{input: '<input type="text" data-validate-min="1" value="wrong">',  want: 'Minimum value for this field is 1'},
				{input: '<input type="text" data-validate-min="1" value="wrong" data-validate-min-message="min">',  want: 'min'},
				{input: '<input type="text" data-validate-min="1" value="wrong">', messages: {min: 'global'},  want: 'global'},
				{input: '<input type="text" data-validate-max="1" value="wrong">',  want: 'Maximum value for this field is 1'},
				{input: '<input type="text" data-validate-max="1" value="wrong" data-validate-max-message="max">',  want: 'max'},
				{input: '<input type="text" data-validate-max="1" value="wrong">', messages: {max: 'global'},  want: 'global'},
				{input: '<input type="text" data-validate-pattern="/[a-z]+$/i" value="123">',  want: lang['pattern']},
				{input: '<input type="text" data-validate-pattern="/[a-z]+$/i" value="123" data-validate-pattern-message="pattern">',  want: 'pattern'},
				{input: '<input type="text" data-validate-pattern="/[a-z]+$/i" value="123">', messages: {pattern: 'global'},  want: 'global'},
				{input: '<input type="text" data-validate-equals="#other">',  want: lang['equals']},
				{input: '<input type="text" data-validate-equals="#other" data-validate-equals-message="equals">',  want: 'equals'},
				{input: '<input type="text" data-validate-equals="#other">', messages: {equals: 'global'},  want: 'global'},
			]

			test.each(cases)(('.validate($input) displays $want'), test => {
				addForm(test.input)
				const val = new Validation(".form", {messages: test.messages})
				val.validate();
				const message = <HTMLElement>document.querySelector(".form-message");
				expect(message.innerHTML).toBe(test.want);
			});
		});

		describe('Classes', () => {

			it('Adds error class', async() => {
				setup('<input type="text" class="test" required>').validateField('.test');
				await new Promise((r) => setTimeout(r, 20));
				const group = <HTMLElement>document.querySelector('.form-group');
				expect(group.classList.contains('form-group-error')).toBe(true)
			});

			it('Adds success class', async() => {
				setup('<input type="text" class="test" value="hello" required>').validateField('.test');
				await new Promise((r) => setTimeout(r, 20));
				const group = <HTMLElement>document.querySelector('.form-group');
				expect(group.classList.contains('form-group-success')).toBe(true)
			});
		});

		it('Bails if there is no selector', () => {
			expect(setup(`<input type="text" required>`).validateField('.hello')).toBeFalsy();
		});
	});

	describe('getErrors()', () => {
		let val: Validation;

		beforeEach(() => {
			val = setup(`<input type="text" required class="test">`);
			val.validate(true);
		});

		it('Should retrieve a singular error', function () {
			expect(val.getErrors('.test')).toStrictEqual({"required": "This field is required"});
		});

		it('Should retrieve all errors as an array', function () {
			expect(val.getErrors()).toStrictEqual([{"required": "This field is required"}]);
		});
	});

	describe('addValidator()', () => {
		afterEach(() => {
			delete validators.tests['new'];
		});
		it('Should add validator', () => {
			setup().addValidator('new', (): boolean => false);
			expect(validators.tests['new']).toBeDefined();
		});
	});

	describe('reset()', () => {
		let val: Validation,
			container: HTMLElement;

		beforeEach(() => {
			addForm('<input type="text" value="wrong">', 'form-group form-group-error form-group-success');
			container = <HTMLElement>document.querySelector(".form-group");
			container.innerHTML += '<span class="form-message">Invalid</span>';
			val = new Validation('.form');
			val.reset();
		});

		it('Should clear errors', () => {
			expect(val['fields'][0].errors).toEqual({});
		});

		it('Should remove classes', () => {
			expect(container.classList.contains('form-group-error')).toBeFalsy();
			expect(container.classList.contains('form-group-success')).toBeFalsy();
		});

		it('Should remove messages', () => {
			expect(container.querySelectorAll(".form-message").length).toBe(0);
		});
	});

	describe('destroy()', () => {
		let val: Validation,
			mockEvent: any;

		beforeEach(() => {
			addForm('<input type="text" class="test">', 'form-group');
			val = new Validation('.form', <ValidationConfig>{live: true});
			const input = document.querySelector(".test");
			mockEvent = jest.spyOn(<HTMLElement>input, 'removeEventListener').mockImplementation(() => ({}));
			val.destroy();
		});

		it('Should empty fields', () => {
			expect(val['fields']).toEqual([]);
		});

		it('Remove event listeners', () => {
			expect(mockEvent).toHaveBeenCalled();
		});
	});
});



