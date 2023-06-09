const loremIpsumSentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

function getRandomDestination() {
  const id = Math.floor(Math.random() * 1000) + 1;
  const descriptCountSentences = Math.floor(Math.random() * 3) + 1;
  const descriptSentences = [];

  for (let i = 0; i < descriptCountSentences; i++) {
    const randomIndex = Math.floor(Math.random() * loremIpsumSentences.length);
    descriptSentences.push(loremIpsumSentences[randomIndex]);
  }

  const description = descriptSentences.join(' ');

  const names = ['Saint-Petersburg', 'Moscow', 'Bali', 'Ekaterinburg'];
  const name = names[Math.floor(Math.random() * names.length)];

  const numPictures = Math.floor(Math.random() * 5) + 1;
  const pictures = [];

  for (let i = 0; i < numPictures; i++) {
    const randomNum = Math.random();
    const picture = {
      src: `http://picsum.photos/300/200?r=${randomNum}`,
      description: `${name} picture ${i + 1}`
    };
    pictures.push(picture);
  }

  const destination = {
    id: id,
    description: description,
    name: name,
    pictures: pictures
  };

  return destination;

}

export function generateRandomDestinations() {
  const numDestinations = Math.floor(Math.random() * 7) + 1;
  const destinations = [];
  const generatedIds = [];

  while (destinations.length < numDestinations) {
    const destination = getRandomDestination();
    if (!generatedIds.includes(destination.id)) {
      generatedIds.push(destination.id);
      destinations.push(destination);
    }
  }

  return destinations.sort((a, b) => a.id - b.id);
}
