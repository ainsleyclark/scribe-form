import {validators} from '../../src/js/validation/built-in';
import {Log} from "../../src/js/common/log";

beforeEach(() => {
	jest.spyOn(console, 'error').mockImplementation(() => ({}));
});

describe('Validator Class', () => {
	afterEach(() => {
		delete validators.tests['new'];
	});

	describe('add()', () => {
		it('Calls error to console, validator exists', () => {
			const consoleSpy = jest.spyOn(Log, 'error');
			validators.add('min', (): boolean => false);
			expect(consoleSpy).toHaveBeenCalledWith('Validator already exists:', 'min');
		});

		it('Adds default priority', () => {
			validators.add('new', (): boolean => false);
			expect(validators.tests['new']).toBeDefined();
			expect(validators.tests['new'].priority).toBe(1);
		});

		it('Adds a validator with priority and message', () => {
			validators.add('new', ((): boolean => false), 100, 'message');
			expect(validators.tests['new']).toBeDefined();
			expect(validators.tests['new'].priority).toBe(100);
			expect(validators.tests['new'].message).toBe('message');
		});
	});

	describe('sort()', () => {
		it('Sorts by priority', () => {
			validators.sort();
			let priority = -1;
			for (const key in validators.tests) {
				const validator = validators.tests[key];
				expect(validator.priority).toBeGreaterThanOrEqual(priority);
				priority = validator.priority;
			}
		});
	});
});

type Cases = {
	input?: string,
	want: boolean,
	param?: any
}

const setup = (input?: string): HTMLInputElement => {
	const el = document.createElement('input');
	if (input) {
		el.value = input;
	}
	return el;
};

describe('Tests', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	describe('Required should be validated', () => {
		const cases: Cases[] = [
			{input: undefined, want: false},
			{input: '', want: false},
			{input: 'hello', want: true},
		];

		test.each(cases)(('.required($input) returns $want'), test => {
			expect(validators.tests['required'].validate(setup(test.input))).toEqual(test.want);
		});
	});

	describe('Email should be validated', () => {
		const cases: Cases[] = [
			{input: 'user@email.com', want: true},
			{input: 'user@email.com', want: true},
			{input: 'email.com', want: false},
			{input: 'user@', want: false},
			{input: 'useremail.com', want: false},
		];

		test.each(cases)(('.email($input) returns $want'), test => {
			expect(validators.tests['email'].validate(setup(test.input))).toEqual(test.want);
		});
	});

	describe('Number should be validated', () => {
		const cases: Cases[] = [
			{input: '0', want: true},
			{input: '1', want: true},
			{input: '1.1', want: true},
			{input: '9.999', want: true},
			{input: 'wrong', want: false},
		];

		test.each(cases)('.number($input) returns $want', test => {
			expect(validators.tests['number'].validate(setup(test.input))).toEqual(test.want);
		});
	});

	describe('URL should be validated', () => {
		const cases: Cases[] = [
			{input: 'https://google.com', want: true},
			{input: 'http://google.com', want: true},
			{input: 'www.google.com', want: true},
			{input: 'google.com', want: true},
			{input: 'www.', want: false},
			{input: 'wrong', want: false},
			{input: 'hello.', want: false},
		];

		test.each(cases)('.url($input) returns $want', test => {
			expect(validators.tests['url'].validate(setup(test.input))).toEqual(test.want);
		});
	});

	describe('Min length should be validated', () => {
		const cases: Cases[] = [
			{input: 'hello', param: '1', want: true},
			{input: 'hello', param: '10', want: false},
			{input: 'hello', param: '5', want: true}
		];

		test.each(cases)('.minlength($input, $param) returns $want', test => {
			expect(validators.tests['minlength'].validate(setup(test.input), test.param)).toEqual(test.want);
		});
	});

	describe('Max Length should be validated', () => {
		const cases: Cases[] = [
			{input: 'hello', param: '1', want: false},
			{input: 'hello', param: '10', want: true},
			{input: 'hello', param: '5', want: true}
		];

		test.each(cases)('.maxlength($input, $param) returns $want', test => {
			expect(validators.tests['maxlength'].validate(setup(test.input), test.param)).toEqual(test.want);
		});
	});

	describe('Min should be validated', () => {
		const cases: Cases[] = [
			{input: '1', param: '10', want: false},
			{input: '10', param: '1', want: true},
			{input: '5', param: '5', want: true},
		];

		test.each(cases)('.min($input, $param) returns $want', test => {
			expect(validators.tests['min'].validate(setup(test.input), test.param)).toEqual(test.want);
		});
	});

	describe('Max should be validated', () => {
		const cases: Cases[] = [
			{input: '1', param: '10', want: true},
			{input: '10', param: '1', want: false},
			{input: '5', param: '5', want: true},
		];

		test.each(cases)('.max($input, $param) returns $want', test => {
			expect(validators.tests['max'].validate(setup(test.input), test.param)).toEqual(test.want);
		});
	});

	describe('Pattern should be validated', () => {
		const cases: Cases[] = [
			{input: 'abc', param: '/[a-z]+$/i', want: true},
			{input: '1', param: '/[a-z]+$/i', want: false},
			{input: '1', param: '/[a-z0-9]+$/i', want: true},
			{input: '@', param: '/[a-z0-9]+$/i', want: false},
		];

		test.each(cases)('.pattern($input, $param) returns $want', test => {
			expect(validators.tests['pattern'].validate(setup(test.input), test.param)).toEqual(test.want);
		});
	});

	describe('Equals should be validated', () => {
		const cases: Cases[] = [
			{input: 'wrong', param: 'equal', want: false},
			{input: 'equal', param: 'equal', want: true},
		];

		test.each(cases)('.equals($input, $param) returns $want', test => {
			const input = document.createElement("input");
			input.setAttribute("id", "selector");
			input.value = test.param;
			document.body.appendChild(input);

			expect(validators.tests['equals'].validate(setup(test.input), "#selector")).toEqual(test.want);
		});

		it(".equals(empty, empty) returns false", () => {
			expect(validators.tests['equals'].validate(setup("test"), "#wrong")).toEqual(false);
		});
	});
});

