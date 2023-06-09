import { getRandomCity, getRandomId, getRandomPicture, getRandomDescription } from '../utils.js';

export const getRandomDestination = () => {
  const numPictures = Math.floor(Math.random() * 5) + 1;
  const pictures = [];

  let descript = getRandomDescription();
  for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++){
    descript += ` ${getRandomDescription()}`;
  }

  for (let i = 0; i < numPictures; i++) {
    pictures.push({
      src: getRandomPicture(),
      description: descript
    });
  }

  return {
    id: getRandomId(),
    description: descript,
    name: getRandomCity(),
    pictures: pictures
  };
};

