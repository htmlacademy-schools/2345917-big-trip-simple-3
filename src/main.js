import {render} from './render.js';
import Filters from './view/filters.js';
import Presenter from './presenter/presenter.js';

const pageMain = document.querySelector('.page-body__page-main');
const pageCase = pageMain.querySelector('.trip-events');
const filterElement = document.querySelector('.trip-controls__filters');
const presenter = new Presenter({container: pageCase});

render(new Filters(), filterElement);

presenter.init();
