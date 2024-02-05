import { IFormState } from '../../types';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export class Form<T> extends Component<IFormState> {
	protected _inputs: HTMLInputElement[];
	protected _button: HTMLButtonElement;
	protected _errors: HTMLSpanElement;
	protected form: HTMLFormElement;
	protected events: IEvents;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container);

		this.events = events;
		this.form = this.container as HTMLFormElement;

		this._inputs = ensureAllElements<HTMLInputElement>(
			'.form__input',
			container
		);
		this._button = ensureElement<HTMLButtonElement>('.button', container);
		this._errors = ensureElement<HTMLSpanElement>('.form__errors', container);

		this.container.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.events.emit(`${this.form.name}:submite`);
		});
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	//validate(){}

	render(data: Partial<T> & IFormState): HTMLElement {
		const { errors, ...inputs } = data;
		super.render({ errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
