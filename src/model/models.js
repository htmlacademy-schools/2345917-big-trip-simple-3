import { getRandomTripPointsList } from '../path/route-point-list-path';
import { getRandomOffers } from '../path/offers';
import { getRandomDestination } from '../path/destinations';

const modelTripPointsList = getRandomTripPointsList();
const modelOffersList = getRandomOffers();

const getRandomDestinationsList = () => {
  const destinationsList = [];
  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    destinationsList.push(getRandomDestination());
  }

  return destinationsList;
};
const modelDestinationsList = getRandomDestinationsList();

export { modelTripPointsList, modelOffersList, modelDestinationsList };
