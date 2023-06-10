import AbstractView from '../framework/view/abstract-view.js';
import { refinePointEditorDueDate } from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createTripPointTemplate = (tripPoint, allDestinations, allOffers) => {
  const basePrice = tripPoint.basePrice;
  const dateFrom = tripPoint.dateFrom;
  const dateTo = tripPoint.dateTo;
  const destinationId = tripPoint.destination;
  const id = tripPoint.id;
  const selectedOffers = tripPoint.offers;
  const type = tripPoint.type;
  const destinations = allDestinations;
  const offers = allOffers;
  const possibleOffers = offers.filter((i) => i.type === type)[0].offers;
  let possibleOffersHtml = '';
  if (possibleOffers.length > 0) {
    possibleOffersHtml += (`
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    `);
    possibleOffers.forEach((i) => {
      possibleOffersHtml += (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i.title.replace(/\s/g, '')}-${i.id}" type="checkbox" name="event-offer-${i.title.replace(/\s/g, '')}" ${selectedOffers.includes(i.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${i.title.replace(/\s/g, '')}-${i.id}">
          <span class="event__offer-title">${i.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${i.price}</span>
        </label>
      </div>
      `);
    });
    possibleOffersHtml += (`
      </div>
    `);
  }

  let possibleDestinationsHtml = '';

  const possibleDestinations = destinations.map((i) => i.name);
  possibleDestinations.sort();
  possibleDestinations.forEach((i) => {
    possibleDestinationsHtml += (`
      <option value="${i}"></option>
    `);
  });

  const template = (`
<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            <div class="event__type-item">
              <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${'taxi' === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${'bus' === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${'train' === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${'ship' === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${'drive' === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${'flight' === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${'check-in' === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${'sightseeing' === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${'restaurant' === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destinations.filter((i) => i.id === destinationId)[0].name}" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
          ${possibleDestinationsHtml}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${refinePointEditorDueDate(dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${refinePointEditorDueDate(dateTo)}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}" oninput="this.value = this.value.replace(/[^0-9]/g, '')" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    <section class="event__section  event__section--offers">
      ${possibleOffersHtml}
    </section>
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination"></h3>
      <p class="event__destination-description"></p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        </div>
      </div>
    </section>
  </section>
  </form>
</li>
  `);

  return template;
};
export default class EditPointView extends AbstractView {
  #tripPoint = null;
  #destinations = null;
  #offers = null;
  #endTimePicker = null;
  #startTimePicker = null;

  constructor(tripPoint, destinations, offers) {
    super();
    this.#tripPoint = tripPoint;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripPointTemplate(this.#tripPoint, this.#destinations, this.#offers);
  }

  updateOffersDueTypeUpdate(newType) {
    const selectedOffers = this.#tripPoint.offers;
    const type = newType;
    const offers = this.#offers;
    const possibleOffers = offers.filter((i) => i.type === type)[0].offers;
    let possibleOffersHtml = '';
    if (possibleOffers.length > 0) {
      possibleOffersHtml += (`
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      `);
      possibleOffers.forEach((i) => {
        possibleOffersHtml += (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i.title.replace(/\s/g, '')}-${i.id}" type="checkbox" name="event-offer-${i.title.replace(/\s/g, '')}" ${selectedOffers.includes(i.id) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${i.title.replace(/\s/g, '')}-${i.id}">
            <span class="event__offer-title">${i.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${i.price}</span>
          </label>
        </div>
        `);
      });
      possibleOffersHtml += (`
        </div>
      `);
    }
    return possibleOffersHtml;
  }

  updateDestinationDescription(destinationName) {
    if (this.#destinations.some((x) => x.name === destinationName)) {
      this.element.querySelector('.event__section-title--destination').textContent = 'Destination';
      this.element.querySelector('.event__destination-description').textContent = `${this.#destinations.filter((i) => i.name === destinationName)[0].description}`;
      let picturesHtml = '';
      this.#destinations.filter((i) => i.name === destinationName)[0].pictures.forEach((i) => {
        picturesHtml += `
        <img class="event__photo" src=${i.src} alt="${i.description}">
        `;
      });
      this.element.querySelector('.event__photos-tape').innerHTML = picturesHtml;
    } else {
      this.element.querySelector('.event__section-title--destination').textContent = '';
      this.element.querySelector('.event__destination-description').textContent = '';
      this.element.querySelector('.event__photos-tape').innerHTML = '';
    }
  }

  addListeners() {
    const destinationField = this.element.querySelector('.event__input--destination');
    destinationField.addEventListener('input', (e) => {
      e.preventDefault();
      this.updateDestinationDescription(destinationField.value);
    });
  }

  getDataToUpdatePoint() {
    const from = this.element;
    const basePrice = parseInt(from.querySelector('.event__input--price').value.replace(/\s/g, ''), 10);
    const dateFrom = from.querySelectorAll('.event__input--time')[0].value;
    const partsFrom = dateFrom.split(/[\s/:]+/);
    const dayFrom = partsFrom[0];
    const monthFrom = partsFrom[1];
    const yearFrom = partsFrom[2];
    const hoursFrom = partsFrom[3];
    const minutesFrom = partsFrom[4];
    const dateFromFormatted = new Date(`20${yearFrom}-${monthFrom}-${dayFrom}T${hoursFrom}:${minutesFrom}:00`).toISOString();
    const dateTo = from.querySelectorAll('.event__input--time')[1].value;
    const partsTo = dateTo.split(/[\s/:]+/);
    const dayTo = partsTo[0];
    const monthTo = partsTo[1];
    const yearTo = partsTo[2];
    const hoursTo = partsTo[3];
    const minutesTo = partsTo[4];
    const dateToFormatted = new Date(`20${yearTo}-${monthTo}-${dayTo}T${hoursTo}:${minutesTo}:00`).toISOString();
    const type = from.querySelector('.event__type-output').textContent.replace(/\s/g, '');
    const destinationId = this.#destinations.find((i) => i.name === from.querySelector('.event__input--destination').value)?.id ?? -1;
    const id = this.#tripPoint.id;

    const offersHtml = from.querySelectorAll('.event__offer-checkbox');
    const selectedOffersIds = [];
    offersHtml.forEach((i) => {
      if (i.checked) {
        const regex = /event-offer-\w+-(\d+)/;
        const match = i.id.match(regex);
        if (match) {
          selectedOffersIds.push(parseInt(match[1], 10));
        }
      }
    });
    const tripPointToReturn = {
      basePrice: basePrice,
      dateFrom: dateFromFormatted,
      dateTo: dateToFormatted,
      destination: destinationId,
      id: id,
      offers: selectedOffersIds,
      type: type
    };

    return tripPointToReturn;
  }

  addPickers() {
    this.#endTimePicker = flatpickr(
      this.element.querySelector(`#event-end-time-${this.#tripPoint.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this.element.querySelector(`#event-end-time-${this.#tripPoint.id}`).value,
      }
    );

    this.#startTimePicker = flatpickr(
      this.element.querySelector(`#event-start-time-${this.#tripPoint.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this.element.querySelector(`#event-start-time-${this.#tripPoint.id}`).value,
        onClose: (selectedDates) => {
          this.#endTimePicker.set('minDate', selectedDates[0]);
        }
      }
    );
    this.#endTimePicker.set('minDate', this.element.querySelector(`#event-start-time-${this.#tripPoint.id}`).value);

  }

  clearPickers() {
    this.#endTimePicker.clear();
    this.#endTimePicker.destroy();
    this.#startTimePicker.clear();
    this.#startTimePicker.destroy();
  }
}
