import {createElement} from '../render.js';

const createTemplatePointList = () => '<ul class="trip-events__list"></ul>';
export default class TripPointList{
  getTemplate() {
    return createTemplatePointList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
