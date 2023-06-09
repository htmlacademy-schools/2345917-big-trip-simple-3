import { remove, render } from '../framework/render.js';
import CreatePointComponent from '../view/creating-point-view.js';
import TripPointPresenter from './route-point-presenter.js';
import { listOfPointPresenters } from './presenter-page.js';

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
        listOfPointPresenters.splice(listOfPointPresenters.indexOf(this), 1);
        remove(this.#createPointComponent);
        sortPresenter.goToDaySort();
      }
    });
    render(this.#createPointComponent, this.#tripPointListContainer.element, 'afterbegin');
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
