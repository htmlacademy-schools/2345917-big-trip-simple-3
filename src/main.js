import {render} from './render.js';
import Filters from './view/filters.js';
import BoardPresenter from './presenter/board-presenter';

const pageMain = document.querySelector('.page-body__page-main');
const pageCase = pageMain.querySelector('.trip-events');
const filterElement = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter({boardContainer: pageCase});

render(new Filters(), filterElement);

boardPresenter.init();
