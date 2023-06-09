import { getRandomElement, getRandomDate, getRandomId, getRandomPrice } from '../utils';
import { getRandomDestination } from './destinations';
import { getRandomOffers } from './offer-mock';
import { POINT_TYPES } from './const';

export const getRandomTripPoint = () => ({
  type: getRandomElement(POINT_TYPES),
  dateFrom: getRandomDate(),
  dateTo: getRandomDate(),
  id: getRandomId(),
  basePrice: getRandomPrice(),
  destination: getRandomDestination(),
  offers: getRandomOffers(),
});
