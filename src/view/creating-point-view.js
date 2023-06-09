import AbstractView from '../framework/view/abstract-view';
import { remove } from '../framework/render';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { listOfPointPresenters } from '../presenter/presenter-page';

function createFormTemplate(destinations, offers, biggestPointId) {
  const newPointId = biggestPointId + 1;
  const type = 'flight';
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
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i.title.replace(/\s/g, '')}-${i.id}" type="checkbox" name="event-offer-${i.title.replace(/\s/g, '')}">
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
        <label class="event__type  event__type-btn" for="event-type-toggle-${newPointId}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${newPointId}" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            <div class="event__type-item">
              <input id="event-type-taxi-${newPointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${newPointId}">Taxi</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-bus-${newPointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-${newPointId}">Bus</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-train-${newPointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-${newPointId}">Train</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-ship-${newPointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-${newPointId}">Ship</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-drive-${newPointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-${newPointId}">Drive</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-flight-${newPointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-${newPointId}">Flight</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-check-in-${newPointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${newPointId}">Check-in</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-sightseeing-${newPointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${newPointId}">Sightseeing</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-restaurant-${newPointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${newPointId}">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${newPointId}">
          Flight
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${newPointId}" type="text" name="event-destination" value="" list="destination-list-${newPointId}">
        <datalist id="destination-list-${newPointId}">
          ${possibleDestinationsHtml}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${newPointId}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${newPointId}" type="text" name="event-start-time" value="19/03/19 00:00">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${newPointId}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${newPointId}" type="text" name="event-end-time" value="19/03/19 00:00">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${newPointId}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${newPointId}" type="text" name="event-price" value="">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
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
}

export default class CreatePointComponent extends AbstractView {
  #destinations = null;
  #offers = null;
  #biggestOfferId = null;
  #endTimePicker = null;
  #startTimePicker = null;

  constructor(destinations, offers, biggestPointId) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#biggestOfferId = biggestPointId;
  }

  get template() {
    return createFormTemplate(this.#destinations, this.#offers, this.#biggestOfferId);
  }

  updateOffersDueTypeUpdate(newType) {
    const offersHtml = this.element.querySelectorAll('.event__offer-checkbox');
    const selectedOffers = [];
    offersHtml.forEach((i) => {
      if (i.checked) {
        const regex = /event-offer-\w+-(\d+)/;
        const match = i.id.match(regex);
        if (match) {
          selectedOffers.push(parseInt(match[1], 10));
        }
      }
    });
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

  setListeners() {
    const typeFieldset = this.element.querySelector('.event__type-group');
    const radios = typeFieldset.querySelectorAll('input[type="radio"]');

    radios.forEach((radio) => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          this.element.querySelector('.event__type-icon').src = `img/icons/${radio.value}.png`;
          this.element.querySelector('.event__type-output').textContent = radio.value;
          this.element.querySelector('.event__section--offers').innerHTML = this.updateOffersDueTypeUpdate(radio.value);
        }
      });
    });

    const destinationField = this.element.querySelector('.event__input--destination');
    destinationField.addEventListener('input', (e) => {
      e.preventDefault();
      this.updateDestinationDescription(destinationField.value);
    });

    this.element.querySelector('.event--edit').addEventListener('reset', () => {
      remove(this);
      listOfPointPresenters.splice(listOfPointPresenters.indexOf(this), 1);
    });
  }

  updateDestinationDescription(destinationName) {
    if (this.#destinations.map((i) => i.name).includes(destinationName)) {
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

  addPickers() {
    this.#endTimePicker = flatpickr(
      this.element.querySelector(`#event-end-time-${this.#biggestOfferId + 1}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this.element.querySelector(`#event-end-time-${this.#biggestOfferId + 1}`).value,
      }
    );

    this.#startTimePicker = flatpickr(
      this.element.querySelector(`#event-start-time-${this.#biggestOfferId + 1}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this.element.querySelector(`#event-start-time-${this.#biggestOfferId + 1}`).value,
        onClose: (selectedDates) => {
          this.#endTimePicker.set('minDate', selectedDates[0]);
        }
      }
    );
    this.#endTimePicker.set('minDate', this.element.querySelector(`#event-start-time-${this.#biggestOfferId + 1}`).value);

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
    const type = from.querySelector('.event__type-output').textContent.replace(/\s/g, '').toLowerCase();
    let destinationId;
    if (this.#destinations.map((i) => i.name).includes(from.querySelector('.event__input--destination').value)) {
      destinationId = this.#destinations.filter((i) => i.name === from.querySelector('.event__input--destination').value)[0].id;
    } else {
      destinationId = -1;
    }
    const id = this.#biggestOfferId + 1;

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

  clearPickers() {
    this.#endTimePicker.clear();
    this.#endTimePicker.destroy();
    this.#startTimePicker.clear();
    this.#startTimePicker.destroy();
  }

}
