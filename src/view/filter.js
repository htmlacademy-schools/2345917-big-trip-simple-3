import AbstractView from '../framework/view/abstract-view.js';
import CreatePointPresenter from '../presenter/creating-point.js';
import { listOfPointPresenters } from '../presenter/presenter-page.js';

function createFilterTemplate() {
  const template = (`
  <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>
      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
  return template;
}

export default class FilterView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createFilterTemplate();
  }

  addListeners() {
    this.element.querySelectorAll('.trip-filters__filter-input').forEach((i) => {
      if (i.value === 'everything') {
        i.addEventListener('click', () => {
          document.querySelector('.trip-events__list').innerHTML = '';
          listOfPointPresenters.forEach((j) => {
            j.renderDueFilterUpdate();
          });
        });
      } else {
        i.addEventListener('click', () => {
          document.querySelector('.trip-events__list').innerHTML = '';
          const filteredList = [];
          listOfPointPresenters.forEach((j) => {
            if (j instanceof CreatePointPresenter ) {
              filteredList.push(j);
            } else {
              if (new Date(j.getTripPointComponent().getTripPoint().dateTo) > new Date()) {
                filteredList.push(j);
              }
            }
          });
          filteredList.forEach((j) => {
            j.renderDueFilterUpdate();
          });
        });
      }
    });
  }
}
