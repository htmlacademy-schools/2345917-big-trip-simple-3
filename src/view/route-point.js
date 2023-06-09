import {createElement} from '../render.js';
import { getPointDueDate, getDateWithoutTime, getDateWithTime, getTimeFromDate } from '../utils.js';
import { getOffer } from '../path/offer.js';
import { getDestination } from '../path/destinations.js';

const createTemplateOffers = (offers) => offers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('');

const createTemplatePoint = (point) => {
  const { basePrice, dateFrom, dateTo, offers, type, destination } = point;
  const startDate = getPointDueDate(dateFrom);
  const dateTimeWithoutTime = getDateWithoutTime(dateFrom);
  const dateTimeWithStartTime = getDateWithTime(dateFrom);
  const dateForStartTime = getTimeFromDate(dateTimeWithStartTime);
  const dateForDateWithEndTime = getDateWithTime(dateTo);
  const dateForEndTime = getTimeFromDate(dateForDateWithEndTime);
  const offersTemplate = createTemplateOffers(getOffer(offers));
  return (`<li class="trip-events__item">
    <div class="event">
    <time class="event__date" datetime="${dateTimeWithoutTime}">${startDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${getDestination(destination).name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateTimeWithStartTime}">${dateForStartTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateForDateWithEndTime}">${dateForEndTime}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          ${offersTemplate}
        </li>
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>`);
};
export default class RoutePoint {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createTemplatePoint(this.point);
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
