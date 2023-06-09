function generateRandomOffer() {
  const id = Math.floor(Math.random() * 1000) + 1;
  const price = Math.floor(Math.random() * 500) + 50;
  const titles = ['Upgrade', 'Luxury', 'Exclusive', 'Adventure'];
  const title = titles[Math.floor(Math.random() * titles.length)];

  const offer = {
    id: id,
    title: title,
    price: price
  };

  return offer;
}

function generateRandomOffers() {
  const numOffers = Math.floor(Math.random() * 7);
  const offers = [];
  const generatedIds = [];

  while (offers.length < numOffers) {
    const offer = generateRandomOffer();
    if (!generatedIds.includes(offer.id)) {
      generatedIds.push(offer.id);
      offers.push(offer);
    }
  }

  return offers.sort((a, b) => a.id - b.id);
}

export function generateRandomList() {
  const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  const list = [];

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const offers = generateRandomOffers();

    const item = {
      type: type,
      offers: offers
    };

    list.push(item);
  }

  return list;
}
