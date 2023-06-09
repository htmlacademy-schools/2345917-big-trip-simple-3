import { render } from '../framework/render';
import FilterView from '../view/filter';

export default class FilterPresenter {
  #filterComponent = null;
  #parentContainer = null;

  constructor(parentContainer) {
    this.#parentContainer = parentContainer;
  }

  init() {
    this.#filterComponent = new FilterView();
    this.#filterComponent.addListeners();
    render(this.#filterComponent, this.#parentContainer);
  }
}
