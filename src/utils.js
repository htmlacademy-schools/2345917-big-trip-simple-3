import dayjs from 'dayjs';

const refinePointEditorDueDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const refinePointDueDate = (date) => dayjs(date).format('MMM DD');
const getDateWithoutTime = (date) => dayjs(date).format('YYYY-MM-DD');
const getDateWithTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const getDateTime = (date) => dayjs(date).format('HH:mm');

export { refinePointDueDate, refinePointEditorDueDate, getDateWithTime, getDateWithoutTime, getDateTime};
