import { getRandomTripPoint } from './route-point-path';

export const getRandomTripPointsList = () => {
  const tripPointsList = [];
  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    tripPointsList.push(getRandomTripPoint());
  }
  return tripPointsList;
};
