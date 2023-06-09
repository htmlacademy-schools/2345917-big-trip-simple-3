import { generateRandomDestinations } from './path/destinations';
import { generateRandomList } from './path/offers';
import { generateRandomTripPoints } from './path/route-point-path';
import PagePresenter from './presenter/presenter-page';

const pageCase = document.querySelector('.trip-events');
const destinations = generateRandomDestinations();
const offers = generateRandomList();
const tripPoints = generateRandomTripPoints(destinations, offers);

const pagePresenter = new PagePresenter(pageCase);
pagePresenter.init(tripPoints, destinations, offers);
