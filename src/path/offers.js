import { getRandomDescription, getRandomPrice, getRandomId } from '../utils';

const getRandomOffer = () => ({
  id: getRandomId(),
  title: getRandomDescription().slice(0, 6),
  price: getRandomPrice()
});

export const getRandomOffers = () => {
  const numOffers = Math.floor(Math.random() * 5) + 1;
  const offers = [];

  for (let i = 0; i < numOffers; i++) {
    offers.push(getRandomOffer());
  }

  return offers;
};
