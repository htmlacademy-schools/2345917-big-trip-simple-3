import { remove, render } from '../framework/render.js';
import CreatePointComponent from '../view/creating-point-view.js';
import TripPointPresenter from './route-point-presenter.js';
import { listOfPointPresenters } from './presenter-page.js';
import { serverTripPoints } from '../main.js';

export default class CreatePointPresenter {
  #tripPointListContainer = null;
  #createPointComponent = null;
  constructor(tripPointListContainer) {
    this.#tripPointListContainer = tripPointListContainer;
  }

  init(destinations, offers, tripPointList, sortPresenter) {
    const biggestPointId = tripPointList.reduce((prev, current) => (prev.randomNum > current.randomNum) ? prev : current).id;
    this.#createPointComponent = new CreatePointComponent(destinations, offers, biggestPointId);
    listOfPointPresenters.push(this);
    this.#createPointComponent.setListeners();
    this.#createPointComponent.addPickers();
    this.#createPointComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (this.#createPointComponent.getDataToUpdatePoint().destination !== -1) {
        const newTripPoint = new TripPointPresenter(this.#tripPointListContainer);
        newTripPoint.init(this.#createPointComponent.getDataToUpdatePoint(), destinations, offers);
        serverTripPoints.addTripPoint(this.#createPointComponent.getDataToUpdatePoint());
        listOfPointPresenters.splice(listOfPointPresenters.indexOf(this), 1);
        remove(this.#createPointComponent);
        sortPresenter.goToDaySort();
        if (document.querySelector('.trip-events__item') === null) {
          if (document.querySelector('#filter-everything').checked) {
            document.querySelector('.trip-events__msg').textContent = 'Click New Event to create your first point';
          } else {
            document.querySelector('.trip-events__msg').textContent = 'There are no future events now';
          }
          document.querySelector('.trip-events__msg').classList.remove('visually-hidden');
          document.querySelector('.trip-events__trip-sort').classList.add('visually-hidden');
        } else {
          document.querySelector('.trip-events__msg').classList.add('visually-hidden');
          document.querySelector('.trip-events__trip-sort').classList.remove('visually-hidden');
        }
      }
    });
    render(this.#createPointComponent, this.#tripPointListContainer.element, 'afterbegin');
    if (document.querySelector('.trip-events__item') === null) {
      if (document.querySelector('#filter-everything').checked) {
        document.querySelector('.trip-events__msg').textContent = 'Click New Event to create your first point';
      } else {
        document.querySelector('.trip-events__msg').textContent = 'There are no future events now';
      }
      document.querySelector('.trip-events__msg').classList.remove('visually-hidden');
      document.querySelector('.trip-events__trip-sort').classList.add('visually-hidden');
    } else {
      document.querySelector('.trip-events__msg').classList.add('visually-hidden');
      document.querySelector('.trip-events__trip-sort').classList.remove('visually-hidden');
    }
  }

  closeEditor() {
    this.#createPointComponent.clearPickers();
    listOfPointPresenters.splice(listOfPointPresenters.indexOf(this), 1);
    remove(this.#createPointComponent);
    this.#createPointComponent = null;
  }

  renderDueFilterUpdate() {
    render(this.#createPointComponent, this.#tripPointListContainer.element, 'afterbegin');
  }
}
