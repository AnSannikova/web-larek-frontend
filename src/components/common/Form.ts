import { IFormState } from '../../types';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export class Form<T> extends Component<IFormState> {
	protected _button: HTMLButtonElement;
	protected _errors: HTMLSpanElement;
	protected form: HTMLFormElement;
	protected events: IEvents;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container);

		this.events = events;
		this.form = this.container as HTMLFormElement;
		this._button = container.querySelector('button[type="submit"]');
		this._errors = ensureElement<HTMLSpanElement>('.form__errors', container);

		this.container.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.events.emit(`${this.form.name}:submit`);
		});

		this.container.addEventListener('input', (evt: Event) => {
			const target = evt.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
	});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.form.name}.${String(field)}:change`, {
			field,
			value
		});
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	set valid(state: boolean) {
		this.setDisabled(this._button, !state);
	}

	render(data: Partial<T> & IFormState): HTMLElement {
		const { errors, ...inputs } = data;
		super.render({ errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
