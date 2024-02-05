import { IGalleryActions, IGalleryData } from "../types";
import { Component } from "./base/Component"

export class Gallery extends Component<IGalleryData> {
  protected _items: HTMLButtonElement[];

  constructor(container:HTMLElement, actions: IGalleryActions) {
    super(container);

    this._items.forEach((item) => {
      item.addEventListener('click', actions.onClick);
    })
  }

  set items(items: HTMLButtonElement[]) {
    this.container.replaceChildren(...items);
  }
}