import AbstractView from '../framework/view/abstract-view.js';

function createNoPointViewTemplate() {
  const template = '<p class="trip-events__msg">Click New Event to create your first point</p>';

  return template;
}

export default class NoPointView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createNoPointViewTemplate();
  }

}
