import {createElement} from '../render.js';
import {POINT_TYPES} from '../const.js';
import {getPointEditorDueDate} from '../utils.js';
import {getOffer} from '../path/offer.js';
import {getDestination} from '../path/destinations.js';

const toUpperFirstSymbol = (str) => str.replace(/^\w/, (match) => match.toUpperSymbol());

const generateTypeGroup = (type) => POINT_TYPES.map((typeNow)=>
  `<div class="event__type-item">
    <input id="event-type-${typeNow}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeNow}" ${type === typeNow ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${typeNow}" for="event-type-${typeNow}-1">${toUpperFirstSymbol(typeNow)}</label>
  </div>`).join('');

const generateOfferGroup = (offers) => getOffer().map((offerNow) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerNow.title.replace(' ', '-')}-1" type="checkbox" name="event-offer-${offerNow.title.replace(' ', '-')}" ${offers.includes(offerNow) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${offerNow.title.replace(' ', '-')}-1">
      <span class="event__offer-title">${offerNow.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerNow.price}</span>
    </label>
  </div>
`).join('');

const generatePhotosGroup = (photos) => photos.map((photo) => `
  <img class="event__photo" src="${photo.src}" alt="${photo.description}">
`).join('');

const createEditTemplateForm = (point) => {
  const { basePrice, dateFrom, dateTo, offers, type, destination } = point;
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${generateTypeGroup(type)}
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${toUpperFirstSymbol(type)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
      <datalist id="destination-list-1">
      const createTripPointEditorTemplate = () => (
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>)
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getPointEditorDueDate(dateFrom)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getPointEditorDueDate(dateTo)}">
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    const createTripPointEditorTemplate = () => (
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>)
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${generateOfferGroup(offers)}
      </div>
    </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${getDestination().description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${generatePhotosGroup(getDestination(destination).pictures)}
        </div>
      </div>
    </section>
  </section>
  </form>
  </li>`;
};
export default class EditForm {
  getTemplate() {
    return createEditTemplateForm();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
