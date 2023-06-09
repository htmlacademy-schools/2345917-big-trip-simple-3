import dayjs from 'dayjs';

const getRandomNumber = (start, end) => Math.round(Math.random() * (end - start) + start);
const getPointEditorDueDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');
const getPointDueDate = (dueData) => dayjs(dueData).format('MMMM DD');
const getDateWithoutTime = (dueData) => dayjs(dueData).format('YYYY-MM-DD');
const getDateWithTime = (dueData) => dayjs(dueData).format('YYYY-MM-DDTHH:mm');
const getTimeFromDate = (data) => data.slice(-5);

export { getPointEditorDueDate, getPointDueDate, getDateWithoutTime, getDateWithTime, getTimeFromDate, getRandomNumber };
