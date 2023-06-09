import { serverTripPoints } from '../main.js';
import { remove, render } from '../framework/render.js';
import EditPointView from '../view/editing-point.js';
import TripPointView from '../view/route-point-view.js';
import { listOfPointPresenters } from './presenter-page.js';

export default class TripPointPresenter {
  #tripPointListContainer = null;
  #tripPointComponent = null;
  #tripPointEditComponent = null;
  #destinations = null;
  #offers = null;

  constructor(tripPointListContainer) {
    this.#tripPointListContainer = tripPointListContainer;
  }

  changeVisibility = (elementToHide, elementToShow) => {
    this.#tripPointListContainer.element.replaceChild(elementToShow, elementToHide);
  };

  init(tripPoint, destinations, offers) {
    this.#tripPointComponent = new TripPointView(tripPoint, destinations, offers);
    listOfPointPresenters.push(this);
    const changeVisibility = (elementToHide, elementToShow) => {
      this.#tripPointListContainer.element.replaceChild(elementToShow, elementToHide);
    };
    this.#tripPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      listOfPointPresenters.forEach((i) => {
        i.closeEditor();
      });
      this.#tripPointEditComponent = new EditPointView(this.#tripPointComponent.getTripPoint(), destinations, offers);
      this.#tripPointEditComponent.addPickers();
      this.#tripPointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        changeVisibility(this.#tripPointEditComponent.element, this.#tripPointComponent.element);
        this.#tripPointEditComponent.clearPickers();
        remove(this.#tripPointEditComponent);
        this.#tripPointEditComponent = null;
      });

      this.#tripPointEditComponent.element.querySelector('.event--edit').addEventListener('reset', (e) => {
        e.preventDefault();
        serverTripPoints.deleteTripPoint(tripPoint);
        this.#tripPointEditComponent.clearPickers();
        listOfPointPresenters.splice(listOfPointPresenters.indexOf(this), 1);
        remove(this.#tripPointComponent);
        remove(this.#tripPointEditComponent);
        this.#tripPointEditComponent = null;
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
      });

      const typeFieldset = this.#tripPointEditComponent.element.querySelector('.event__type-group');
      const radios = typeFieldset.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.addEventListener('change', () => {
          if (radio.checked) {
            this.#tripPointEditComponent.element.querySelector('.event__type-icon').src = `img/icons/${radio.value}.png`;
            this.#tripPointEditComponent.element.querySelector('.event__type-output').textContent = radio.value;
            this.#tripPointEditComponent.element.querySelector('.event__section--offers').innerHTML = this.#tripPointEditComponent.updateOffersDueTypeUpdate(radio.value);
          }
        });
      });
      const destinationField = this.#tripPointEditComponent.element.querySelector('.event__input--destination');
      destinationField.addEventListener('input', (e) => {
        e.preventDefault();
        this.#tripPointEditComponent.element.querySelector('.event__section--destination').innerHTML = this.#tripPointEditComponent.updateDestinationDescription(destinationField.value);
      });
      this.#tripPointEditComponent.element.querySelector('.event--edit').addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.#tripPointEditComponent.getDataToUpdatePoint().destination !== -1) {
          serverTripPoints.updateTripPoint(this.#tripPointEditComponent.getDataToUpdatePoint());
          this.#tripPointComponent.updateTripPoint(this.#tripPointEditComponent.getDataToUpdatePoint());
          changeVisibility(this.#tripPointEditComponent.element, this.#tripPointComponent.element);
          this.#tripPointEditComponent.clearPickers();
          remove(this.#tripPointEditComponent);
          this.#tripPointEditComponent = null;
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

      changeVisibility(this.#tripPointComponent.element, this.#tripPointEditComponent.element);
    });
    render(this.#tripPointComponent, this.#tripPointListContainer.element);
    this.#destinations = destinations;
    this.#offers = offers;
  }

  closeEditor() {
    if (this.#tripPointEditComponent !== null) {
      this.changeVisibility(this.#tripPointEditComponent.element, this.#tripPointComponent.element);
      this.#tripPointEditComponent.clearPickers();
      remove(this.#tripPointEditComponent);
      this.#tripPointEditComponent = null;
    }
  }

  renderDueFilterUpdate() {
    render(this.#tripPointComponent, this.#tripPointListContainer.element);
    if (this.#tripPointEditComponent !== null) {
      this.#tripPointEditComponent.clearPickers();
      remove(this.#tripPointEditComponent);
      this.#tripPointEditComponent = null;
    }
  }

  getTripPointComponent() {
    return this.#tripPointComponent;
  }
}
