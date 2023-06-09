import { createElement } from '../render.js';
import { getDateWithoutTime, getDateTime, refinePointDueDate } from '../utils.js';

export default class PointElement {
  #element;
  constructor(tripPoint) {
    this.#element = createElement(this.#createTripPointTemplate(tripPoint));
  }

  #createTripPointTemplate = (tripPoint) => {
    const basePrice = tripPoint.basePrice;
    const dateFrom = tripPoint.dateFrom;
    const dateTo = tripPoint.dateTo;
    const destination = tripPoint.destination;
    const offersList = tripPoint.offers;
    const type = tripPoint.type;

    let htmlOffers = '';
    for (let i = 0; i < offersList.length; i++){
      htmlOffers += `
      <li class="event__offer">
        <span class="event__offer-title">${offersList[i].title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offersList[i].price}</span>
      </li>`;
    }

    return (`<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${getDateWithoutTime(dateFrom)}>${refinePointDueDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dateFrom}>${getDateTime(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime=${dateTo}>${getDateTime(dateTo)}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${htmlOffers}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
  };

  getElement() {
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
