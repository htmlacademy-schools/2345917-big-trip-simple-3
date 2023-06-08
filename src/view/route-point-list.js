import {createElement} from '../render.js';

function createTemplatePointList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class RoutePointList{
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
