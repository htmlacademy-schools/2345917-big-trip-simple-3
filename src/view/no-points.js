import AbstractView from '../framework/view/abstract-view.js';

const createNoPointViewTemplate = () => {
  const template = '<p class="trip-events__msg">Loading...</p>';

  return template;
};

export default class NoPointView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createNoPointViewTemplate();
  }
}
