import { render } from '../framework/render.js';
import SortView from '../view/sorting-view.js';

export default class SortPresenter {
  #parentContainer = null;
  #sortComponent = null;

  constructor(parentContainer) {
    this.#parentContainer = parentContainer;
  }

  init() {
    this.#sortComponent = new SortView();
    this.#sortComponent.addListeners();
    render(this.#sortComponent, this.#parentContainer, 'afterBegin');
  }

  goToDaySort() {
    this.#sortComponent.goToDaySort();
  }
}
