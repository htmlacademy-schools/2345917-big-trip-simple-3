import AbstractView from '../framework/view/abstract-view';

const createTemplateTripPointList = () => ('<ul class="trip-events__list"></ul>');
export default class TripPointList extends AbstractView {
  get template() {
    return createTemplateTripPointList();
  }
}
