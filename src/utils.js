import dayjs from 'dayjs';

const getRandomElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPrice = () => Math.floor(Math.random() * 1000) + 100;

const getRandomDate = () => {
  const year = Math.floor(Math.random() * 30) + 2000;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  const milliseconds = Math.floor(Math.random() * 1000);

  const date = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
  return date.toISOString();
};

const getRandomId = () => Math.floor(Math.random() * 100) + 1;

const getRandomPicture = () => `http://picsum.photos/248/152?r=${getRandomId()}`;

const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Aliquam erat volutpat.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.'];

const getRandomDescription = () => getRandomElement(descriptions);

const getRandomCity = () => getRandomElement(['Moscow', 'Saint-Petersburg', 'Veliky Novgorod', 'Yekaterinburg']);

const refinePointEditorDueDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');
const refinePointDueDate = (dueData) => dayjs(dueData).format('MMM DD');
const getDateWithoutTime = (dueData) => dayjs(dueData).format('YYYY-MM-DD');
const getDateWithTime = (dueData) => dayjs(dueData).format('YYYY-MM-DDTHH:mm');
const getDateTime = (dueDate) => dayjs(dueDate).format('HH:mm');

export { refinePointDueDate, refinePointEditorDueDate, getDateWithTime, getDateWithoutTime, getDateTime, getRandomElement, getRandomPrice, getRandomId, getRandomPicture, getRandomDescription, getRandomCity, getRandomDate};
