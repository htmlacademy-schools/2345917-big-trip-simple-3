import { remove, render } from '../framework/render.js';
import EditPointView from '../view/editing-point.js';
import TripPointView from '../view/route-point-view.js';

export default class TripPointPresenter {
  #tripPointListContainer = null;
  #tripPointComponent = null;
  #tripPointEditComponent = null;
  #destinations = null;
  #offers = null;

  constructor(tripPointListContainer) {
    this.#tripPointListContainer = tripPointListContainer;
  }

  init(tripPoint, destinations, offers) {
    this.#tripPointComponent = new TripPointView(tripPoint, destinations, offers);

    const changeVisibility = (elementToHide, elementToShow) => {
      this.#tripPointListContainer.element.replaceChild(elementToShow, elementToHide);
    };

    this.#tripPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#tripPointEditComponent = new EditPointView(this.#tripPointComponent.getTripPoint(), destinations, offers);
      this.#tripPointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (e) => {
        e.preventDefault();
        changeVisibility(this.#tripPointEditComponent.element, this.#tripPointComponent.element);
        remove(this.#tripPointEditComponent);
      });

      this.#tripPointEditComponent.element.querySelector('.event--edit').addEventListener('reset', (e) => {
        e.preventDefault();
        remove(this.#tripPointComponent);
        remove(this.#tripPointEditComponent);
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
        changeVisibility(this.#tripPointEditComponent.element, this.#tripPointComponent.element);
        this.#tripPointEditComponent.getDataToUpdatePoint();
      });
      changeVisibility(this.#tripPointComponent.element, this.#tripPointEditComponent.element);
    });

    render(this.#tripPointComponent, this.#tripPointListContainer.element);
    this.#destinations = destinations;
    this.#offers = offers;
  }
}
