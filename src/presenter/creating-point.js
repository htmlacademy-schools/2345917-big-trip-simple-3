import { remove, render } from '../framework/render.js';
import CreatePointComponent from '../view/creating-point-view.js';
import TripPointPresenter from './route-point-presenter.js';
import { presenters } from './presenter-page.js';
import { serverTripPoints } from '../main.js';

export default class CreatePointPresenter {
  #tripPointListContainer = null;
  #createPointComponent = null;
  constructor(tripPointListContainer) {
    this.#tripPointListContainer = tripPointListContainer;
  }

  init(destinations, offers, tripPointList, sortPresenter) {
    const eventMessage = document.querySelector('.trip-events__msg');
    const biggestPointId = tripPointList.reduce((prev, current) => (prev.randomNum > current.randomNum) ? prev : current).id;
    this.#createPointComponent = new CreatePointComponent(destinations, offers, biggestPointId);
    presenters.push(this);
    this.#createPointComponent.setListeners();
    this.#createPointComponent.addPickers();
    this.#createPointComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      const newTripPointData = this.#createPointComponent.getDataToUpdatePoint();
      if (newTripPointData.destination !== -1 && !isNaN(newTripPointData.basePrice)) {
        this.#createPointComponent.element.querySelector('.event__save-btn').textContent = 'Saving...';
        serverTripPoints.addTripPoint(newTripPointData).then(() => {
          this.#createPointComponent.element.querySelector('.event__save-btn').textContent = 'Save';
          const newTripPoint = new TripPointPresenter(this.#tripPointListContainer);
          newTripPoint.init(newTripPointData, destinations, offers);
          presenters.splice(presenters.indexOf(this), 1);
          remove(this.#createPointComponent);
          sortPresenter.goToDaySort();
          if (document.querySelector('.trip-events__item') === null) {
            if (document.querySelector('#filter-everything').checked) {
              eventMessage.textContent = 'Click New Event to create your first point';
            } else {
              eventMessage.textContent = 'There are no future events now';
            }
            eventMessage.classList.remove('visually-hidden');
            document.querySelector('.trip-events__trip-sort').classList.add('visually-hidden');
          } else {
            eventMessage.classList.add('visually-hidden');
            document.querySelector('.trip-events__trip-sort').classList.remove('visually-hidden');
          }
        }).catch(() => {
          this.#createPointComponent.shake();
          this.#createPointComponent.element.querySelector('.event__save-btn').textContent = 'Save';
        });
      } else {
        this.#createPointComponent.shake();
      }
    });
    render(this.#createPointComponent, this.#tripPointListContainer.element, 'afterbegin');
    if (document.querySelector('.trip-events__item') === null) {
      if (document.querySelector('#filter-everything').checked) {
        eventMessage.textContent = 'Click New Event to create your first point';
      } else {
        eventMessage.textContent = 'There are no future events now';
      }
      eventMessage.classList.remove('visually-hidden');
      document.querySelector('.trip-events__trip-sort').classList.add('visually-hidden');
    } else {
      eventMessage.classList.add('visually-hidden');
      document.querySelector('.trip-events__trip-sort').classList.remove('visually-hidden');
    }
  }

  closeEditor() {
    this.#createPointComponent.clearPickers();
    presenters.splice(presenters.indexOf(this), 1);
    remove(this.#createPointComponent);
    this.#createPointComponent = null;
  }

  renderDueFilterUpdate() {
    render(this.#createPointComponent, this.#tripPointListContainer.element, 'afterbegin');
  }
}
