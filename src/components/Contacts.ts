import { IContactsForm } from "../types";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export class Contacts extends Form<IContactsForm> {
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._email = this.form.elements.namedItem('email') as HTMLInputElement;
    this._phone = this.form.elements.namedItem('phone') as HTMLInputElement;
  }

  set email(value: string) {
    this._email.value = value;
  }

  set phone(value: string) {
    this._phone.value = value;
  }
}