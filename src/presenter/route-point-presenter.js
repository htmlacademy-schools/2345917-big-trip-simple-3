import { serverTripPoints } from '../main.js';
import { remove, render } from '../framework/render.js';
import EditPointView from '../view/editing-point.js';
import TripPointView from '../view/route-point-view.js';
import { presenters } from './presenter-page.js';

export default class TripPointPresenter {
  #tripPointListContainer = null;
  #tripPointComponent = null;
  #tripPointEditComponent = null;

  constructor(tripPointListContainer) {
    this.#tripPointListContainer = tripPointListContainer;
  }

  changeVisibility = (elementToHide, elementToShow) => {
    this.#tripPointListContainer.element.replaceChild(elementToShow, elementToHide);
  };

  init(tripPoint, destinations, offers) {
    const eventMessage = document.querySelector('.trip-events__msg');
    this.#tripPointComponent = new TripPointView(tripPoint, destinations, offers);
    presenters.push(this);
    this.#tripPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      presenters.forEach((i) => {
        i.closeEditor();
      });
      this.#tripPointEditComponent = new EditPointView(this.#tripPointComponent.getTripPoint(), destinations, offers);
      this.#tripPointEditComponent.addListeners();
      const destinationField = this.#tripPointEditComponent.element.querySelector('.event__input--destination');
      this.#tripPointEditComponent.updateDestinationDescription(destinationField.value);
      this.#tripPointEditComponent.addPickers();
      this.#tripPointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        this.changeVisibility(this.#tripPointEditComponent.element, this.#tripPointComponent.element);
        this.#tripPointEditComponent.clearPickers();
        remove(this.#tripPointEditComponent);
        this.#tripPointEditComponent = null;
      });

      document.addEventListener('keydown', (evt) => {
        evt.preventDefault();
        if (evt.key === 'Escape') {
          this.changeVisibility(this.#tripPointEditComponent.element, this.#tripPointComponent.element);
          this.#tripPointEditComponent.clearPickers();
          remove(this.#tripPointEditComponent);
          this.#tripPointEditComponent = null;
        }
      });

      this.#tripPointEditComponent.element.querySelector('.event--edit').addEventListener('reset', (e) => {
        e.preventDefault();
        this.#tripPointEditComponent.element.querySelector('.event__reset-btn').textContent = 'Deleting...';
        serverTripPoints.deleteTripPoint(tripPoint).then(() => {
          this.#tripPointEditComponent.element.querySelector('.event__reset-btn').textContent = 'Delete';
          this.#tripPointEditComponent.clearPickers();
          presenters.splice(presenters.indexOf(this), 1);
          remove(this.#tripPointComponent);
          remove(this.#tripPointEditComponent);
          this.#tripPointEditComponent = null;
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
          this.#tripPointEditComponent.shake();
          this.#tripPointEditComponent.element.querySelector('.event__reset-btn').textContent = 'Delete';
        });
      });

      const typeFieldset = this.#tripPointEditComponent.element.querySelector('.event__type-group');
      const radios = typeFieldset.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.addEventListener('change', () => {
          if (radio.checked) {
            this.#tripPointEditComponent.element.querySelector('.event__type-icon').src = `img/icons/${radio.value}.png`;
            this.#tripPointEditComponent.element.querySelector('.event__type-output').textContent = radio.value;
            this.#tripPointEditComponent.element.querySelector('.event__section--offers').innerHTML = this.#tripPointEditComponent.updateOffersDueTypeUpdate(radio.value);
            this.#tripPointListContainer.element.querySelectorAll('.event__offer-checkbox').forEach((i) => {
              i.checked = false;
            });
          }
        });
      });
      this.#tripPointEditComponent.element.querySelector('.event--edit').addEventListener('submit', (e) => {
        e.preventDefault();
        this.#tripPointEditComponent.element.querySelector('.event__save-btn').textContent = 'Saving...';
        const newTripPointDate = this.#tripPointEditComponent.getDataToUpdatePoint();
        if (newTripPointDate.destination !== -1 && !isNaN(newTripPointDate.basePrice)) {
          serverTripPoints.updateTripPoint(newTripPointDate).then(() => {
            this.#tripPointEditComponent.element.querySelector('.event__save-btn').textContent = 'Save';
            this.#tripPointComponent.updateTripPoint(newTripPointDate);
            this.changeVisibility(this.#tripPointEditComponent.element, this.#tripPointComponent.element);
            this.#tripPointEditComponent.clearPickers();
            remove(this.#tripPointEditComponent);
            this.#tripPointEditComponent = null;
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
            this.#tripPointEditComponent.shake();
            this.#tripPointEditComponent.element.querySelector('.event__save-btn').textContent = 'Save';
          });
        } else {
          this.#tripPointEditComponent.shake();
        }
      });

      this.changeVisibility(this.#tripPointComponent.element, this.#tripPointEditComponent.element);
    });
    render(this.#tripPointComponent, this.#tripPointListContainer.element);
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
