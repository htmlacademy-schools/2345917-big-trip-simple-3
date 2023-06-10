import NoPointViewPresenter from './presenter/no-points-presenter';
import PagePresenter from './presenter/presenter-page';
import TripPointApiService from './server/api';

let tripPoints = null;
let destinations = null;
let offers = null;

const apiData = {
  SERVER: 'https://18.ecmascript.pages.academy/big-trip',
  AUTH: 'Basic wrkjlsfoi3453459a'
};

export const serverTripPoints = new TripPointApiService(apiData.SERVER, apiData.AUTH);

const noPointViewPresenter = new NoPointViewPresenter(document.querySelector('.trip-events'));
noPointViewPresenter.init();
const eventMessage = document.querySelector('.trip-events__msg');
serverTripPoints.tripPoints.then((badFormatPoints) => {
  const formattedListPoints = [];
  badFormatPoints.forEach((i) => {
    const tripPoint = {
      id: parseInt(i.id, 10),
      type: i.type,
      dateFrom: i.date_from,
      dateTo: i.date_to,
      destination: i.destination,
      basePrice: i.base_price,
      offers: i.offers
    };
    formattedListPoints.push(tripPoint);
  });
  tripPoints = formattedListPoints;
  serverTripPoints.destinations.then((j) => {

    destinations = j;
    serverTripPoints.offers.then((g) => {
      offers = g;
      const pageContainer = document.querySelector('.trip-events');
      eventMessage.textContent = '';
      eventMessage.classList.add('visually-hidden');
      const pagePresenter = new PagePresenter(pageContainer);
      pagePresenter.init(tripPoints, destinations, offers);
    }).catch(() => {
      eventMessage.textContent = 'Error. Please, reload this page.';
    });
  }).catch(() => {
    eventMessage.textContent = 'Error. Please, reload this page.';
  });
}).catch(() => {
  eventMessage.textContent = 'Error. Please, reload this page.';
});
