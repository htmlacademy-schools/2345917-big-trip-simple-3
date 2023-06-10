import TripPointList from '../view/route-point-list-view';
import TripPointPresenter from './route-point-presenter';
import { render } from '../framework/render.js';
import CreatePointPresenter from './creating-point';
import FilterPresenter from './filter-presenter';
import SortPresenter from './sorting-presenter';

export const presenters = [];

export default class PagePresenter {
  #pageContainer = null;
  #tripPointListContainer = null;

  constructor(pageContainer) {
    this.#pageContainer = pageContainer;
    this.#tripPointListContainer = new TripPointList();
    render(this.#tripPointListContainer, this.#pageContainer);
  }

  renderPoint(tripPointListContainer, tripPoint, destinations, offers) {
    const tripPointPresenter = new TripPointPresenter(tripPointListContainer);
    tripPointPresenter.init(tripPoint, destinations, offers);
  }

  init(tripPointList, destinations, offers) {
    const createPointPresenter = new CreatePointPresenter(this.#tripPointListContainer);
    const sortPresenter = new SortPresenter(this.#pageContainer);
    this.#pageContainer.parentNode.parentNode.parentNode.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
      presenters.forEach((i) => {
        i.closeEditor();
      });
      createPointPresenter.init(destinations, offers, tripPointList, sortPresenter);
    });

    sortPresenter.init();

    tripPointList.forEach((tripPoint) => {
      this.renderPoint(this.#tripPointListContainer, tripPoint, destinations, offers);
    });
    const filterPresenter = new FilterPresenter(this.#pageContainer.parentNode.parentNode.parentNode.querySelector('.trip-controls__filters'));
    filterPresenter.init();

    sortPresenter.goToDaySort();

    document.querySelectorAll('.trip-filters__filter').forEach((i) => {
      i.addEventListener('click', () => {
        sortPresenter.goToDaySort();
      });
    });
  }
}
