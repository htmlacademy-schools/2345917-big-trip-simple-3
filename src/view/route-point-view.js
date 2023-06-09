import AbstractView from '../framework/view/abstract-view.js';
import { getDateWithoutTime, getDateTime, refinePointDueDate } from '../utils.js';

function createTripPointTemplate(tripPoint, allDestinations, allOffers) {
  const basePrice = tripPoint.basePrice;
  const dateFrom = tripPoint.dateFrom;
  const dateTo = tripPoint.dateTo;
  const destinationId = tripPoint.destination;
  const selectedOffers = tripPoint.offers;
  const type = tripPoint.type;
  const destinations = allDestinations;
  const offers = allOffers;
  const possibleOffers = offers.filter((i) => i.type === type)[0].offers;

  let selectedOffersHtml = '';
  if (selectedOffers.length > 0) {
    possibleOffers.filter((i) => selectedOffers.includes(i.id)).forEach((selectedOffer) => {
      selectedOffersHtml += (`
        <li class="event__offer">
          <span class="event__offer-title">${selectedOffer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${selectedOffer.price}</span>
        </li>
      `);
    });
  } else {
    selectedOffersHtml = 'No additional offers';
  }

  const template = (`
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${getDateWithoutTime(dateFrom)}">${refinePointDueDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinations.filter((i) => i.id === destinationId)[0].name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${getDateTime(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${getDateTime(dateTo)}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${selectedOffersHtml}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `);

  return template;
}

export default class TripPointView extends AbstractView {
  #tripPoint = null;
  #destinations = null;
  #offers = null;

  constructor(tripPoint, destinations, offers) {
    super();
    this.#tripPoint = tripPoint;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripPointTemplate(this.#tripPoint, this.#destinations, this.#offers);
  }

  getTripPoint() {
    return this.#tripPoint;
  }

  updateOffers() {
    const selectedOffers = this.#tripPoint.offers;
    const type = this.#tripPoint.type;
    const offers = this.#offers;
    const possibleOffers = offers.filter((i) => i.type === type)[0].offers;

    let selectedOffersHtml = '';
    if (selectedOffers.length > 0) {
      possibleOffers.filter((i) => selectedOffers.includes(i.id)).forEach((selectedOffer) => {
        selectedOffersHtml += (`
          <li class="event__offer">
            <span class="event__offer-title">${selectedOffer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${selectedOffer.price}</span>
          </li>
        `);
      });
    } else {
      selectedOffersHtml = 'No additional offers';
    }

    this.element.querySelector('.event__selected-offers').innerHTML = selectedOffersHtml;
  }

  updateTripPoint(updatedTripPoint) {
    this.#tripPoint = updatedTripPoint;
    this.updateOffers();
    this.element.querySelector('.event__type-icon').src = `img/icons/${this.#tripPoint.type}.png`;
    this.element.querySelector('.event__title').textContent = `${this.#tripPoint.type} ${this.#destinations.filter((i) => i.id === this.#tripPoint.destination)[0].name}`;
    this.element.querySelector('.event__date').datetime = `${getDateWithoutTime(this.#tripPoint.dateFrom)}`;
    this.element.querySelector('.event__date').textContent = `${refinePointDueDate(this.#tripPoint.dateFrom)}`;
    this.element.querySelector('.event__start-time').datetime = `${this.#tripPoint.dateFrom}`;
    this.element.querySelector('.event__start-time').textContent = `${getDateTime(this.#tripPoint.dateFrom)}`;
    this.element.querySelector('.event__end-time').datetime = `${this.#tripPoint.dateTo}`;
    this.element.querySelector('.event__end-time').textContent = `${getDateTime(this.#tripPoint.dateTo)}`;
    this.element.querySelector('.event__price-value').textContent = `${this.#tripPoint.basePrice}`;
  }
}
