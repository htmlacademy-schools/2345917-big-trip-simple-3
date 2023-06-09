import {render} from './render.js';
import Filters from './view/filters.js';
import BoardPresenter from './presenter/board-presenter';
import ModelPoints from './model/model-points.js';

const pageMain = document.querySelector('.page-body__page-main');
const pageCase = pageMain.querySelector('.trip-events');
const filterElement = document.querySelector('.trip-controls__filters');
const routePointsModel = new ModelPoints();
const boardPresenter = new BoardPresenter({boardCase: pageCase, routePointsModel});

render(new Filters(), filterElement);

boardPresenter.init();
